import { useState, useEffect } from 'react'
import { customIcons } from './customIcons'

// Iconify API interfaces and data
interface IconifyIcon {
  name: string
  collection: string
  category?: string
  tags?: string[]
  url: string
}

interface IconifyCollection {
  id: string
  name: string
  description: string
  color: string
}

// Supported collections
const supportedCollections: IconifyCollection[] = [
  { id: 'lucide', name: 'Lucide', description: '现代简洁的图标库', color: '#3B82F6' },
  { id: 'heroicons', name: 'Heroicons', description: 'Tailwind CSS 官方图标', color: '#06B6D4' },
  { id: 'feather', name: 'Feather', description: '轻量级线条图标', color: '#8B5CF6' },
  { id: 'tabler', name: 'Tabler', description: '开源全面的图标集', color: '#10B981' },
  { id: 'material-symbols', name: 'Material Design', description: 'Google 官方图标', color: '#F59E0B' },
  { id: 'ph', name: 'Phosphor', description: '灵活多样的图标系统', color: '#EF4444' },
  { id: 'mdi', name: 'Material Design Icons', description: '社区版Material图标', color: '#8B5CF6' },
  { id: 'carbon', name: 'Carbon', description: 'IBM设计系统图标', color: '#6B7280' },
  { id: 'mingcute', name: 'Mingcute', description: '精美的线条图标', color: '#EC4899' },
  { id: 'solar', name: 'Solar', description: '现代化图标集', color: '#F97316' },
  { id: 'custom', name: '自定义图标', description: '项目专用图标库', color: '#7C3AED' }
]

// Category mapping
const categoryNames: { [key: string]: string } = {
  'all': '全部分类',
  'general': '通用',
  'software': '软件',
  'education': '教育',
  'sports': '运动',
  'food': '食物',
  'travel': '旅行',
  'entertainment': '娱乐',
  'business': '商务',
  'science': '科学',
  'custom': '自定义'
}

// API endpoints
const API_ENDPOINTS = [
  'https://api.iconify.design',
  'https://api.simplesvg.com',
  'https://api.unisvg.com'
]

