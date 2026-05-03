import { getSite } from "@/lib/apps";

export default function Footer() {
  const site = getSite();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-sumi/10 mt-4">
      <div className="container-narrow py-12 grid gap-8 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <p className="font-serif text-xl font-semibold text-ai">
            {site.name}
          </p>
          <p className="text-sm text-sumi-soft mt-2 leading-relaxed max-w-md">
            ゆっくりと、最先端と。
            <br />
            生徒のペースに寄り添う指導と、AIを活用した学習アプリ。
          </p>
        </div>
        <div className="text-sm space-y-2">
          <p className="text-xs tracking-widest text-matcha font-sans mb-2">
            LINKS
          </p>
          <a
            href={site.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sumi-soft hover:text-ai transition-colors"
          >
            塾ブログ（アメブロ）↗
          </a>
          <a
            href="#top"
            className="block text-sumi-soft hover:text-ai transition-colors"
          >
            ページトップへ ↑
          </a>
        </div>
      </div>
      <div className="border-t border-sumi/5">
        <div className="container-narrow py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-sumi-soft">
          <span>© {year} {site.name}</span>
          <span className="font-sans tracking-widest">YUKKURI × AI</span>
        </div>
      </div>
    </footer>
  );
}
