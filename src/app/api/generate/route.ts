import { NextRequest, NextResponse } from 'next/server'

// 即梦 API 端点（本地部署）
const JIMENG_API_URL = 'http://localhost:5100/v1/images/generations'

interface GenerateRequest {
  title: string
  description?: string
  platform: string
  style: string
}

interface PlatformConfig {
  name: string
  width: number
  height: number
  ratio: string
  promptHint: string  // 平台专属提示词
}

interface StyleConfig {
  name: string
  promptSuffix: string
}

const platforms: Record<string, PlatformConfig> = {
  youtube: { 
    name: 'YouTube', 
    width: 1280, 
    height: 720, 
    ratio: '16:9',
    promptHint: 'video thumbnail, bold text, expressive design, high contrast, professional content creator aesthetic'
  },
  tiktok: { 
    name: 'TikTok', 
    width: 1080, 
    height: 1920, 
    ratio: '9:16',
    promptHint: 'vertical video thumbnail, trendy style, vibrant colors, dynamic energy, social media viral aesthetic'
  },
  instagram: { 
    name: 'Instagram', 
    width: 1080, 
    height: 1080, 
    ratio: '1:1',
    promptHint: 'square video thumbnail, aesthetic lifestyle vibe, clean minimalist design, influencer style'
  },
  bilibili: { 
    name: 'B站', 
    width: 1920, 
    height: 1080, 
    ratio: '16:9',
    promptHint: 'video cover design, anime gaming elements, Asian video style, youth oriented design'
  },
  douyin: { 
    name: '抖音', 
    width: 1080, 
    height: 1920, 
    ratio: '9:16',
    promptHint: 'vertical short video cover, trendy fashion style, viral aesthetic, high contrast'
  },
  xiaohongshu: { 
    name: '小红书', 
    width: 1242, 
    height: 1660, 
    ratio: '3:4',
    promptHint: 'lifestyle content cover, aesthetic notes style, soft tones, refined life feeling'
  },
}

const styles: Record<string, StyleConfig> = {
  tech: { 
    name: '科技感', 
    promptSuffix: 'futuristic technology style, holographic elements, circuit board patterns, blue and purple neon glow, digital particles, cyber aesthetic, dark background with bright tech accents, holographic interface' 
  },
  gaming: { 
    name: '游戏风', 
    promptSuffix: 'gaming thumbnail style, dynamic action scene, explosive effects, vibrant RGB colors, esports aesthetic, bold typography space, dramatic lighting, game UI elements, epic composition' 
  },
  business: { 
    name: '商务风', 
    promptSuffix: 'professional business thumbnail, clean modern design, gradient background blue to purple, corporate style, elegant typography space, minimalist composition, trust and authority feeling, premium quality' 
  },
  cute: { 
    name: '可爱风', 
    promptSuffix: 'cute kawaii thumbnail style, pastel pink and blue colors, soft rounded shapes, adorable aesthetic, warm friendly atmosphere, sweet elements, playful design, dreamy background' 
  },
  dramatic: { 
    name: '震撼风', 
    promptSuffix: 'dramatic cinematic thumbnail, high contrast lighting, bold red and orange colors, powerful impact, intense atmosphere, epic scene, attention-grabbing, movie poster style, dynamic composition' 
  },
}

function buildPrompt(title: string, description: string | undefined, style: StyleConfig, platform: PlatformConfig): string {
  const promptParts = [
    // 平台专属风格
    platform.promptHint,
    // 视频标题
    `main title "${title}" prominently displayed`,
    // 描述补充
    description ? `video topic: ${description}` : '',
    // 风格
    style.promptSuffix,
    // 质量要求
    'high click-through rate',
    'professional graphic design',
  ]
  
  return promptParts.filter(Boolean).join(', ')
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json()
    const { title, description, platform, style } = body

    // Validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      )
    }

    const platformConfig = platforms[platform] || platforms.youtube
    const styleConfig = styles[style] || styles.tech
    const prompt = buildPrompt(title.trim(), description, styleConfig, platformConfig)

    const sessionId = process.env.JIMENG_SESSION_ID
    if (!sessionId) {
      console.error('JIMENG_SESSION_ID not configured')
      return NextResponse.json(
        { success: false, error: 'API key not configured' },
        { status: 500 }
      )
    }

    // 调用即梦 API
    const response = await fetch(JIMENG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`,
      },
      body: JSON.stringify({
        model: 'jimeng-5.0',
        prompt: prompt,
        ratio: platformConfig.ratio,
        resolution: '2k',
        response_format: 'url',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Jimeng API error:', response.status, errorText)
      return NextResponse.json(
        { success: false, error: `API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // 转换响应格式
    const images = (data.data || []).map((item: any, index: number) => ({
      id: `img_${Date.now()}_${index}`,
      url: item.url,
      width: 2048,
      height: 2048,
    }))

    if (images.length === 0) {
      console.error('No images in response:', data)
      return NextResponse.json(
        { success: false, error: 'No images generated' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      images,
      metadata: {
        platform: platformConfig.name,
        style: styleConfig.name,
        prompt: prompt,
      },
    })
  } catch (error) {
    console.error('Generate API error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
