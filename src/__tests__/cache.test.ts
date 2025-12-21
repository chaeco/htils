import { describe, it, expect } from 'vitest'
import Cache from '../cache'

describe('cache - 缓存工具', () => {
  it('set/get - 设置和获取缓存', () => {
    const cache = new Cache()
    cache.set('key1', 'value1')
    expect(cache.get('key1')).toBe('value1')
    expect(cache.get('nonexistent')).toBe(null)
  })

  it('set with ttl - 设置带过期时间的缓存', async () => {
    const cache = new Cache()
    cache.set('key', 'value', 50)
    expect(cache.get('key')).toBe('value')

    await new Promise((resolve) => setTimeout(resolve, 60))
    expect(cache.get('key')).toBe(null)
  })

  it('has - 检查缓存是否存在', () => {
    const cache = new Cache()
    cache.set('key', 'value')
    expect(cache.has('key')).toBe(true)
    expect(cache.has('nonexistent')).toBe(false)
  })

  it('delete - 删除缓存', () => {
    const cache = new Cache()
    cache.set('key', 'value')
    expect(cache.has('key')).toBe(true)
    cache.delete('key')
    expect(cache.has('key')).toBe(false)
  })

  it('clear - 清空所有缓存', () => {
    const cache = new Cache()
    cache.set('key1', 'value1')
    cache.set('key2', 'value2')
    cache.clear()
    expect(cache.get('key1')).toBe(null)
    expect(cache.get('key2')).toBe(null)
  })

  it('size - 获取缓存大小', () => {
    const cache = new Cache()
    expect(cache.size()).toBe(0)
    cache.set('key1', 'value1')
    cache.set('key2', 'value2')
    expect(cache.size()).toBe(2)
  })

  it('keys - 获取所有键', () => {
    const cache = new Cache()
    cache.set('key1', 'value1')
    cache.set('key2', 'value2')
    const keys = cache.keys()
    expect(keys).toContain('key1')
    expect(keys).toContain('key2')
  })

  it('values - 获取所有值', () => {
    const cache = new Cache()
    cache.set('key1', 'value1')
    cache.set('key2', 'value2')
    const values = cache.values()
    expect(values).toContain('value1')
    expect(values).toContain('value2')
  })
})
