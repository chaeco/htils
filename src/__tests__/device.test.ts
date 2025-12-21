import { describe, it, expect } from 'vitest'
import device from '../device'

describe('device - 设备信息工具', () => {
  it('getUserAgent - 获取用户代理字符串', () => {
    const ua = device.getUserAgent()
    expect(typeof ua).toBe('string')
  })

  it('isMobile - 检测移动设备', () => {
    const result = device.isMobile()
    expect(typeof result).toBe('boolean')
  })

  it('isIOS - 检测 iOS 系统', () => {
    const result = device.isIOS()
    expect(typeof result).toBe('boolean')
  })

  it('isAndroid - 检测 Android 系统', () => {
    const result = device.isAndroid()
    expect(typeof result).toBe('boolean')
  })

  it('getOSName - 获取操作系统', () => {
    const os = device.getOSName()
    expect(typeof os).toBe('string')
  })

  it('getBrowserName - 获取浏览器信息', () => {
    const browser = device.getBrowserName()
    expect(typeof browser).toBe('string')
  })

  it('getScreenInfo - 获取屏幕信息', () => {
    const info = device.getScreenInfo()
    expect(typeof info).toBe('object')
    expect(typeof info.width).toBe('number')
  })

  it('getLanguage - 获取浏览器语言', () => {
    const lang = device.getLanguage()
    expect(typeof lang).toBe('string')
  })

  it('isOnline - 检测网络连接状态', () => {
    const online = device.isOnline()
    // In Node.js environment or when navigator is not available
    expect([true, false, undefined]).toContain(online)
  })
})
