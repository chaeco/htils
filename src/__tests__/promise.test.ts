import { describe, it, expect } from 'vitest'
import promise from '../promise'

describe('promise - Promise 异步工具', () => {
  it('sleep - 延迟执行', async () => {
    const start = Date.now()
    await promise.sleep(50)
    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(40)
  })

  it('timeout - 超时控制', async () => {
    try {
      await promise.timeout(
        new Promise((resolve) => setTimeout(() => resolve('done'), 500)),
        100
      )
      expect.fail('应该超时')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('retry - 重试机制', async () => {
    let attempts = 0
    const fn = async () => {
      attempts++
      if (attempts < 2) throw new Error('fail')
      return 'success'
    }

    const result = await promise.retry(fn, 3, 10)
    expect(result).toBe('success')
    expect(attempts).toBeGreaterThanOrEqual(2)
  })

  it('series - 串行执行', async () => {
    const results: number[] = []
    await promise.series([
      async () => results.push(1),
      async () => results.push(2),
      async () => results.push(3),
    ])
    expect(results.length).toBe(3)
  })

  it('parallel - 并行执行', async () => {
    const results = await promise.parallel([
      async () => Promise.resolve(1),
      async () => Promise.resolve(2),
      async () => Promise.resolve(3),
    ])
    expect(results).toHaveLength(3)
  })

  it('cancellable - 可取消 Promise', async () => {
    const { promise: p, cancel } = promise.cancellable(
      new Promise((resolve) => setTimeout(() => resolve('done'), 500))
    )
    cancel()
    try {
      await p
      expect.fail('应该被取消')
    } catch (error: any) {
      expect(error.message || error).toBeDefined()
    }
  })
})
