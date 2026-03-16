import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "模板库 - 视频封面模板 | Template Gallery",
  description:
    "Browse 12+ free video thumbnail templates for YouTube, Bilibili, TikTok. Tech, gaming, business, lifestyle styles. 浏览免费视频封面模板。",
  alternates: { canonical: "/templates" },
};

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
