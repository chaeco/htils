import { describe, it, expect } from 'vitest'
import { EventBus } from '../eventBus'

describe('eventBus - 事件总线', () => {
  it('on/emit - 监听和触发事件', () => {
    const bus = new EventBus()
    let result = ''
    bus.on('test', (msg: string) => {
      result = msg
    })
    bus.emit('test', 'hello')
    expect(result).toBe('hello')
  })

  it('off - 移除事件监听', () => {
    const bus = new EventBus()
    let callCount = 0
    const handler = () => {
      callCount++
    }
    bus.on('test', handler)
    bus.emit('test')
    expect(callCount).toBe(1)

    bus.off('test', handler)
    bus.emit('test')
    expect(callCount).toBe(1)
  })

  it('once - 一次性事件监听', () => {
    const bus = new EventBus()
    let callCount = 0
    bus.once('test', () => {
      callCount++
    })
    bus.emit('test')
    bus.emit('test')
    expect(callCount).toBe(1)
  })

  it('clear - 清空事件监听', () => {
    const bus = new EventBus()
    let count1 = 0
    let count2 = 0
    bus.on('event1', () => count1++)
    bus.on('event2', () => count2++)
    bus.emit('event1')
    bus.emit('event2')
    expect(count1).toBe(1)
    expect(count2).toBe(1)

    bus.clear()
    bus.emit('event1')
    bus.emit('event2')
    expect(count1).toBe(1)
    expect(count2).toBe(1)
  })

  it('multiple listeners - 多个监听器', () => {
    const bus = new EventBus()
    const results: string[] = []
    bus.on('test', () => results.push('a'))
    bus.on('test', () => results.push('b'))
    bus.on('test', () => results.push('c'))
    bus.emit('test')
    expect(results).toEqual(['a', 'b', 'c'])
  })

  it('return unsubscribe function - 返回取消订阅函数', () => {
    const bus = new EventBus()
    let callCount = 0
    const unsubscribe = bus.on('test', () => {
      callCount++
    })
    bus.emit('test')
    expect(callCount).toBe(1)

    unsubscribe()
    bus.emit('test')
    expect(callCount).toBe(1)
  })
})

