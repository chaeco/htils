/**
 * 字符串处理工具函数 - 精简核心版本
 * 注：驼峰/蛇形转换请使用 scformat 模块，支持递归对象和数组
 */
declare const string: {
    /**
     * 首字母大写
     * @example capitalize('hello') // 'Hello'
     */
    capitalize(str: string): string;
    /**
     * 转换为 kebab 命名
     * @example kebabCase('helloWorld') // 'hello-world'
     */
    kebabCase(str: string): string;
    /**
     * 检查字符串是否为空
     * @example isEmpty('') // true
     */
    isEmpty(str: string): boolean;
    /**
     * 检查字符串是否为空白
     * @example isBlank('   ') // true
     */
    isBlank(str: string): boolean;
    /**
     * 截断字符串
     * @example truncate('hello world', 5) // 'he...'
     */
    truncate(str: string, length: number, suffix?: string): string;
    /**
     * 查找并替换第一个匹配项
     * @example replaceOnce('hello hello', 'hello', 'hi') // 'hi hello'
     */
    replaceOnce(str: string, search: string, replace: string): string;
    /**
     * 忽略大小写的包含检查
     * @example includes('Hello', 'hello', false) // true
     */
    includes(str: string, substring: string, caseSensitive?: boolean): boolean;
    /**
     * 转换为大写
     * @example toUpper('hello') // 'HELLO'
     */
    toUpper(str: string): string;
    /**
     * 转换为小写
     * @example toLower('HELLO') // 'hello'
     */
    toLower(str: string): string;
    /**
     * 转换为 Title Case
     * @example toTitleCase('hello world') // 'Hello World'
     */
    toTitleCase(str: string): string;
    /**
     * 重复字符串
     * @example repeat('a', 3) // 'aaa'
     */
    repeat(str: string, count: number): string;
};
export default string;
//# sourceMappingURL=string.d.ts.map