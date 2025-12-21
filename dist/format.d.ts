/**
 * 数据格式化工具函数
 */
declare const format: {
    /**
     * 格式化货币
     * @example formatCurrency(1234.5) // '$1,234.50'
     * @example formatCurrency(1234.5, 'CNY', 'zh-CN') // '¥1,234.50'
     */
    formatCurrency(amount: number, currency?: string, locale?: string): string;
    /**
     * 格式化百分比
     * @example formatPercentage(0.5) // '50.00%'
     */
    formatPercentage(value: number, precision?: number): string;
    /**
     * 格式化文件大小
     * @example formatFileSize(1024) // '1 KB'
     * @example formatFileSize(1024 * 1024) // '1 MB'
     */
    formatFileSize(bytes: number): string;
    /**
     * 格式化数字（千位分隔符）
     * @example formatNumber(1000000) // '1,000,000'
     */
    formatNumber(num: number, precision?: number): string;
    /**
     * 格式化电话号码
     * @example formatPhone('13800138000') // '138-0013-8000'
     */
    formatPhone(phone: string): string;
    /**
     * 格式化身份证号码
     * @example formatIdCard('110101199003071234') // '1101 0119 9003 0712 34'
     */
    formatIdCard(idCard: string): string;
    /**
     * 格式化邮箱（隐藏部分字符）
     * @example formatEmail('user@example.com') // 'u***@example.com'
     */
    formatEmail(email: string): string;
    /**
     * 格式化银行卡号
     * @example formatBankCard('6222021234567890123') // '6222 0212 3456 7890 123'
     */
    formatBankCard(cardNumber: string): string;
    /**
     * 格式化大小（存储空间）
     * @example formatSize(1024) // '1 KB'
     */
    formatSize(size: number): string;
    /**
     * 格式化时间（秒数转换）
     * @example formatTime(3661) // '1h 1m 1s'
     */
    formatTime(seconds: number): string;
    /**
     * 格式化日期
     * @example formatDate(new Date('2024-01-01')) // '2024-01-01'
     */
    formatDate(date: Date, format?: string): string;
    /**
     * 格式化 JSON
     * @example formatJson({a:1,b:2}) // '{\n  "a": 1,\n  "b": 2\n}'
     */
    formatJson(obj: any, space?: number): string;
    /**
     * 格式化 URL
     * @example formatUrl('https://example.com', {key: 'value'}) // 'https://example.com?key=value'
     */
    formatUrl(baseUrl: string, params?: Record<string, any>): string;
    /**
     * 格式化 HTML（转义）
     * @example formatHtml('<div>test</div>') // '&lt;div&gt;test&lt;/div&gt;'
     */
    formatHtml(html: string): string;
    /**
     * 格式化 SQL 查询字符串
     * @example formatSql("SELECT * FROM users WHERE id = ?", [1]) // "SELECT * FROM users WHERE id = 1"
     */
    formatSql(sql: string, params: any[]): string;
    /**
     * 格式化驼峰字符串为空格分隔
     * @example formatCamelCase('helloWorld') // 'hello World'
     */
    formatCamelCase(str: string): string;
    /**
     * 格式化 Base64
     * @example formatBase64('hello') // 'aGVsbG8='
     */
    formatBase64(str: string): string;
    /**
     * 解码 Base64
     * @example decodeBase64('aGVsbG8=') // 'hello'
     */
    decodeBase64(str: string): string;
};
export default format;
//# sourceMappingURL=format.d.ts.map