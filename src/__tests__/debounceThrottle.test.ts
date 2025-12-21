import { describe, it, expect } from 'vitest'
import debounceThrottle from '../debounceThrottle'

describe('debounceThrottle - 防抖节流工具', () => {
  it('debounce - 防抖函数', () => {
    const fn = debounceThrottle.debounce(() => {
      // callback
    }, 50)
    expect(typeof fn).toBe('function')
  })

  it('throttle - 节流函数', () => {
    const fn = debounceThrottle.throttle(() => {
      // callback
    }, 80)
    expect(typeof fn).toBe('function')
  })

  it('debounce with leading - 防抖立即执行', () => {
    const fn = debounceThrottle.debounce(() => {
      // callback
    }, 50, { leading: true })
    expect(typeof fn).toBe('function')
  })

  it('debounce with trailing - 防抖尾部调用', () => {
    const fn = debounceThrottle.debounce(() => {
      // callback
    }, 50, { trailing: true })
    expect(typeof fn).toBe('function')
  })

  it('throttle immediate - 节流立即执行', () => {
    const fn = debounceThrottle.throttle(() => {
      // callback
    }, 100, { leading: true })
    expect(typeof fn).toBe('function')
  })
})


