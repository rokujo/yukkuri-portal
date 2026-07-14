import { getSite } from "@/lib/apps";

export default function KampaInfo() {
  const { kampaInfo } = getSite();
  const yen = (n: number) =>
    new Intl.NumberFormat("ja-JP").format(n) + "円";

  return (
    <section className="container-narrow pb-12">
      <details className="group bg-white/60 border border-sumi/10 rounded-lg shadow-soft overflow-hidden">
        <summary className="cursor-pointer list-none px-5 sm:px-7 py-5 flex items-center justify-between gap-4 hover:bg-kinari-deep/40 transition-colors">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="text-xl sm:text-2xl"
            >
              🔐
            </span>
            <div>
              <p className="font-serif text-base sm:text-lg font-semibold text-sumi">
                有料プランについて（教材の購入）
              </p>
              <p className="text-xs sm:text-sm text-sumi-soft mt-0.5">
                スタンダード 半年 {yen(kampaInfo.standard.halfYear)} ／
                プレミアム 月 {yen(kampaInfo.premium.month)}
                ・塾生は無料
              </p>
            </div>
          </div>
          <span
            aria-hidden
            className="text-sumi-soft text-sm transition-transform group-open:rotate-180 shrink-0"
          >
            ▼
          </span>
        </summary>

        <div className="px-5 sm:px-7 pb-7 pt-2 border-t border-sumi/10 text-sm sm:text-base text-sumi leading-relaxed">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mt-4">
            <div>
              <h3 className="font-serif text-base font-semibold text-ai mb-2">
                🔐 スタンダードプラン
              </h3>
              <p className="text-xs text-sumi-soft mb-1.5">
                Anki教材など、静的コンテンツが対象
              </p>
              <ul className="space-y-1 text-sumi-soft">
                <li>半年プラン：{yen(kampaInfo.standard.halfYear)}</li>
                <li>年間プラン：{yen(kampaInfo.standard.year)}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-ai mb-2">
                💎 プレミアムプラン
              </h3>
              <p className="text-xs text-sumi-soft mb-1.5">
                AIを使った動的コンテンツ（添削・会話・生成問題など）が対象
              </p>
              <ul className="space-y-1 text-sumi-soft">
                <li>月額プラン：{yen(kampaInfo.premium.month)}</li>
                <li>年間プラン：{yen(kampaInfo.premium.year)}</li>
              </ul>
            </div>
            <div className="sm:col-span-2 text-xs">
              ※ 塾生は全アプリ無料でご利用いただけます。
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-ai mb-2">
                支払い方法
              </h3>
              <ul className="space-y-1 text-sumi-soft">
                {kampaInfo.paymentMethods.map((m) => (
                  <li key={m}>・{m}</li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-2">
              <h3 className="font-serif text-base font-semibold text-ai mb-2">
                パスワード発行の流れ
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sumi-soft marker:text-matcha">
                <li>Stripeで決済いただく</li>
                <li>
                  決済後にユーザー名・パスワードが表示されます（メールには記載されないため、必ず保存してください）
                </li>
              </ol>
            </div>
          </div>
        </div>
      </details>
    </section>
  );
}
