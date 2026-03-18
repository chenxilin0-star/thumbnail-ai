'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Download, Loader2, RefreshCw, AlertCircle } from 'lucide-react'
import { useTranslations } from '@/i18n/client'

interface Platform {
  id: string
  name: string
  size: string
  w: number
  h: number
}

interface Style {
  id: string
  name: string
  icon: string
}

interface Thumbnail {
  id: string
  url: string
  width: number
  height: number
}

export default function GeneratePage() {
  const t = useTranslations('generate')
  const searchParams = useSearchParams()
  
  const styles: Style[] = [
    { id: 'tech', name: t('style.tech.name'), icon: '💻' },
    { id: 'gaming', name: t('style.gaming.name'), icon: '🎮' },
    { id: 'business', name: t('style.business.name'), icon: '💼' },
    { id: 'cute', name: t('style.cute.name'), icon: '🌸' },
    { id: 'dramatic', name: t('style.dramatic.name'), icon: '⚡' },
  ]

  const platforms: Platform[] = [
    { id: 'youtube', name: t('platform.youtube.name'), size: t('platform.youtube.size'), w: 1280, h: 720 },
    { id: 'tiktok', name: t('platform.tiktok.name'), size: t('platform.tiktok.size'), w: 1080, h: 1920 },
    { id: 'instagram', name: t('platform.instagram.name'), size: t('platform.instagram.size'), w: 1080, h: 1080 },
    { id: 'bilibili', name: t('platform.bilibili.name'), size: t('platform.bilibili.size'), w: 1920, h: 1080 },
    { id: 'douyin', name: t('platform.douyin.name'), size: t('platform.douyin.size'), w: 1080, h: 1920 },
    { id: 'xiaohongshu', name: t('platform.xiaohongshu.name'), size: t('platform.xiaohongshu.size'), w: 1242, h: 1660 },
  ]

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('tech')
  const [selectedPlatform, setSelectedPlatform] = useState('youtube')
  const [loading, setLoading] = useState(false)
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([])
  const [error, setError] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // 从 URL 参数读取模板数据
  useEffect(() => {
    const styleParam = searchParams.get('style')
    const titleParam = searchParams.get('title')
    const promptParam = searchParams.get('prompt')
    
    if (styleParam && styles.some(s => s.id === styleParam)) {
      setSelectedStyle(styleParam)
    }
    if (titleParam) {
      setTitle(titleParam)
    }
    if (promptParam) {
      setDescription(promptParam)
    }
  }, [searchParams])

  const handleGenerate = async () => {
    if (!title.trim()) {
      setError(t('error.emptyTitle'))
      return
    }

    setLoading(true)
    setError(null)
    setThumbnails([])

    try {
      // 使用 AbortController 设置 120 秒超时
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120000)

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          platform: selectedPlatform,
          style: selectedStyle,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // 先检查响应是否有效
      const text = await response.text()
      if (!text) {
        throw new Error('Server returned empty response')
      }

      let data
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error('Server returned invalid JSON')
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || t('error.apiError'))
      }

      setThumbnails(data.images)
    } catch (err) {
      console.error('Generation error:', err)
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timeout - please try again')
      } else {
        setError(err instanceof Error ? err.message : t('error.apiError'))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (url: string, index: number) => {
    try {
      // If it's a base64 data URL, download directly
      if (url.startsWith('data:')) {
        const link = document.createElement('a')
        link.href = url
        link.download = `thumbnail-${index + 1}.png`
        link.click()
        return
      }

      // Otherwise fetch and download
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `thumbnail-${index + 1}.png`
      link.click()
      URL.revokeObjectURL(blobUrl)
    } catch (err) {
      console.error('Download error:', err)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('form.basicInfo')}</CardTitle>
                <CardDescription>{t('form.basicInfoDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('form.title')} *</label>
                  <Input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder={t('form.titlePlaceholder')} 
                    maxLength={100} 
                  />
                  <p className="text-xs text-slate-500 mt-1">{t('form.titleCount', { count: title.length })}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('form.description')}</label>
                  <Textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder={t('form.descriptionPlaceholder')} 
                    rows={3} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>{t('style.title')}</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {styles.map((style) => (
                    <button 
                      key={style.id} 
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedStyle === style.id 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{style.icon}</div>
                      <div className="text-xs font-medium">{style.name}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>{t('platform.title')}</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {platforms.map((platform) => (
                    <Button 
                      key={platform.id} 
                      variant={selectedPlatform === platform.id ? 'default' : 'outline'}
                      onClick={() => setSelectedPlatform(platform.id)} 
                      className="flex-1 h-auto py-2"
                    >
                      <div className="text-center">
                        <div className="font-medium text-xs">{platform.name}</div>
                        <div className="text-[10px] opacity-70">{platform.size}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handleGenerate} 
              disabled={loading || !title.trim()} 
              className="w-full h-12 text-lg" 
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t('loading')}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t('button')}
                </>
              )}
            </Button>

            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4 flex items-center gap-3 text-red-600">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('result.title')}</CardTitle>
                  {thumbnails.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleGenerate}
                      disabled={loading}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      {t('result.regenerate')}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {thumbnails.length === 0 ? (
                  <div className="text-center text-slate-400 py-16">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">{t('result.empty.title')}</p>
                    <p className="text-sm">{t('result.empty.subtitle')}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {thumbnails.map((thumb, index) => (
                      <div 
                        key={thumb.id} 
                        className="relative group cursor-pointer"
                        onClick={() => setPreviewImage(thumb.url)}
                      >
                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                          <img 
                            src={thumb.url} 
                            alt={`${t('result.variant', { index: index + 1 })}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg gap-2">
                          <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); setPreviewImage(thumb.url); }}>
                            🔍 预览
                          </Button>
                          <Button size="sm" onClick={(e) => { e.stopPropagation(); handleDownload(thumb.url, index); }}>
                            <Download className="w-4 h-4 mr-1" />
                            下载
                          </Button>
                        </div>
                        <Badge className="absolute top-2 left-2">
                          {t('result.variant', { index: index + 1 })}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 图片预览弹窗 */}
        {previewImage && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh]">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <Button 
                className="absolute top-2 right-2" 
                variant="secondary"
                onClick={() => setPreviewImage(null)}
              >
                ✕ 关闭
              </Button>
              <Button 
                className="absolute bottom-2 right-2" 
                onClick={(e) => { e.stopPropagation(); handleDownload(previewImage, 0); }}
              >
                <Download className="w-4 h-4 mr-2" />
                下载图片
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
