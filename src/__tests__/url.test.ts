import { describe, it, expect } from 'vitest'
import url from '../url'

describe('url - URL 处理工具', () => {
  it('parse - 解析 URL', () => {
    const result = url.parse('https://user:pass@example.com:8080/path?key=value#hash')
    expect(result.protocol).toBe('https:')
    expect(result.hostname).toBe('example.com')
    expect(result.port).toBe('8080')
    expect(result.pathname).toBe('/path')
    expect(result.search).toBe('?key=value')
    expect(result.hash).toBe('#hash')
  })

  it('parseQuery - 解析查询字符串', () => {
    const params = url.parseQuery('name=John&age=30&city=New%20York')
    expect(params.name).toBe('John')
    expect(params.age).toBe('30')
    expect(params.city).toBe('New York')
  })

  it('getQueryParam - 获取单个参数', () => {
    const value = url.getQueryParam('https://example.com?name=John&age=30', 'name')
    expect(value).toBe('John')
    expect(url.getQueryParam('https://example.com?name=John&age=30', 'city')).toBe(null)
  })

  it('addQuery - 添加查询参数', () => {
    const result = url.addQuery('https://example.com/path', { name: 'John', age: 30 })
    expect(result).toContain('name=John')
    expect(result).toContain('age=30')
  })

  it('removeQuery - 移除查询参数', () => {
    const result = url.removeQuery('https://example.com?name=John&age=30&city=NYC', 'age')
    expect(result).toContain('name=John')
    expect(result).not.toContain('age=30')
  })

  it('join - 连接 URL 路径', () => {
    expect(url.join('https://example.com', '/path', 'file.js')).toBe('https://example.com/path/file.js')
    expect(url.join('https://example.com/', '/path/', '/file.js')).toBe('https://example.com/path/file.js')
  })

  it('isAbsoluteUrl - 判断是否绝对 URL', () => {
    expect(url.isAbsoluteUrl('https://example.com/path')).toBe(true)
    expect(url.isAbsoluteUrl('http://example.com')).toBe(true)
    expect(url.isAbsoluteUrl('/path/file.js')).toBe(false)
    expect(url.isAbsoluteUrl('relative/path')).toBe(false)
  })

  it('isValidUrl - 验证 URL 有效性', () => {
    expect(url.isValidUrl('https://example.com')).toBe(true)
    expect(url.isValidUrl('not a url')).toBe(false)
  })

  it('getOrigin - 获取源地址', () => {
    expect(url.getOrigin('https://example.com/path?query=1')).toBe('https://example.com')
    expect(url.getOrigin('http://example.com:8080/path')).toBe('http://example.com:8080')
  })

  it('encode/decode - 编码和解码', () => {
    const encoded = url.encode('hello world')
    expect(encoded).toBe('hello%20world')
    expect(url.decode('hello%20world')).toBe('hello world')
  })
})
