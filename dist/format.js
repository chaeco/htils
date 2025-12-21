"use strict";
/**
 * 数据格式化工具函数
 */
Object.defineProperty(exports, "__esModule", { value: true });
const format = {
    /**
     * 格式化货币
     * @example formatCurrency(1234.5) // '$1,234.50'
     * @example formatCurrency(1234.5, 'CNY', 'zh-CN') // '¥1,234.50'
     */
    formatCurrency(amount, currency = 'USD', locale = 'en-US') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(amount);
    },
    /**
     * 格式化百分比
     * @example formatPercentage(0.5) // '50.00%'
     */
    formatPercentage(value, precision = 2) {
        return `${(value * 100).toFixed(precision)}%`;
    },
    /**
     * 格式化文件大小
     * @example formatFileSize(1024) // '1 KB'
     * @example formatFileSize(1024 * 1024) // '1 MB'
     */
    formatFileSize(bytes) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
    },
    /**
     * 格式化数字（千位分隔符）
     * @example formatNumber(1000000) // '1,000,000'
     */
    formatNumber(num, precision = 0) {
        return num.toFixed(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    /**
     * 格式化电话号码
     * @example formatPhone('13800138000') // '138-0013-8000'
     */
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length !== 11)
            return phone;
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    },
    /**
     * 格式化身份证号码
     * @example formatIdCard('110101199003071234') // '1101 0119 9003 0712 34'
     */
    formatIdCard(idCard) {
        const cleaned = idCard.replace(/\s/g, '');
        return cleaned.replace(/(\d{4})/g, '$1 ').trim();
    },
    /**
     * 格式化邮箱（隐藏部分字符）
     * @example formatEmail('user@example.com') // 'u***@example.com'
     */
    formatEmail(email) {
        const [name, domain] = email.split('@');
        if (!domain)
            return email;
        const hiddenName = name.charAt(0) + '*'.repeat(Math.max(name.length - 2, 1)) + (name.length > 1 ? name.charAt(name.length - 1) : '');
        return `${hiddenName}@${domain}`;
    },
    /**
     * 格式化银行卡号
     * @example formatBankCard('6222021234567890123') // '6222 0212 3456 7890 123'
     */
    formatBankCard(cardNumber) {
        const cleaned = cardNumber.replace(/\s/g, '');
        return cleaned.replace(/(\d{4})/g, '$1 ').trim();
    },
    /**
     * 格式化大小（存储空间）
     * @example formatSize(1024) // '1 KB'
     */
    formatSize(size) {
        return this.formatFileSize(size);
    },
    /**
     * 格式化时间（秒数转换）
     * @example formatTime(3661) // '1h 1m 1s'
     */
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        const parts = [];
        if (hours > 0)
            parts.push(`${hours}h`);
        if (minutes > 0)
            parts.push(`${minutes}m`);
        if (secs > 0 || parts.length === 0)
            parts.push(`${secs}s`);
        return parts.join(' ');
    },
    /**
     * 格式化日期
     * @example formatDate(new Date('2024-01-01')) // '2024-01-01'
     */
    formatDate(date, format = 'YYYY-MM-DD') {
        const pad = (n) => String(n).padStart(2, '0');
        const replacements = {
            'YYYY': date.getFullYear(),
            'MM': pad(date.getMonth() + 1),
            'DD': pad(date.getDate()),
            'HH': pad(date.getHours()),
            'mm': pad(date.getMinutes()),
            'ss': pad(date.getSeconds()),
        };
        let result = format;
        Object.keys(replacements).forEach(key => {
            result = result.replace(key, String(replacements[key]));
        });
        return result;
    },
    /**
     * 格式化 JSON
     * @example formatJson({a:1,b:2}) // '{\n  "a": 1,\n  "b": 2\n}'
     */
    formatJson(obj, space = 2) {
        return JSON.stringify(obj, null, space);
    },
    /**
     * 格式化 URL
     * @example formatUrl('https://example.com', {key: 'value'}) // 'https://example.com?key=value'
     */
    formatUrl(baseUrl, params) {
        if (!params || Object.keys(params).length === 0) {
            return baseUrl;
        }
        const queryString = Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${queryString}`;
    },
    /**
     * 格式化 HTML（转义）
     * @example formatHtml('<div>test</div>') // '&lt;div&gt;test&lt;/div&gt;'
     */
    formatHtml(html) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        };
        return html.replace(/[&<>"']/g, char => map[char]);
    },
    /**
     * 格式化 SQL 查询字符串
     * @example formatSql("SELECT * FROM users WHERE id = ?", [1]) // "SELECT * FROM users WHERE id = 1"
     */
    formatSql(sql, params) {
        let result = sql;
        params.forEach(param => {
            const value = typeof param === 'string' ? `'${param}'` : param;
            result = result.replace('?', value);
        });
        return result;
    },
    /**
     * 格式化驼峰字符串为空格分隔
     * @example formatCamelCase('helloWorld') // 'hello World'
     */
    formatCamelCase(str) {
        return str.replace(/([A-Z])/g, ' $1').trim();
    },
    /**
     * 格式化 Base64
     * @example formatBase64('hello') // 'aGVsbG8='
     */
    formatBase64(str) {
        if (typeof btoa !== 'undefined') {
            return btoa(unescape(encodeURIComponent(str)));
        }
        // Node.js 环境
        const BufferConstructor = globalThis.Buffer;
        return BufferConstructor?.from(str, 'utf8').toString('base64') ?? str;
    },
    /**
     * 解码 Base64
     * @example decodeBase64('aGVsbG8=') // 'hello'
     */
    decodeBase64(str) {
        if (typeof atob !== 'undefined') {
            return decodeURIComponent(escape(atob(str)));
        }
        // Node.js 环境
        const BufferConstructor = globalThis.Buffer;
        return BufferConstructor?.from(str, 'base64').toString('utf8') ?? str;
    },
};
exports.default = format;
//# sourceMappingURL=format.js.map