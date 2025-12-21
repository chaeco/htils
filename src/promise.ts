/**
 * Promise 异步操作工具函数
 */

const promise = {
  /**
   * 延迟执行
   * @example await sleep(1000) // wait 1 second
   */
  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  },

  /**
   * 带超时的 Promise
   * @example await timeout(fetch(...), 5000)
   */
  timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error(`Promise timeout after ${ms}ms`)), ms)
      ),
    ])
  },

  /**
   * 重试机制
   * @example await retry(() => fetchData(), 3, 1000)
   */
  async retry<T>(
    fn: () => Promise<T>,
    times: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error | undefined
    for (let i = 0; i < times; i++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error as Error
        if (i < times - 1) {
          await this.sleep(delay)
        }
      }
    }
    throw lastError || new Error('Retry failed')
  },

  /**
   * 串行执行
   * @example await series([() => Promise.resolve(1), () => Promise.resolve(2)])
   */
  async series<T>(
    tasks: Array<() => Promise<T> | T>
  ): Promise<T[]> {
    const results: T[] = []
    for (const task of tasks) {
      results.push(await Promise.resolve(task()))
    }
    return results
  },

  /**
   * 并行执行
   * @example await parallel([promise1, promise2])
   */
  async parallel<T>(promises: Promise<T>[]): Promise<T[]> {
    return Promise.all(promises)
  },

  /**
   * 并发控制
   * @example await concurrency([promise1, promise2, promise3], 2)
   */
  async concurrency<T>(
    promises: Promise<T>[],
    limit: number
  ): Promise<T[]> {
    const result: T[] = []
    const executing: Promise<void>[] = []

    for (const promise of promises) {
      const p = Promise.resolve(promise).then(value => {
        result.push(value)
        executing.splice(executing.indexOf(p), 1)
      })
      executing.push(p)
      if (executing.length >= limit) {
        await Promise.race(executing)
      }
    }

    await Promise.all(executing)
    return result
  },

  /**
   * 轮询直到满足条件
   * @example await poll(() => checkStatus(), 10, 1000)
   */
  async poll<T>(
    fn: () => Promise<T>,
    times: number = 10,
    interval: number = 1000
  ): Promise<T> {
    let lastError: Error | undefined
    for (let i = 0; i < times; i++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error as Error
        if (i < times - 1) {
          await this.sleep(interval)
        }
      }
    }
    throw lastError || new Error('Poll failed')
  },

  /**
   * 可取消的 Promise
   */
  cancellable<T>(promise: Promise<T>): {
    promise: Promise<T>
    cancel: () => void
  } {
    let cancel: (() => void) | null = null
    const wrappedPromise = new Promise<T>((resolve, reject) => {
      cancel = () => reject(new Error('Promise cancelled'))
      promise.then(resolve).catch(reject)
    })
    return {
      promise: wrappedPromise,
      cancel: () => cancel?.(),
    }
  },

  /**
   * Callback 转 Promise
   */
  promisify<T>(
    fn: (callback: (err: any, result?: T) => void) => void
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      fn((err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result as T)
        }
      })
    })
  },

  /**
   * 等待任意 Promise 完成
   * @example await race([promise1, promise2])
   */
  async race<T>(promises: Promise<T>[]): Promise<T> {
    return Promise.race(promises)
  },

  /**
   * 处理 Promise 结果（不抛出错误）
   * @example const [err, data] = await handle(promise)
   */
  async handle<T, E = Error>(
    promise: Promise<T>
  ): Promise<[E | null, T | undefined]> {
    return promise
      .then<[null, T]>((data: T) => [null, data])
      .catch<[E, undefined]>((err: E) => [err, undefined])
  },
}

export default promise
