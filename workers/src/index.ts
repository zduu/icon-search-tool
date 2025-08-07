import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { cache } from 'hono/cache'
import { IconSearchService } from './services/IconSearchService'
import { IconLibraryService } from './services/IconLibraryService'
import { ImageConversionService } from './services/ImageConversionService'

type Bindings = {
  ICON_CACHE: KVNamespace
  ENVIRONMENT: string
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS 配置
app.use('*', cors({
  origin: ['http://localhost:5173', 'https://your-domain.com'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// 缓存中间件
app.use('/api/icons/*', cache({
  cacheName: 'icon-search-cache',
  cacheControl: 'max-age=3600', // 1小时缓存
}))

// 健康检查
app.get('/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: c.env.ENVIRONMENT 
  })
})

// 搜索图标
app.get('/api/icons/search', async (c) => {
  try {
    const query = c.req.query('q') || ''
    const category = c.req.query('category') || 'all'
    const style = c.req.query('style') || 'all'
    const license = c.req.query('license') || 'all'
    const source = c.req.query('source') || 'all'
    const page = parseInt(c.req.query('page') || '1')
    const limit = Math.min(parseInt(c.req.query('limit') || '50'), 100)

    const searchService = new IconSearchService(c.env.ICON_CACHE)
    const result = await searchService.searchIcons({
      query,
      category,
      style,
      license,
      source,
      page,
      limit
    })

    return c.json(result)
  } catch (error) {
    console.error('搜索图标错误:', error)
    return c.json({ error: '搜索失败' }, 500)
  }
})

// 获取单个图标详情
app.get('/api/icons/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const searchService = new IconSearchService(c.env.ICON_CACHE)
    const icon = await searchService.getIconById(id)
    
    if (!icon) {
      return c.json({ error: '图标未找到' }, 404)
    }

    return c.json(icon)
  } catch (error) {
    console.error('获取图标错误:', error)
    return c.json({ error: '获取图标失败' }, 500)
  }
})

// 获取热门图标
app.get('/api/icons/popular', async (c) => {
  try {
    const limit = Math.min(parseInt(c.req.query('limit') || '20'), 50)
    const searchService = new IconSearchService(c.env.ICON_CACHE)
    const icons = await searchService.getPopularIcons(limit)
    
    return c.json({ data: icons })
  } catch (error) {
    console.error('获取热门图标错误:', error)
    return c.json({ error: '获取热门图标失败' }, 500)
  }
})

// 获取最新图标
app.get('/api/icons/recent', async (c) => {
  try {
    const limit = Math.min(parseInt(c.req.query('limit') || '20'), 50)
    const searchService = new IconSearchService(c.env.ICON_CACHE)
    const icons = await searchService.getRecentIcons(limit)
    
    return c.json({ data: icons })
  } catch (error) {
    console.error('获取最新图标错误:', error)
    return c.json({ error: '获取最新图标失败' }, 500)
  }
})

// 图标格式转换和下载
app.get('/api/icons/:id/download', async (c) => {
  try {
    const id = c.req.param('id')
    const format = c.req.query('format') || 'svg'
    const size = parseInt(c.req.query('size') || '24')
    const color = c.req.query('color')

    const searchService = new IconSearchService(c.env.ICON_CACHE)
    const icon = await searchService.getIconById(id)
    
    if (!icon) {
      return c.json({ error: '图标未找到' }, 404)
    }

    const conversionService = new ImageConversionService()
    const result = await conversionService.convertIcon(icon, {
      format: format as 'svg' | 'png' | 'ico',
      size,
      color
    })

    // 设置响应头
    c.header('Content-Type', result.mimeType)
    c.header('Content-Disposition', `attachment; filename="${result.filename}"`)
    
    return c.body(result.data)
  } catch (error) {
    console.error('图标转换错误:', error)
    return c.json({ error: '图标转换失败' }, 500)
  }
})

// 获取图标库列表
app.get('/api/libraries', async (c) => {
  try {
    const libraryService = new IconLibraryService()
    const libraries = await libraryService.getLibraries()
    
    return c.json({ data: libraries })
  } catch (error) {
    console.error('获取图标库错误:', error)
    return c.json({ error: '获取图标库失败' }, 500)
  }
})

// 同步图标库数据
app.post('/api/sync/:library', async (c) => {
  try {
    const library = c.req.param('library')
    const libraryService = new IconLibraryService()
    const searchService = new IconSearchService(c.env.ICON_CACHE)
    
    const result = await libraryService.syncLibrary(library, searchService)
    
    return c.json(result)
  } catch (error) {
    console.error('同步图标库错误:', error)
    return c.json({ error: '同步失败' }, 500)
  }
})

// 404 处理
app.notFound((c) => {
  return c.json({ error: '接口未找到' }, 404)
})

// 错误处理
app.onError((err, c) => {
  console.error('API错误:', err)
  return c.json({ error: '服务器内部错误' }, 500)
})

export default app
