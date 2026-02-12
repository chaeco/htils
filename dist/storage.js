"use strict";
/**
 * 本地存储工具函数（支持 localStorage 和 sessionStorage）
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionStorage = exports.getLocalStorage = exports.Storage = void 0;
/**
 * 内存存储抽象，用于非浏览器环境
 */
class MemoryStorage {
    constructor() {
        this.data = {};
    }
    get length() {
        return Object.keys(this.data).length;
    }
    clear() {
        this.data = {};
    }
    getItem(key) {
        return this.data[key] || null;
    }
    key(index) {
        return Object.keys(this.data)[index] || null;
    }
    removeItem(key) {
        delete this.data[key];
    }
    setItem(key, value) {
        this.data[key] = value;
    }
}
class Storage {
    constructor(isSession = false, prefix = 'app_') {
        this.prefix = prefix;
        if (typeof window !== 'undefined') {
            this.storage = isSession ? sessionStorage : localStorage;
        }
        else {
            // Node.js 环境使用内存存储
            this.storage = new MemoryStorage();
        }
    }
    getKey(key) {
        return `${this.prefix}${key}`;
    }
    /**
     * 设置值
     * @example storage.set('user', { name: 'John' }, { expires: 3600000 })
     */
    set(key, value, options = {}) {
        try {
            const data = {
                value,
                timestamp: Date.now(),
                expires: options.expires,
                version: options.version,
            };
            this.storage.setItem(this.getKey(key), JSON.stringify(data));
        }
        catch (error) {
            console.error(`Failed to set storage key "${key}":`, error);
        }
    }
    /**
     * 获取值
     * @example const user = storage.get<User>('user')
     */
    get(key, defaultValue) {
        try {
            const fullKey = this.getKey(key);
            const item = this.storage.getItem(fullKey);
            if (!item) {
                return defaultValue ?? null;
            }
            const data = JSON.parse(item);
            // 检查过期时间
            if (data.expires && Date.now() - data.timestamp > data.expires) {
                this.remove(key);
                return defaultValue ?? null;
            }
            return data.value;
        }
        catch (error) {
            console.error(`Failed to get storage key "${key}":`, error);
            return defaultValue ?? null;
        }
    }
    /**
     * 判断是否存在某个键
     * @example if (storage.has('user')) { ... }
     */
    has(key) {
        return this.storage.getItem(this.getKey(key)) !== null;
    }
    /**
     * 删除某个值
     * @example storage.remove('user')
     */
    remove(key) {
        try {
            this.storage.removeItem(this.getKey(key));
        }
        catch (error) {
            console.error(`Failed to remove storage key "${key}":`, error);
        }
    }
    /**
     * 清空所有值
     * @example storage.clear()
     */
    clear() {
        try {
            const keysToRemove = [];
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                if (key && key.startsWith(this.prefix)) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => this.storage.removeItem(key));
        }
        catch (error) {
            console.error('Failed to clear storage:', error);
        }
    }
    /**
     * 获取所有键
     * @example const keys = storage.keys()
     */
    keys() {
        const keys = [];
        try {
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                if (key && key.startsWith(this.prefix)) {
                    keys.push(key.replace(this.prefix, ''));
                }
            }
        }
        catch (error) {
            console.error('Failed to get storage keys:', error);
        }
        return keys;
    }
    /**
     * 增加数值
     * @example storage.increment('counter', 1)
     */
    increment(key, step = 1) {
        const current = this.get(key, 0) ?? 0;
        const newValue = current + step;
        this.set(key, newValue);
        return newValue;
    }
    /**
     * 减少数值
     * @example storage.decrement('counter', 1)
     */
    decrement(key, step = 1) {
        return this.increment(key, -step);
    }
    /**
     * 追加数组元素
     * @example storage.push('items', 'newItem')
     */
    push(key, value) {
        const arr = this.get(key, []) ?? [];
        arr.push(value);
        this.set(key, arr);
        return arr;
    }
    /**
     * 移除数组元素
     * @example storage.pop('items')
     */
    pop(key) {
        const arr = this.get(key, []) ?? [];
        const value = arr.pop();
        this.set(key, arr);
        return value;
    }
    /**
     * 获取存储大小（字节）
     * @example const size = storage.getSize('user')
     */
    getSize(key) {
        try {
            const item = this.storage.getItem(this.getKey(key));
            if (!item)
                return 0;
            if (typeof Blob !== 'undefined') {
                return new Blob([item]).size;
            }
            // Node.js fallback
            return typeof Buffer !== 'undefined' ? Buffer.byteLength(item) : item.length;
        }
        catch (error) {
            return 0;
        }
    }
    /**
     * 获取总容量使用情况
     * @example const usage = storage.getTotalSize()
     */
    getTotalSize() {
        let total = 0;
        try {
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                if (key) {
                    const item = this.storage.getItem(key);
                    if (item) {
                        if (typeof Blob !== 'undefined') {
                            total += new Blob([item]).size;
                        }
                        else {
                            total += typeof Buffer !== 'undefined' ? Buffer.byteLength(item) : item.length;
                        }
                    }
                }
            }
        }
        catch (error) {
            console.error('Failed to get total storage size:', error);
        }
        return total;
    }
    /**
     * 清理过期的数据
     * @example storage.cleanup()
     */
    cleanup() {
        let removedCount = 0;
        try {
            const keys = this.keys();
            keys.forEach(key => {
                const fullKey = this.getKey(key);
                const item = this.storage.getItem(fullKey);
                if (item) {
                    try {
                        const data = JSON.parse(item);
                        if (data.expires && Date.now() - data.timestamp > data.expires) {
                            this.remove(key);
                            removedCount++;
                        }
                    }
                    catch (error) {
                        // 无效数据，删除
                        this.storage.removeItem(fullKey);
                        removedCount++;
                    }
                }
            });
        }
        catch (error) {
            console.error('Failed to cleanup storage:', error);
        }
        return removedCount;
    }
}
exports.Storage = Storage;
// 延迟初始化实例，避免 Node.js 环境错误
let localStorage_ = null;
let sessionStorage_ = null;
const getLocalStorage = () => {
    if (!localStorage_) {
        localStorage_ = new Storage(false, 'app_');
    }
    return localStorage_;
};
exports.getLocalStorage = getLocalStorage;
const getSessionStorage = () => {
    if (!sessionStorage_) {
        sessionStorage_ = new Storage(true, 'session_');
    }
    return sessionStorage_;
};
exports.getSessionStorage = getSessionStorage;
exports.default = {
    get local() {
        return getLocalStorage();
    },
    get session() {
        return getSessionStorage();
    },
    createStorage: (isSession = false, prefix = 'app_') => new Storage(isSession, prefix),
};
//# sourceMappingURL=storage.js.map