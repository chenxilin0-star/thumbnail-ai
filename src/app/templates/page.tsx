'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkles, ArrowLeft } from 'lucide-react'

const categories = [
  { id: 'all', name: '全部' },
  { id: 'tech', name: '科技' },
  { id: 'gaming', name: '游戏' },
  { id: 'business', name: '商务' },
  { id: 'lifestyle', name: '生活' },
  { id: 'education', name: '教育' },
  { id: 'dramatic', name: '震撼' },
]

// 精选模板 - 使用真实 AI 生成的封面图，每个模板带提示词
const featuredTemplates = [
  {
    id: 'featured-tech',
    category: 'tech',
    title: 'AI 工具推荐',
    subtitle: '效率翻倍秘籍',
    image: '/templates/tech-ai.png',
    tag: '热门',
    prompt: '10个超好用的AI工具推荐，让你的工作效率翻倍',
  },
  {
    id: 'featured-gaming',
    category: 'gaming',
    title: '游戏攻略',
    subtitle: '高手进阶指南',
    image: '/templates/gaming.png',
    tag: '热门',
    prompt: '游戏高手进阶攻略，从菜鸟到大神的必经之路',
  },
  {
    id: 'featured-business',
    category: 'business',
    title: '副业赚钱',
    subtitle: '月入过万攻略',
    image: '/templates/business.png',
    tag: '',
    prompt: '普通人如何通过副业月入过万？实操指南分享',
  },
  {
    id: 'featured-lifestyle',
    category: 'lifestyle',
    title: '生活分享',
    subtitle: '日常 Vlog',
    image: '/templates/lifestyle.png',
    tag: '新',
    prompt: '我的日常生活分享，记录平凡中的小确幸',
  },
  {
    id: 'featured-education',
    category: 'education',
    title: '学习教程',
    subtitle: '从零开始',
    image: '/templates/education.png',
    tag: '热门',
    prompt: '零基础入门教程，手把手教你快速上手',
  },
  {
    id: 'featured-dramatic',
    category: 'dramatic',
    title: '2026 趋势',
    subtitle: '必看预测',
    image: '/templates/dramatic.png',
    tag: '新',
    prompt: '2026年你必须知道的10大趋势预测',
  },
]

// 更多模板 - 全部使用 AI 生成的真实图片
const moreTemplates = [
  {
    id: 'more-tech1',
    category: 'tech',
    title: 'AI 工具推荐',
    subtitle: '效率翻倍秘籍',
    image: '/templates/more/tech1.png',
    tag: '',
    prompt: '这些AI工具让我工作效率提升了10倍',
  },
  {
    id: 'more-tech2',
    category: 'tech',
    title: 'ChatGPT 实战教程',
    subtitle: '从入门到精通',
    image: '/templates/more/tech2.png',
    tag: '',
    prompt: 'ChatGPT从入门到精通，一篇文章讲清楚',
  },
  {
    id: 'more-game1',
    category: 'gaming',
    title: '游戏世界探险',
    subtitle: '精彩攻略',
    image: '/templates/more/game1.png',
    tag: '',
    prompt: '游戏世界探险记，带你发现隐藏彩蛋',
  },
  {
    id: 'more-game2',
    category: 'gaming',
    title: '沙盒生存指南',
    subtitle: '新手必备',
    image: '/templates/more/game2.png',
    tag: '',
    prompt: '沙盒游戏生存指南，新手必看的技巧合集',
  },
  {
    id: 'more-game3',
    category: 'gaming',
    title: '手游上分技巧',
    subtitle: '段位提升',
    image: '/templates/more/game3.png',
    tag: '',
    prompt: '手游上分秘籍，3天从青铜到钻石',
  },
  {
    id: 'more-biz1',
    category: 'business',
    title: '个人品牌打造',
    subtitle: '从0到1',
    image: '/templates/more/biz1.png',
    tag: '',
    prompt: '个人品牌打造指南，从0到1建立影响力',
  },
  {
    id: 'more-life1',
    category: 'lifestyle',
    title: '健康减脂餐',
    subtitle: '营养又美味',
    image: '/templates/more/life1.png',
    tag: '',
    prompt: '一周健康减脂餐分享，好吃不长胖',
  },
  {
    id: 'more-life2',
    category: 'lifestyle',
    title: '房间改造 Vlog',
    subtitle: '焕然一新',
    image: '/templates/more/life2.png',
    tag: '',
    prompt: '花500块改造房间，效果惊艳',
  },
  {
    id: 'more-edu1',
    category: 'education',
    title: '英语口语速成',
    subtitle: '30天流利说',
    image: '/templates/more/edu1.png',
    tag: '',
    prompt: '30天英语口语速成，每天10分钟见效',
  },
  {
    id: 'more-edu2',
    category: 'education',
    title: 'Python 入门',
    subtitle: '零基础也能学',
    image: '/templates/more/edu2.png',
    tag: '',
    prompt: 'Python零基础入门，从安装到第一个项目',
  },
  {
    id: 'more-tech3',
    category: 'tech',
    title: '数码产品评测',
    subtitle: '真实体验',
    image: '/templates/more/tech3.png',
    tag: '',
    prompt: '2026年最值得买的数码产品评测',
  },
  {
    id: 'more-drama1',
    category: 'dramatic',
    title: '爆款秘籍',
    subtitle: '流量密码',
    image: '/templates/more/drama1.png',
    tag: '',
    prompt: '揭秘爆款内容背后的流量密码',
  },
]

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredFeatured = activeCategory === 'all'
    ? featuredTemplates
    : featuredTemplates.filter(t => t.category === activeCategory)

  const filteredMore = activeCategory === 'all'
    ? moreTemplates
    : moreTemplates.filter(t => t.category === activeCategory)

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

        {/* 精选模板 - AI 生成的真实图片 */}
        {filteredFeatured.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              精选模板
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredFeatured.map(tpl => (
                <Card key={tpl.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="aspect-video relative">
                    <Image
                      src={tpl.image}
                      alt={tpl.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {tpl.tag && (
                      <Badge className="absolute top-2 right-2" variant={tpl.tag === '新' ? 'default' : 'secondary'}>
                        {tpl.tag}
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link href={`/generate?style=${tpl.category}&title=${encodeURIComponent(tpl.title)}&prompt=${encodeURIComponent(tpl.prompt)}`}>
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
          </>
        )}

        {/* 更多模板 - AI 生成的真实图片 */}
        {filteredMore.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4">更多模板</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMore.map(tpl => (
                <Card key={tpl.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="aspect-video relative">
                    <Image
                      src={tpl.image}
                      alt={tpl.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link href={`/generate?style=${tpl.category}&title=${encodeURIComponent(tpl.title)}&prompt=${encodeURIComponent(tpl.prompt)}`}>
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
          </>
        )}

        {filteredFeatured.length === 0 && filteredMore.length === 0 && (
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
