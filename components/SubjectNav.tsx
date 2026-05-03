import { SUBJECT_NAMES } from "@/lib/apps";
import type { Subject } from "@/lib/apps";

type Props = {
  subjects: Subject[];
};

export default function SubjectNav({ subjects }: Props) {
  return (
    <nav
      aria-label="科目一覧へジャンプ"
      className="container-narrow pt-14 sm:pt-20"
    >
      <div className="flex items-baseline gap-3 mb-4">
        <p className="text-xs tracking-[0.3em] text-matcha font-sans">
          SUBJECTS
        </p>
        <span className="text-xs text-sumi-soft font-sans">
          科目から探す
        </span>
      </div>
      <ul className="flex flex-wrap gap-2 sm:gap-3">
        {subjects.map((subject) => (
          <li key={subject}>
            <a
              href={`#subject-${subject}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-sumi/10 text-sm text-sumi hover:border-ai/40 hover:text-ai hover:-translate-y-0.5 hover:shadow-soft transition-all"
            >
              <span aria-hidden className="text-matcha">⌖</span>
              {SUBJECT_NAMES[subject]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
