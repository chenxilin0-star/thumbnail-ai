import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thumbnailai.com";

export const metadata: Metadata = {
  title: {
    default: "ThumbnailAI - AI Video Thumbnail Generator | 10秒生成爆款视频封面",
    template: "%s | ThumbnailAI",
  },
  description:
    "Free AI-powered video thumbnail generator. Create stunning YouTube, Bilibili, TikTok thumbnails in 10 seconds. 5 styles, 3 platforms. 免费AI视频封面生成器。",
  keywords: [
    "thumbnail generator",
    "AI thumbnail",
    "youtube thumbnail maker",
    "video cover generator",
    "bilibili cover",
    "tiktok thumbnail",
    "缩略图生成器",
    "视频封面生成",
    "AI封面",
    "YouTube封面制作",
    "B站封面",
    "抖音封面",
  ],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "ThumbnailAI - AI Video Thumbnail Generator",
    description:
      "Create stunning video thumbnails in 10 seconds with AI. Free for YouTube, Bilibili, TikTok.",
    url: siteUrl,
    siteName: "ThumbnailAI",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThumbnailAI - AI Video Thumbnail Generator",
    description: "Create stunning video thumbnails in 10 seconds with AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ThumbnailAI",
    url: siteUrl,
    description: "AI-powered video thumbnail generator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
