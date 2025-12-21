/**
 * 防抖和节流工具函数
 */
declare const debounceThrottle: {
    /**
     * 防抖：等待延迟时间后，如果没有再次调用，则执行函数
     * @example const debouncedFn = debounce(handleInput, 300)
     */
    debounce<T extends (...args: any[]) => any>(fn: T, delay: number, options?: {
        leading?: boolean;
        trailing?: boolean;
        maxWait?: number;
    }): (...args: Parameters<T>) => void;
    /**
     * 节流：在延迟时间内，最多执行一次函数
     * @example const throttledFn = throttle(handleScroll, 300)
     */
    throttle<T extends (...args: any[]) => any>(fn: T, limit: number, options?: {
        leading?: boolean;
        trailing?: boolean;
    }): (...args: Parameters<T>) => void;
    /**
     * 立即执行，然后防抖后续调用
     * @example const leadingDebounce = immediate(handleClick, 300)
     */
    immediate<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void;
    /**
     * 节流，但保证最后一次调用必须执行
     * @example const throttleWithTrailing = throttleWithTrailing(handleEvent, 1000)
     */
    throttleWithTrailing<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void;
    /**
     * 防止快速重复调用（冷却时间）
     * @example const cooldown = withCooldown(handleClick, 2000)
     */
    withCooldown<T extends (...args: any[]) => any>(fn: T, cooldownTime: number): (...args: Parameters<T>) => boolean;
};
export default debounceThrottle;
//# sourceMappingURL=debounceThrottle.d.ts.map