// Hardcoded popular icons for all collections
const POPULAR_ICONS_BY_COLLECTION: { [key: string]: string[] } = {
  'lucide': [
    'home', 'user', 'search', 'heart', 'star', 'settings', 'menu', 'x', 'check', 'plus',
    'edit', 'trash-2', 'download', 'upload', 'share', 'copy', 'save', 'folder', 'file',
    'image', 'video', 'music', 'camera', 'phone', 'mail', 'message-circle', 'bell',
    'calendar', 'clock', 'map-pin', 'globe', 'wifi', 'battery', 'volume-2', 'play',
    'pause', 'skip-forward', 'skip-back', 'repeat', 'shuffle', 'arrow-right', 'arrow-left',
    'arrow-up', 'arrow-down', 'chevron-right', 'chevron-left', 'chevron-up', 'chevron-down',
    'code', 'terminal', 'database', 'server', 'cloud', 'lock', 'unlock', 'shield'
  ],
  'heroicons': [
    'home', 'user', 'magnifying-glass', 'heart', 'star', 'cog-6-tooth', 'bars-3', 'x-mark',
    'check', 'plus', 'pencil', 'trash', 'arrow-down-tray', 'arrow-up-tray', 'share',
    'document-duplicate', 'folder', 'document', 'photo', 'video-camera', 'musical-note',
    'phone', 'envelope', 'chat-bubble-left', 'bell', 'calendar-days', 'clock', 'map-pin',
    'globe-alt', 'wifi', 'battery-100', 'speaker-wave', 'play', 'pause', 'forward',
    'backward', 'arrow-repeat', 'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down',
    'code-bracket', 'command-line', 'server', 'cloud', 'lock-closed', 'lock-open'
  ],
  'feather': [
    'home', 'user', 'search', 'heart', 'star', 'settings', 'menu', 'x', 'check', 'plus',
    'edit', 'trash', 'download', 'upload', 'share', 'copy', 'save', 'folder', 'file',
    'image', 'video', 'music', 'camera', 'phone', 'mail', 'message-circle', 'bell',
    'calendar', 'clock', 'map-pin', 'globe', 'wifi', 'battery', 'volume-2', 'play',
    'pause', 'skip-forward', 'skip-back', 'repeat', 'shuffle', 'arrow-right', 'arrow-left',
    'code', 'terminal', 'database', 'server', 'cloud', 'lock', 'unlock', 'shield'
  ],
  'tabler': [
    'home', 'user', 'search', 'heart', 'star', 'settings', 'menu-2', 'x', 'check', 'plus',
    'edit', 'trash', 'download', 'upload', 'share', 'copy', 'device-floppy', 'folder',
    'file', 'photo', 'video', 'music', 'camera', 'phone', 'mail', 'message', 'bell',
    'calendar', 'clock', 'map-pin', 'world', 'wifi', 'battery', 'volume', 'player-play',
    'player-pause', 'player-skip-forward', 'player-skip-back', 'repeat', 'arrows-shuffle',
    'code', 'terminal', 'database', 'server', 'cloud', 'lock', 'lock-open', 'shield',
    'bookmark', 'bookmark-filled', 'layout', 'layout-grid', 'layout-list', 'palette',
    'brush', 'pencil-plus', 'eraser', 'color-picker', 'adjustments', 'filter',
    'zoom-in', 'zoom-out', 'maximize', 'minimize', 'refresh', 'rotate', 'eye', 'eye-off',
    'sun', 'moon', 'bolt', 'activity', 'trending-up', 'trending-down', 'chart-line'
  ],
  'material-symbols': [
    'home', 'person', 'search', 'favorite', 'star', 'settings', 'menu', 'close', 'check',
    'add', 'edit', 'delete', 'download', 'upload', 'share', 'content-copy', 'save',
    'folder', 'description', 'image', 'videocam', 'music-note', 'photo-camera', 'phone',
    'mail', 'chat', 'notifications', 'calendar-today', 'schedule', 'location-on',
    'public', 'wifi', 'battery-full', 'volume-up', 'play-arrow', 'pause', 'skip-next',
    'code', 'terminal', 'storage', 'cloud', 'lock', 'lock-open', 'security',
    'visibility', 'visibility-off', 'light-mode', 'dark-mode', 'flash-on', 'analytics',
    'dashboard', 'widgets', 'apps', 'extension', 'build', 'bug-report', 'help',
    'info', 'warning', 'error', 'done', 'refresh', 'sync', 'update', 'autorenew',
    'bookmark', 'bookmark-border', 'grade', 'thumb-up', 'thumb-down', 'shopping-cart'
  ],
  'ph': [
    'house', 'user', 'magnifying-glass', 'heart', 'star', 'gear', 'list', 'x', 'check',
    'plus', 'pencil', 'trash', 'download-simple', 'upload-simple', 'share', 'copy',
    'floppy-disk', 'folder', 'file', 'image', 'video', 'music-notes', 'camera', 'phone',
    'envelope', 'chat-circle', 'bell', 'calendar', 'clock', 'map-pin', 'globe',
    'wifi-high', 'battery-full', 'speaker-high', 'play', 'pause', 'skip-forward',
    'code', 'terminal-window', 'database', 'cloud', 'lock', 'lock-open', 'shield',
    'eye', 'eye-slash', 'sun', 'moon', 'lightning', 'chart-line', 'trend-up',
    'bookmark', 'bookmark-simple', 'layout', 'grid-four', 'list-bullets', 'palette',
    'paint-brush', 'eraser', 'color-picker', 'sliders', 'funnel', 'magnifying-glass-plus',
    'magnifying-glass-minus', 'arrows-out', 'arrows-in', 'arrow-clockwise', 'arrow-counter-clockwise'
  ],
  'mdi': [
    'home', 'account', 'magnify', 'heart', 'star', 'cog', 'menu', 'close', 'check', 'plus',
    'pencil', 'delete', 'download', 'upload', 'share', 'content-copy', 'content-save',
    'folder', 'file', 'image', 'video', 'music', 'camera', 'phone', 'email', 'message',
    'bell', 'calendar', 'clock', 'map-marker', 'earth', 'wifi', 'battery', 'volume-high',
    'play', 'pause', 'skip-next', 'skip-previous', 'repeat', 'shuffle', 'arrow-right',
    'code-tags', 'console', 'database', 'server', 'cloud', 'lock', 'lock-open', 'shield',
    'eye', 'eye-off', 'weather-sunny', 'weather-night', 'flash', 'chart-line', 'trending-up',
    'bookmark', 'bookmark-outline', 'view-grid', 'view-list', 'palette', 'brush',
    'eraser', 'eyedropper', 'tune', 'filter', 'magnify-plus', 'magnify-minus',
    'fullscreen', 'fullscreen-exit', 'refresh', 'rotate-left', 'rotate-right'
  ],
  'carbon': [
    'home', 'user', 'search', 'favorite', 'star', 'settings', 'menu', 'close', 'checkmark',
    'add', 'edit', 'trash-can', 'download', 'upload', 'share', 'copy', 'save', 'folder',
    'document', 'image', 'video', 'music', 'camera', 'phone', 'email', 'chat', 'notification',
    'calendar', 'time', 'location', 'earth', 'wifi', 'battery-full', 'volume-up', 'play',
    'pause', 'next', 'previous', 'repeat', 'shuffle', 'arrow-right', 'code', 'terminal',
    'data-base', 'server', 'cloud', 'locked', 'unlocked', 'security',
    'view', 'view-off', 'light', 'asleep', 'flash', 'analytics', 'chart-line',
    'bookmark', 'bookmark-filled', 'grid', 'list', 'color-palette', 'paint-brush',
    'erase', 'color-switch', 'settings-adjust', 'filter', 'zoom-in', 'zoom-out',
    'fit-to-screen', 'minimize', 'reset', 'rotate-clockwise', 'rotate-counterclockwise'
  ],
  'mingcute': [
    'home-1-line', 'user-3-line', 'search-line', 'heart-line', 'star-line', 'settings-3-line',
    'menu-line', 'close-line', 'check-line', 'add-line', 'edit-line', 'delete-2-line',
    'download-line', 'upload-line', 'share-line', 'copy-2-line', 'save-line', 'folder-line',
    'file-line', 'pic-line', 'video-line', 'music-line', 'camera-line', 'phone-line',
    'mail-line', 'message-3-line', 'notification-line', 'calendar-line', 'time-line',
    'location-line', 'earth-line', 'wifi-line', 'battery-line', 'volume-line', 'play-line',
    'pause-line', 'skip-forward-line', 'skip-back-line', 'repeat-line', 'shuffle-line',
    'eye-line', 'eye-close-line', 'sun-line', 'moon-line', 'flash-line', 'chart-line',
    'bookmark-line', 'bookmark-2-line', 'layout-line', 'grid-line', 'list-check-line',
    'palette-line', 'brush-line', 'eraser-line', 'color-picker-line', 'filter-line'
  ],
  'solar': [
    'home-linear', 'user-linear', 'magnifer-linear', 'heart-linear', 'star-linear',
    'settings-linear', 'hamburger-menu-linear', 'close-circle-linear', 'check-circle-linear',
    'add-circle-linear', 'pen-linear', 'trash-bin-trash-linear', 'download-linear',
    'upload-linear', 'share-linear', 'copy-linear', 'diskette-linear', 'folder-linear',
    'document-linear', 'gallery-linear', 'video-frame-linear', 'music-note-linear',
    'camera-linear', 'phone-linear', 'letter-linear', 'chat-round-linear', 'bell-linear',
    'calendar-linear', 'clock-circle-linear', 'map-point-linear', 'global-linear',
    'eye-linear', 'eye-closed-linear', 'sun-linear', 'moon-linear', 'bolt-linear',
    'chart-linear', 'bookmark-linear', 'bookmark-circle-linear', 'widget-linear',
    'widget-2-linear', 'list-linear', 'palette-linear', 'brush-linear', 'eraser-linear',
    'pipette-linear', 'tuning-linear', 'filter-linear', 'magnifer-zoom-in-linear',
    'magnifer-zoom-out-linear', 'full-screen-linear', 'quit-full-screen-linear'
  ]
}

