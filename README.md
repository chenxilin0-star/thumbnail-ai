# ThumbnailAI - AI视频封面生成器

10秒生成爆款视频封面，让每个创作者都能拥有专业设计师的能力。

## ✨ 功能特性

- **10秒生成** - 输入标题，AI 自动生成 3 个专业封面方案
- **5种风格** - 科技感、游戏风、商务风、可爱风、震撼风
- **3大平台** - YouTube (1280x720)、B站 (1920x1080)、抖音 (1080x1920)
- **模板库** - 12+ 精选模板，快速生成或作为灵感参考
- **免费使用** - 每天 5 张免费，付费版无限生成

## 🚀 技术栈

- **框架**: Next.js 16 (App Router + Turbopack)
- **UI**: Tailwind CSS + shadcn/ui
- **AI**: DeepSeek API
- **部署**: Vercel

## 📦 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填入 DEEPSEEK_API_KEY

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
npm start
```

## 🌐 部署到 Vercel

### 方式 1: 通过 Vercel CLI

```bash
# 登录 Vercel
npx vercel login

# 部署到生产环境
npx vercel --prod
```

### 方式 2: 通过 Vercel Dashboard

1. 访问 [vercel.com](https://vercel.com)
2. 导入 GitHub 仓库
3. 配置环境变量：
   - `DEEPSEEK_API_KEY` - DeepSeek API 密钥
   - `NEXT_PUBLIC_SITE_URL` - 网站 URL（可选）
4. 点击 Deploy

## 📝 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `DEEPSEEK_API_KEY` | DeepSeek API 密钥 | ✅ |
| `NEXT_PUBLIC_SITE_URL` | 网站 URL（用于 SEO） | ❌ |

## 📂 项目结构

```
src/
├── app/
│   ├── page.tsx              # 首页
│   ├── generate/             # 生成页
│   ├── templates/            # 模板库
│   ├── api/thumbnails/       # API 路由
│   ├── layout.tsx            # 根布局（SEO）
│   ├── sitemap.ts            # 站点地图
│   └── robots.ts             # robots.txt
└── components/ui/            # UI 组件
```

## 🎯 SEO 优化

- ✅ 完整的 metadata（title, description, keywords）
- ✅ Open Graph 和 Twitter Card
- ✅ 结构化数据（JSON-LD）
- ✅ sitemap.xml 和 robots.txt
- ✅ 语义化 HTML 和 alt 标签
- ✅ 多语言支持（中英文）

## 📊 性能优化

- ✅ Next.js 16 Turbopack（更快的构建）
- ✅ 静态生成（SSG）首页和模板页
- ✅ 图片懒加载
- ✅ CSS 按需加载

## 🔧 待办事项

- [ ] 用户认证（登录/注册）
- [ ] 付费订阅（Stripe）
- [ ] 真实图片生成（Canvas API）
- [ ] 历史记录保存
- [ ] 更多模板（50+）
- [ ] 多语言切换

## 📄 License

MIT

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [DeepSeek](https://www.deepseek.com/)
- [Vercel](https://vercel.com/)
