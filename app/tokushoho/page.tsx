import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 ｜ ゆっくり塾",
};

type Row = {
  term: string;
  lines: string[];
};

const ROWS: Row[] = [
  {
    term: "販売事業者名",
    lines: ["中澤聡一郎（屋号：ゆっくり塾）"],
  },
  {
    term: "運営統括責任者",
    lines: ["中澤聡一郎"],
  },
  {
    term: "所在地",
    lines: [
      "東京都新宿区西新宿3丁目3番13号 西新宿水間ビル2F",
      "※本サービスはバーチャルオフィスの住所を使用しております。消費者様からご請求があった場合には、遅滞なく本来の住所を開示いたします。",
    ],
  },
  {
    term: "電話番号",
    lines: [
      "お客様からのご請求があった場合には、遅滞なく開示いたします。",
      "お問い合わせはまず下記メールアドレスまでお願いいたします。",
    ],
  },
  {
    term: "メールアドレス",
    lines: ["rokujo@rokujo.org"],
  },
  {
    term: "販売価格",
    lines: ["各商品ページ・サービスページに記載の価格による（消費税込み）"],
  },
  {
    term: "商品代金以外の必要料金",
    lines: ["特になし（決済手数料はお客様のご負担にはなりません）"],
  },
  {
    term: "お支払い方法",
    lines: [
      "クレジットカード決済（Stripeを利用。対応ブランド：Visa, Mastercard, American Express, JCB 等）",
      "一部商品はnote内の決済方法（クレジットカード等）による",
    ],
  },
  {
    term: "お支払い時期",
    lines: [
      "単品商品：ご注文（決済）完了時",
      "月額・年額プラン：ご契約時、以降は各更新日に自動決済",
    ],
  },
  {
    term: "商品（サービス）の引渡し時期",
    lines: [
      "決済完了後、直ちに（自動で）ダウンロードリンクまたはご利用パスワードをご案内いたします",
    ],
  },
  {
    term: "返品・キャンセルについて",
    lines: [
      "デジタルコンテンツという商品の性質上、お客様都合による返品・返金はお受けしておりません。",
      "月額・年額プランは、次回更新日の前までにお手続きいただくことでいつでも解約可能です。日割りでの返金は行っておりません。",
    ],
  },
];

export default function TokushohoPage() {
  return (
    <>
      <Header />
      <main className="container-narrow py-12 sm:py-16">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-sumi mb-4">
          特定商取引法に基づく表記
        </h1>
        <p className="text-sumi-soft leading-relaxed max-w-2xl mb-10">
          特定商取引法第11条に基づき、以下の通り表記いたします。
        </p>

        <div className="overflow-x-auto rounded-lg border border-sumi/10 bg-white/60 shadow-soft">
          <table className="w-full text-sm">
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.term} className="border-t border-sumi/5 first:border-t-0">
                  <th className="text-left align-top px-4 py-4 font-medium text-sumi w-full sm:w-56 whitespace-nowrap sm:whitespace-normal bg-kinari-deep/40">
                    {row.term}
                  </th>
                  <td className="px-4 py-4 align-top text-sumi-soft leading-relaxed">
                    {row.lines.map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : undefined}>
                        {line}
                      </p>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
