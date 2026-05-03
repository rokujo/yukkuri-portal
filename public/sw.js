// 上松ゆっくり塾 窓口サイト Service Worker
// 目的:
//  1. Android Chrome の PWA インストール条件（fetchハンドラを持つSW）を満たす
//  2. 軽いオフラインフォールバック（一度開いたページは再表示できる）
// 注意: /students/* は認証が絡むためキャッシュ対象外。

const CACHE = "yukkuri-portal-v2";
const FALLBACK_URL = "/";

self.addEventListener("install", (event) => {
  // 新SWを即時アクティブ化
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  let url;
  try {
    url = new URL(req.url);
  } catch (_) {
    return;
  }

  // 同一オリジン以外は触らない
  if (url.origin !== self.location.origin) return;

  // 認証が絡むパスはバイパス
  if (url.pathname.startsWith("/students")) return;

  // ナビゲーション: network-first → cache fallback → トップフォールバック
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(CACHE);
          cache.put(req, fresh.clone());
          return fresh;
        } catch (_) {
          const cached = await caches.match(req);
          if (cached) return cached;
          const fallback = await caches.match(FALLBACK_URL);
          return (
            fallback ||
            new Response("オフラインのため表示できません。", {
              status: 503,
              headers: { "Content-Type": "text/plain; charset=utf-8" },
            })
          );
        }
      })()
    );
    return;
  }

  // 静的アセット: stale-while-revalidate
  event.respondWith(
    (async () => {
      const cached = await caches.match(req);
      const networkPromise = fetch(req)
        .then((res) => {
          if (res && res.ok && res.type === "basic") {
            caches.open(CACHE).then((c) => c.put(req, res.clone()));
          }
          return res;
        })
        .catch(() => cached);
      return cached || networkPromise;
    })()
  );
});
