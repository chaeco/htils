"use strict";
/**
 * 防抖和节流工具函数
 */
Object.defineProperty(exports, "__esModule", { value: true });
const debounceThrottle = {
    /**
     * 防抖：等待延迟时间后，如果没有再次调用，则执行函数
     * @example const debouncedFn = debounce(handleInput, 300)
     */
    debounce(fn, delay, options = {}) {
        let timeoutId = null;
        let lastCallTime = 0;
        let lastInvokeTime = 0;
        let result;
        const { leading = false, trailing = true, maxWait } = options;
        const invokeFunc = (time) => {
            result = fn();
            lastInvokeTime = time;
            timeoutId = null;
        };
        const shouldInvoke = (time) => {
            if (timeoutId === null) {
                return (time - lastInvokeTime) >= delay;
            }
            return false;
        };
        const timerExpired = () => {
            const time = Date.now();
            if (shouldInvoke(time)) {
                if (trailing) {
                    timeoutId = setTimeout(() => invokeFunc(Date.now()), delay);
                }
                else {
                    timeoutId = null;
                }
            }
        };
        const debounced = function (...args) {
            const time = Date.now();
            const isInvoking = shouldInvoke(time);
            lastCallTime = time;
            if (timeoutId)
                clearTimeout(timeoutId);
            if (isInvoking) {
                if (leading && timeoutId === null) {
                    result = fn.apply(this, args);
                    lastInvokeTime = time;
                }
                else {
                    timeoutId = setTimeout(timerExpired, delay);
                }
            }
            return result;
        };
        debounced.cancel = () => {
            if (timeoutId)
                clearTimeout(timeoutId);
            timeoutId = null;
            lastInvokeTime = 0;
        };
        debounced.flush = () => {
            return timeoutId === null ? result : invokeFunc(Date.now());
        };
        return debounced;
    },
    /**
     * 节流：在延迟时间内，最多执行一次函数
     * @example const throttledFn = throttle(handleScroll, 300)
     */
    throttle(fn, limit, options = {}) {
        let inThrottle = false;
        let lastRan = 0;
        let timeoutId = null;
        const { leading = true, trailing = true } = options;
        return function (...args) {
            const now = Date.now();
            if (leading && !lastRan) {
                fn.apply(this, args);
                lastRan = now;
            }
            else if (trailing) {
                if (timeoutId)
                    clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    if (now - lastRan >= limit) {
                        fn.apply(this, args);
                        lastRan = now;
                    }
                }, limit - (now - lastRan));
            }
        };
    },
    /**
     * 立即执行，然后防抖后续调用
     * @example const leadingDebounce = immediate(handleClick, 300)
     */
    immediate(fn, delay) {
        let timeoutId = null;
        let hasBeenCalled = false;
        return function (...args) {
            if (!hasBeenCalled) {
                fn.apply(this, args);
                hasBeenCalled = true;
            }
            if (timeoutId)
                clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                hasBeenCalled = false;
            }, delay);
        };
    },
    /**
     * 节流，但保证最后一次调用必须执行
     * @example const throttleWithTrailing = throttleWithTrailing(handleEvent, 1000)
     */
    throttleWithTrailing(fn, limit) {
        let inThrottle = false;
        let lastArgs = null;
        return function (...args) {
            lastArgs = args;
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => {
                    inThrottle = false;
                    if (lastArgs) {
                        fn.apply(this, lastArgs);
                        lastArgs = null;
                    }
                }, limit);
            }
        };
    },
    /**
     * 防止快速重复调用（冷却时间）
     * @example const cooldown = withCooldown(handleClick, 2000)
     */
    withCooldown(fn, cooldownTime) {
        let lastCallTime = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCallTime >= cooldownTime) {
                lastCallTime = now;
                fn.apply(this, args);
                return true;
            }
            return false;
        };
    },
};
exports.default = debounceThrottle;
//# sourceMappingURL=debounceThrottle.js.map