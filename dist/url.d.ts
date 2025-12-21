/**
 * URL 处理工具函数
 */
declare const url: {
    /**
     * 解析 URL
     * @example parse('https://example.com:8080/path?key=value#hash')
     */
    parse(urlStr: string): URL;
    /**
     * 获取 URL 的协议
     * @example getProtocol('https://example.com') // 'https:'
     */
    getProtocol(urlStr: string): string;
    /**
     * 获取 URL 的主机名
     * @example getHost('https://example.com') // 'example.com'
     */
    getHost(urlStr: string): string;
    /**
     * 获取 URL 的端口
     * @example getPort('https://example.com:8080') // '8080'
     */
    getPort(urlStr: string): string;
    /**
     * 获取 URL 的路径
     * @example getPath('https://example.com/path/to/page') // '/path/to/page'
     */
    getPath(urlStr: string): string;
    /**
     * 获取 URL 的查询字符串
     * @example getQuery('https://example.com?key=value') // 'key=value'
     */
    getQuery(urlStr: string): string;
    /**
     * 获取 URL 的哈希值
     * @example getHash('https://example.com#section') // 'section'
     */
    getHash(urlStr: string): string;
    /**
     * 解析查询参数
     * @example parseQuery('key=value&foo=bar') // { key: 'value', foo: 'bar' }
     */
    parseQuery(queryStr: string): Record<string, string>;
    /**
     * 构建查询字符串
     * @example buildQuery({ key: 'value', foo: 'bar' }) // 'key=value&foo=bar'
     */
    buildQuery(params: Record<string, any>): string;
    /**
     * 追加查询参数到 URL
     * @example addQuery('https://example.com?foo=bar', { key: 'value' })
     * // 'https://example.com?foo=bar&key=value'
     */
    addQuery(urlStr: string, params: Record<string, any>): string;
    /**
     * 移除查询参数
     * @example removeQuery('https://example.com?foo=bar&key=value', 'foo')
     * // 'https://example.com?key=value'
     */
    removeQuery(urlStr: string, key: string): string;
    /**
     * 获取单个查询参数值
     * @example getQueryParam('https://example.com?key=value', 'key') // 'value'
     */
    getQueryParam(urlStr: string, key: string): string | null;
    /**
     * 判断 URL 是否有效
     * @example isValidUrl('https://example.com') // true
     */
    isValidUrl(urlStr: string): boolean;
    /**
     * 判断 URL 是否为绝对 URL
     * @example isAbsoluteUrl('https://example.com') // true
     */
    isAbsoluteUrl(urlStr: string): boolean;
    /**
     * 判断 URL 是否为相对 URL
     * @example isRelativeUrl('/path/to/page') // true
     */
    isRelativeUrl(urlStr: string): boolean;
    /**
     * 解码 URL
     * @example decode('hello%20world') // 'hello world'
     */
    decode(urlStr: string): string;
    /**
     * 编码 URL
     * @example encode('hello world') // 'hello%20world'
     */
    encode(urlStr: string): string;
    /**
     * 连接 URL 路径
     * @example join('https://example.com', 'path', 'to', 'page')
     * // 'https://example.com/path/to/page'
     */
    join(...parts: string[]): string;
    /**
     * 获取 URL 的来源（协议 + 主机）
     * @example getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
     */
    getOrigin(urlStr: string): string;
    /**
     * 获取 URL 的基础（协议 + 主机 + 路径）
     * @example getBase('https://example.com/path/to/page?key=value')
     * // 'https://example.com/path/to/page'
     */
    getBase(urlStr: string): string;
};
export default url;
//# sourceMappingURL=url.d.ts.map