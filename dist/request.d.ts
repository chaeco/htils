/**
 * 网络请求相关工具
 */
interface RetryOptions {
    maxRetries?: number;
    delay?: number;
    backoff?: boolean;
    onRetry?: (attempt: number, error: Error) => void;
}
interface TimeoutOptions {
    timeout?: number;
}
interface RequestOptions extends TimeoutOptions {
    headers?: Record<string, string>;
    method?: string;
    body?: any;
    credentials?: 'include' | 'omit' | 'same-origin';
    mode?: 'cors' | 'no-cors' | 'same-origin' | 'navigate';
    cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';
    signal?: AbortSignal;
}
interface RequestInterceptor {
    (config: RequestOptions): RequestOptions | Promise<RequestOptions>;
}
interface ResponseInterceptor {
    (response: Response): Response | Promise<Response>;
}
interface ErrorInterceptor {
    (error: Error): Error | Promise<Error>;
}
/**
 * 带重试的 fetch
 * @example await fetchWithRetry('https://api.example.com/data')
 */
declare function fetchWithRetry(url: string, options?: RequestOptions & RetryOptions): Promise<Response>;
/**
 * 带超时的 fetch
 * @example await fetchWithTimeout('https://api.example.com/data', { timeout: 5000 })
 */
declare function fetchWithTimeout(url: string, options?: RequestOptions): Promise<Response>;
/**
 * 查询参数序列化
 * @example serializeQuery({ a: 1, b: 'hello' }) => 'a=1&b=hello'
 */
declare function serializeQuery(params: Record<string, any>): string;
/**
 * URL 中添加查询参数
 * @example appendQuery('https://example.com', { page: 1 }) => 'https://example.com?page=1'
 */
declare function appendQuery(url: string, params: Record<string, any>): string;
/**
 * 请求拦截器类
 */
declare class RequestInterceptors {
    private requestInterceptors;
    private responseInterceptors;
    private errorInterceptors;
    /**
     * 添加请求拦截器
     */
    addRequestInterceptor(interceptor: RequestInterceptor): () => void;
    /**
     * 添加响应拦截器
     */
    addResponseInterceptor(interceptor: ResponseInterceptor): () => void;
    /**
     * 添加错误拦截器
     */
    addErrorInterceptor(interceptor: ErrorInterceptor): () => void;
    /**
     * 执行请求拦截器
     */
    executeRequestInterceptors(config: RequestOptions): Promise<RequestOptions>;
    /**
     * 执行响应拦截器
     */
    executeResponseInterceptors(response: Response): Promise<Response>;
    /**
     * 执行错误拦截器
     */
    executeErrorInterceptors(error: Error): Promise<Error>;
    /**
     * 清空所有拦截器
     */
    clear(): void;
}
/**
 * 简单的 HTTP 客户端
 */
declare class HttpClient {
    private baseUrl;
    private interceptors;
    constructor(baseUrl?: string);
    /**
     * GET 请求
     */
    get<T = any>(url: string, options?: RequestOptions): Promise<T>;
    /**
     * POST 请求
     */
    post<T = any>(url: string, data?: any, options?: RequestOptions): Promise<T>;
    /**
     * PUT 请求
     */
    put<T = any>(url: string, data?: any, options?: RequestOptions): Promise<T>;
    /**
     * PATCH 请求
     */
    patch<T = any>(url: string, data?: any, options?: RequestOptions): Promise<T>;
    /**
     * DELETE 请求
     */
    delete<T = any>(url: string, options?: RequestOptions): Promise<T>;
    /**
     * 通用请求方法
     */
    request<T = any>(url: string, options?: RequestOptions & RetryOptions): Promise<T>;
    /**
     * 获取拦截器管理器
     */
    getInterceptors(): RequestInterceptors;
    /**
     * 设置基础 URL
     */
    setBaseUrl(baseUrl: string): void;
}
/**
 * 请求工具集
 */
declare const request: {
    fetchWithRetry: typeof fetchWithRetry;
    fetchWithTimeout: typeof fetchWithTimeout;
    serializeQuery: typeof serializeQuery;
    appendQuery: typeof appendQuery;
    RequestInterceptors: typeof RequestInterceptors;
    HttpClient: typeof HttpClient;
};
export { fetchWithRetry, fetchWithTimeout, serializeQuery, appendQuery, RequestInterceptors, HttpClient };
export type { RetryOptions, TimeoutOptions, RequestOptions, RequestInterceptor, ResponseInterceptor, ErrorInterceptor };
export default request;
//# sourceMappingURL=request.d.ts.map