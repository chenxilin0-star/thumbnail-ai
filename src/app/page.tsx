import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, BookOpen } from 'lucide-react'

const useCases = [
  { icon: '📺', title: 'YouTube' },
  { icon: '🎮', title: 'B站游戏' },
  { icon: '📱', title: '抖音短视频' },
  { icon: '📸', title: '小红书' },
  { icon: '🎓', title: '知识付费' },
  { icon: '💼', title: '企业宣传' },
  { icon: '🎵', title: '音乐MV' },
  { icon: '📝', title: '教程视频' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ⚡ ThumbnailAI
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          10秒生成爆款视频封面，让每个创作者都能拥有专业设计师的能力
        </p>
        
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/generate">
            <Button size="lg" className="gap-2">
              <Sparkles className="w-4 h-4" />
              开始生成
            </Button>
          </Link>
          <Link href="/templates">
            <Button size="lg" variant="outline" className="gap-2">
              <BookOpen className="w-4 h-4" />
              模板库
            </Button>
          </Link>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h2 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-lg">
                你的视频标题
              </h2>
              <p className="text-xl opacity-90">AI 自动生成专业封面</p>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold">输入标题 → AI 生成 → 下载使用</p>
                <p className="text-sm text-slate-500">3步完成，10秒出结果</p>
              </div>
              <Link href="/generate">
                <Button>立即体验</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">为什么选择 ThumbnailAI？</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="text-4xl mb-4">⚡</div>
              <CardTitle>10秒生成</CardTitle>
              <CardDescription>
                输入标题，AI 自动生成 3 个专业封面方案
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="text-4xl mb-4">🎨</div>
              <CardTitle>5种风格</CardTitle>
              <CardDescription>
                科技感、游戏风、商务风、可爱风、震撼风
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="text-4xl mb-4">💰</div>
              <CardTitle>免费使用</CardTitle>
              <CardDescription>
                每天 5 张免费，付费版无限生成
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">适用场景</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {useCases.map((useCase) => (
            <Card key={useCase.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{useCase.icon}</div>
                <p className="font-medium text-sm">{useCase.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-4">准备好提升视频点击率了吗？</h2>
            <p className="mb-6 opacity-90">加入 1000+ 创作者，开始生成爆款封面</p>
            <Link href="/generate">
              <Button size="lg" variant="secondary" className="gap-2">
                <Sparkles className="w-4 h-4" />
                免费开始
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500 border-t">
        <p>Made with ❤️ by ThumbnailAI © 2026</p>
      </footer>
    </main>
  )
}
