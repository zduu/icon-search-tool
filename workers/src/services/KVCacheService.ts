interface CacheOptions {
  ttl?: number // 生存时间（秒）
  metadata?: any // 元数据
}

interface CacheStats {
  hits: number
  misses: number
  totalRequests: number
  hitRate: number
}

export class KVCacheService {
  private kv: KVNamespace
  private defaultTTL: number = 3600 // 1小时
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    totalRequests: 0,
    hitRate: 0
  }

  constructor(kv: KVNamespace) {
    this.kv = kv
  }

  // 获取缓存数据
  async get<T>(key: string): Promise<T | null> {
    this.stats.totalRequests++

    try {
      const value = await this.kv.get(key, 'json')
      
      if (value !== null) {
        this.stats.hits++
        this.updateHitRate()
        return value as T
      } else {
        this.stats.misses++
        this.updateHitRate()
        return null
      }
    } catch (error) {
      console.error(`KV get error for key ${key}:`, error)
      this.stats.misses++
      this.updateHitRate()
      return null
    }
  }

  // 设置缓存数据
  async set(key: string, value: any, options: CacheOptions = {}): Promise<void> {
    try {
      const putOptions: any = {}
      
      if (options.ttl) {
        putOptions.expirationTtl = options.ttl
      } else {
        putOptions.expirationTtl = this.defaultTTL
      }

      if (options.metadata) {
        putOptions.metadata = options.metadata
      }

      await this.kv.put(key, JSON.stringify(value), putOptions)
    } catch (error) {
      console.error(`KV set error for key ${key}:`, error)
      throw error
    }
  }

  // 删除缓存数据
  async delete(key: string): Promise<void> {
    try {
      await this.kv.delete(key)
    } catch (error) {
      console.error(`KV delete error for key ${key}:`, error)
      throw error
    }
  }

  // 批量删除
  async deleteMany(keys: string[]): Promise<void> {
    const deletePromises = keys.map(key => this.delete(key))
    await Promise.all(deletePromises)
  }

  // 列出键
  async listKeys(prefix?: string, limit?: number): Promise<string[]> {
    try {
      const options: any = {}
      
      if (prefix) {
        options.prefix = prefix
      }
      
      if (limit) {
        options.limit = limit
      }

      const result = await this.kv.list(options)
      return result.keys.map(key => key.name)
    } catch (error) {
      console.error('KV list keys error:', error)
      return []
    }
  }

  // 获取带元数据的值
  async getWithMetadata<T>(key: string): Promise<{ value: T | null, metadata: any }> {
    try {
      const result = await this.kv.getWithMetadata(key, 'json')
      
      if (result.value !== null) {
        this.stats.hits++
      } else {
        this.stats.misses++
      }
      
      this.stats.totalRequests++
      this.updateHitRate()

      return {
        value: result.value as T,
        metadata: result.metadata
      }
    } catch (error) {
      console.error(`KV getWithMetadata error for key ${key}:`, error)
      this.stats.misses++
      this.stats.totalRequests++
      this.updateHitRate()
      
      return {
        value: null,
        metadata: null
      }
    }
  }

  // 缓存穿透保护
  async getOrSet<T>(
    key: string, 
    fetcher: () => Promise<T>, 
    options: CacheOptions = {}
  ): Promise<T> {
    // 先尝试从缓存获取
    const cached = await this.get<T>(key)
    
    if (cached !== null) {
      return cached
    }

    // 缓存未命中，执行获取函数
    try {
      const value = await fetcher()
      
      // 存储到缓存
      await this.set(key, value, options)
      
      return value
    } catch (error) {
      console.error(`Fetcher error for key ${key}:`, error)
      throw error
    }
  }

  // 缓存预热
  async warmup(data: { [key: string]: any }, options: CacheOptions = {}): Promise<void> {
    const setPromises = Object.entries(data).map(([key, value]) => 
      this.set(key, value, options)
    )
    
    await Promise.all(setPromises)
  }

  // 清除指定前缀的缓存
  async clearByPrefix(prefix: string): Promise<number> {
    const keys = await this.listKeys(prefix)
    await this.deleteMany(keys)
    return keys.length
  }

  // 获取缓存统计
  getStats(): CacheStats {
    return { ...this.stats }
  }

  // 重置统计
  resetStats(): void {
    this.stats = {
      hits: 0,
      misses: 0,
      totalRequests: 0,
      hitRate: 0
    }
  }

  // 更新命中率
  private updateHitRate(): void {
    if (this.stats.totalRequests > 0) {
      this.stats.hitRate = this.stats.hits / this.stats.totalRequests
    }
  }

  // 设置默认TTL
  setDefaultTTL(ttl: number): void {
    this.defaultTTL = ttl
  }

  // 获取缓存大小估算
  async getCacheSize(): Promise<{ keyCount: number, estimatedSize: string }> {
    try {
      const keys = await this.listKeys()
      const keyCount = keys.length
      
      // 估算大小（这是一个粗略的估算）
      const estimatedBytes = keyCount * 1024 // 假设每个键值对平均1KB
      const estimatedSize = this.formatBytes(estimatedBytes)
      
      return {
        keyCount,
        estimatedSize
      }
    } catch (error) {
      console.error('Get cache size error:', error)
      return {
        keyCount: 0,
        estimatedSize: '0 B'
      }
    }
  }

  // 格式化字节数
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B'
    
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // 健康检查
  async healthCheck(): Promise<{ status: string, latency: number }> {
    const start = Date.now()
    const testKey = 'health_check_' + Date.now()
    const testValue = { timestamp: Date.now() }
    
    try {
      // 写入测试
      await this.set(testKey, testValue, { ttl: 60 })
      
      // 读取测试
      const retrieved = await this.get(testKey)
      
      // 清理测试数据
      await this.delete(testKey)
      
      const latency = Date.now() - start
      
      if (retrieved && retrieved.timestamp === testValue.timestamp) {
        return { status: 'healthy', latency }
      } else {
        return { status: 'unhealthy', latency }
      }
    } catch (error) {
      return { status: 'error', latency: Date.now() - start }
    }
  }
}
