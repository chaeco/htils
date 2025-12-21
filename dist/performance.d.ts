/**
 * 性能监控工具 - 真实项目中的性能监控
 */
interface PerformanceMetrics {
    fcp?: number;
    lcp?: number;
    fid?: number;
    cls?: number;
    ttfb?: number;
    domLoad?: number;
    windowLoad?: number;
}
interface MemoryInfo {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
    usedPercentage: number;
}
/**
 * 性能监控类
 */
declare class PerformanceMonitor {
    private metrics;
    private observers;
    constructor();
    /**
     * 初始化性能观察器
     */
    private initObservers;
    /**
     * 测量页面加载时间
     */
    private measureLoadTimes;
    /**
     * 获取所有性能指标
     * @example monitor.getMetrics()
     */
    getMetrics(): PerformanceMetrics;
    /**
     * 获取页面加载时间
     * @example monitor.getPageLoadTime()
     */
    getPageLoadTime(): number | null;
    /**
     * 获取资源加载时间
     * @example monitor.getResourceTiming()
     */
    getResourceTiming(): PerformanceResourceTiming[];
    /**
     * 标记时间点
     * @example monitor.mark('user-action-start')
     */
    mark(name: string): void;
    /**
     * 测量两个标记之间的时间
     * @example monitor.measure('user-action', 'start', 'end')
     */
    measure(name: string, startMark: string, endMark: string): number;
    /**
     * 清除标记
     * @example monitor.clearMarks('my-mark')
     */
    clearMarks(name?: string): void;
    /**
     * 清除测量
     * @example monitor.clearMeasures('my-measure')
     */
    clearMeasures(name?: string): void;
    /**
     * 获取内存使用情况（仅 Chrome）
     * @example monitor.getMemoryInfo()
     */
    getMemoryInfo(): MemoryInfo | null;
    /**
     * 销毁观察器
     */
    destroy(): void;
}
/**
 * FPS 监控器
 */
declare class FPSMonitor {
    private fps;
    private lastTime;
    private frames;
    private rafId;
    private callback?;
    /**
     * 开始监控 FPS
     * @example fpsMonitor.start((fps) => console.log('FPS:', fps))
     */
    start(callback?: (fps: number) => void): void;
    /**
     * 测量 FPS
     */
    private measureFPS;
    /**
     * 获取当前 FPS
     * @example fpsMonitor.getFPS()
     */
    getFPS(): number;
    /**
     * 停止监控
     */
    stop(): void;
}
/**
 * 函数执行时间测量
 * @example measureTime(() => { // do something })
 */
declare function measureTime<T>(fn: () => T, label?: string): T;
/**
 * 异步函数执行时间测量
 * @example await measureAsyncTime(async () => { // do something })
 */
declare function measureAsyncTime<T>(fn: () => Promise<T>, label?: string): Promise<T>;
/**
 * 长任务监控
 */
declare function monitorLongTasks(callback: (duration: number, entries: PerformanceEntry[]) => void): () => void;
/**
 * 获取网络信息
 * @example getNetworkInfo()
 */
declare function getNetworkInfo(): any;
declare const performance_: {
    PerformanceMonitor: typeof PerformanceMonitor;
    FPSMonitor: typeof FPSMonitor;
    measureTime: typeof measureTime;
    measureAsyncTime: typeof measureAsyncTime;
    monitorLongTasks: typeof monitorLongTasks;
    getNetworkInfo: typeof getNetworkInfo;
    monitor: PerformanceMonitor;
};
export { PerformanceMonitor, FPSMonitor };
export default performance_;
//# sourceMappingURL=performance.d.ts.map