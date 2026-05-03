import { getSite } from "@/lib/apps";

export default function HeroSection() {
  const site = getSite();
  return (
    <section
      id="top"
      className="container-narrow pt-16 pb-20 sm:pt-24 sm:pb-28 relative"
    >
      {/* 控えめな抹茶色のぼかし装飾（派手にならない程度） */}
      <div
        aria-hidden
        className="absolute -top-12 right-0 w-72 h-72 rounded-full bg-matcha/[0.07] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-10 -left-20 w-60 h-60 rounded-full bg-ai/[0.05] blur-3xl pointer-events-none"
      />

      <div className="relative max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <span
            aria-hidden
            className="inline-block w-8 h-px bg-matcha"
          />
          <p className="text-xs sm:text-sm tracking-[0.4em] text-matcha font-sans">
            YUKKURI × AI
          </p>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl leading-[1.4] sm:leading-[1.35] font-semibold text-sumi mb-8">
          {site.tagline}
        </h1>
        <div className="section-divider" />
        <p className="text-base sm:text-lg leading-relaxed text-sumi-soft max-w-2xl mb-10 sm:mb-12">
          {site.description}
        </p>

        {/* 「ゆっくり × 最先端」のギャップを視覚化 */}
        <div className="flex items-stretch gap-2 sm:gap-3 max-w-xl">
          <div className="flex-1 bg-white/70 border border-sumi/10 rounded-md p-4 sm:p-5">
            <p className="text-[10px] tracking-[0.25em] text-matcha font-sans mb-1.5">
              YUKKURI
            </p>
            <p className="font-serif text-lg sm:text-xl text-sumi font-semibold mb-2">
              ゆっくり
            </p>
            <p className="text-xs sm:text-sm text-sumi-soft leading-relaxed">
              急がせない、理解を飛ばさない指導。
            </p>
          </div>

          <div
            aria-hidden
            className="flex items-center justify-center px-1 sm:px-2 text-sumi-soft/60 font-serif text-2xl sm:text-3xl select-none"
          >
            ×
          </div>

          <div className="flex-1 bg-ai/[0.04] border border-ai/20 rounded-md p-4 sm:p-5">
            <p className="text-[10px] tracking-[0.25em] text-tech font-sans mb-1.5">
              AI / TECH
            </p>
            <p className="font-serif text-lg sm:text-xl text-ai font-semibold mb-2">
              最先端
            </p>
            <p className="text-xs sm:text-sm text-ai-soft leading-relaxed">
              AIで一人ひとりのペースに寄り添う。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
