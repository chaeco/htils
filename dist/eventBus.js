"use strict";
/**
 * 事件总线/发布订阅工具
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBus = exports.EventBus = void 0;
class EventBus {
    constructor() {
        this.events = new Map();
        this.onceEvents = new Map();
    }
    /**
     * 订阅事件
     * @example bus.on('user:login', (user) => console.log(user))
     */
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(callback);
        // 返回取消订阅函数
        return () => this.off(event, callback);
    }
    /**
     * 订阅一次事件
     * @example bus.once('user:logout', (user) => console.log(user))
     */
    once(event, callback) {
        const wrapper = (...args) => {
            callback(...args);
            this.off(event, wrapper);
        };
        if (!this.onceEvents.has(event)) {
            this.onceEvents.set(event, new Set());
        }
        this.onceEvents.get(event).add(wrapper);
        return this.on(event, wrapper);
    }
    /**
     * 取消订阅
     * @example bus.off('user:login', callback)
     */
    off(event, callback) {
        if (!callback) {
            this.events.delete(event);
            this.onceEvents.delete(event);
            return;
        }
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.delete(callback);
        }
        const onceCallbacks = this.onceEvents.get(event);
        if (onceCallbacks) {
            onceCallbacks.delete(callback);
        }
    }
    /**
     * 发布事件
     * @example bus.emit('user:login', user)
     */
    emit(event, ...args) {
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(...args);
                }
                catch (error) {
                    console.error(`Error in event "${event}":`, error);
                }
            });
        }
    }
    /**
     * 获取事件的订阅者数量
     * @example const count = bus.listenerCount('user:login')
     */
    listenerCount(event) {
        const callbacks = this.events.get(event);
        return callbacks ? callbacks.size : 0;
    }
    /**
     * 获取所有事件名称
     * @example const events = bus.eventNames()
     */
    eventNames() {
        return Array.from(this.events.keys());
    }
    /**
     * 获取特定事件的所有监听器
     * @example const listeners = bus.listeners('user:login')
     */
    listeners(event) {
        const callbacks = this.events.get(event);
        return callbacks ? Array.from(callbacks) : [];
    }
    /**
     * 清除所有事件
     * @example bus.clear()
     */
    clear() {
        this.events.clear();
        this.onceEvents.clear();
    }
    /**
     * 清除特定事件
     * @example bus.clearEvent('user:login')
     */
    clearEvent(event) {
        this.events.delete(event);
        this.onceEvents.delete(event);
    }
    /**
     * 等待事件，返回 Promise
     * @example const user = await bus.waitFor('user:login')
     */
    waitFor(event, timeout) {
        return new Promise((resolve, reject) => {
            const timer = timeout ? setTimeout(() => {
                unsubscribe();
                reject(new Error(`Event "${event}" timeout`));
            }, timeout) : null;
            const unsubscribe = this.once(event, (...args) => {
                if (timer)
                    clearTimeout(timer);
                resolve(args.length === 1 ? args[0] : args);
            });
        });
    }
    /**
     * 异步发布事件，等待所有处理完成
     * @example await bus.asyncEmit('user:login', user)
     */
    async asyncEmit(event, ...args) {
        const callbacks = this.events.get(event);
        if (!callbacks)
            return;
        for (const callback of Array.from(callbacks)) {
            try {
                await callback(...args);
            }
            catch (error) {
                console.error(`Error in event "${event}":`, error);
            }
        }
    }
    /**
     * 先发先执行（如果已有监听器则立即执行，否则等待）
     * @example bus.emitOrWait('system:ready')
     */
    emitOrWait(event, ...args) {
        if (this.listenerCount(event) > 0) {
            this.emit(event, ...args);
            return Promise.resolve();
        }
        return this.waitFor(event);
    }
}
exports.EventBus = EventBus;
const eventBus = new EventBus();
exports.eventBus = eventBus;
exports.default = eventBus;
//# sourceMappingURL=eventBus.js.map