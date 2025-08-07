interface IconData {
  id: string
  name: string
  category: string
  style: 'outline' | 'filled' | 'duotone' | 'line'
  tags: string[]
  svg: string
  sizes: number[]
  formats: ('svg' | 'png' | 'ico')[]
  license: 'free' | 'premium'
  author?: string
  source: 'lucide' | 'heroicons' | 'feather' | 'phosphor' | 'tabler'
  downloadCount?: number
  createdAt?: string
  updatedAt?: string
}

interface SearchParams {
  query: string
  category: string
  style: string
  license: string
  source: string
  page: number
  limit: number
}

interface SearchResult {
  data: IconData[]
  total: number
  page: number
  limit: number
  hasMore: boolean
  filters: {
    categories: string[]
    styles: string[]
    sources: string[]
  }
}

export class IconSearchService {
  private kv: KVNamespace
  private cachePrefix = 'icons:'
  private searchCachePrefix = 'search:'

  constructor(kv: KVNamespace) {
    this.kv = kv
  }

  async searchIcons(params: SearchParams): Promise<SearchResult> {
    // 创建缓存键
    const cacheKey = `${this.searchCachePrefix}${JSON.stringify(params)}`
    
    // 尝试从缓存获取
    const cached = await this.kv.get(cacheKey, 'json')
    if (cached) {
      return cached as SearchResult
    }

    // 获取所有图标数据
    const allIcons = await this.getAllIcons()
    
    // 应用过滤器
    let filteredIcons = allIcons.filter(icon => {
      // 搜索查询匹配
      const matchesQuery = !params.query || 
        icon.name.toLowerCase().includes(params.query.toLowerCase()) ||
        icon.tags.some(tag => tag.toLowerCase().includes(params.query.toLowerCase()))

      // 分类匹配
      const matchesCategory = params.category === 'all' || icon.category === params.category

      // 样式匹配
      const matchesStyle = params.style === 'all' || icon.style === params.style

      // 许可证匹配
      const matchesLicense = params.license === 'all' || icon.license === params.license

      // 来源匹配
      const matchesSource = params.source === 'all' || icon.source === params.source

      return matchesQuery && matchesCategory && matchesStyle && matchesLicense && matchesSource
    })

    // 按下载量排序（如果有的话）
    filteredIcons.sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0))

    // 分页
    const startIndex = (params.page - 1) * params.limit
    const endIndex = startIndex + params.limit
    const paginatedIcons = filteredIcons.slice(startIndex, endIndex)

    const result: SearchResult = {
      data: paginatedIcons,
      total: filteredIcons.length,
      page: params.page,
      limit: params.limit,
      hasMore: endIndex < filteredIcons.length,
      filters: {
        categories: [...new Set(allIcons.map(icon => icon.category))],
        styles: [...new Set(allIcons.map(icon => icon.style))],
        sources: [...new Set(allIcons.map(icon => icon.source))]
      }
    }

    // 缓存结果（5分钟）
    await this.kv.put(cacheKey, JSON.stringify(result), { expirationTtl: 300 })

    return result
  }

  async getIconById(id: string): Promise<IconData | null> {
    const cacheKey = `${this.cachePrefix}${id}`
    const cached = await this.kv.get(cacheKey, 'json')
    
    if (cached) {
      return cached as IconData
    }

    // 如果缓存中没有，从所有图标中查找
    const allIcons = await this.getAllIcons()
    const icon = allIcons.find(icon => icon.id === id)
    
    if (icon) {
      // 缓存单个图标（1小时）
      await this.kv.put(cacheKey, JSON.stringify(icon), { expirationTtl: 3600 })
    }

    return icon || null
  }

  async getPopularIcons(limit: number): Promise<IconData[]> {
    const cacheKey = `popular:${limit}`
    const cached = await this.kv.get(cacheKey, 'json')
    
    if (cached) {
      return cached as IconData[]
    }

    const allIcons = await this.getAllIcons()
    const popularIcons = allIcons
      .sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0))
      .slice(0, limit)

    // 缓存热门图标（30分钟）
    await this.kv.put(cacheKey, JSON.stringify(popularIcons), { expirationTtl: 1800 })

    return popularIcons
  }

  async getRecentIcons(limit: number): Promise<IconData[]> {
    const cacheKey = `recent:${limit}`
    const cached = await this.kv.get(cacheKey, 'json')
    
    if (cached) {
      return cached as IconData[]
    }

    const allIcons = await this.getAllIcons()
    const recentIcons = allIcons
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || '1970-01-01').getTime()
        const dateB = new Date(b.createdAt || '1970-01-01').getTime()
        return dateB - dateA
      })
      .slice(0, limit)

    // 缓存最新图标（30分钟）
    await this.kv.put(cacheKey, JSON.stringify(recentIcons), { expirationTtl: 1800 })

    return recentIcons
  }

  private async getAllIcons(): Promise<IconData[]> {
    const cacheKey = 'all_icons'
    const cached = await this.kv.get(cacheKey, 'json')

    if (cached) {
      return cached as IconData[]
    }

    // 这里应该从各个图标库API获取数据
    // 目前返回模拟数据
    const mockIcons = await this.getMockIcons()

    // 缓存所有图标（1小时）
    await this.kv.put(cacheKey, JSON.stringify(mockIcons), { expirationTtl: 3600 })

    return mockIcons
  }

  private async getMockIcons(): Promise<IconData[]> {
    // 模拟图标数据，实际应用中应该从各个图标库API获取
    return [
      {
        id: '1',
        name: 'Home',
        category: 'navigation',
        style: 'outline',
        tags: ['house', 'main', 'start', 'homepage'],
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>',
        sizes: [16, 20, 24, 32, 48],
        formats: ['svg', 'png'],
        license: 'free',
        source: 'lucide',
        downloadCount: 1250,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        name: 'Search',
        category: 'interface',
        style: 'outline',
        tags: ['find', 'magnify', 'look', 'discover'],
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
        sizes: [16, 20, 24, 32, 48],
        formats: ['svg', 'png'],
        license: 'free',
        source: 'lucide',
        downloadCount: 2100,
        createdAt: '2024-01-16T10:00:00Z',
        updatedAt: '2024-01-16T10:00:00Z'
      },
      {
        id: '3',
        name: 'User',
        category: 'people',
        style: 'outline',
        tags: ['person', 'profile', 'account', 'avatar'],
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
        sizes: [16, 20, 24, 32, 48],
        formats: ['svg', 'png'],
        license: 'free',
        source: 'lucide',
        downloadCount: 1800,
        createdAt: '2024-01-17T10:00:00Z',
        updatedAt: '2024-01-17T10:00:00Z'
      },
      {
        id: '4',
        name: 'Settings',
        category: 'interface',
        style: 'outline',
        tags: ['gear', 'config', 'preferences', 'options'],
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
        sizes: [16, 20, 24, 32, 48],
        formats: ['svg', 'png'],
        license: 'free',
        source: 'lucide',
        downloadCount: 950,
        createdAt: '2024-01-18T10:00:00Z',
        updatedAt: '2024-01-18T10:00:00Z'
      },
      {
        id: '5',
        name: 'Heart',
        category: 'social',
        style: 'outline',
        tags: ['love', 'like', 'favorite', 'bookmark'],
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>',
        sizes: [16, 20, 24, 32, 48],
        formats: ['svg', 'png'],
        license: 'free',
        source: 'lucide',
        downloadCount: 3200,
        createdAt: '2024-01-19T10:00:00Z',
        updatedAt: '2024-01-19T10:00:00Z'
      }
    ]
  }

  // 更新图标下载计数
  async incrementDownloadCount(iconId: string): Promise<void> {
    const icon = await this.getIconById(iconId)
    if (icon) {
      icon.downloadCount = (icon.downloadCount || 0) + 1
      icon.updatedAt = new Date().toISOString()

      const cacheKey = `${this.cachePrefix}${iconId}`
      await this.kv.put(cacheKey, JSON.stringify(icon), { expirationTtl: 3600 })

      // 清除相关缓存
      await this.clearSearchCache()
    }
  }

  // 清除搜索缓存
  private async clearSearchCache(): Promise<void> {
    // 这里应该实现清除所有搜索相关缓存的逻辑
    // 由于KV不支持批量删除，这里只是示例
    const keys = ['all_icons', 'popular:10', 'popular:20', 'recent:10', 'recent:20']
    for (const key of keys) {
      await this.kv.delete(key)
    }
  }
}
