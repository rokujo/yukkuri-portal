"use client";

import { useEffect, useState, useCallback } from "react";

type Platform = "ios" | "android" | "desktop" | "standalone" | null;

const DISMISS_KEY = "yukkuri-pwa-dismissed-at";
const DISMISS_DAYS = 7;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallPrompt() {
  const [platform, setPlatform] = useState<Platform>(null);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // ---- Service Worker 登録 ----
    if ("serviceWorker" in navigator) {
      // PWA要件を満たすため。/students/* はSWでバイパスしている。
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // ---- standalone判定 ----
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    if (isStandalone) {
      setPlatform("standalone");
      return;
    }

    // ---- プラットフォーム判定 ----
    const ua = navigator.userAgent || "";
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (/Mac/i.test(ua) && "ontouchend" in document);
    const isAndroid = /Android/.test(ua);
    setPlatform(isIOS ? "ios" : isAndroid ? "android" : "desktop");

    // ---- beforeinstallprompt（Chromium系）----
    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBIP);

    // ---- appinstalled ----
    const onInstalled = () => {
      setPlatform("standalone");
      setBannerVisible(false);
      setModalOpen(false);
    };
    window.addEventListener("appinstalled", onInstalled);

    // ---- dismiss永続化チェック ----
    let dismissed = false;
    try {
      const at = localStorage.getItem(DISMISS_KEY);
      if (at) {
        const elapsed = Date.now() - parseInt(at, 10);
        if (elapsed < DISMISS_DAYS * 24 * 60 * 60 * 1000) dismissed = true;
      }
    } catch {
      /* localStorage未対応環境は通常表示 */
    }

    let timer: ReturnType<typeof setTimeout> | null = null;
    if (!dismissed) {
      timer = setTimeout(() => setBannerVisible(true), 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* noop */
    }
    setBannerVisible(false);
  }, []);

  const handleInstallClick = useCallback(async () => {
    // Android（Chromium）でprompt()可能ならネイティブ利用
    if (deferred) {
      try {
        await deferred.prompt();
        const choice = await deferred.userChoice;
        if (choice.outcome === "accepted") {
          setBannerVisible(false);
        }
      } catch {
        /* prompt失敗時はモーダルにフォールバック */
        setModalOpen(true);
      }
      setDeferred(null);
      return;
    }
    // iOS、Android（条件未達）、デスクトップは手順モーダルを開く
    setModalOpen(true);
  }, [deferred]);

  const closeModal = useCallback(() => setModalOpen(false), []);

  // Escキーでモーダル閉じる
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  if (platform === "standalone" || platform === null) return null;

  return (
    <>
      {bannerVisible && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:p-4 pointer-events-none"
          role="region"
          aria-label="ホーム画面追加のご案内"
        >
          <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm border border-sumi/15 rounded-xl shadow-soft-hover p-4 pointer-events-auto flex gap-3 items-start animate-[fadeUp_0.35s_ease-out]">
            <div
              aria-hidden
              className="shrink-0 w-10 h-10 rounded-md bg-ai/10 flex items-center justify-center text-ai text-xl"
            >
              📱
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm font-semibold text-sumi mb-1 leading-snug">
                ホーム画面に追加できます
              </p>
              <p className="text-xs text-sumi-soft leading-relaxed mb-3">
                アプリのように開けて、毎日の学習が少しスムーズに。
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="bg-ai text-kinari text-xs font-medium px-3.5 py-2 rounded-md hover:bg-ai-soft transition-colors"
                >
                  {platform === "ios" || !deferred
                    ? "追加方法を見る"
                    : "ホーム画面に追加"}
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  className="text-xs text-sumi-soft px-2 py-2 hover:text-ai transition-colors"
                >
                  あとで
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label="閉じる"
              className="shrink-0 -mt-1 -mr-1 w-7 h-7 rounded-full text-sumi-soft hover:text-ai hover:bg-kinari-deep flex items-center justify-center text-lg leading-none"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {modalOpen && (
        <InstructionsModal
          platform={platform}
          onClose={closeModal}
        />
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function InstructionsModal({
  platform,
  onClose,
}: {
  platform: Platform;
  onClose: () => void;
}) {
  const isIOS = platform === "ios";
  const isAndroid = platform === "android";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6"
    >
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-sumi/40 backdrop-blur-[2px]"
      />
      <div className="relative bg-kinari border border-sumi/10 rounded-2xl shadow-soft-hover w-full max-w-md max-h-[90vh] overflow-y-auto animate-[fadeUp_0.3s_ease-out]">
        <div className="flex items-start justify-between gap-4 p-5 border-b border-sumi/10">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-matcha font-sans mb-1">
              ADD TO HOME SCREEN
            </p>
            <h2
              id="install-modal-title"
              className="font-serif text-lg font-semibold text-sumi"
            >
              {isIOS
                ? "iPhone / iPad で追加する"
                : isAndroid
                  ? "Android で追加する"
                  : "ホーム画面に追加する"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="shrink-0 w-8 h-8 rounded-full text-sumi-soft hover:text-ai hover:bg-kinari-deep flex items-center justify-center text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-5 space-y-5 text-sm text-sumi leading-relaxed">
          {isIOS ? <IosSteps /> : isAndroid ? <AndroidSteps /> : <DesktopSteps />}

          <div className="bg-white/70 border border-sumi/10 rounded-md p-3 text-xs text-sumi-soft">
            <p className="font-medium text-sumi mb-1">追加すると…</p>
            <ul className="space-y-1 list-disc list-inside marker:text-matcha">
              <li>ホーム画面のアイコンから一発で開けます</li>
              <li>アドレスバーが消えて画面が広く使えます</li>
              <li>オフラインでも一度開いたページは再表示できます</li>
            </ul>
          </div>
        </div>

        <div className="p-5 pt-2 border-t border-sumi/10 bg-white/40">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-ai text-kinari py-3 rounded-md text-sm font-medium hover:bg-ai-soft transition-colors"
          >
            分かりました
          </button>
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  body,
}: {
  n: number;
  title: React.ReactNode;
  body?: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden
        className="shrink-0 w-7 h-7 rounded-full bg-ai text-kinari font-sans text-xs font-bold flex items-center justify-center"
      >
        {n}
      </span>
      <div>
        <p className="font-medium text-sumi">{title}</p>
        {body && <p className="text-xs text-sumi-soft mt-0.5">{body}</p>}
      </div>
    </li>
  );
}

function IosSteps() {
  return (
    <>
      <p className="text-xs text-sumi-soft">
        <strong className="text-sumi">Safari</strong> で開いている前提です。
        Chrome / その他ブラウザの場合は一度 Safari で開いてください。
      </p>
      <ol className="space-y-3">
        <Step
          n={1}
          title={
            <>
              画面下部の <span aria-hidden>⬆</span>{" "}
              <strong className="text-ai">共有ボタン</strong> をタップ
            </>
          }
          body="アドレスバーの右側、もしくは下中央にあります。"
        />
        <Step
          n={2}
          title={
            <>
              メニューを下にスクロールして
              <strong className="text-ai">「ホーム画面に追加」</strong>
              を選択
            </>
          }
        />
        <Step
          n={3}
          title={
            <>
              右上の <strong className="text-ai">「追加」</strong> をタップ
            </>
          }
          body="ホーム画面にアイコンが配置されます。"
        />
      </ol>
    </>
  );
}

function AndroidSteps() {
  return (
    <>
      <p className="text-xs text-sumi-soft">
        <strong className="text-sumi">Chrome</strong>{" "}
        で開くのがおすすめです。インストール条件を満たすと自動でバナーが出ることもあります。
      </p>
      <ol className="space-y-3">
        <Step
          n={1}
          title={
            <>
              画面右上の <span aria-hidden>⋮</span>{" "}
              <strong className="text-ai">メニュー</strong> をタップ
            </>
          }
        />
        <Step
          n={2}
          title={
            <>
              <strong className="text-ai">「アプリをインストール」</strong>{" "}
              または{" "}
              <strong className="text-ai">「ホーム画面に追加」</strong>
              を選択
            </>
          }
        />
        <Step
          n={3}
          title={
            <>
              ダイアログの <strong className="text-ai">「インストール」</strong>{" "}
              をタップ
            </>
          }
        />
      </ol>
    </>
  );
}

function DesktopSteps() {
  return (
    <>
      <p className="text-xs text-sumi-soft">
        Chrome / Edge をお使いの場合、アドレスバー右端のアイコンから追加できます。
      </p>
      <ol className="space-y-3">
        <Step
          n={1}
          title={
            <>
              アドレスバー右端の{" "}
              <strong className="text-ai">インストールアイコン</strong>{" "}
              をクリック
            </>
          }
          body="モニタに ↓ の付いたマーク。表示されない場合は ⋮ → 『アプリ』→『インストール』。"
        />
        <Step
          n={2}
          title={
            <>
              ダイアログの{" "}
              <strong className="text-ai">「インストール」</strong> をクリック
            </>
          }
        />
      </ol>
    </>
  );
}
