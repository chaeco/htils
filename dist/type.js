"use strict";
/**
 * 类型检查工具函数
 */
Object.defineProperty(exports, "__esModule", { value: true });
const type = {
    /**
     * 获取精确的数据类型
     * @example getType({}) // 'Object'
     */
    getType(value) {
        return Object.prototype.toString.call(value).slice(8, -1);
    },
    /**
     * 判断是否为对象
     * @example isObject({}) // true
     */
    isObject(value) {
        return this.getType(value) === 'Object';
    },
    /**
     * 判断是否为数组
     * @example isArray([]) // true
     */
    isArray(value) {
        return Array.isArray(value);
    },
    /**
     * 判断是否为字符串
     * @example isString('hello') // true
     */
    isString(value) {
        return typeof value === 'string';
    },
    /**
     * 判断是否为数字
     * @example isNumber(123) // true
     */
    isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    },
    /**
     * 判断是否为布尔值
     * @example isBoolean(true) // true
     */
    isBoolean(value) {
        return typeof value === 'boolean';
    },
    /**
     * 判断是否为函数
     * @example isFunction(() => {}) // true
     */
    isFunction(value) {
        return typeof value === 'function';
    },
    /**
     * 判断是否为 null
     * @example isNull(null) // true
     */
    isNull(value) {
        return value === null;
    },
    /**
     * 判断是否为 undefined
     * @example isUndefined(undefined) // true
     */
    isUndefined(value) {
        return value === undefined;
    },
    /**
     * 判断是否为 null 或 undefined
     * @example isNil(null) // true
     */
    isNil(value) {
        return value === null || value === undefined;
    },
    /**
     * 判断是否为日期对象
     * @example isDate(new Date()) // true
     */
    isDate(value) {
        return this.getType(value) === 'Date';
    },
    /**
     * 判断是否为正则表达式
     * @example isRegExp(/test/) // true
     */
    isRegExp(value) {
        return this.getType(value) === 'RegExp';
    },
    /**
     * 判断是否为 Map
     * @example isMap(new Map()) // true
     */
    isMap(value) {
        return this.getType(value) === 'Map';
    },
    /**
     * 判断是否为 Set
     * @example isSet(new Set()) // true
     */
    isSet(value) {
        return this.getType(value) === 'Set';
    },
    /**
     * 判断是否为 Symbol
     * @example isSymbol(Symbol('test')) // true
     */
    isSymbol(value) {
        return typeof value === 'symbol';
    },
    /**
     * 判断是否为 Promise
     * @example isPromise(Promise.resolve()) // true
     */
    isPromise(value) {
        return this.getType(value) === 'Promise' || (value && typeof value.then === 'function');
    },
    /**
     * 判断是否为 WeakMap
     * @example isWeakMap(new WeakMap()) // true
     */
    isWeakMap(value) {
        return this.getType(value) === 'WeakMap';
    },
    /**
     * 判断是否为 WeakSet
     * @example isWeakSet(new WeakSet()) // true
     */
    isWeakSet(value) {
        return this.getType(value) === 'WeakSet';
    },
    /**
     * 判断是否为可迭代对象
     * @example isIterable([1, 2, 3]) // true
     */
    isIterable(value) {
        return value !== null && typeof value[Symbol.iterator] === 'function';
    },
    /**
     * 判断是否为空对象
     * @example isEmptyObject({}) // true
     */
    isEmptyObject(value) {
        if (!this.isObject(value))
            return false;
        return Object.keys(value).length === 0;
    },
    /**
     * 判断是否为空数组
     * @example isEmptyArray([]) // true
     */
    isEmptyArray(value) {
        if (!this.isArray(value))
            return false;
        return value.length === 0;
    },
    /**
     * 判断是否为空字符串
     * @example isEmptyString('') // true
     */
    isEmptyString(value) {
        if (!this.isString(value))
            return false;
        return value.trim().length === 0;
    },
    /**
     * 判断是否为平凡对象（纯 Object）
     * @example isPlainObject({}) // true
     * @example isPlainObject(new MyClass()) // false
     */
    isPlainObject(value) {
        if (this.getType(value) !== 'Object')
            return false;
        return Object.getPrototypeOf(value) === Object.prototype;
    },
    /**
     * 判断值是否为 truthy
     * @example isTruthy(1) // true
     * @example isTruthy(0) // false
     */
    isTruthy(value) {
        return !!value;
    },
    /**
     * 判断值是否为 falsy
     * @example isFalsy(0) // true
     * @example isFalsy(1) // false
     */
    isFalsy(value) {
        return !value;
    },
    /**
     * 判断是否为原始类型
     * @example isPrimitive('hello') // true
     */
    isPrimitive(value) {
        const type = typeof value;
        return type !== 'object' || value === null;
    },
};
exports.default = type;
//# sourceMappingURL=type.js.map