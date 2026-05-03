import type { AppData, Subject } from "@/lib/apps";
import { SUBJECT_NAMES } from "@/lib/apps";
import AppCard from "./AppCard";

type Props = {
  subject: Subject;
  apps: AppData[];
};

export default function SubjectSection({ subject, apps }: Props) {
  return (
    <section
      id={`subject-${subject}`}
      className="container-narrow py-10 sm:py-14"
    >
      <div className="flex items-baseline gap-4 mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ai">
          {SUBJECT_NAMES[subject]}
        </h2>
        <span className="text-xs sm:text-sm text-sumi-soft tracking-widest font-sans">
          {apps.length} {apps.length === 1 ? "app" : "apps"}
        </span>
        <div className="flex-1 h-px bg-sumi/10" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}