// Custom software icons
const CUSTOM_SOFTWARE_ICONS: IconifyIcon[] = [
  { name: 'matlab', collection: 'custom', category: 'software', tags: ['matlab', '数学', '分析', '工程'], url: 'https://api.iconify.design/simple-icons:matlab.svg' },
  { name: 'solidworks', collection: 'custom', category: 'software', tags: ['solidworks', 'cad', '三维', '设计'], url: 'https://api.iconify.design/simple-icons:solidworks.svg' },
  { name: 'autocad', collection: 'custom', category: 'software', tags: ['autocad', 'cad', '设计', '绘图'], url: 'https://api.iconify.design/simple-icons:autodesk.svg' },
  { name: 'photoshop', collection: 'custom', category: 'software', tags: ['photoshop', 'adobe', 'ps', '图像处理'], url: 'https://api.iconify.design/simple-icons:adobephotoshop.svg' },
  { name: 'illustrator', collection: 'custom', category: 'software', tags: ['illustrator', 'adobe', 'ai', '矢量图'], url: 'https://api.iconify.design/simple-icons:adobeillustrator.svg' },
  { name: 'vscode', collection: 'custom', category: 'software', tags: ['vscode', '编辑器', '代码', '开发'], url: 'https://api.iconify.design/simple-icons:visualstudiocode.svg' },
  { name: 'figma', collection: 'custom', category: 'software', tags: ['figma', '设计', 'ui', '原型'], url: 'https://api.iconify.design/simple-icons:figma.svg' },
  { name: 'excel', collection: 'custom', category: 'software', tags: ['excel', '微软', '表格', '数据'], url: 'https://api.iconify.design/simple-icons:microsoftexcel.svg' },
  { name: 'powerpoint', collection: 'custom', category: 'software', tags: ['powerpoint', '微软', '演示', '幻灯片'], url: 'https://api.iconify.design/simple-icons:microsoftpowerpoint.svg' },
  { name: 'blender', collection: 'custom', category: 'software', tags: ['blender', '三维', '建模', '动画'], url: 'https://api.iconify.design/simple-icons:blender.svg' },
  { name: 'unity', collection: 'custom', category: 'software', tags: ['unity', '游戏', '引擎', '开发'], url: 'https://api.iconify.design/simple-icons:unity.svg' }
]

