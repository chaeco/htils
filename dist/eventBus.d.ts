/**
 * 事件总线/发布订阅工具
 */
type EventCallback = (...args: any[]) => void;
declare class EventBus {
    private events;
    private onceEvents;
    /**
     * 订阅事件
     * @example bus.on('user:login', (user) => console.log(user))
     */
    on(event: string, callback: EventCallback): () => void;
    /**
     * 订阅一次事件
     * @example bus.once('user:logout', (user) => console.log(user))
     */
    once(event: string, callback: EventCallback): () => void;
    /**
     * 取消订阅
     * @example bus.off('user:login', callback)
     */
    off(event: string, callback?: EventCallback): void;
    /**
     * 发布事件
     * @example bus.emit('user:login', user)
     */
    emit(event: string, ...args: any[]): void;
    /**
     * 获取事件的订阅者数量
     * @example const count = bus.listenerCount('user:login')
     */
    listenerCount(event: string): number;
    /**
     * 获取所有事件名称
     * @example const events = bus.eventNames()
     */
    eventNames(): string[];
    /**
     * 获取特定事件的所有监听器
     * @example const listeners = bus.listeners('user:login')
     */
    listeners(event: string): EventCallback[];
    /**
     * 清除所有事件
     * @example bus.clear()
     */
    clear(): void;
    /**
     * 清除特定事件
     * @example bus.clearEvent('user:login')
     */
    clearEvent(event: string): void;
    /**
     * 等待事件，返回 Promise
     * @example const user = await bus.waitFor('user:login')
     */
    waitFor(event: string, timeout?: number): Promise<any>;
    /**
     * 异步发布事件，等待所有处理完成
     * @example await bus.asyncEmit('user:login', user)
     */
    asyncEmit(event: string, ...args: any[]): Promise<void>;
    /**
     * 先发先执行（如果已有监听器则立即执行，否则等待）
     * @example bus.emitOrWait('system:ready')
     */
    emitOrWait(event: string, ...args: any[]): Promise<void>;
}
declare const eventBus: EventBus;
export { EventBus, eventBus };
export default eventBus;
//# sourceMappingURL=eventBus.d.ts.map