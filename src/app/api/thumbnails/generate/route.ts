import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || '',
  baseURL: 'https://api.deepseek.com/v1',
})

const stylePrompts: Record<string, string> = {
  tech: '现代科技风格，深色背景配蓝色渐变，发光文字效果，适合科技/编程视频',
  gaming: '游戏风格，霓虹色彩，动感十足，适合游戏/娱乐视频',
  business: '商务专业风格，简洁大气，深蓝或灰色调，适合知识付费/商业视频',
  cute: '可爱风格，明亮柔和色彩，圆润字体，适合生活/Vlog视频',
  dramatic: '震撼风格，强烈对比色，冲击力强，适合新闻/热点视频',
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, style, platform } = await request.json()

    if (!title) {
      return NextResponse.json({ error: '请输入视频标题' }, { status: 400 })
    }

    // 生成封面设计方案
    const stylePrompt = stylePrompts[style] || stylePrompts.tech

    const response = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `你是一个专业的视频封面设计师。你需要根据用户提供的视频标题和描述，生成3个封面设计方案。

每个方案需要包含：
1. 背景描述（颜色、渐变、图片风格）
2. 主标题文字样式（颜色、大小、位置）
3. 副标题或装饰元素
4. 整体配色方案

返回JSON格式：
{
  "thumbnails": [
    {
      "background": "背景描述",
      "titleStyle": "标题样式",
      "colors": ["#颜色1", "#颜色2"],
      "elements": ["装饰元素1", "装饰元素2"]
    }
  ]
}`
        },
        {
          role: 'user',
          content: `视频标题：${title}
${description ? `视频描述：${description}` : ''}
风格要求：${stylePrompt}
平台：${platform}

请生成3个封面设计方案。`
        }
      ],
      response_format: { type: 'json_object' }
    })

    const content = response.choices[0]?.message?.content
    let designs = []

    if (content) {
      try {
        const parsed = JSON.parse(content)
        designs = parsed.thumbnails || []
      } catch {
        // 解析失败，使用默认方案
      }
    }

    // 生成预览 URL（实际项目中应该生成真实图片）
    const thumbnails = designs.map((design: any, index: number) => {
      const colors = design.colors || ['#8B5CF6', '#EC4899']
      return {
        id: `thumb_${Date.now()}_${index}`,
        background: design.background || '渐变背景',
        titleStyle: design.titleStyle || '粗体白色文字',
        colors,
        previewUrl: `data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad)"/>
            <text x="50%" y="45%" text-anchor="middle" fill="white" font-size="48" font-weight="bold" font-family="Arial">${title.substring(0, 20)}${title.length > 20 ? '...' : ''}</text>
            <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="24" opacity="0.8" font-family="Arial">ThumbnailAI 生成</text>
          </svg>
        `)}`
      }
    })

    return NextResponse.json({ thumbnails })

  } catch (error) {
    console.error('Thumbnail generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '生成失败' },
      { status: 500 }
    )
  }
}
