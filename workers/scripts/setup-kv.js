#!/usr/bin/env node

/**
 * Cloudflare KV 设置脚本
 * 用于创建和配置KV命名空间
 */

const { execSync } = require('child_process')

async function setupKV() {
  console.log('🚀 开始设置 Cloudflare KV 存储...')

  try {
    // 创建生产环境KV命名空间
    console.log('📦 创建生产环境 KV 命名空间...')
    const prodResult = execSync('wrangler kv:namespace create ICON_CACHE', { encoding: 'utf8' })
    console.log(prodResult)

    // 创建预览环境KV命名空间
    console.log('📦 创建预览环境 KV 命名空间...')
    const previewResult = execSync('wrangler kv:namespace create ICON_CACHE --preview', { encoding: 'utf8' })
    console.log(previewResult)

    console.log('✅ KV 命名空间创建完成!')
    console.log('')
    console.log('📝 请将以下配置添加到 wrangler.toml 文件中:')
    console.log('')
    console.log('[[kv_namespaces]]')
    console.log('binding = "ICON_CACHE"')
    console.log('id = "从上面的生产环境输出中复制ID"')
    console.log('preview_id = "从上面的预览环境输出中复制ID"')
    console.log('')

  } catch (error) {
    console.error('❌ 设置 KV 存储失败:', error.message)
    process.exit(1)
  }
}

// 初始化KV数据
async function initializeKVData() {
  console.log('📊 初始化 KV 数据...')

  try {
    // 初始化图标库配置
    const libraries = [
      {
        id: 'lucide',
        name: 'Lucide',
        description: '美观、可定制的SVG图标库',
        totalIcons: 1000,
        categories: ['interface', 'navigation', 'social', 'communication'],
        styles: ['outline'],
        website: 'https://lucide.dev'
      },
      {
        id: 'heroicons',
        name: 'Heroicons',
        description: 'Tailwind CSS团队制作的精美SVG图标',
        totalIcons: 500,
        categories: ['interface', 'navigation', 'communication'],
        styles: ['outline', 'filled'],
        website: 'https://heroicons.com'
      }
    ]

    // 存储图标库配置
    const librariesJson = JSON.stringify(libraries)
    execSync(`wrangler kv:key put "libraries" '${librariesJson}' --binding ICON_CACHE`)
    console.log('✅ 图标库配置已存储')

    // 初始化统计数据
    const stats = {
      totalIcons: 0,
      totalDownloads: 0,
      popularIcons: [],
      lastUpdated: new Date().toISOString()
    }

    const statsJson = JSON.stringify(stats)
    execSync(`wrangler kv:key put "stats" '${statsJson}' --binding ICON_CACHE`)
    console.log('✅ 统计数据已初始化')

    console.log('🎉 KV 数据初始化完成!')

  } catch (error) {
    console.error('❌ 初始化 KV 数据失败:', error.message)
  }
}

// 清理KV数据
async function cleanupKVData() {
  console.log('🧹 清理 KV 数据...')

  try {
    // 列出所有键
    const listResult = execSync('wrangler kv:key list --binding ICON_CACHE', { encoding: 'utf8' })
    const keys = JSON.parse(listResult)

    // 删除所有键
    for (const key of keys) {
      execSync(`wrangler kv:key delete "${key.name}" --binding ICON_CACHE`)
      console.log(`🗑️  删除键: ${key.name}`)
    }

    console.log('✅ KV 数据清理完成!')

  } catch (error) {
    console.error('❌ 清理 KV 数据失败:', error.message)
  }
}

// 备份KV数据
async function backupKVData() {
  console.log('💾 备份 KV 数据...')

  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupFile = `kv-backup-${timestamp}.json`

    // 列出所有键
    const listResult = execSync('wrangler kv:key list --binding ICON_CACHE', { encoding: 'utf8' })
    const keys = JSON.parse(listResult)

    const backup = {}

    // 获取所有键值对
    for (const key of keys) {
      try {
        const value = execSync(`wrangler kv:key get "${key.name}" --binding ICON_CACHE`, { encoding: 'utf8' })
        backup[key.name] = JSON.parse(value)
      } catch (e) {
        backup[key.name] = value // 如果不是JSON，直接存储
      }
    }

    // 写入备份文件
    require('fs').writeFileSync(backupFile, JSON.stringify(backup, null, 2))
    console.log(`✅ 备份完成: ${backupFile}`)

  } catch (error) {
    console.error('❌ 备份 KV 数据失败:', error.message)
  }
}

// 命令行参数处理
const command = process.argv[2]

switch (command) {
  case 'setup':
    setupKV()
    break
  case 'init':
    initializeKVData()
    break
  case 'cleanup':
    cleanupKVData()
    break
  case 'backup':
    backupKVData()
    break
  default:
    console.log('使用方法:')
    console.log('  node setup-kv.js setup   - 创建KV命名空间')
    console.log('  node setup-kv.js init    - 初始化KV数据')
    console.log('  node setup-kv.js cleanup - 清理KV数据')
    console.log('  node setup-kv.js backup  - 备份KV数据')
}
