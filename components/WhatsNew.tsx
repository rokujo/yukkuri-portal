import {
  getRecentlyUpdatedGroups,
  isClickable,
  SUBJECT_NAMES,
  type AppData,
} from "@/lib/apps";

function formatDate(yyyymmdd: string): string {
  const parts = yyyymmdd.split("-");
  if (parts.length !== 3) return yyyymmdd;
  const [, m, d] = parts;
  return `${parseInt(m, 10)}月${parseInt(d, 10)}日`;
}

function AppEntry({ app }: { app: AppData }) {
  const clickable = isClickable(app);
  const inner = (
    <>
      <span aria-hidden className="text-base sm:text-lg">
        {app.icon}
      </span>
      <span className="font-medium">{app.name}</span>
      <span className="text-[10px] tracking-widest text-matcha font-sans">
        {SUBJECT_NAMES[app.subject]}
      </span>
    </>
  );
  if (clickable) {
    return (
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-sumi hover:text-ai transition-colors"
      >
        {inner}
      </a>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 text-sm text-sumi-soft opacity-80">
      {inner}
    </span>
  );
}

export default function WhatsNew() {
  const groups = getRecentlyUpdatedGroups(30);
  if (groups.length === 0) return null;

  return (
    <section className="container-narrow pt-2 pb-12 sm:pb-14">
      <div className="bg-white/70 border border-sumi/10 rounded-lg shadow-soft p-5 sm:p-7">
        <div className="flex items-baseline gap-3 mb-5">
          <span aria-hidden className="text-base">
            ✨
          </span>
          <p className="text-xs tracking-[0.3em] text-matcha font-sans">
            WHAT&apos;S NEW
          </p>
          <span className="text-xs sm:text-sm text-sumi-soft font-sans">
            最近の更新（30日以内）
          </span>
        </div>

        <ol className="divide-y divide-sumi/10">
          {groups.map(({ date, apps }) => (
            <li
              key={date}
              className="py-3 sm:py-3.5 sm:flex sm:gap-6 sm:items-baseline first:pt-0 last:pb-0"
            >
              <p className="text-[11px] font-sans text-ai tracking-wider shrink-0 sm:w-24 mb-1.5 sm:mb-0">
                {formatDate(date)}
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {apps.map((app) => (
                  <li key={app.id}>
                    <AppEntry app={app} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
