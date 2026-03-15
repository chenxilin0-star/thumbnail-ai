import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThumbnailAI - 10秒生成爆款视频封面",
  description: "AI 驱动的视频缩略图生成器，让每个创作者都能拥有专业设计师的能力。支持 YouTube、B站、抖音等平台。",
  keywords: ["thumbnail generator", "youtube thumbnail", "video cover", "AI", "缩略图生成器", "视频封面"],
  openGraph: {
    title: "ThumbnailAI - 10秒生成爆款视频封面",
    description: "AI 驱动的视频缩略图生成器",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
