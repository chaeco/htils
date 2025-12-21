import { describe, it, expect } from 'vitest'
import object from '../object'

describe('object - 对象处理工具', () => {
  it('deepClone - 深拷贝对象', () => {
    const original = { a: 1, b: { c: 2 }, d: [1, 2, 3] }
    const cloned = object.deepClone(original)
    expect(cloned).toEqual(original)
    expect(cloned).not.toBe(original)
    expect(cloned.b).not.toBe(original.b)
  })

  it('merge - 合并多个对象', () => {
    const result = object.merge({ a: 1 }, { b: 2 }, { a: 3 })
    expect(result.a).toBe(3)
    expect(result.b).toBe(2)
  })

  it('pick - 选取指定属性', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const result = object.pick(obj, ['a', 'c'])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('omit - 排除指定属性', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const result = object.omit(obj, ['b', 'd'])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('isEmpty - 检查对象是否为空', () => {
    expect(object.isEmpty({})).toBe(true)
    expect(object.isEmpty({ a: 1 })).toBe(false)
  })

  it('keys - 获取对象所有键', () => {
    const result = object.keys({ a: 1, b: 2, c: 3 })
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('values - 获取对象所有值', () => {
    const result = object.values({ a: 1, b: 2, c: 3 })
    expect(result).toEqual([1, 2, 3])
  })

  it('entries - 获取对象键值对', () => {
    const result = object.entries({ a: 1, b: 2 })
    expect(result).toEqual([['a', 1], ['b', 2]])
  })

  it('invert - 反转对象键值', () => {
    const result = object.invert({ a: 'x', b: 'y' })
    expect(result).toEqual({ x: 'a', y: 'b' })
  })
})
