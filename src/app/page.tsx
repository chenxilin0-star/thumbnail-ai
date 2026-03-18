'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, BookOpen } from 'lucide-react'
import { useTranslations } from '@/i18n/client'

const useCaseIcons = ['📺', '🎮', '📱', '📸', '🎓', '💼', '🎵', '📝'] as const
const useCaseKeys = ['youtube', 'bilibili', 'tiktok', 'xiaohongshu', 'education', 'business', 'music', 'tutorial'] as const

export default function Home() {
  const t = useTranslations('home')

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
          {t('hero.title')}
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/generate">
            <Button size="lg" className="gap-2">
              <Sparkles className="w-4 h-4" />
              {t('hero.cta.start')}
            </Button>
          </Link>
          <Link href="/templates">
            <Button size="lg" variant="outline" className="gap-2">
              <BookOpen className="w-4 h-4" />
              {t('hero.cta.templates')}
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
                {t('demo.title')}
              </h2>
              <p className="text-xl opacity-90">{t('demo.subtitle')}</p>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold">{t('demo.flow')}</p>
                <p className="text-sm text-slate-500">{t('demo.flowSub')}</p>
              </div>
              <Link href="/generate">
                <Button>{t('demo.cta')}</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">{t('features.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="text-4xl mb-4">⚡</div>
              <CardTitle>{t('features.fast.title')}</CardTitle>
              <CardDescription>
                {t('features.fast.desc')}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="text-4xl mb-4">🎨</div>
              <CardTitle>{t('features.styles.title')}</CardTitle>
              <CardDescription>
                {t('features.styles.desc')}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="text-4xl mb-4">💰</div>
              <CardTitle>{t('features.free.title')}</CardTitle>
              <CardDescription>
                {t('features.free.desc')}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">{t('useCases.title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {useCaseKeys.map((key, index) => (
            <Card key={key} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{useCaseIcons[index]}</div>
                <p className="font-medium text-sm">{t(`useCases.items.${key}`)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="mb-6 opacity-90">{t('cta.subtitle')}</p>
            <Link href="/generate">
              <Button size="lg" variant="secondary" className="gap-2">
                <Sparkles className="w-4 h-4" />
                {t('cta.button')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500 border-t">
        <p>{t('footer')}</p>
      </footer>
    </main>
  )
}