// Get hardcoded icons
function getHardcodedIcons(collectionId?: string): IconifyIcon[] {
  const results: IconifyIcon[] = []

  if (collectionId === 'custom') {
    return CUSTOM_SOFTWARE_ICONS
  }

  if (collectionId && collectionId !== 'all' && POPULAR_ICONS_BY_COLLECTION[collectionId]) {
    const icons = POPULAR_ICONS_BY_COLLECTION[collectionId]
    return icons.map(iconName => ({
      name: `${collectionId}:${iconName}`,
      collection: collectionId,
      category: 'general',
      tags: [iconName],
      url: `https://api.iconify.design/${collectionId}:${iconName}.svg`
    }))
  }

  Object.entries(POPULAR_ICONS_BY_COLLECTION).forEach(([collection, icons]) => {
    icons.forEach(iconName => {
      results.push({
        name: `${collection}:${iconName}`,
        collection,
        category: 'general',
        tags: [iconName],
        url: `https://api.iconify.design/${collection}:${iconName}.svg`
      })
    })
  })

  results.push(...CUSTOM_SOFTWARE_ICONS)
  return results
}

// Enhanced search with multiple API channels
async function searchIcons(
  query: string,
  collections: string[] = [],
  limit: number = 100
): Promise<IconifyIcon[]> {
  try {
    if (!query.trim()) {
      return getHardcodedIcons(collections[0]).slice(0, limit)
    }

    // 根据传入的图标库集合获取硬编码图标
    const targetCollection = collections.length > 0 ? collections[0] : undefined
    const hardcodedIcons = getHardcodedIcons(targetCollection)
    const hardcodedMatches = hardcodedIcons.filter(icon =>
      icon.name.toLowerCase().includes(query.toLowerCase()) ||
      icon.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )

    if (hardcodedMatches.length >= limit) {
      return hardcodedMatches.slice(0, limit)
    }

    // Try API search for additional results
    try {
      const apiResults = await searchIconsFromAPI(query, collections, limit - hardcodedMatches.length)
      const existingNames = new Set(hardcodedMatches.map(icon => icon.name))
      const newResults = apiResults.filter(icon => !existingNames.has(icon.name))

      return [...hardcodedMatches, ...newResults].slice(0, limit)
    } catch (apiError) {
      console.warn('API搜索失败，仅返回硬编码结果:', apiError)
      return hardcodedMatches.slice(0, limit)
    }
  } catch (error) {
    console.error('搜索失败:', error)
    return []
  }
}

