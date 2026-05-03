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
                カンパ制について（応援金でパスワード発行）
              </p>
              <p className="text-xs sm:text-sm text-sumi-soft mt-0.5">
                半年 {yen(kampaInfo.halfYear)} ／ 年 {yen(kampaInfo.year)}
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
                料金
              </h3>
              <ul className="space-y-1 text-sumi-soft">
                <li>半年プラン：{yen(kampaInfo.halfYear)}</li>
                <li>年間プラン：{yen(kampaInfo.year)}</li>
                <li className="text-xs mt-2">
                  ※ 塾生は全アプリ無料でご利用いただけます。
                </li>
              </ul>
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
                <li>塾ブログ経由でカンパ申し込みのご連絡をいただく</li>
                <li>ご入金確認後、各アプリのパスワードをまとめてお伝え</li>
                <li>
                  パスワードは{kampaInfo.passwordRotationMonths}か月ごとに更新（次回継続時に再発行）
                </li>
              </ol>
            </div>
          </div>
        </div>
      </details>
    </section>
  );
}
