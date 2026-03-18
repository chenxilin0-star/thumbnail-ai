'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export const locales = ['zh', 'en'] as const
export type Locale = (typeof locales)[number]

type Messages = typeof import('../../messages/zh.json')

const messagesMap: Record<string, Messages> = {
  zh: require('../../messages/zh.json'),
  en: require('../../messages/en.json'),
}

interface I18nContextType {
  locale: string
  messages: Messages
  setLocale: (locale: string) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  // 始终使用 'zh' 作为初始值，避免 hydration 不匹配
  const [locale, setLocaleState] = useState<string>('zh')
  const [mounted, setMounted] = useState(false)

  // 客户端挂载后读取 localStorage
  useEffect(() => {
    setMounted(true)
    const savedLocale = localStorage.getItem('NEXT_LOCALE')
    if (savedLocale && locales.includes(savedLocale as Locale)) {
      setLocaleState(savedLocale)
    }
  }, [])

  const setLocale = useCallback((newLocale: string) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem('NEXT_LOCALE', newLocale)
    }
  }, [])

  const messages = messagesMap[locale] || messagesMap.zh

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.')
    let value: unknown = messages
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key
      }
    }
    
    if (typeof value !== 'string') return key
    
    let result = value
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
      })
    }
    
    return result
  }, [messages])

  return (
    <I18nContext.Provider value={{ locale, messages, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}

export function useLocale() {
  const { locale } = useI18n()
  return locale
}

export function useTranslations(namespace?: string) {
  const { t } = useI18n()
  
  return useCallback((key: string, params?: Record<string, string | number>): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key
    return t(fullKey, params)
  }, [t, namespace])
}
