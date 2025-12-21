import { describe, it, expect } from 'vitest'
import format from '../format'

describe('format - 格式化工具', () => {
  it('formatCurrency - 货币格式化', () => {
    const result = format.formatCurrency(1234.5, 'USD', 'en-US')
    expect(result).toContain('1,234.50')
  })

  it('formatPercentage - 百分比格式化', () => {
    expect(format.formatPercentage(0.5)).toBe('50.00%')
    expect(format.formatPercentage(0.123, 1)).toBe('12.3%')
  })

  it('formatFileSize - 文件大小格式化', () => {
    expect(format.formatFileSize(1024)).toBe('1.00 KB')
    expect(format.formatFileSize(1024 * 1024)).toBe('1.00 MB')
  })

  it('formatNumber - 数字格式化', () => {
    expect(format.formatNumber(1000000)).toBe('1,000,000')
    expect(format.formatNumber(123456, 2)).toBe('123,456.00')
  })

  it('formatPhone - 电话格式化', () => {
    const result = format.formatPhone('13800138000')
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
  })

  it('formatTime - 时间格式化', () => {
    const result = format.formatTime(3661)
    expect(result).toContain('1')
    expect(typeof result).toBe('string')
  })

  it('formatDate - 日期格式化', () => {
    const d = new Date('2024-01-15')
    expect(format.formatDate(d, 'YYYY-MM-DD')).toBe('2024-01-15')
  })

  it('formatJson - JSON 格式化', () => {
    const obj = { name: 'John', age: 30 }
    const result = format.formatJson(obj)
    expect(result).toContain('name')
    expect(result).toContain('John')
  })

  it('formatUrl - URL 格式化', () => {
    const result = format.formatUrl('https://example.com', { page: 1 })
    expect(result).toContain('example.com')
  })
})
