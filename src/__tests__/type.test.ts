import { describe, it, expect } from 'vitest'
import type from '../type'

describe('type - 类型检测工具', () => {
  it('getType - 获取数据类型', () => {
    expect(type.getType(123)).toBe('Number')
    expect(type.getType('text')).toBe('String')
    expect(type.getType(true)).toBe('Boolean')
    expect(type.getType([])).toBe('Array')
    expect(type.getType({})).toBe('Object')
    expect(type.getType(null)).toBe('Null')
    expect(type.getType(undefined)).toBe('Undefined')
    expect(type.getType(() => {})).toBe('Function')
  })

  it('isNumber - 检查是否数字', () => {
    expect(type.isNumber(123)).toBe(true)
    expect(type.isNumber(0)).toBe(true)
    expect(type.isNumber(-123.45)).toBe(true)
    expect(type.isNumber('123')).toBe(false)
    expect(type.isNumber(NaN)).toBe(false)
  })

  it('isString - 检查是否字符串', () => {
    expect(type.isString('text')).toBe(true)
    expect(type.isString('')).toBe(true)
    expect(type.isString(123)).toBe(false)
  })

  it('isBoolean - 检查是否布尔值', () => {
    expect(type.isBoolean(true)).toBe(true)
    expect(type.isBoolean(false)).toBe(true)
    expect(type.isBoolean(1)).toBe(false)
  })

  it('isArray - 检查是否数组', () => {
    expect(type.isArray([])).toBe(true)
    expect(type.isArray([1, 2, 3])).toBe(true)
    expect(type.isArray('array')).toBe(false)
    expect(type.isArray({})).toBe(false)
  })

  it('isObject - 检查是否对象', () => {
    expect(type.isObject({})).toBe(true)
    expect(type.isObject({ a: 1 })).toBe(true)
    expect(type.isObject([])).toBe(false)
    expect(type.isObject(null)).toBe(false)
  })

  it('isFunction - 检查是否函数', () => {
    expect(type.isFunction(() => {})).toBe(true)
    expect(type.isFunction(function () {})).toBe(true)
    expect(type.isFunction(async () => {})).toBe(true)
    expect(type.isFunction('function')).toBe(false)
  })

  it('isNull - 检查是否 null', () => {
    expect(type.isNull(null)).toBe(true)
    expect(type.isNull(undefined)).toBe(false)
    expect(type.isNull(0)).toBe(false)
  })

  it('isUndefined - 检查是否 undefined', () => {
    expect(type.isUndefined(undefined)).toBe(true)
    expect(type.isUndefined(null)).toBe(false)
    expect(type.isUndefined(void 0)).toBe(true)
  })
})
