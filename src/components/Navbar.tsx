'use client'

import Link from 'next/link'
import { useTranslations } from '@/i18n/client'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Sparkles, BookOpen, CreditCard } from 'lucide-react'

export function Navbar() {
  const t = useTranslations('nav')

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">ThumbnailAI</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              href="/generate" 
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              {t('generate')}
            </Link>
            <Link 
              href="/templates" 
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              {t('templates')}
            </Link>
            <Link 
              href="/pricing" 
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              {t('pricing')}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}
