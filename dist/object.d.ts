/**
 * 对象处理工具函数
 */
declare const object: {
    /**
     * 判断值是否为纯对象
     */
    isPlainObject(value: unknown): value is Record<string, unknown>;
    /**
     * 深拷贝
     * @example deepClone({ a: { b: 1 } }) // { a: { b: 1 } }
     */
    deepClone<T>(obj: T): T;
    /**
     * 浅拷贝
     * @example shallowClone({ a: { b: 1 } }) // { a: { b: 1 } }
     */
    shallowClone<T extends Record<string, any>>(obj: T): T;
    /**
     * 合并对象
     * @example merge({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
     */
    merge<T extends Record<string, any>>(...objects: T[]): T;
    /**
     * 深度合并对象
     * @example deepMerge({ a: { b: 1 } }, { a: { c: 2 } }) // { a: { b: 1, c: 2 } }
     */
    deepMerge<T extends Record<string, any>>(...objects: T[]): T;
    /**
     * 选取指定属性
     * @example pick({ a: 1, b: 2, c: 3 }, ['a', 'b']) // { a: 1, b: 2 }
     */
    pick<T extends Record<string, any>>(obj: T, keys: (keyof T)[]): Partial<T>;
    /**
     * 排除指定属性
     * @example omit({ a: 1, b: 2, c: 3 }, ['c']) // { a: 1, b: 2 }
     */
    omit<T extends Record<string, any>>(obj: T, keys: (keyof T)[]): Partial<T>;
    /**
     * 判断对象是否为空
     * @example isEmpty({}) // true
     * @example isEmpty({ a: 1 }) // false
     */
    isEmpty(obj: Record<string, any>): boolean;
    /**
     * 判断对象是否存在指定属性
     * @example hasKey({ a: 1 }, 'a') // true
     */
    hasKey(obj: Record<string, any>, key: string): boolean;
    /**
     * 获取对象的所有键
     * @example keys({ a: 1, b: 2 }) // ['a', 'b']
     */
    keys(obj: Record<string, any>): string[];
    /**
     * 获取对象的所有值
     * @example values({ a: 1, b: 2 }) // [1, 2]
     */
    values(obj: Record<string, any>): any[];
    /**
     * 获取对象的所有键值对
     * @example entries({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
     */
    entries(obj: Record<string, any>): Array<[string, any]>;
    /**
     * 从键值对创建对象
     * @example fromEntries([['a', 1], ['b', 2]]) // { a: 1, b: 2 }
     */
    fromEntries(entries: Array<[string, any]>): Record<string, any>;
    /**
     * 转换对象的键
     * @example mapKeys({ a: 1, b: 2 }, key => key.toUpperCase()) // { A: 1, B: 2 }
     */
    mapKeys<T extends Record<string, any>>(obj: T, fn: (key: string) => string): Record<string, any>;
    /**
     * 转换对象的值
     * @example mapValues({ a: 1, b: 2 }, val => val * 2) // { a: 2, b: 4 }
     */
    mapValues<T extends Record<string, any>>(obj: T, fn: (value: any, key: string) => any): Record<string, any>;
    /**
     * 过滤对象的键值对
     * @example filter({ a: 1, b: 2, c: 3 }, val => val > 1) // { b: 2, c: 3 }
     */
    filter<T extends Record<string, any>>(obj: T, predicate: (value: any, key: string) => boolean): Partial<T>;
    /**
     * 判断两个对象是否相等（深度比较）
     * @example isEqual({ a: 1 }, { a: 1 }) // true
     */
    isEqual(obj1: any, obj2: any): boolean;
    /**
     * 反转对象的键和值
     * @example invert({ a: '1', b: '2' }) // { 1: 'a', 2: 'b' }
     */
    invert(obj: Record<string, any>): Record<string, any>;
    /**
     * 检查对象是否包含特定的键值对
     * @example contains({ a: 1, b: 2 }, { a: 1 }) // true
     */
    contains(obj: Record<string, any>, target: Record<string, any>): boolean;
    /**
     * 获取对象的嵌套属性值
     * @example get({ a: { b: { c: 1 } } }, 'a.b.c') // 1
     */
    get(obj: Record<string, any>, path: string, defaultValue?: any): any;
    /**
     * 设置对象的嵌套属性值
     * @example set({ a: {} }, 'a.b.c', 1) // { a: { b: { c: 1 } } }
     */
    set(obj: Record<string, any>, path: string, value: any): Record<string, any>;
};
export default object;
//# sourceMappingURL=object.d.ts.map