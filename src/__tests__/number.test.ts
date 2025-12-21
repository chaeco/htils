import { describe, it, expect } from 'vitest'
import number from '../number'

describe('number - 数字处理', () => {
  it('round - 四舍五入', () => {
    expect(number.round(1.234, 2)).toBe(1.23)
    expect(number.round(3.14159, 2)).toBe(3.14)
  })

  it('ceil - 向上取整', () => {
    expect(number.ceil(3.14, 1)).toBe(3.2)
  })

  it('floor - 向下取整', () => {
    expect(number.floor(3.19, 1)).toBe(3.1)
  })

  it('clamp - 数值约束', () => {
    expect(number.clamp(5, 1, 10)).toBe(5)
    expect(number.clamp(0, 1, 10)).toBe(1)
    expect(number.clamp(20, 1, 10)).toBe(10)
  })

  it('inRange - 范围检查', () => {
    expect(number.inRange(5, 1, 10)).toBe(true)
    expect(number.inRange(0, 1, 10)).toBe(false)
  })

  it('percentage - 百分比计算', () => {
    expect(number.percentage(50, 100)).toBe(50)
  })

  it('byteToKB - 字节转换', () => {
    expect(number.byteToKB(1024)).toBe(1)
  })

  it('byteToMB - 字节转换', () => {
    expect(number.byteToMB(1024 * 1024)).toBe(1)
  })

  it('randomBetween - 随机整数', () => {
    const random = number.randomBetween(1, 10)
    expect(random).toBeGreaterThanOrEqual(1)
    expect(random).toBeLessThanOrEqual(10)
  })
})
