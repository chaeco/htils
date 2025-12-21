/**
 * 缓存管理工具
 */
interface CacheOptions<T> {
    ttl?: number;
    maxSize?: number;
    onEvict?: (key: string, value: T) => void;
}
declare class Cache<T = any> {
    private cache;
    private ttl;
    private maxSize;
    private onEvict?;
    private accessOrder;
    constructor(options?: CacheOptions<T>);
    /**
     * 设置缓存
     * @example cache.set('user:1', userData)
     */
    set(key: string, value: T, ttl?: number): void;
    /**
     * 获取缓存
     * @example const data = cache.get('user:1')
     */
    get(key: string): T | null;
    /**
     * 判断缓存是否存在
     * @example if (cache.has('user:1')) { ... }
     */
    has(key: string): boolean;
    /**
     * 删除缓存
     * @example cache.delete('user:1')
     */
    delete(key: string): boolean;
    /**
     * 清空所有缓存
     * @example cache.clear()
     */
    clear(): void;
    /**
     * 获取缓存的大小
     * @example const size = cache.size()
     */
    size(): number;
    /**
     * 获取所有的键
     * @example const keys = cache.keys()
     */
    keys(): string[];
    /**
     * 获取所有的值
     * @example const values = cache.values()
     */
    values(): T[];
    /**
     * 获取所有的键值对
     * @example const entries = cache.entries()
     */
    entries(): Array<[string, T]>;
    /**
     * 更新或设置，带有工厂函数
     * @example cache.getOrSet('user:1', () => fetchUser(1))
     */
    getOrSet(key: string, factory: () => T | Promise<T>): T | Promise<T>;
    /**
     * 删除匹配的键
     * @example cache.deleteMatching(/^user:/)
     */
    deleteMatching(pattern: RegExp | ((key: string) => boolean)): number;
    /**
     * 清理过期缓存
     * @example cache.cleanup()
     */
    cleanup(): number;
    /**
     * 获取缓存统计信息
     * @example const stats = cache.getStats()
     */
    getStats(): {
        size: number;
        maxSize: number | null;
        defaultTtl: number | null;
        hits: number;
        misses: number;
    };
    /**
     * LRU 驱逐（驱逐最少使用的）
     */
    private evictLRU;
    /**
     * 更新访问顺序
     */
    private updateAccessOrder;
    /**
     * 返回迭代器
     */
    [Symbol.iterator](): ArrayIterator<[string, T]>;
}
export { Cache };
export default Cache;
//# sourceMappingURL=cache.d.ts.map