// Search from API
async function searchIconsFromAPI(
  query: string,
  collections: string[] = [],
  limit: number = 50
): Promise<IconifyIcon[]> {
  const searchCollections = collections.length > 0
    ? collections.filter(c => c !== 'custom' && c !== 'all')
    : supportedCollections.filter(c => c.id !== 'custom').map(c => c.id)

  const results: IconifyIcon[] = []

  for (const apiEndpoint of API_ENDPOINTS) {
    try {
      const apiResults = await searchFromSingleAPI(apiEndpoint, query, searchCollections, limit)
      if (apiResults.length > 0) {
        results.push(...apiResults)
        break
      }
    } catch (error) {
      console.warn(`API端点 ${apiEndpoint} 失败:`, error)
    }
  }

  return results.slice(0, limit)
}

// Search from single API
async function searchFromSingleAPI(
  apiBase: string,
  query: string,
  collections: string[],
  limit: number
): Promise<IconifyIcon[]> {
  const results: IconifyIcon[] = []
  const iconsPerCollection = Math.ceil(limit / collections.length)

  const searchPromises = collections.map(async (collectionId) => {
    try {
      const searchUrl = `${apiBase}/search?query=${encodeURIComponent(query)}&prefix=${collectionId}&limit=${iconsPerCollection}`
      const response = await fetch(searchUrl, {
        signal: AbortSignal.timeout(5000)
      })

      if (response.ok) {
        const data = await response.json()
        const icons = data.icons || []

        return icons.map((iconName: string) => ({
          name: iconName,
          collection: collectionId,
          category: 'general',
          tags: [query],
          url: `${apiBase}/${iconName}.svg`
        }))
      }
      return []
    } catch (error) {
      console.warn(`搜索图标库 ${collectionId} 失败:`, error)
      return []
    }
  })

  const searchResults = await Promise.all(searchPromises)
  searchResults.forEach(icons => {
    results.push(...icons)
  })

  return results.slice(0, limit)
}



