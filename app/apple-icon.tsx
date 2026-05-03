import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

async function loadJpFont(): Promise<ArrayBuffer | null> {
  try {
    const cssRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&text=" +
        encodeURIComponent("松"),
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(/src:\s*url\((.+?)\)\s*format/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function AppleIcon() {
  const fontData = await loadJpFont();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1F3A5F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 120,
          fontFamily: fontData ? "JpSerif" : "serif",
          color: "#F5F1E8",
          fontWeight: 700,
        }}
      >
        {fontData ? "松" : "Y"}
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? {
            fonts: [
              {
                name: "JpSerif",
                data: fontData,
                weight: 700,
                style: "normal",
              },
            ],
          }
        : {}),
    }
  );
}
