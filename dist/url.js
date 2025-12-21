"use strict";
/**
 * URL 处理工具函数
 */
Object.defineProperty(exports, "__esModule", { value: true });
const url = {
    /**
     * 解析 URL
     * @example parse('https://example.com:8080/path?key=value#hash')
     */
    parse(urlStr) {
        return new URL(urlStr);
    },
    /**
     * 获取 URL 的协议
     * @example getProtocol('https://example.com') // 'https:'
     */
    getProtocol(urlStr) {
        try {
            return new URL(urlStr).protocol;
        }
        catch {
            return '';
        }
    },
    /**
     * 获取 URL 的主机名
     * @example getHost('https://example.com') // 'example.com'
     */
    getHost(urlStr) {
        try {
            return new URL(urlStr).host;
        }
        catch {
            return '';
        }
    },
    /**
     * 获取 URL 的端口
     * @example getPort('https://example.com:8080') // '8080'
     */
    getPort(urlStr) {
        try {
            return new URL(urlStr).port;
        }
        catch {
            return '';
        }
    },
    /**
     * 获取 URL 的路径
     * @example getPath('https://example.com/path/to/page') // '/path/to/page'
     */
    getPath(urlStr) {
        try {
            return new URL(urlStr).pathname;
        }
        catch {
            return '';
        }
    },
    /**
     * 获取 URL 的查询字符串
     * @example getQuery('https://example.com?key=value') // 'key=value'
     */
    getQuery(urlStr) {
        try {
            return new URL(urlStr).search.slice(1);
        }
        catch {
            return '';
        }
    },
    /**
     * 获取 URL 的哈希值
     * @example getHash('https://example.com#section') // 'section'
     */
    getHash(urlStr) {
        try {
            return new URL(urlStr).hash.slice(1);
        }
        catch {
            return '';
        }
    },
    /**
     * 解析查询参数
     * @example parseQuery('key=value&foo=bar') // { key: 'value', foo: 'bar' }
     */
    parseQuery(queryStr) {
        const params = {};
        if (!queryStr)
            return params;
        const pairs = queryStr.split('&');
        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) {
                params[decodeURIComponent(key)] = decodeURIComponent(value || '');
            }
        });
        return params;
    },
    /**
     * 构建查询字符串
     * @example buildQuery({ key: 'value', foo: 'bar' }) // 'key=value&foo=bar'
     */
    buildQuery(params) {
        return Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    },
    /**
     * 追加查询参数到 URL
     * @example addQuery('https://example.com?foo=bar', { key: 'value' })
     * // 'https://example.com?foo=bar&key=value'
     */
    addQuery(urlStr, params) {
        try {
            const urlObj = new URL(urlStr);
            Object.entries(params).forEach(([key, value]) => {
                urlObj.searchParams.append(key, String(value));
            });
            return urlObj.toString();
        }
        catch {
            return urlStr;
        }
    },
    /**
     * 移除查询参数
     * @example removeQuery('https://example.com?foo=bar&key=value', 'foo')
     * // 'https://example.com?key=value'
     */
    removeQuery(urlStr, key) {
        try {
            const urlObj = new URL(urlStr);
            urlObj.searchParams.delete(key);
            return urlObj.toString();
        }
        catch {
            return urlStr;
        }
    },
    /**
     * 获取单个查询参数值
     * @example getQueryParam('https://example.com?key=value', 'key') // 'value'
     */
    getQueryParam(urlStr, key) {
        try {
            return new URL(urlStr).searchParams.get(key);
        }
        catch {
            return null;
        }
    },
    /**
     * 判断 URL 是否有效
     * @example isValidUrl('https://example.com') // true
     */
    isValidUrl(urlStr) {
        try {
            new URL(urlStr);
            return true;
        }
        catch {
            return false;
        }
    },
    /**
     * 判断 URL 是否为绝对 URL
     * @example isAbsoluteUrl('https://example.com') // true
     */
    isAbsoluteUrl(urlStr) {
        return /^https?:\/\//.test(urlStr);
    },
    /**
     * 判断 URL 是否为相对 URL
     * @example isRelativeUrl('/path/to/page') // true
     */
    isRelativeUrl(urlStr) {
        return !this.isAbsoluteUrl(urlStr);
    },
    /**
     * 解码 URL
     * @example decode('hello%20world') // 'hello world'
     */
    decode(urlStr) {
        return decodeURIComponent(urlStr);
    },
    /**
     * 编码 URL
     * @example encode('hello world') // 'hello%20world'
     */
    encode(urlStr) {
        return encodeURIComponent(urlStr);
    },
    /**
     * 连接 URL 路径
     * @example join('https://example.com', 'path', 'to', 'page')
     * // 'https://example.com/path/to/page'
     */
    join(...parts) {
        return parts
            .map((part, index) => {
            let p = part.replace(/^\/+|\/+$/g, '');
            if (index > 0)
                p = '/' + p;
            return p;
        })
            .join('');
    },
    /**
     * 获取 URL 的来源（协议 + 主机）
     * @example getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
     */
    getOrigin(urlStr) {
        try {
            const urlObj = new URL(urlStr);
            return urlObj.origin;
        }
        catch {
            return '';
        }
    },
    /**
     * 获取 URL 的基础（协议 + 主机 + 路径）
     * @example getBase('https://example.com/path/to/page?key=value')
     * // 'https://example.com/path/to/page'
     */
    getBase(urlStr) {
        try {
            const urlObj = new URL(urlStr);
            return `${urlObj.origin}${urlObj.pathname}`;
        }
        catch {
            return '';
        }
    },
};
exports.default = url;
//# sourceMappingURL=url.js.map