// 图标数据接口
interface Icon {
  id: string
  name: string
  category: string
  collection: string
  svg: string
  url: string
  downloadUrl: string
  tags: string[]
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCollection, setSelectedCollection] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])
  const [icons, setIcons] = useState<Icon[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  // 显示自动消失的通知
  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 2000) // 2秒后自动消失
  }

  // 转换API数据为本地格式
  const convertApiIcon = (apiIcon: IconifyIcon): Icon => {
    const displayName = apiIcon.name.split(':')[1] || apiIcon.name.split('-').pop() || apiIcon.name

    return {
      id: apiIcon.name,
      name: displayName,
      category: apiIcon.category || 'general',
      collection: apiIcon.collection,
      svg: apiIcon.url,
      url: apiIcon.url,
      downloadUrl: apiIcon.url,
      tags: apiIcon.tags || []
    }
  }

  // 加载图标数据
  const loadIcons = async (collectionFilter: string = 'all') => {
    setLoading(true)
    setError(null)

    try {
      // 根据选择的图标库获取硬编码图标
      const hardcodedIcons = collectionFilter === 'all'
        ? getHardcodedIcons()
        : getHardcodedIcons(collectionFilter)

      // 添加自定义图标（如果选择了all或custom）
      const customIconsData: IconifyIcon[] = (collectionFilter === 'all' || collectionFilter === 'custom')
        ? customIcons.map(icon => ({
            name: icon.name,
            collection: 'custom',
            category: icon.category,
            tags: icon.tags,
            url: `https://api.iconify.design/${icon.name}.svg`
          }))
        : []

      // 合并图标并去重（基于name）
      const allIcons = [...hardcodedIcons, ...customIconsData]
      const uniqueIcons = allIcons.filter((icon, index, self) =>
        index === self.findIndex(i => i.name === icon.name)
      )
      const iconData = uniqueIcons.map(convertApiIcon)
      setIcons(iconData)

      console.log(`加载了 ${iconData.length} 个图标 (筛选: ${collectionFilter})`)
    } catch (err) {
      console.error('加载图标失败:', err)
      setError('加载图标失败，请刷新页面重试')
      setIcons([])
    } finally {
      setLoading(false)
    }
  }

  // 初始化图标数据
  useEffect(() => {
    loadIcons()
  }, [])

  // 监听图标库选择变化
  useEffect(() => {
    if (!searchQuery.trim()) {
      loadIcons(selectedCollection)
    }
  }, [selectedCollection])

  // 搜索图标API
  const searchIconsApi = async (query: string) => {
    if (!query.trim()) {
      // 重新加载图标，考虑当前选择的图标库
      loadIcons(selectedCollection)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // 根据选择的图标库确定搜索范围
      const searchCollections = selectedCollection === 'all' ? [] : [selectedCollection]

      // 使用API搜索图标
      const apiIcons = await searchIcons(query, searchCollections, 80)

      // 搜索自定义图标（如果选择了all或custom）
      const customMatches = (selectedCollection === 'all' || selectedCollection === 'custom')
        ? customIcons.filter(icon =>
            icon.name.toLowerCase().includes(query.toLowerCase()) ||
            icon.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
          ).map(icon => ({
            name: icon.name,
            collection: 'custom',
            category: icon.category,
            tags: icon.tags,
            url: `https://api.iconify.design/${icon.name}.svg`
          }))
        : []

      // 合并图标并去重（基于name）
      const allIcons = [...apiIcons, ...customMatches]
      const uniqueIcons = allIcons.filter((icon, index, self) =>
        index === self.findIndex(i => i.name === icon.name)
      )
      const iconData = uniqueIcons.map(convertApiIcon)
      setIcons(iconData)
    } catch (err) {
      console.error('搜索图标失败:', err)
      setError('搜索失败，请稍后重试')
      setIcons([])
    } finally {
      setLoading(false)
    }
  }

  // 获取所有分类
  const categories = ['all', ...Object.keys(categoryNames).filter(key => key !== 'all')]

  // 切换收藏
  const toggleFavorite = (iconId: string) => {
    setFavorites(prev =>
      prev.includes(iconId)
        ? prev.filter(id => id !== iconId)
        : [...prev, iconId]
    )
  }

  // 复制到剪贴板
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showNotification('✅ 已复制到剪贴板！')
    } catch (err) {
      console.error('复制失败:', err)
      showNotification('❌ 复制失败，请手动复制链接')
    }
  }

  // 下载图标
  const downloadIcon = async (icon: Icon) => {
    try {
      const response = await fetch(icon.downloadUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${icon.name}.svg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('下载失败:', err)
      showNotification('❌ 下载失败，请稍后重试')
    }
  }



  // 搜索防抖
  useEffect(() => {
    const timer = setTimeout(() => {
      searchIconsApi(searchQuery)
    }, 500) // 增加延迟，减少API调用

    return () => clearTimeout(timer)
  }, [searchQuery, selectedCollection])

  // 过滤图标（只按分类筛选，图标库筛选已在加载时处理）
  const filteredIcons = icons.filter(icon => {
    const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory
    return matchesCategory
  })

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative'
    }}>
      {/* 自动消失的通知组件 */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          color: '#333',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          fontSize: '14px',
          fontWeight: '500',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          backdropFilter: 'blur(10px)',
          animation: 'slideInRight 0.3s ease-out'
        }}>
          {notification}
        </div>
      )}
      {/* 头部 */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
        padding: '1.5rem 0',
        boxShadow: '0 4px 32px rgba(139, 92, 246, 0.1), 0 2px 16px rgba(59, 130, 246, 0.05)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(139, 92, 246, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', position: 'relative' }}>
          {/* 背景装饰 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '100px',
            background: 'linear-gradient(45deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1), rgba(69, 183, 209, 0.1), rgba(150, 206, 180, 0.1), rgba(254, 202, 87, 0.1))',
            borderRadius: '50px',
            filter: 'blur(20px)',
            animation: 'gradientShift 6s ease-in-out infinite',
            zIndex: -1
          }} />

          <style>
            {`
              @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
              @keyframes titleGlow {
                0%, 100% { text-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
                50% { text-shadow: 0 0 30px rgba(139, 92, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3); }
              }
              @keyframes slideInRight {
                0% {
                  transform: translateX(100%);
                  opacity: 0;
                }
                100% {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
            `}
          </style>

          <h1 style={{
            margin: 0,
            fontSize: '2.5rem',
            fontWeight: '700',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #feca57 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 4s ease-in-out infinite, titleGlow 3s ease-in-out infinite',
            filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.2))'
          }}>
            🎨 图标搜索工具 🚀
          </h1>

          <p style={{
            margin: '0.5rem 0 0 0',
            fontSize: '1.1rem',
            textAlign: 'center',
            fontWeight: '500',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200% 100%',
            animation: 'gradientShift 3s ease-in-out infinite reverse'
          }}>
            🎨 搜索并下载来自 6 大图标库的 600+ 精选图标 + 自定义配置管理 🚀
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* 搜索和过滤区域 */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(139, 92, 246, 0.1), 0 8px 16px rgba(59, 130, 246, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.1)'
        }}>
          {/* 搜索框 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              搜索图标:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="输入图标名称或标签搜索..."
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
                  border: '2px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6'
                  e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.15), 0 8px 16px rgba(139, 92, 246, 0.1)'
                  e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(139, 92, 246, 0.2)'
                  e.target.style.boxShadow = 'none'
                  e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)'
                }}
              />
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#8b5cf6',
                fontSize: '1.2rem'
              }}>
                🔍
              </div>
            </div>
          </div>

          {/* 过滤器 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {/* 分类过滤 */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                分类:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  outline: 'none',
                  background: 'white'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {categoryNames[category] || category}
                  </option>
                ))}
              </select>
            </div>

            {/* 图标库过滤 */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                图标库:
              </label>
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  outline: 'none',
                  background: 'white'
                }}
              >
                <option value="all">全部图标库</option>
                {supportedCollections.map((collection: any) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
            </div>
          </div>



          {/* 统计信息和错误提示 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.875rem',
            color: '#666',
            borderTop: '1px solid #e0e0e0',
            paddingTop: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span>找到 {filteredIcons.length} 个图标</span>
              <span>收藏 {favorites.length} 个图标</span>
              <span>支持 {supportedCollections.length} 个图标库</span>
            </div>
            {error && (
              <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>
                {error}
              </span>
            )}
          </div>
        </div>

        {/* 图标显示区域 */}
        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            fontSize: '1.2rem',
            color: '#8b5cf6'
          }}>
            🔄 搜索中...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem'
          }}>
            {filteredIcons.map((icon) => (
              <div key={icon.id} style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.08), 0 4px 16px rgba(59, 130, 246, 0.05)',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(139, 92, 246, 0.1)',
                position: 'relative',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.15), 0 8px 16px rgba(59, 130, 246, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)'
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.08), 0 4px 16px rgba(59, 130, 246, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.1)'
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)'
              }}>
                {/* 收藏按钮 */}
                <button
                  onClick={() => toggleFavorite(icon.id)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease'
                  }}
                  title={favorites.includes(icon.id) ? '取消收藏' : '添加收藏'}
                >
                  {favorites.includes(icon.id) ? '❤️' : '🤍'}
                </button>

                {/* 图标显示区域 */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(6, 182, 212, 0.05) 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(139, 92, 246, 0.1)'
                }}>
                  <img
                    src={icon.url}
                    alt={icon.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const fallback = document.createElement('div')
                      fallback.textContent = '🎨'
                      fallback.style.fontSize = '48px'
                      e.currentTarget.parentNode?.appendChild(fallback)
                    }}
                  />
                </div>

                {/* 图标信息 */}
                <h3 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#333',
                  wordBreak: 'break-all'
                }}>
                  {icon.name}
                </h3>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.25rem',
                  marginBottom: '1rem',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    color: '#8b5cf6',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                  }}>
                    {categoryNames[icon.category] || icon.category}
                  </span>
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    color: '#3b82f6',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    {supportedCollections.find((c: any) => c.id === icon.collection)?.name || icon.collection}
                  </span>
                </div>

                {/* 操作按钮 */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => copyToClipboard(icon.url)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)'
                    }}
                    title="复制图标链接"
                  >
                    🔗 复制
                  </button>

                  <button
                    onClick={() => downloadIcon(icon)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)'
                    }}
                    title="下载SVG文件"
                  >
                    📥 下载
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  )
}

export default App
