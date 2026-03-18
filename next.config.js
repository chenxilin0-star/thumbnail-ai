/** @type {import('next').NextConfig} */
const nextConfig = {
  // 不使用静态导出，以支持 API 路由（生成图片需要调用 jimeng-api）
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
