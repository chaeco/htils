"use strict";
/**
 * 性能监控工具 - 真实项目中的性能监控
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPSMonitor = exports.PerformanceMonitor = void 0;
/**
 * 性能监控类
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.observers = [];
        if (typeof window !== 'undefined') {
            this.initObservers();
            this.measureLoadTimes();
        }
    }
    /**
     * 初始化性能观察器
     */
    initObservers() {
        // 监听 FCP 和 LCP
        if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
            try {
                const paintObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.name === 'first-contentful-paint') {
                            this.metrics.fcp = entry.startTime;
                        }
                    }
                });
                paintObserver.observe({ entryTypes: ['paint'] });
                this.observers.push(paintObserver);
                // LCP
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                this.observers.push(lcpObserver);
                // FID
                const fidObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.metrics.fid = entry.processingStart - entry.startTime;
                    }
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
                this.observers.push(fidObserver);
                // CLS
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                            this.metrics.cls = clsValue;
                        }
                    }
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
                this.observers.push(clsObserver);
            }
            catch (e) {
                console.warn('Performance Observer not fully supported', e);
            }
        }
    }
    /**
     * 测量页面加载时间
     */
    measureLoadTimes() {
        if (typeof window === 'undefined')
            return;
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    this.metrics.ttfb = perfData.responseStart - perfData.requestStart;
                    this.metrics.domLoad = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
                    this.metrics.windowLoad = perfData.loadEventEnd - perfData.loadEventStart;
                }
            }, 0);
        });
    }
    /**
     * 获取所有性能指标
     * @example monitor.getMetrics()
     */
    getMetrics() {
        return { ...this.metrics };
    }
    /**
     * 获取页面加载时间
     * @example monitor.getPageLoadTime()
     */
    getPageLoadTime() {
        if (typeof performance === 'undefined' || typeof performance.getEntriesByType !== 'function')
            return null;
        const perfData = performance.getEntriesByType('navigation')[0];
        if (!perfData)
            return null;
        return perfData.loadEventEnd - perfData.fetchStart;
    }
    /**
     * 获取资源加载时间
     * @example monitor.getResourceTiming()
     */
    getResourceTiming() {
        if (typeof performance === 'undefined' || typeof performance.getEntriesByType !== 'function')
            return [];
        return performance.getEntriesByType('resource');
    }
    /**
     * 标记时间点
     * @example monitor.mark('user-action-start')
     */
    mark(name) {
        if (typeof performance !== 'undefined' && typeof performance.mark === 'function') {
            performance.mark(name);
        }
    }
    /**
     * 测量两个标记之间的时间
     * @example monitor.measure('user-action', 'start', 'end')
     */
    measure(name, startMark, endMark) {
        if (typeof performance !== 'undefined' && typeof performance.measure === 'function') {
            performance.measure(name, startMark, endMark);
            const measures = performance.getEntriesByName(name, 'measure');
            return measures[measures.length - 1]?.duration || 0;
        }
        return 0;
    }
    /**
     * 清除标记
     * @example monitor.clearMarks('my-mark')
     */
    clearMarks(name) {
        if (typeof performance !== 'undefined' && typeof performance.clearMarks === 'function') {
            if (name) {
                performance.clearMarks(name);
            }
            else {
                performance.clearMarks();
            }
        }
    }
    /**
     * 清除测量
     * @example monitor.clearMeasures('my-measure')
     */
    clearMeasures(name) {
        if (typeof performance !== 'undefined' && typeof performance.clearMeasures === 'function') {
            if (name) {
                performance.clearMeasures(name);
            }
            else {
                performance.clearMeasures();
            }
        }
    }
    /**
     * 获取内存使用情况（仅 Chrome）
     * @example monitor.getMemoryInfo()
     */
    getMemoryInfo() {
        if (typeof performance === 'undefined')
            return null;
        const memory = performance.memory;
        if (!memory)
            return null;
        return {
            usedJSHeapSize: memory.usedJSHeapSize,
            totalJSHeapSize: memory.totalJSHeapSize,
            jsHeapSizeLimit: memory.jsHeapSizeLimit,
            usedPercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
        };
    }
    /**
     * 销毁观察器
     */
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}
exports.PerformanceMonitor = PerformanceMonitor;
/**
 * FPS 监控器
 */
class FPSMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
        this.frames = 0;
        this.rafId = null;
    }
    /**
     * 开始监控 FPS
     * @example fpsMonitor.start((fps) => console.log('FPS:', fps))
     */
    start(callback) {
        if (typeof requestAnimationFrame === 'undefined') {
            console.warn('requestAnimationFrame is not supported in this environment');
            return;
        }
        this.callback = callback;
        this.rafId = requestAnimationFrame(this.measureFPS.bind(this));
    }
    /**
     * 测量 FPS
     */
    measureFPS(time) {
        this.frames++;
        if (time >= this.lastTime + 1000) {
            this.fps = Math.round((this.frames * 1000) / (time - this.lastTime));
            this.callback?.(this.fps);
            this.frames = 0;
            this.lastTime = time;
        }
        if (typeof requestAnimationFrame !== 'undefined') {
            this.rafId = requestAnimationFrame(this.measureFPS.bind(this));
        }
    }
    /**
     * 获取当前 FPS
     * @example fpsMonitor.getFPS()
     */
    getFPS() {
        return this.fps;
    }
    /**
     * 停止监控
     */
    stop() {
        if (this.rafId !== null && typeof cancelAnimationFrame !== 'undefined') {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }
}
exports.FPSMonitor = FPSMonitor;
/**
 * 函数执行时间测量
 * @example measureTime(() => { // do something })
 */
function measureTime(fn, label) {
    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const result = fn();
    const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const duration = end - start;
    if (label) {
        console.log(`[${label}] 执行时间: ${duration.toFixed(2)}ms`);
    }
    return result;
}
/**
 * 异步函数执行时间测量
 * @example await measureAsyncTime(async () => { // do something })
 */
async function measureAsyncTime(fn, label) {
    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const result = await fn();
    const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const duration = end - start;
    if (label) {
        console.log(`[${label}] 执行时间: ${duration.toFixed(2)}ms`);
    }
    return result;
}
/**
 * 长任务监控
 */
function monitorLongTasks(callback) {
    if (typeof window === 'undefined' || !('PerformanceLongTaskTiming' in window)) {
        console.warn('Long Tasks API not supported');
        return () => { };
    }
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
            if (entry.duration > 50) {
                callback(entry.duration, [entry]);
            }
        });
    });
    try {
        observer.observe({ entryTypes: ['longtask'] });
    }
    catch (e) {
        console.warn('Failed to observe long tasks', e);
    }
    return () => observer.disconnect();
}
/**
 * 获取网络信息
 * @example getNetworkInfo()
 */
function getNetworkInfo() {
    if (typeof navigator === 'undefined')
        return null;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection)
        return null;
    return {
        effectiveType: connection.effectiveType, // 4g, 3g, 2g, slow-2g
        downlink: connection.downlink, // Mbps
        rtt: connection.rtt, // ms
        saveData: connection.saveData, // boolean
    };
}
/**
 * 创建性能监控实例
 */
const performanceMonitor = new PerformanceMonitor();
const performance_ = {
    PerformanceMonitor,
    FPSMonitor,
    measureTime,
    measureAsyncTime,
    monitorLongTasks,
    getNetworkInfo,
    monitor: performanceMonitor,
};
exports.default = performance_;
//# sourceMappingURL=performance.js.map