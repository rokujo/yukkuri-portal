import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 和の落ち着いた色
        kinari: "#F5F1E8",      // 生成り色（ベース背景）
        sumi: "#2C2C2C",        // 墨色（本文）
        ai: "#1F3A5F",          // 藍色（プライマリアクセント）
        matcha: "#7A8B5C",      // 抹茶色（サブアクセント）
        // 派生
        "kinari-deep": "#EDE6D3",   // 一段濃い生成り（カード背景や区切り）
        "sumi-soft": "#4A4A4A",    // 柔らかい墨色（補助テキスト）
        "ai-soft": "#3D5A85",      // 柔らかい藍
        // テクノロジー感の青（控えめ）
        tech: "#4F7CAC",
      },
      fontFamily: {
        serif: ["var(--font-noto-serif)", '"Noto Serif JP"', "serif"],
        sans: ["var(--font-noto-sans)", '"Noto Sans JP"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(44, 44, 44, 0.06)",
        "soft-hover": "0 8px 24px rgba(44, 44, 44, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
