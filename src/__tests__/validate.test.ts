import { describe, it, expect } from 'vitest'
import validate from '../validate'

describe('validate - 数据验证工具', () => {
  it('isEmail - 验证邮箱格式', () => {
    expect(validate.isEmail('user@example.com')).toBe(true)
    expect(validate.isEmail('john.doe+tag@example.co.uk')).toBe(true)
    expect(validate.isEmail('invalid.email')).toBe(false)
  })

  it('isPhone - 验证手机号码', () => {
    expect(validate.isPhone('13800138000')).toBe(true)
    expect(validate.isPhone('18612345678')).toBe(true)
    expect(validate.isPhone('1380013800')).toBe(false)
  })

  it('isUrl - 验证 URL 格式', () => {
    expect(validate.isUrl('https://example.com')).toBe(true)
    expect(validate.isUrl('http://example.com:8080/path')).toBe(true)
    expect(validate.isUrl('not a url')).toBe(false)
  })

  it('isIpv4 - 验证 IPv4 地址', () => {
    expect(validate.isIpv4('192.168.1.1')).toBe(true)
    expect(validate.isIpv4('127.0.0.1')).toBe(true)
    expect(validate.isIpv4('256.256.256.256')).toBe(false)
  })

  it('isIdCard - 验证身份证号', () => {
    expect(validate.isIdCard('110101199003071234')).toBe(true)
    expect(validate.isIdCard('11010119900307123')).toBe(false)
  })

  it('isEmpty - 检查是否为空值', () => {
    expect(validate.isEmpty(null)).toBe(true)
    expect(validate.isEmpty(undefined)).toBe(true)
    expect(validate.isEmpty('')).toBe(true)
    expect(validate.isEmpty('text')).toBe(false)
  })

  it('isChinese - 验证纯中文字符', () => {
    expect(validate.isChinese('你好')).toBe(true)
    expect(validate.isChinese('中国')).toBe(true)
    expect(validate.isChinese('hello')).toBe(false)
  })

  it('isNumber - 验证数字字符串', () => {
    expect(validate.isNumber('123')).toBe(true)
    expect(validate.isNumber('123.45')).toBe(true)
    expect(validate.isNumber('-123')).toBe(true)
    expect(validate.isNumber('abc')).toBe(false)
  })

  it('isHexColor - 验证十六进制颜色', () => {
    expect(validate.isHexColor('#FF5733')).toBe(true)
    expect(validate.isHexColor('#fff')).toBe(true)
    expect(validate.isHexColor('not a color')).toBe(false)
  })
})

