/**
 * 类型检查工具函数
 */
declare const type: {
    /**
     * 获取精确的数据类型
     * @example getType({}) // 'Object'
     */
    getType(value: any): string;
    /**
     * 判断是否为对象
     * @example isObject({}) // true
     */
    isObject(value: any): boolean;
    /**
     * 判断是否为数组
     * @example isArray([]) // true
     */
    isArray(value: any): boolean;
    /**
     * 判断是否为字符串
     * @example isString('hello') // true
     */
    isString(value: any): boolean;
    /**
     * 判断是否为数字
     * @example isNumber(123) // true
     */
    isNumber(value: any): boolean;
    /**
     * 判断是否为布尔值
     * @example isBoolean(true) // true
     */
    isBoolean(value: any): boolean;
    /**
     * 判断是否为函数
     * @example isFunction(() => {}) // true
     */
    isFunction(value: any): boolean;
    /**
     * 判断是否为 null
     * @example isNull(null) // true
     */
    isNull(value: any): boolean;
    /**
     * 判断是否为 undefined
     * @example isUndefined(undefined) // true
     */
    isUndefined(value: any): boolean;
    /**
     * 判断是否为 null 或 undefined
     * @example isNil(null) // true
     */
    isNil(value: any): boolean;
    /**
     * 判断是否为日期对象
     * @example isDate(new Date()) // true
     */
    isDate(value: any): boolean;
    /**
     * 判断是否为正则表达式
     * @example isRegExp(/test/) // true
     */
    isRegExp(value: any): boolean;
    /**
     * 判断是否为 Map
     * @example isMap(new Map()) // true
     */
    isMap(value: any): boolean;
    /**
     * 判断是否为 Set
     * @example isSet(new Set()) // true
     */
    isSet(value: any): boolean;
    /**
     * 判断是否为 Symbol
     * @example isSymbol(Symbol('test')) // true
     */
    isSymbol(value: any): boolean;
    /**
     * 判断是否为 Promise
     * @example isPromise(Promise.resolve()) // true
     */
    isPromise(value: any): boolean;
    /**
     * 判断是否为 WeakMap
     * @example isWeakMap(new WeakMap()) // true
     */
    isWeakMap(value: any): boolean;
    /**
     * 判断是否为 WeakSet
     * @example isWeakSet(new WeakSet()) // true
     */
    isWeakSet(value: any): boolean;
    /**
     * 判断是否为可迭代对象
     * @example isIterable([1, 2, 3]) // true
     */
    isIterable(value: any): boolean;
    /**
     * 判断是否为空对象
     * @example isEmptyObject({}) // true
     */
    isEmptyObject(value: any): boolean;
    /**
     * 判断是否为空数组
     * @example isEmptyArray([]) // true
     */
    isEmptyArray(value: any): boolean;
    /**
     * 判断是否为空字符串
     * @example isEmptyString('') // true
     */
    isEmptyString(value: any): boolean;
    /**
     * 判断是否为平凡对象（纯 Object）
     * @example isPlainObject({}) // true
     * @example isPlainObject(new MyClass()) // false
     */
    isPlainObject(value: any): boolean;
    /**
     * 判断值是否为 truthy
     * @example isTruthy(1) // true
     * @example isTruthy(0) // false
     */
    isTruthy(value: any): boolean;
    /**
     * 判断值是否为 falsy
     * @example isFalsy(0) // true
     * @example isFalsy(1) // false
     */
    isFalsy(value: any): boolean;
    /**
     * 判断是否为原始类型
     * @example isPrimitive('hello') // true
     */
    isPrimitive(value: any): boolean;
};
export default type;
//# sourceMappingURL=type.d.ts.map