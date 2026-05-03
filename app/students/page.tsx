import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSite, getAppsBySubject, SUBJECT_NAMES } from "@/lib/apps";
import { getKampaPasswords, getPasswordExpiry } from "@/lib/passwords";

export const dynamic = "force-dynamic";

export default function StudentsPage() {
  const site = getSite();
  const groups = getAppsBySubject();
  const expiry = getPasswordExpiry();

  return (
    <>
      <Header />
      <main className="container-narrow py-12 sm:py-16">
        {/* 塾生エリアの目印 */}
        <div className="inline-flex items-center gap-2 bg-ai/10 text-ai text-xs font-sans tracking-widest px-3 py-1.5 rounded-full mb-5">
          <span aria-hidden>👥</span>
          <span>STUDENTS ONLY</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-sumi mb-4">
          塾生エリア
        </h1>
        <p className="text-sumi-soft leading-relaxed max-w-2xl mb-10">
          {site.name}の塾生のみなさんへ。各アプリ（カンパ制）にアクセスするためのパスワードをまとめています。
          ユーザー名はすべてのアプリで <code className="font-mono bg-kinari-deep px-1.5 py-0.5 rounded text-sumi">user</code> です。
        </p>

        {/* 共有禁止の警告 */}
        <div
          role="alert"
          className="bg-red-50 border border-red-200 rounded-lg p-5 sm:p-6 mb-10"
        >
          <p className="font-serif text-base sm:text-lg font-semibold text-red-800 mb-2 flex items-center gap-2">
            <span aria-hidden>⚠️</span> 取り扱いの注意
          </p>
          <ul className="text-sm text-red-900/90 leading-relaxed space-y-1.5 list-disc list-inside marker:text-red-400">
            <li>このページのパスワードは塾生本人のみ利用してください。</li>
            <li>SNS・LINE・スクリーンショット等で塾外に共有しないでください。</li>
            <li>万一漏洩の恐れがあれば、すぐに塾長までご連絡ください。</li>
          </ul>
        </div>

        {/* 有効期限 */}
        <div className="bg-white/60 border border-sumi/10 rounded-lg p-5 sm:p-6 mb-10 shadow-soft">
          <p className="text-xs tracking-widest text-matcha font-sans mb-2">
            VALID UNTIL
          </p>
          <p className="font-serif text-xl sm:text-2xl font-semibold text-sumi">
            {expiry ? expiry : "（有効期限は塾長から別途お伝えします）"}
          </p>
          <p className="text-xs text-sumi-soft mt-2">
            次回更新時に新しいパスワードを口頭または塾内で配布します。
          </p>
        </div>

        {/* パスワード一覧 */}
        <h2 className="font-serif text-2xl font-semibold text-ai mb-6">
          各アプリのパスワード
        </h2>

        <div className="space-y-10">
          {groups.map(({ subject, apps }) => {
            const kampa = getKampaPasswords(apps);
            if (kampa.length === 0) return null;
            return (
              <section key={subject}>
                <h3 className="font-serif text-lg font-semibold text-sumi mb-3 flex items-center gap-3">
                  <span>{SUBJECT_NAMES[subject]}</span>
                  <span className="flex-1 h-px bg-sumi/10" />
                </h3>
                <div className="overflow-x-auto rounded-lg border border-sumi/10 bg-white/60 shadow-soft">
                  <table className="w-full text-sm">
                    <thead className="bg-kinari-deep/60 text-sumi-soft">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium w-1/2">アプリ</th>
                        <th className="text-left px-4 py-3 font-medium">パスワード</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kampa.map(({ app, password }) => (
                        <tr
                          key={app.id}
                          className="border-t border-sumi/5"
                        >
                          <td className="px-4 py-3 align-top">
                            <div className="flex items-center gap-2">
                              <span aria-hidden>{app.icon}</span>
                              <span className="font-medium text-sumi">
                                {app.name}
                              </span>
                            </div>
                            <div className="text-xs text-sumi-soft mt-1 ml-6">
                              {app.status === "production" || app.status === "beta" || app.status === "alpha"
                                ? `状況：${statusLabel(app.status)}`
                                : `公開予定（${statusLabel(app.status)}）`}
                            </div>
                          </td>
                          <td className="px-4 py-3 align-top">
                            {password ? (
                              <code className="font-mono text-sm bg-kinari-deep text-sumi px-2.5 py-1 rounded select-all">
                                {password}
                              </code>
                            ) : (
                              <span className="text-xs italic text-sumi-soft">
                                未設定
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-sumi/10 text-sm text-sumi-soft">
          <a href="/" className="hover:text-ai transition-colors">
            ← トップに戻る
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

function statusLabel(s: string): string {
  switch (s) {
    case "production": return "本番運用";
    case "beta": return "ベータ版";
    case "alpha": return "試験運用";
    case "development": return "開発中";
    case "planned": return "構想中";
    default: return s;
  }
}
