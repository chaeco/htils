/**
 * 缓存管理工具
 */

interface CacheOptions<T> {
  ttl?: number // Time to live（毫秒），null 表示永不过期
  maxSize?: number // 最大缓存数量
  onEvict?: (key: string, value: T) => void // 缓存被驱逐时的回调
}

interface CacheEntry<T> {
  value: T
  timestamp: number
  ttl?: number | null
}

class Cache<T = any> {
  private cache: Map<string, CacheEntry<T>> = new Map()
  private ttl: number | null
  private maxSize: number | null
  private onEvict?: (key: string, value: T) => void
  private accessOrder: string[] = [] // LRU 追踪

  constructor(options: CacheOptions<T> = {}) {
    this.ttl = options.ttl ?? null
    this.maxSize = options.maxSize ?? null
    this.onEvict = options.onEvict
  }

  /**
   * 设置缓存
   * @example cache.set('user:1', userData)
   */
  set(key: string, value: T, ttl?: number): void {
    // 检查是否需要驱逐
    if (this.maxSize && this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictLRU()
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl: ttl !== undefined ? ttl : this.ttl,
    })

    // 更新访问顺序
    this.updateAccessOrder(key)
  }

  /**
   * 获取缓存
   * @example const data = cache.get('user:1')
   */
  get(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    // 检查 TTL
    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      this.delete(key)
      return null
    }

    // 更新访问顺序
    this.updateAccessOrder(key)
    return entry.value
  }

  /**
   * 判断缓存是否存在
   * @example if (cache.has('user:1')) { ... }
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * 删除缓存
   * @example cache.delete('user:1')
   */
  delete(key: string): boolean {
    const entry = this.cache.get(key)
    if (entry) {
      this.onEvict?.(key, entry.value)
      this.cache.delete(key)
      this.accessOrder = this.accessOrder.filter(k => k !== key)
      return true
    }
    return false
  }

  /**
   * 清空所有缓存
   * @example cache.clear()
   */
  clear(): void {
    this.cache.forEach((entry, key) => {
      this.onEvict?.(key, entry.value)
    })
    this.cache.clear()
    this.accessOrder = []
  }

  /**
   * 获取缓存的大小
   * @example const size = cache.size()
   */
  size(): number {
    return this.cache.size
  }

  /**
   * 获取所有的键
   * @example const keys = cache.keys()
   */
  keys(): string[] {
    return Array.from(this.cache.keys())
  }

  /**
   * 获取所有的值
   * @example const values = cache.values()
   */
  values(): T[] {
    return Array.from(this.cache.values()).map(entry => entry.value)
  }

  /**
   * 获取所有的键值对
   * @example const entries = cache.entries()
   */
  entries(): Array<[string, T]> {
    return Array.from(this.cache.entries()).map(([key, entry]) => [key, entry.value])
  }

  /**
   * 更新或设置，带有工厂函数
   * @example cache.getOrSet('user:1', () => fetchUser(1))
   */
  getOrSet(key: string, factory: () => T | Promise<T>): T | Promise<T> {
    const cached = this.get(key)
    if (cached !== null) {
      return cached
    }

    const result = factory()
    if (result instanceof Promise) {
      return result.then(value => {
        this.set(key, value)
        return value
      })
    } else {
      this.set(key, result)
      return result
    }
  }

  /**
   * 删除匹配的键
   * @example cache.deleteMatching(/^user:/)
   */
  deleteMatching(pattern: RegExp | ((key: string) => boolean)): number {
    const keysToDelete: string[] = []

    this.cache.forEach((_, key) => {
      if (pattern instanceof RegExp) {
        if (pattern.test(key)) {
          keysToDelete.push(key)
        }
      } else if (pattern(key)) {
        keysToDelete.push(key)
      }
    })

    keysToDelete.forEach(key => this.delete(key))
    return keysToDelete.length
  }

  /**
   * 清理过期缓存
   * @example cache.cleanup()
   */
  cleanup(): number {
    let count = 0
    const keysToDelete: string[] = []

    this.cache.forEach((entry, key) => {
      if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
        keysToDelete.push(key)
      }
    })

    keysToDelete.forEach(key => {
      if (this.delete(key)) {
        count++
      }
    })

    return count
  }

  /**
   * 获取缓存统计信息
   * @example const stats = cache.getStats()
   */
  getStats(): {
    size: number
    maxSize: number | null
    defaultTtl: number | null
    hits: number
    misses: number
  } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      defaultTtl: this.ttl,
      hits: 0, // 需要实现计数
      misses: 0,
    }
  }

  /**
   * LRU 驱逐（驱逐最少使用的）
   */
  private evictLRU(): void {
    if (this.accessOrder.length > 0) {
      const keyToEvict = this.accessOrder[0]
      this.delete(keyToEvict)
    }
  }

  /**
   * 更新访问顺序
   */
  private updateAccessOrder(key: string): void {
    // 移除如果已存在
    const index = this.accessOrder.indexOf(key)
    if (index > -1) {
      this.accessOrder.splice(index, 1)
    }
    // 添加到末尾
    this.accessOrder.push(key)
  }

  /**
   * 返回迭代器
   */
  [Symbol.iterator]() {
    return this.entries()[Symbol.iterator]()
  }
}

export { Cache }
export default Cache
