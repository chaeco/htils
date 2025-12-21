"use strict";
/**
 * 字符串处理工具函数 - 精简核心版本
 * 注：驼峰/蛇形转换请使用 scformat 模块，支持递归对象和数组
 */
Object.defineProperty(exports, "__esModule", { value: true });
const string = {
    /**
     * 首字母大写
     * @example capitalize('hello') // 'Hello'
     */
    capitalize(str) {
        if (!str)
            return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    /**
     * 转换为 kebab 命名
     * @example kebabCase('helloWorld') // 'hello-world'
     */
    kebabCase(str) {
        if (!str)
            return str;
        return str
            .replace(/([A-Z])/g, '-$1')
            .replace(/[_\s]+/g, '-')
            .toLowerCase()
            .replace(/^-/, '');
    },
    /**
     * 检查字符串是否为空
     * @example isEmpty('') // true
     */
    isEmpty(str) {
        return !str || str.length === 0;
    },
    /**
     * 检查字符串是否为空白
     * @example isBlank('   ') // true
     */
    isBlank(str) {
        return !str || str.trim().length === 0;
    },
    /**
     * 截断字符串
     * @example truncate('hello world', 5) // 'he...'
     */
    truncate(str, length, suffix = '...') {
        if (!str)
            return str;
        if (str.length <= length)
            return str;
        return str.slice(0, length) + suffix;
    },
    /**
     * 查找并替换第一个匹配项
     * @example replaceOnce('hello hello', 'hello', 'hi') // 'hi hello'
     */
    replaceOnce(str, search, replace) {
        if (!str)
            return str;
        return str.replace(search, replace);
    },
    /**
     * 忽略大小写的包含检查
     * @example includes('Hello', 'hello', false) // true
     */
    includes(str, substring, caseSensitive = true) {
        if (caseSensitive) {
            return str.includes(substring);
        }
        return str.toLowerCase().includes(substring.toLowerCase());
    },
    /**
     * 转换为大写
     * @example toUpper('hello') // 'HELLO'
     */
    toUpper(str) {
        return str.toUpperCase();
    },
    /**
     * 转换为小写
     * @example toLower('HELLO') // 'hello'
     */
    toLower(str) {
        return str.toLowerCase();
    },
    /**
     * 转换为 Title Case
     * @example toTitleCase('hello world') // 'Hello World'
     */
    toTitleCase(str) {
        if (!str)
            return str;
        return str
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    },
    /**
     * 重复字符串
     * @example repeat('a', 3) // 'aaa'
     */
    repeat(str, count) {
        return str.repeat(Math.max(0, count));
    },
};
exports.default = string;
//# sourceMappingURL=string.js.map