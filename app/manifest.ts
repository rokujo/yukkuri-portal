import type { MetadataRoute } from "next";
import { getSite } from "@/lib/apps";

export default function manifest(): MetadataRoute.Manifest {
  const site = getSite();
  return {
    name: `${site.name} 学習アプリ`,
    short_name: "ゆっくり塾",
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F5F1E8",
    theme_color: "#1F3A5F",
    lang: "ja",
    dir: "ltr",
    categories: ["education"],
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
