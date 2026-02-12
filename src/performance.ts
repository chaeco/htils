/**
 * 性能监控工具 - 真实项目中的性能监控
 */

interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte
  domLoad?: number // DOM Content Loaded
  windowLoad?: number // Window Load
}

interface MemoryInfo {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
  usedPercentage: number
}

/**
 * 性能监控类
 */
class PerformanceMonitor {
  private metrics: PerformanceMetrics = {}
  private observers: PerformanceObserver[] = []

  constructor() {
    if (typeof window !== 'undefined') {
      this.initObservers()
      this.measureLoadTimes()
    }
  }

  /**
   * 初始化性能观察器
   */
  private initObservers(): void {
    // 监听 FCP 和 LCP
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.fcp = entry.startTime
            }
          }
        })
        paintObserver.observe({ entryTypes: ['paint'] })
        this.observers.push(paintObserver)

        // LCP
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as any
          this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        this.observers.push(lcpObserver)

        // FID
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.metrics.fid = (entry as any).processingStart - entry.startTime
          }
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
        this.observers.push(fidObserver)

        // CLS
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
              this.metrics.cls = clsValue
            }
          }
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(clsObserver)
      } catch (e) {
        console.warn('Performance Observer not fully supported', e)
      }
    }
  }

  /**
   * 测量页面加载时间
   */
  private measureLoadTimes(): void {
    if (typeof window === 'undefined') return

    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

        if (perfData) {
          this.metrics.ttfb = perfData.responseStart - perfData.requestStart
          this.metrics.domLoad = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart
          this.metrics.windowLoad = perfData.loadEventEnd - perfData.loadEventStart
        }
      }, 0)
    })
  }

  /**
   * 获取所有性能指标
   * @example monitor.getMetrics()
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  /**
   * 获取页面加载时间
   * @example monitor.getPageLoadTime()
   */
  getPageLoadTime(): number | null {
    if (typeof performance === 'undefined' || typeof performance.getEntriesByType !== 'function') return null
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (!perfData) return null

    return perfData.loadEventEnd - perfData.fetchStart
  }

  /**
   * 获取资源加载时间
   * @example monitor.getResourceTiming()
   */
  getResourceTiming(): PerformanceResourceTiming[] {
    if (typeof performance === 'undefined' || typeof performance.getEntriesByType !== 'function') return []
    return performance.getEntriesByType('resource') as PerformanceResourceTiming[]
  }

  /**
   * 标记时间点
   * @example monitor.mark('user-action-start')
   */
  mark(name: string): void {
    if (typeof performance !== 'undefined' && typeof performance.mark === 'function') {
      performance.mark(name)
    }
  }

  /**
   * 测量两个标记之间的时间
   * @example monitor.measure('user-action', 'start', 'end')
   */
  measure(name: string, startMark: string, endMark: string): number {
    if (typeof performance !== 'undefined' && typeof performance.measure === 'function') {
      performance.measure(name, startMark, endMark)
      const measures = performance.getEntriesByName(name, 'measure')
      return measures[measures.length - 1]?.duration || 0
    }
    return 0
  }

  /**
   * 清除标记
   * @example monitor.clearMarks('my-mark')
   */
  clearMarks(name?: string): void {
    if (typeof performance !== 'undefined' && typeof performance.clearMarks === 'function') {
      if (name) {
        performance.clearMarks(name)
      } else {
        performance.clearMarks()
      }
    }
  }

  /**
   * 清除测量
   * @example monitor.clearMeasures('my-measure')
   */
  clearMeasures(name?: string): void {
    if (typeof performance !== 'undefined' && typeof performance.clearMeasures === 'function') {
      if (name) {
        performance.clearMeasures(name)
      } else {
        performance.clearMeasures()
      }
    }
  }

  /**
   * 获取内存使用情况（仅 Chrome）
   * @example monitor.getMemoryInfo()
   */
  getMemoryInfo(): MemoryInfo | null {
    if (typeof performance === 'undefined') return null
    const memory = (performance as any).memory
    if (!memory) return null

    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      usedPercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
    }
  }

  /**
   * 销毁观察器
   */
  destroy(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

/**
 * FPS 监控器
 */
class FPSMonitor {
  private fps: number = 0
  private lastTime: number = typeof performance !== 'undefined' ? performance.now() : Date.now()
  private frames: number = 0
  private rafId: number | null = null
  private callback?: (fps: number) => void

  /**
   * 开始监控 FPS
   * @example fpsMonitor.start((fps) => console.log('FPS:', fps))
   */
  start(callback?: (fps: number) => void): void {
    if (typeof requestAnimationFrame === 'undefined') {
      console.warn('requestAnimationFrame is not supported in this environment')
      return
    }
    this.callback = callback
    this.rafId = requestAnimationFrame(this.measureFPS.bind(this))
  }

  /**
   * 测量 FPS
   */
  private measureFPS(time: number): void {
    this.frames++

    if (time >= this.lastTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (time - this.lastTime))
      this.callback?.(this.fps)
      this.frames = 0
      this.lastTime = time
    }

    if (typeof requestAnimationFrame !== 'undefined') {
      this.rafId = requestAnimationFrame(this.measureFPS.bind(this))
    }
  }

  /**
   * 获取当前 FPS
   * @example fpsMonitor.getFPS()
   */
  getFPS(): number {
    return this.fps
  }

  /**
   * 停止监控
   */
  stop(): void {
    if (this.rafId !== null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }
}

/**
 * 函数执行时间测量
 * @example measureTime(() => { // do something })
 */
function measureTime<T>(fn: () => T, label?: string): T {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now()
  const result = fn()
  const end = typeof performance !== 'undefined' ? performance.now() : Date.now()
  const duration = end - start

  if (label) {
    console.log(`[${label}] 执行时间: ${duration.toFixed(2)}ms`)
  }

  return result
}

/**
 * 异步函数执行时间测量
 * @example await measureAsyncTime(async () => { // do something })
 */
async function measureAsyncTime<T>(fn: () => Promise<T>, label?: string): Promise<T> {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now()
  const result = await fn()
  const end = typeof performance !== 'undefined' ? performance.now() : Date.now()
  const duration = end - start

  if (label) {
    console.log(`[${label}] 执行时间: ${duration.toFixed(2)}ms`)
  }

  return result
}

/**
 * 长任务监控
 */
function monitorLongTasks(callback: (duration: number, entries: PerformanceEntry[]) => void): () => void {
  if (typeof window === 'undefined' || !('PerformanceLongTaskTiming' in window)) {
    console.warn('Long Tasks API not supported')
    return () => { }
  }

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      if (entry.duration > 50) {
        callback(entry.duration, [entry])
      }
    })
  })

  try {
    observer.observe({ entryTypes: ['longtask'] })
  } catch (e) {
    console.warn('Failed to observe long tasks', e)
  }

  return () => observer.disconnect()
}

/**
 * 获取网络信息
 * @example getNetworkInfo()
 */
function getNetworkInfo(): any {
  if (typeof navigator === 'undefined') return null
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

  if (!connection) return null

  return {
    effectiveType: connection.effectiveType, // 4g, 3g, 2g, slow-2g
    downlink: connection.downlink, // Mbps
    rtt: connection.rtt, // ms
    saveData: connection.saveData, // boolean
  }
}

/**
 * 创建性能监控实例
 */
const performanceMonitor = new PerformanceMonitor()

const performance_ = {
  PerformanceMonitor,
  FPSMonitor,
  measureTime,
  measureAsyncTime,
  monitorLongTasks,
  getNetworkInfo,
  monitor: performanceMonitor,
}

export { PerformanceMonitor, FPSMonitor }
export default performance_
