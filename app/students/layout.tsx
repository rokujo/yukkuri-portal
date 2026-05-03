import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "塾生エリア ｜ 上松ゆっくり塾",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
