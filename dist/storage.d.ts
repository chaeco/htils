/**
 * 本地存储工具函数（支持 localStorage 和 sessionStorage）
 */
interface StorageOptions {
    expires?: number;
    version?: number;
}
declare class Storage {
    private prefix;
    private storage;
    constructor(isSession?: boolean, prefix?: string);
    private getKey;
    /**
     * 设置值
     * @example storage.set('user', { name: 'John' }, { expires: 3600000 })
     */
    set<T>(key: string, value: T, options?: StorageOptions): void;
    /**
     * 获取值
     * @example const user = storage.get<User>('user')
     */
    get<T>(key: string, defaultValue?: T): T | null;
    /**
     * 判断是否存在某个键
     * @example if (storage.has('user')) { ... }
     */
    has(key: string): boolean;
    /**
     * 删除某个值
     * @example storage.remove('user')
     */
    remove(key: string): void;
    /**
     * 清空所有值
     * @example storage.clear()
     */
    clear(): void;
    /**
     * 获取所有键
     * @example const keys = storage.keys()
     */
    keys(): string[];
    /**
     * 增加数值
     * @example storage.increment('counter', 1)
     */
    increment(key: string, step?: number): number;
    /**
     * 减少数值
     * @example storage.decrement('counter', 1)
     */
    decrement(key: string, step?: number): number;
    /**
     * 追加数组元素
     * @example storage.push('items', 'newItem')
     */
    push<T>(key: string, value: T): T[];
    /**
     * 移除数组元素
     * @example storage.pop('items')
     */
    pop<T>(key: string): T | undefined;
    /**
     * 获取存储大小（字节）
     * @example const size = storage.getSize('user')
     */
    getSize(key: string): number;
    /**
     * 获取总容量使用情况
     * @example const usage = storage.getTotalSize()
     */
    getTotalSize(): number;
    /**
     * 清理过期的数据
     * @example storage.cleanup()
     */
    cleanup(): number;
}
declare const getLocalStorage: () => Storage;
declare const getSessionStorage: () => Storage;
export { Storage, getLocalStorage, getSessionStorage };
declare const _default: {
    readonly local: Storage;
    readonly session: Storage;
    createStorage: (isSession?: boolean, prefix?: string) => Storage;
};
export default _default;
//# sourceMappingURL=storage.d.ts.map