// Server-only: process.env の値を扱うため、必ず Server Component から呼ぶこと。
// クライアントコンポーネントから import しないこと。

import type { AppData } from "./apps";

function envKeyFor(appId: string): string {
  return `KAMPA_PW_${appId.toUpperCase().replace(/-/g, "_")}`;
}

export type AppPassword = {
  app: AppData;
  envKey: string;
  password: string | null;
};

export function getKampaPasswords(apps: AppData[]): AppPassword[] {
  return apps
    .filter((app) => app.access === "kampa")
    .map((app) => {
      const envKey = envKeyFor(app.id);
      const password = process.env[envKey] ?? null;
      return { app, envKey, password };
    });
}

export function getPasswordExpiry(): string | null {
  return process.env.PASSWORD_EXPIRES_AT ?? null;
}
