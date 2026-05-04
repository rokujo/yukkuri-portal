import appsData from "@/data/apps.json";

export type Subject =
  | "english"
  | "japanese"
  | "math"
  | "chemistry"
  | "biology"
  | "physics"
  | "information"
  | "history"
  | "civics";

export type AppStatus =
  | "production"
  | "beta"
  | "alpha"
  | "development"
  | "planned";

export type AccessType =
  | "free"
  | "kampa"
  | "students_only"
  | "auth_required";

export type AppData = {
  id: string;
  name: string;
  subject: Subject;
  category: string;
  description: string;
  shortDescription?: string;
  url: string;
  status: AppStatus;
  access: AccessType;
  icon: string;
  tags: string[];
  targetLevel: string[];
  techStack?: string[];
  lastUpdated: string;
};

export type KampaInfo = {
  halfYear: number;
  year: number;
  currency: string;
  paymentMethods: string[];
  studentsFree: boolean;
  passwordRotationMonths: number;
};

export type SiteInfo = {
  name: string;
  tagline: string;
  description: string;
  blogUrl: string;
  kampaInfo: KampaInfo;
};

export type AppsJson = {
  version: string;
  lastUpdated: string;
  site: SiteInfo;
  subjectOrder: Subject[];
  apps: AppData[];
};

export const SUBJECT_NAMES: Record<Subject, string> = {
  english: "英語",
  japanese: "国語",
  math: "数学",
  chemistry: "化学",
  biology: "生物",
  physics: "物理",
  information: "情報",
  history: "地理・歴史",
  civics: "公民",
};

const data = appsData as AppsJson;

export function getSite(): SiteInfo {
  return data.site;
}

export function getSubjectOrder(): Subject[] {
  return data.subjectOrder;
}

export function getAppsBySubject(): { subject: Subject; apps: AppData[] }[] {
  const order = data.subjectOrder;
  return order
    .map((subject) => ({
      subject,
      apps: data.apps.filter((app) => app.subject === subject),
    }))
    .filter((group) => group.apps.length > 0);
}

export function isClickable(app: AppData): boolean {
  if (app.status === "development" || app.status === "planned") return false;
  if (!app.url || app.url.trim() === "") return false;
  return true;
}

export function isNew(app: AppData, today: Date = new Date()): boolean {
  const updated = new Date(app.lastUpdated);
  if (Number.isNaN(updated.getTime())) return false;
  const diffMs = today.getTime() - updated.getTime();
  const days = diffMs / (1000 * 60 * 60 * 24);
  return days >= 0 && days <= 30;
}
