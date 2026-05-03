import type { AppData } from "@/lib/apps";
import { isNew } from "@/lib/apps";

const STATUS_BADGES: Record<
  AppData["status"],
  { label: string; emoji: string; className: string } | null
> = {
  production: null,
  beta: {
    label: "ベータ版",
    emoji: "🧪",
    className: "bg-orange-100 text-orange-800 border border-orange-200",
  },
  alpha: {
    label: "試験運用",
    emoji: "⚠️",
    className: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  },
  development: {
    label: "開発中",
    emoji: "🔧",
    className: "bg-gray-200 text-gray-700 border border-gray-300",
  },
  planned: {
    label: "構想中",
    emoji: "💭",
    className: "bg-gray-100 text-gray-600 border border-gray-200",
  },
};

const ACCESS_BADGES: Record<
  AppData["access"],
  { label: string; emoji: string; className: string }
> = {
  free: {
    label: "無料",
    emoji: "🆓",
    className: "bg-green-100 text-green-800 border border-green-200",
  },
  kampa: {
    label: "カンパ制",
    emoji: "🔐",
    className: "bg-blue-100 text-ai border border-blue-200",
  },
  students_only: {
    label: "塾生限定",
    emoji: "👥",
    className: "bg-purple-100 text-purple-800 border border-purple-200",
  },
  auth_required: {
    label: "要認証",
    emoji: "🔑",
    className: "bg-slate-100 text-slate-800 border border-slate-200",
  },
};

export function StatusBadge({ status }: { status: AppData["status"] }) {
  const conf = STATUS_BADGES[status];
  if (!conf) return null;
  return (
    <span className={`badge ${conf.className}`}>
      <span aria-hidden>{conf.emoji}</span>
      <span>{conf.label}</span>
    </span>
  );
}

export function AccessBadge({ access }: { access: AppData["access"] }) {
  const conf = ACCESS_BADGES[access];
  return (
    <span className={`badge ${conf.className}`}>
      <span aria-hidden>{conf.emoji}</span>
      <span>{conf.label}</span>
    </span>
  );
}

export function NewBadge({ app }: { app: AppData }) {
  if (!isNew(app)) return null;
  return (
    <span className="badge bg-red-100 text-red-700 border border-red-200">
      <span aria-hidden>✨</span>
      <span>NEW</span>
    </span>
  );
}
