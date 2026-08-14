"use strict";
/**
 * Promise 异步操作工具函数
 */
Object.defineProperty(exports, "__esModule", { value: true });
const promise = {
    /**
     * 延迟执行
     * @example await sleep(1000) // wait 1 second
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    /**
     * 带超时的 Promise
     * @example await timeout(fetch(...), 5000)
     */
    timeout(promise, ms) {
        return Promise.race([
            promise,
            new Promise((_, reject) => setTimeout(() => reject(new Error(`Promise timeout after ${ms}ms`)), ms)),
        ]);
    },
    /**
     * 重试机制
     * @example await retry(() => fetchData(), 3, 1000)
     */
    async retry(fn, times = 3, delay = 1000) {
        let lastError;
        for (let i = 0; i < times; i++) {
            try {
                return await fn();
            }
            catch (error) {
                lastError = error;
                if (i < times - 1) {
                    await this.sleep(delay);
                }
            }
        }
        throw lastError || new Error('Retry failed');
    },
    /**
     * 串行执行
     * @example await series([() => Promise.resolve(1), () => Promise.resolve(2)])
     */
    async series(tasks) {
        const results = [];
        for (const task of tasks) {
            results.push(await Promise.resolve(task()));
        }
        return results;
    },
    /**
     * 并行执行
     * @example await parallel([promise1, promise2])
     */
    async parallel(promises) {
        return Promise.all(promises);
    },
    /**
     * 并发控制
     * @example await concurrency([promise1, promise2, promise3], 2)
     * 结果顺序与输入顺序一致（类似 Promise.all），并发度受 limit 限制
     */
    async concurrency(promises, limit) {
        const result = new Array(promises.length);
        const executing = [];
        for (let i = 0; i < promises.length; i++) {
            const p = Promise.resolve(promises[i]).then(value => {
                result[i] = value;
                executing.splice(executing.indexOf(p), 1);
            });
            executing.push(p);
            if (executing.length >= limit) {
                await Promise.race(executing);
            }
        }
        await Promise.all(executing);
        return result;
    },
    /**
     * 轮询直到满足条件
     * @example await poll(() => checkStatus(), 10, 1000)
     */
    async poll(fn, times = 10, interval = 1000) {
        let lastError;
        for (let i = 0; i < times; i++) {
            try {
                return await fn();
            }
            catch (error) {
                lastError = error;
                if (i < times - 1) {
                    await this.sleep(interval);
                }
            }
        }
        throw lastError || new Error('Poll failed');
    },
    /**
     * 可取消的 Promise
     */
    cancellable(promise) {
        let cancel = null;
        const wrappedPromise = new Promise((resolve, reject) => {
            cancel = () => reject(new Error('Promise cancelled'));
            promise.then(resolve).catch(reject);
        });
        return {
            promise: wrappedPromise,
            cancel: () => cancel?.(),
        };
    },
    /**
     * Callback 转 Promise
     */
    promisify(fn) {
        return new Promise((resolve, reject) => {
            fn((err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    },
    /**
     * 等待任意 Promise 完成
     * @example await race([promise1, promise2])
     */
    async race(promises) {
        return Promise.race(promises);
    },
    /**
     * 处理 Promise 结果（不抛出错误）
     * @example const [err, data] = await handle(promise)
     */
    async handle(promise) {
        return promise
            .then((data) => [null, data])
            .catch((err) => [err, undefined]);
    },
};
exports.default = promise;
//# sourceMappingURL=promise.js.map