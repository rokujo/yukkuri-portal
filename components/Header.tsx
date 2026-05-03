import { getSite } from "@/lib/apps";

export default function Header() {
  const site = getSite();
  return (
    <header className="border-b border-sumi/10 bg-kinari/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="container-narrow flex items-center justify-between py-4">
        <a
          href="#top"
          className="font-serif text-lg sm:text-xl font-semibold text-ai tracking-wide"
        >
          {site.name}
        </a>
        <a
          href={site.blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-sumi-soft hover:text-ai transition-colors inline-flex items-center gap-1"
        >
          塾ブログへ
          <span aria-hidden>↗</span>
        </a>
      </div>
    </header>
  );
}
