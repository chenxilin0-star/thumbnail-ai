'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkles, ArrowLeft } from 'lucide-react'

// export const metadata is not supported in client components,
// so we use generateMetadata in a separate layout or head component.
// For now, the root layout covers base SEO.

const categories = [
  { id: 'all', name: '全部' },
  { id: 'tech', name: '科技' },
  { id: 'gaming', name: '游戏' },
  { id: 'business', name: '商务' },
  { id: 'lifestyle', name: '生活' },
  { id: 'education', name: '教育' },
]

const templates = [
  {
    id: 1, category: 'tech', title: '10个AI工具推荐',
    colors: ['#6366F1', '#8B5CF6'], tag: '热门',
    subtitle: '效率翻倍秘籍',
  },
  {
    id: 2, category: 'tech', title: 'ChatGPT 实战教程',
    colors: ['#0EA5E9', '#6366F1'], tag: '新',
    subtitle: '从入门到精通',
  },
  {
    id: 3, category: 'gaming', title: '原神4.0全攻略',
    colors: ['#10B981', '#059669'], tag: '热门',
    subtitle: '新版本必看',
  },
  {
    id: 4, category: 'gaming', title: '我的世界生存指南',
    colors: ['#F59E0B', '#D97706'], tag: '',
    subtitle: '新手必备',
  },
  {
    id: 5, category: 'business', title: '副业赚钱指南',
    colors: ['#1E293B', '#475569'], tag: '热门',
    subtitle: '月入过万攻略',
  },
  {
    id: 6, category: 'business', title: '个人品牌打造',
    colors: ['#7C3AED', '#4F46E5'], tag: '',
    subtitle: '从0到1',
  },
  {
    id: 7, category: 'lifestyle', title: '一周减脂餐分享',
    colors: ['#EC4899', '#F43F5E'], tag: '',
    subtitle: '健康又好吃',
  },
  {
    id: 8, category: 'lifestyle', title: '房间改造Vlog',
    colors: ['#F97316', '#EF4444'], tag: '新',
    subtitle: '花500块焕然一新',
  },
  {
    id: 9, category: 'education', title: '英语口语速成',
    colors: ['#14B8A6', '#0D9488'], tag: '热门',
    subtitle: '30天流利说',
  },
  {
    id: 10, category: 'education', title: 'Python入门教程',
    colors: ['#3B82F6', '#1D4ED8'], tag: '',
    subtitle: '零基础也能学',
  },
  {
    id: 11, category: 'tech', title: '2026最强笔记本',
    colors: ['#8B5CF6', '#EC4899'], tag: '',
    subtitle: '横评对比',
  },
  {
    id: 12, category: 'gaming', title: '王者荣耀上分技巧',
    colors: ['#EF4444', '#B91C1C'], tag: '',
    subtitle: '钻石到星耀',
  },
]

function TemplateSVG({ title, subtitle, colors }: { title: string; subtitle: string; colors: string[] }) {
  return (
    <svg viewBox="0 0 640 360" className="w-full h-full rounded-t-lg">
      <defs>
        <linearGradient id={`grad-${title}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grad-${title})`} />
      <text x="50%" y="42%" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold" fontFamily="system-ui">{title}</text>
      <text x="50%" y="58%" textAnchor="middle" fill="white" fontSize="18" opacity="0.85" fontFamily="system-ui">{subtitle}</text>
    </svg>
  )
}

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? templates
    : templates.filter(t => t.category === activeCategory)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">模板库</h1>
            <p className="text-slate-500">选择模板快速生成封面，或作为灵感参考</p>
          </div>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList>
            {categories.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id}>{cat.name}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(tpl => (
            <Card key={tpl.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="aspect-video relative">
                <TemplateSVG title={tpl.title} subtitle={tpl.subtitle} colors={tpl.colors} />
                {tpl.tag && (
                  <Badge className="absolute top-2 right-2" variant={tpl.tag === '新' ? 'default' : 'secondary'}>
                    {tpl.tag}
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link href={`/generate?style=${tpl.category}&title=${encodeURIComponent(tpl.title)}`}>
                    <Button>
                      <Sparkles className="w-4 h-4 mr-2" />
                      使用此模板
                    </Button>
                  </Link>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="font-medium">{tpl.title}</p>
                <p className="text-sm text-slate-500">{tpl.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg">该分类暂无模板</p>
            <p className="text-sm mt-2">更多模板持续更新中...</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Card className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-6">
              <p className="font-bold text-lg mb-2">没找到合适的模板？</p>
              <p className="text-sm opacity-90 mb-4">直接输入标题，AI 为你定制专属封面</p>
              <Link href="/generate">
                <Button variant="secondary">
                  <Sparkles className="w-4 h-4 mr-2" />
                  自定义生成
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
