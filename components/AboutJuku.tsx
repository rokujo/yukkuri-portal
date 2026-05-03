import { getSite } from "@/lib/apps";

export default function AboutJuku() {
  const site = getSite();
  return (
    <section className="container-narrow py-16 sm:py-24">
      <div className="relative bg-ai text-kinari rounded-xl p-8 sm:p-14 shadow-soft overflow-hidden">
        {/* 装飾の同心円（かすかに） */}
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full border border-kinari/10 pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -right-10 w-72 h-72 rounded-full border border-kinari/10 pointer-events-none"
        />

        <div className="relative max-w-2xl">
          <p className="text-xs tracking-[0.4em] text-kinari/60 mb-3 font-sans">
            ABOUT
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-6 leading-snug">
            {site.name}について
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-kinari/90 mb-4">
            長野県内の高校生（長野高校志望が中心）を対象とした、個別指導・少人数制の塾です。
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-kinari/90 mb-8">
            「ゆっくり」は、急がせない・理解を飛ばさない・生徒のペースを大切にすることを意味します。
            このサイトのアプリは、すべて現場の指導から生まれたもの。ゆっくり丁寧に教えるために、AIなどの最先端技術を活用しています。
          </p>

          <a
            href={site.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-kinari text-ai px-6 py-3 rounded-md text-sm font-medium hover:bg-white hover:-translate-y-0.5 hover:shadow-soft-hover transition-all"
          >
            塾紹介・体験授業の案内（アメブロ）
            <span aria-hidden>↗</span>
          </a>

          <p className="text-xs text-kinari/60 mt-5">
            お問い合わせ・体験授業のお申し込みはアメブロ記事のコメント欄からお願いします。
          </p>
        </div>
      </div>
    </section>
  );
}
