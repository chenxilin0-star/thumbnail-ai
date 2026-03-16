import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "生成封面 - AI视频封面生成器 | Generate Thumbnail",
  description:
    "Enter your video title and generate professional thumbnails in 10 seconds. 5 styles, 3 platforms. 输入标题，10秒生成专业视频封面。",
  alternates: { canonical: "/generate" },
};

export default function GenerateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
