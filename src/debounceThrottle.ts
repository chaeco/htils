/**
 * 防抖和节流工具函数
 */

const debounceThrottle = {
  /**
   * 防抖：等待延迟时间后，如果没有再次调用，则执行函数
   * @example const debouncedFn = debounce(handleInput, 300)
   */
  debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number,
    options: { leading?: boolean; trailing?: boolean; maxWait?: number } = {}
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let lastCallTime = 0
    let lastInvokeTime = 0
    let result: any
    const { leading = false, trailing = true, maxWait } = options

    const invokeFunc = (time: number) => {
      result = fn()
      lastInvokeTime = time
      timeoutId = null
    }

    const shouldInvoke = (time: number) => {
      if (timeoutId === null) {
        return (time - lastInvokeTime) >= delay
      }
      return false
    }

    const timerExpired = () => {
      const time = Date.now()
      if (shouldInvoke(time)) {
        if (trailing) {
          timeoutId = setTimeout(() => invokeFunc(Date.now()), delay)
        } else {
          timeoutId = null
        }
      }
    }

    const debounced = function (this: any, ...args: Parameters<T>) {
      const time = Date.now()
      const isInvoking = shouldInvoke(time)

      lastCallTime = time
      if (timeoutId) clearTimeout(timeoutId)

      if (isInvoking) {
        if (leading && timeoutId === null) {
          result = fn.apply(this, args)
          lastInvokeTime = time
        } else {
          timeoutId = setTimeout(timerExpired, delay)
        }
      }
      return result
    }

    debounced.cancel = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = null
      lastInvokeTime = 0
    }

    debounced.flush = () => {
      return timeoutId === null ? result : invokeFunc(Date.now())
    }

    return debounced
  },

  /**
   * 节流：在延迟时间内，最多执行一次函数
   * @example const throttledFn = throttle(handleScroll, 300)
   */
  throttle<T extends (...args: any[]) => any>(
    fn: T,
    limit: number,
    options: { leading?: boolean; trailing?: boolean } = {}
  ): (...args: Parameters<T>) => void {
    let inThrottle = false
    let lastRan = 0
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    const { leading = true, trailing = true } = options

    return function (this: any, ...args: Parameters<T>) {
      const now = Date.now()

      if (leading && !lastRan) {
        fn.apply(this, args)
        lastRan = now
      } else if (trailing) {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          if (now - lastRan >= limit) {
            fn.apply(this, args)
            lastRan = now
          }
        }, limit - (now - lastRan))
      }
    }
  },

  /**
   * 立即执行，然后防抖后续调用
   * @example const leadingDebounce = immediate(handleClick, 300)
   */
  immediate<T extends (...args: any[]) => any>(
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let hasBeenCalled = false

    return function (this: any, ...args: Parameters<T>) {
      if (!hasBeenCalled) {
        fn.apply(this, args)
        hasBeenCalled = true
      }

      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        hasBeenCalled = false
      }, delay)
    }
  },

  /**
   * 节流，但保证最后一次调用必须执行
   * @example const throttleWithTrailing = throttleWithTrailing(handleEvent, 1000)
   */
  throttleWithTrailing<T extends (...args: any[]) => any>(
    fn: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle = false
    let lastArgs: Parameters<T> | null = null

    return function (this: any, ...args: Parameters<T>) {
      lastArgs = args

      if (!inThrottle) {
        fn.apply(this, args)
        inThrottle = true
        setTimeout(() => {
          inThrottle = false
          if (lastArgs) {
            fn.apply(this, lastArgs)
            lastArgs = null
          }
        }, limit)
      }
    }
  },

  /**
   * 防止快速重复调用（冷却时间）
   * @example const cooldown = withCooldown(handleClick, 2000)
   */
  withCooldown<T extends (...args: any[]) => any>(
    fn: T,
    cooldownTime: number
  ): (...args: Parameters<T>) => boolean {
    let lastCallTime = 0

    return function (this: any, ...args: Parameters<T>) {
      const now = Date.now()
      if (now - lastCallTime >= cooldownTime) {
        lastCallTime = now
        fn.apply(this, args)
        return true
      }
      return false
    }
  },
}

export default debounceThrottle
