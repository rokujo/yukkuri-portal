import type { AppData } from "@/lib/apps";
import { isClickable } from "@/lib/apps";
import { StatusBadge, AccessBadge, NewBadge } from "./Badges";

type Props = {
  app: AppData;
};

const STATE_LABEL: Record<AppData["status"], string> = {
  production: "",
  beta: "",
  alpha: "",
  development: "準備中",
  planned: "公開予定",
};

export default function AppCard({ app }: Props) {
  const clickable = isClickable(app);
  const stateLabel = STATE_LABEL[app.status];

  const cardInner = (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          aria-hidden
          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-kinari-deep/70 text-2xl sm:text-3xl leading-none select-none shrink-0 transition-colors group-hover:bg-ai/10"
        >
          {app.icon}
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end">
          <NewBadge app={app} />
          <StatusBadge status={app.status} />
          <AccessBadge access={app.access} />
        </div>
      </div>

      <h3 className="font-serif text-lg sm:text-xl font-semibold text-sumi mb-2 leading-snug group-hover:text-ai transition-colors">
        {app.name}
      </h3>

      <p className="text-sm text-sumi-soft leading-relaxed mb-5 min-h-[3em]">
        {app.description}
      </p>

      <div className="mt-auto pt-3 border-t border-sumi/5 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-x-2 gap-y-1 min-w-0">
          {app.targetLevel.map((level) => (
            <span
              key={level}
              className="text-[11px] text-matcha font-sans tracking-wide whitespace-nowrap"
            >
              #{level}
            </span>
          ))}
        </div>
        <div className="text-xs shrink-0">
          {clickable ? (
            <span
              aria-hidden
              className="text-sumi-soft opacity-0 group-hover:opacity-100 group-hover:text-ai transition-opacity inline-flex items-center gap-0.5"
            >
              開く <span>→</span>
            </span>
          ) : stateLabel ? (
            <span className="italic text-sumi-soft/70">{stateLabel}</span>
          ) : null}
        </div>
      </div>
    </>
  );

  const baseClass =
    "group relative flex flex-col h-full bg-white/70 border border-sumi/10 rounded-lg p-5 sm:p-6 shadow-soft transition-all duration-200";

  if (clickable) {
    return (
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} hover:-translate-y-1 hover:shadow-soft-hover hover:border-ai/30 focus-visible:-translate-y-1 focus-visible:shadow-soft-hover`}
        aria-label={`${app.name} を開く（新しいタブ）`}
      >
        {cardInner}
      </a>
    );
  }

  return (
    <div
      className={`${baseClass} opacity-75 cursor-not-allowed`}
      aria-disabled="true"
    >
      {cardInner}
    </div>
  );
}
