import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { getAllProducts, getProductBySlug } from "@/lib/catalog";
import { siteConfig } from "@/lib/data/site-config";

// Reads local files (font + pre-rendered PNG cover), so this route needs the Node
// runtime — the Edge runtime has no filesystem access. Still fully
// static-generation-compatible.
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Special files like opengraph-image.tsx don't inherit generateStaticParams from the
// sibling page.tsx — each needs its own, or Next falls back to on-demand rendering.
export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    categorySlug: product.categorySlug,
    productSlug: product.slug,
  }));
}

const FONT_PATH = path.join(process.cwd(), "src/assets/fonts/Rubik-Bold-Hebrew.woff");

export default async function Image({
  params,
}: {
  params: Promise<{ categorySlug: string; productSlug: string }>;
}) {
  const { categorySlug, productSlug } = await params;
  const product = getProductBySlug(categorySlug, productSlug);
  const fontData = fs.readFileSync(FONT_PATH);
  const fonts = [{ name: "Rubik", data: fontData, style: "normal" as const, weight: 700 as const }];

  if (!product) {
    return new ImageResponse(
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#ffffff" }} />,
      { ...size, fonts }
    );
  }

  // og.png is pre-rendered per product by scripts/generate-catalog.mjs, next to the
  // product's images — a flat PNG (not WebP) that next/og's renderer can embed directly.
  const ogCoverPath = path.join(process.cwd(), "public", product.coverImage.replace(/\/[^/]+$/, "/og.png"));
  const imageBuffer = fs.readFileSync(ogCoverPath);
  const imageDataUri = `data:image/png;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#ffffff" }}>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            background: "#e4e4e2",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageDataUri} width={480} height={480} style={{ objectFit: "contain" }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: 60,
          }}
        >
          <span
            style={{
              fontFamily: "Rubik",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6e6e6a",
              direction: "rtl",
            }}
          >
            {siteConfig.siteName}
          </span>
          <span
            style={{
              fontFamily: "Rubik",
              fontSize: 48,
              marginTop: 20,
              color: "#111111",
              direction: "rtl",
              textAlign: "right",
            }}
          >
            {product.title}
          </span>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
