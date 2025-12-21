import { describe, it, expect } from 'vitest'
import date from '../date'

describe('date - 日期处理工具', () => {
  it('format - 日期格式化', () => {
    const d = new Date('2024-01-15T10:30:45')
    expect(date.format(d, 'YYYY-MM-DD')).toBe('2024-01-15')
    expect(date.format(d, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-01-15 10:30:45')
    expect(date.format(d, 'MM/DD/YYYY')).toBe('01/15/2024')
  })

  it('parse - 日期解析', () => {
    const result = date.parse('2024-01-15')
    expect(result instanceof Date).toBe(true)
    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(0) // 0-based month
    expect(result.getDate()).toBe(15)
  })

  it('addDays - 增加天数', () => {
    const d = new Date('2024-01-15')
    const result = date.addDays(d, 10)
    expect(result.getDate()).toBe(25)
  })

  it('addMonths - 增加月份', () => {
    const d = new Date('2024-01-15')
    const result = date.addMonths(d, 1)
    expect(result.getMonth()).toBe(1) // February
    expect(result.getDate()).toBe(15)
  })

  it('timestamp - 获取时间戳', () => {
    const ts = date.timestamp()
    expect(typeof ts).toBe('number')
    expect(ts).toBeGreaterThan(0)
  })

  it('timestampMs - 获取毫秒时间戳', () => {
    const ts = date.timestampMs()
    expect(typeof ts).toBe('number')
    expect(ts).toBeGreaterThan(0)
  })

  it('fromTimestamp - 从时间戳转换', () => {
    const ts = 1705310445 // 2024-01-15 10:34:05 UTC
    const result = date.fromTimestamp(ts)
    expect(result instanceof Date).toBe(true)
  })

  it('toTimestamp - 转换为时间戳', () => {
    const d = new Date('2024-01-15T10:34:05Z')
    const ts = date.toTimestamp(d)
    expect(typeof ts).toBe('number')
    expect(ts).toBeGreaterThan(0)
  })
})
