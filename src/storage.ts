/**
 * 本地存储工具函数（支持 localStorage 和 sessionStorage）
 */

interface StorageOptions {
  expires?: number // 过期时间（毫秒），null 表示永不过期
  version?: number // 数据版本号，用于验证
}

interface StorageData<T> {
  value: T
  timestamp: number
  expires?: number
  version?: number
}

class Storage {
  private prefix: string
  private storage: globalThis.Storage

  constructor(isSession: boolean = false, prefix: string = 'app_') {
    this.storage = isSession ? sessionStorage : localStorage
    this.prefix = prefix
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  /**
   * 设置值
   * @example storage.set('user', { name: 'John' }, { expires: 3600000 })
   */
  set<T>(key: string, value: T, options: StorageOptions = {}): void {
    try {
      const data: StorageData<T> = {
        value,
        timestamp: Date.now(),
        expires: options.expires,
        version: options.version,
      }
      this.storage.setItem(this.getKey(key), JSON.stringify(data))
    } catch (error) {
      console.error(`Failed to set storage key "${key}":`, error)
    }
  }

  /**
   * 获取值
   * @example const user = storage.get<User>('user')
   */
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const fullKey = this.getKey(key)
      const item = this.storage.getItem(fullKey)

      if (!item) {
        return defaultValue ?? null
      }

      const data: StorageData<T> = JSON.parse(item)

      // 检查过期时间
      if (data.expires && Date.now() - data.timestamp > data.expires) {
        this.remove(key)
        return defaultValue ?? null
      }

      return data.value
    } catch (error) {
      console.error(`Failed to get storage key "${key}":`, error)
      return defaultValue ?? null
    }
  }

  /**
   * 判断是否存在某个键
   * @example if (storage.has('user')) { ... }
   */
  has(key: string): boolean {
    return this.storage.getItem(this.getKey(key)) !== null
  }

  /**
   * 删除某个值
   * @example storage.remove('user')
   */
  remove(key: string): void {
    try {
      this.storage.removeItem(this.getKey(key))
    } catch (error) {
      console.error(`Failed to remove storage key "${key}":`, error)
    }
  }

  /**
   * 清空所有值
   * @example storage.clear()
   */
  clear(): void {
    try {
      const keysToRemove: string[] = []
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i)
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach(key => this.storage.removeItem(key))
    } catch (error) {
      console.error('Failed to clear storage:', error)
    }
  }

  /**
   * 获取所有键
   * @example const keys = storage.keys()
   */
  keys(): string[] {
    const keys: string[] = []
    try {
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i)
        if (key && key.startsWith(this.prefix)) {
          keys.push(key.replace(this.prefix, ''))
        }
      }
    } catch (error) {
      console.error('Failed to get storage keys:', error)
    }
    return keys
  }

  /**
   * 增加数值
   * @example storage.increment('counter', 1)
   */
  increment(key: string, step: number = 1): number {
    const current = this.get<number>(key, 0) ?? 0
    const newValue = current + step
    this.set(key, newValue)
    return newValue
  }

  /**
   * 减少数值
   * @example storage.decrement('counter', 1)
   */
  decrement(key: string, step: number = 1): number {
    return this.increment(key, -step)
  }

  /**
   * 追加数组元素
   * @example storage.push('items', 'newItem')
   */
  push<T>(key: string, value: T): T[] {
    const arr = this.get<T[]>(key, []) ?? []
    arr.push(value)
    this.set(key, arr)
    return arr
  }

  /**
   * 移除数组元素
   * @example storage.pop('items')
   */
  pop<T>(key: string): T | undefined {
    const arr = this.get<T[]>(key, []) ?? []
    const value = arr.pop()
    this.set(key, arr)
    return value
  }

  /**
   * 获取存储大小（字节）
   * @example const size = storage.getSize('user')
   */
  getSize(key: string): number {
    try {
      const item = this.storage.getItem(this.getKey(key))
      return item ? new Blob([item]).size : 0
    } catch (error) {
      return 0
    }
  }

  /**
   * 获取总容量使用情况
   * @example const usage = storage.getTotalSize()
   */
  getTotalSize(): number {
    let total = 0
    try {
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i)
        if (key) {
          const item = this.storage.getItem(key)
          total += item ? new Blob([item]).size : 0
        }
      }
    } catch (error) {
      console.error('Failed to get total storage size:', error)
    }
    return total
  }

  /**
   * 清理过期的数据
   * @example storage.cleanup()
   */
  cleanup(): number {
    let removedCount = 0
    try {
      const keys = this.keys()
      keys.forEach(key => {
        const fullKey = this.getKey(key)
        const item = this.storage.getItem(fullKey)
        if (item) {
          try {
            const data: StorageData<any> = JSON.parse(item)
            if (data.expires && Date.now() - data.timestamp > data.expires) {
              this.remove(key)
              removedCount++
            }
          } catch (error) {
            // 无效数据，删除
            this.storage.removeItem(fullKey)
            removedCount++
          }
        }
      })
    } catch (error) {
      console.error('Failed to cleanup storage:', error)
    }
    return removedCount
  }
}

// 延迟初始化实例，避免 Node.js 环境错误
let localStorage_: Storage | null = null
let sessionStorage_: Storage | null = null

const getLocalStorage = (): Storage => {
  if (!localStorage_) {
    localStorage_ = new Storage(false, 'app_')
  }
  return localStorage_
}

const getSessionStorage = (): Storage => {
  if (!sessionStorage_) {
    sessionStorage_ = new Storage(true, 'session_')
  }
  return sessionStorage_
}

export { Storage, getLocalStorage, getSessionStorage }
export default {
  get local() {
    return getLocalStorage()
  },
  get session() {
    return getSessionStorage()
  },
  createStorage: (isSession: boolean = false, prefix: string = 'app_') =>
    new Storage(isSession, prefix),
}

