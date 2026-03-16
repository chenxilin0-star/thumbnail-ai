'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Download, Loader2, RefreshCw } from 'lucide-react'

const styles = [
  { id: 'tech', name: '科技感', icon: '💻', colors: [['#6366F1','#8B5CF6'],['#0EA5E9','#6366F1'],['#1E293B','#6366F1']] },
  { id: 'gaming', name: '游戏风', icon: '🎮', colors: [['#10B981','#059669'],['#F59E0B','#EF4444'],['#8B5CF6','#EC4899']] },
  { id: 'business', name: '商务风', icon: '💼', colors: [['#1E293B','#475569'],['#7C3AED','#4F46E5'],['#0F172A','#334155']] },
  { id: 'cute', name: '可爱风', icon: '🌸', colors: [['#EC4899','#F43F5E'],['#F97316','#EF4444'],['#A855F7','#EC4899']] },
  { id: 'dramatic', name: '震撼风', icon: '⚡', colors: [['#EF4444','#B91C1C'],['#F59E0B','#DC2626'],['#7C3AED','#DC2626']] },
]

const platforms = [
  { id: 'youtube', name: 'YouTube', size: '1280x720', w: 1280, h: 720 },
  { id: 'bilibili', name: 'B站', size: '1920x1080', w: 1920, h: 1080 },
  { id: 'tiktok', name: '抖音', size: '1080x1920', w: 1080, h: 1920 },
]

interface Thumbnail {
  id: string
  colors: string[]
  svgUrl: string
}

function generateThumbnails(title: string, styleId: string, platformId: string): Thumbnail[] {
  const style = styles.find(s => s.id === styleId) || styles[0]
  const platform = platforms.find(p => p.id === platformId) || platforms[0]
  const displayTitle = title.length > 20 ? title.substring(0, 20) + '...' : title

  return style.colors.map((colors, i) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${platform.w}" height="${platform.h}">
      <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colors[0]}"/>
        <stop offset="100%" stop-color="${colors[1]}"/>
      </linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="45%" text-anchor="middle" fill="white" font-size="${platform.w > 1000 ? 64 : 48}" font-weight="bold" font-family="Arial,sans-serif">${displayTitle}</text>
      <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="${platform.w > 1000 ? 28 : 20}" opacity="0.8" font-family="Arial,sans-serif">ThumbnailAI</text>
    </svg>`
    return {
      id: `thumb_${Date.now()}_${i}`,
      colors,
      svgUrl: `data:image/svg+xml,${encodeURIComponent(svg)}`,
    }
  })
}

export default function GeneratePage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('tech')
  const [selectedPlatform, setSelectedPlatform] = useState('youtube')
  const [loading, setLoading] = useState(false)
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([])

  const handleGenerate = () => {
    if (!title.trim()) return
    setLoading(true)
    setTimeout(() => {
      setThumbnails(generateThumbnails(title, selectedStyle, selectedPlatform))
      setLoading(false)
    }, 800)
  }

  const handleDownload = (svgUrl: string, index: number) => {
    const link = document.createElement('a')
    link.href = svgUrl
    link.download = `thumbnail-${index + 1}.svg`
    link.click()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            生成视频封面
          </h1>
          <p className="text-slate-600">输入视频标题，AI 自动生成专业封面</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
                <CardDescription>输入视频信息，AI 将根据此生成封面</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">视频标题 *</label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例如：10个AI工具让你效率翻倍" maxLength={100} />
                  <p className="text-xs text-slate-500 mt-1">{title.length}/100</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">视频描述（可选）</label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="简单描述视频内容" rows={3} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>选择风格</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {styles.map((style) => (
                    <button key={style.id} onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${selectedStyle === style.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="text-2xl mb-1">{style.icon}</div>
                      <div className="text-xs font-medium">{style.name}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>选择平台</CardTitle></CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {platforms.map((platform) => (
                    <Button key={platform.id} variant={selectedPlatform === platform.id ? 'default' : 'outline'}
                      onClick={() => setSelectedPlatform(platform.id)} className="flex-1">
                      <div className="text-center">
                        <div className="font-medium">{platform.name}</div>
                        <div className="text-xs opacity-70">{platform.size}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleGenerate} disabled={loading || !title.trim()} className="w-full h-12 text-lg" size="lg">
              {loading ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" />生成中...</>) : (<><Sparkles className="w-5 h-5 mr-2" />生成封面</>)}
            </Button>
          </div>

          <div>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>生成结果</CardTitle>
                  {thumbnails.length > 0 && (
                    <Button variant="outline" size="sm" onClick={handleGenerate}><RefreshCw className="w-4 h-4 mr-1" />重新生成</Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {thumbnails.length === 0 ? (
                  <div className="text-center text-slate-400 py-16">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">输入标题并点击生成</p>
                    <p className="text-sm">AI 将生成 3 个封面方案供你选择</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {thumbnails.map((thumb, index) => (
                      <div key={thumb.id} className="relative group">
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <img src={thumb.svgUrl} alt={`方案 ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <Button onClick={() => handleDownload(thumb.svgUrl, index)}><Download className="w-4 h-4 mr-2" />下载</Button>
                        </div>
                        <Badge className="absolute top-2 left-2">方案 {index + 1}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
