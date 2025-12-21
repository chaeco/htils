/**
 * Promise 异步操作工具函数
 */
declare const promise: {
    /**
     * 延迟执行
     * @example await sleep(1000) // wait 1 second
     */
    sleep(ms: number): Promise<void>;
    /**
     * 带超时的 Promise
     * @example await timeout(fetch(...), 5000)
     */
    timeout<T>(promise: Promise<T>, ms: number): Promise<T>;
    /**
     * 重试机制
     * @example await retry(() => fetchData(), 3, 1000)
     */
    retry<T>(fn: () => Promise<T>, times?: number, delay?: number): Promise<T>;
    /**
     * 串行执行
     * @example await series([() => Promise.resolve(1), () => Promise.resolve(2)])
     */
    series<T>(tasks: Array<() => Promise<T> | T>): Promise<T[]>;
    /**
     * 并行执行
     * @example await parallel([promise1, promise2])
     */
    parallel<T>(promises: Promise<T>[]): Promise<T[]>;
    /**
     * 并发控制
     * @example await concurrency([promise1, promise2, promise3], 2)
     */
    concurrency<T>(promises: Promise<T>[], limit: number): Promise<T[]>;
    /**
     * 轮询直到满足条件
     * @example await poll(() => checkStatus(), 10, 1000)
     */
    poll<T>(fn: () => Promise<T>, times?: number, interval?: number): Promise<T>;
    /**
     * 可取消的 Promise
     */
    cancellable<T>(promise: Promise<T>): {
        promise: Promise<T>;
        cancel: () => void;
    };
    /**
     * Callback 转 Promise
     */
    promisify<T>(fn: (callback: (err: any, result?: T) => void) => void): Promise<T>;
    /**
     * 等待任意 Promise 完成
     * @example await race([promise1, promise2])
     */
    race<T>(promises: Promise<T>[]): Promise<T>;
    /**
     * 处理 Promise 结果（不抛出错误）
     * @example const [err, data] = await handle(promise)
     */
    handle<T, E = Error>(promise: Promise<T>): Promise<[E | null, T | undefined]>;
};
export default promise;
//# sourceMappingURL=promise.d.ts.map