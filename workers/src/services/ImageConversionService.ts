interface IconData {
  id: string
  name: string
  svg: string
  [key: string]: any
}

interface ConversionOptions {
  format: 'svg' | 'png' | 'ico'
  size: number
  color?: string
  strokeWidth?: number
}

interface ConversionResult {
  data: ArrayBuffer | string
  mimeType: string
  filename: string
}

export class ImageConversionService {
  async convertIcon(icon: IconData, options: ConversionOptions): Promise<ConversionResult> {
    const { format, size, color, strokeWidth } = options
    const filename = `${icon.name.toLowerCase().replace(/\s+/g, '-')}-${size}px.${format}`

    switch (format) {
      case 'svg':
        return this.convertToSvg(icon, options, filename)
      case 'png':
        return this.convertToPng(icon, options, filename)
      case 'ico':
        return this.convertToIco(icon, options, filename)
      default:
        throw new Error(`不支持的格式: ${format}`)
    }
  }

  private async convertToSvg(icon: IconData, options: ConversionOptions, filename: string): Promise<ConversionResult> {
    let svg = icon.svg

    // 应用自定义颜色
    if (options.color) {
      svg = svg.replace(/stroke="currentColor"/g, `stroke="${options.color}"`)
      svg = svg.replace(/fill="currentColor"/g, `fill="${options.color}"`)
    }

    // 应用自定义描边宽度
    if (options.strokeWidth) {
      svg = svg.replace(/stroke-width="[^"]*"/g, `stroke-width="${options.strokeWidth}"`)
    }

    // 设置尺寸
    svg = svg.replace(/width="[^"]*"/g, `width="${options.size}"`)
    svg = svg.replace(/height="[^"]*"/g, `height="${options.size}"`)

    return {
      data: svg,
      mimeType: 'image/svg+xml',
      filename
    }
  }

  private async convertToPng(icon: IconData, options: ConversionOptions, filename: string): Promise<ConversionResult> {
    // 在实际应用中，这里应该使用图像处理库或服务来转换SVG到PNG
    // 由于Cloudflare Workers的限制，我们可能需要使用外部服务
    
    try {
      // 首先获取处理后的SVG
      const svgResult = await this.convertToSvg(icon, { ...options, format: 'svg' }, '')
      const svgData = svgResult.data as string

      // 使用外部服务转换（这里是示例，实际需要配置真实的转换服务）
      const pngData = await this.convertSvgToPngUsingService(svgData, options.size)

      return {
        data: pngData,
        mimeType: 'image/png',
        filename
      }
    } catch (error) {
      // 如果转换失败，返回SVG作为备选
      console.error('PNG转换失败，返回SVG:', error)
      return this.convertToSvg(icon, options, filename.replace('.png', '.svg'))
    }
  }

  private async convertToIco(icon: IconData, options: ConversionOptions, filename: string): Promise<ConversionResult> {
    // ICO格式转换，实际应用中需要专门的转换服务
    try {
      const svgResult = await this.convertToSvg(icon, { ...options, format: 'svg' }, '')
      const svgData = svgResult.data as string

      // 使用外部服务转换
      const icoData = await this.convertSvgToIcoUsingService(svgData, options.size)

      return {
        data: icoData,
        mimeType: 'image/x-icon',
        filename
      }
    } catch (error) {
      // 如果转换失败，返回SVG作为备选
      console.error('ICO转换失败，返回SVG:', error)
      return this.convertToSvg(icon, options, filename.replace('.ico', '.svg'))
    }
  }

  private async convertSvgToPngUsingService(svgData: string, size: number): Promise<ArrayBuffer> {
    // 这里应该调用实际的SVG到PNG转换服务
    // 例如使用 Cloudflare Images API 或其他图像处理服务
    
    // 示例：使用外部API
    const response = await fetch('https://api.example.com/convert/svg-to-png', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        svg: svgData,
        width: size,
        height: size,
        format: 'png'
      })
    })

    if (!response.ok) {
      throw new Error('PNG转换服务失败')
    }

    return response.arrayBuffer()
  }

  private async convertSvgToIcoUsingService(svgData: string, size: number): Promise<ArrayBuffer> {
    // 这里应该调用实际的SVG到ICO转换服务
    
    // 示例：使用外部API
    const response = await fetch('https://api.example.com/convert/svg-to-ico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        svg: svgData,
        size: size,
        format: 'ico'
      })
    })

    if (!response.ok) {
      throw new Error('ICO转换服务失败')
    }

    return response.arrayBuffer()
  }

  // 批量转换图标
  async convertIconBatch(icons: IconData[], options: ConversionOptions): Promise<ConversionResult[]> {
    const results: ConversionResult[] = []
    
    for (const icon of icons) {
      try {
        const result = await this.convertIcon(icon, options)
        results.push(result)
      } catch (error) {
        console.error(`转换图标 ${icon.id} 失败:`, error)
        // 继续处理其他图标
      }
    }

    return results
  }

  // 获取支持的格式
  getSupportedFormats(): string[] {
    return ['svg', 'png', 'ico']
  }

  // 获取支持的尺寸
  getSupportedSizes(): number[] {
    return [16, 20, 24, 32, 48, 64, 96, 128, 256]
  }

  // 验证转换选项
  validateOptions(options: ConversionOptions): boolean {
    const supportedFormats = this.getSupportedFormats()
    const supportedSizes = this.getSupportedSizes()

    if (!supportedFormats.includes(options.format)) {
      return false
    }

    if (!supportedSizes.includes(options.size)) {
      return false
    }

    if (options.color && !this.isValidColor(options.color)) {
      return false
    }

    if (options.strokeWidth && (options.strokeWidth < 0.5 || options.strokeWidth > 10)) {
      return false
    }

    return true
  }

  private isValidColor(color: string): boolean {
    // 简单的颜色验证
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    const rgbPattern = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/
    const namedColors = ['red', 'blue', 'green', 'black', 'white', 'gray', 'yellow', 'orange', 'purple', 'pink']

    return hexPattern.test(color) || 
           rgbPattern.test(color) || 
           namedColors.includes(color.toLowerCase())
  }
}
