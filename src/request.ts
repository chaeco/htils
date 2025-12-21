/**
 * 网络请求相关工具
 */

interface RetryOptions {
  maxRetries?: number // 最大重试次数，默认为 3
  delay?: number // 重试延迟时间（毫秒），默认为 1000
  backoff?: boolean // 是否使用指数退避，默认为 true
  onRetry?: (attempt: number, error: Error) => void // 重试时的回调
}

interface TimeoutOptions {
  timeout?: number // 超时时间（毫秒），默认为 30000
}

interface RequestOptions extends TimeoutOptions {
  headers?: Record<string, string>
  method?: string
  body?: any
  credentials?: 'include' | 'omit' | 'same-origin'
  mode?: 'cors' | 'no-cors' | 'same-origin' | 'navigate'
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
  signal?: AbortSignal
}

interface RequestInterceptor {
  (config: RequestOptions): RequestOptions | Promise<RequestOptions>
}

interface ResponseInterceptor {
  (response: Response): Response | Promise<Response>
}

interface ErrorInterceptor {
  (error: Error): Error | Promise<Error>
}

/**
 * 延迟执行（用于重试等待）
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 计算退避延迟时间
 * @example getBackoffDelay(2, 1000) => 4000
 */
function getBackoffDelay(attempt: number, baseDelay: number): number {
  return baseDelay * Math.pow(2, attempt - 1)
}

/**
 * 带重试的 fetch
 * @example await fetchWithRetry('https://api.example.com/data')
 */
async function fetchWithRetry(
  url: string,
  options: RequestOptions & RetryOptions = {}
): Promise<Response> {
  const { maxRetries = 3, delay: delayTime = 1000, backoff = true, onRetry, timeout = 30000, ...fetchOptions } = options

  let lastError: Error | null = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // 重试 5xx 错误或 429（Too Many Requests）
      if (response.ok || (response.status !== 500 && response.status !== 429 && response.status < 500)) {
        return response
      }

      if (attempt < maxRetries) {
        lastError = new Error(`HTTP ${response.status}`)
        const waitTime = backoff ? getBackoffDelay(attempt + 1, delayTime) : delayTime
        onRetry?.(attempt + 1, lastError)
        await delay(waitTime)
      } else {
        return response
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt < maxRetries) {
        const waitTime = backoff ? getBackoffDelay(attempt + 1, delayTime) : delayTime
        onRetry?.(attempt + 1, lastError)
        await delay(waitTime)
      } else {
        throw lastError
      }
    }
  }

  throw lastError || new Error('Unknown error')
}

/**
 * 带超时的 fetch
 * @example await fetchWithTimeout('https://api.example.com/data', { timeout: 5000 })
 */
async function fetchWithTimeout(url: string, options: RequestOptions = {}): Promise<Response> {
  const { timeout = 30000, ...fetchOptions } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

/**
 * 查询参数序列化
 * @example serializeQuery({ a: 1, b: 'hello' }) => 'a=1&b=hello'
 */
function serializeQuery(params: Record<string, any>): string {
  return Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key)
      if (Array.isArray(value)) {
        return value.map(v => `${encodedKey}=${encodeURIComponent(v)}`).join('&')
      }
      return `${encodedKey}=${encodeURIComponent(value)}`
    })
    .join('&')
}

/**
 * URL 中添加查询参数
 * @example appendQuery('https://example.com', { page: 1 }) => 'https://example.com?page=1'
 */
function appendQuery(url: string, params: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return url
  }

  const queryString = serializeQuery(params)
  const separator = url.includes('?') ? '&' : '?'
  return url + separator + queryString
}

/**
 * 请求拦截器类
 */
class RequestInterceptors {
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []
  private errorInterceptors: ErrorInterceptor[] = []

  /**
   * 添加请求拦截器
   */
  addRequestInterceptor(interceptor: RequestInterceptor): () => void {
    this.requestInterceptors.push(interceptor)
    return () => {
      this.requestInterceptors = this.requestInterceptors.filter(i => i !== interceptor)
    }
  }

  /**
   * 添加响应拦截器
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    this.responseInterceptors.push(interceptor)
    return () => {
      this.responseInterceptors = this.responseInterceptors.filter(i => i !== interceptor)
    }
  }

  /**
   * 添加错误拦截器
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): () => void {
    this.errorInterceptors.push(interceptor)
    return () => {
      this.errorInterceptors = this.errorInterceptors.filter(i => i !== interceptor)
    }
  }

  /**
   * 执行请求拦截器
   */
  async executeRequestInterceptors(config: RequestOptions): Promise<RequestOptions> {
    let result = config
    for (const interceptor of this.requestInterceptors) {
      result = await interceptor(result)
    }
    return result
  }

  /**
   * 执行响应拦截器
   */
  async executeResponseInterceptors(response: Response): Promise<Response> {
    let result = response
    for (const interceptor of this.responseInterceptors) {
      result = await interceptor(result)
    }
    return result
  }

  /**
   * 执行错误拦截器
   */
  async executeErrorInterceptors(error: Error): Promise<Error> {
    let result = error
    for (const interceptor of this.errorInterceptors) {
      result = await interceptor(result)
    }
    return result
  }

  /**
   * 清空所有拦截器
   */
  clear(): void {
    this.requestInterceptors = []
    this.responseInterceptors = []
    this.errorInterceptors = []
  }
}

/**
 * 简单的 HTTP 客户端
 */
class HttpClient {
  private baseUrl: string
  private interceptors: RequestInterceptors

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl
    this.interceptors = new RequestInterceptors()
  }

  /**
   * GET 请求
   */
  async get<T = any>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' })
  }

  /**
   * POST 请求
   */
  async post<T = any>(url: string, data?: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
  }

  /**
   * PUT 请求
   */
  async put<T = any>(url: string, data?: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
  }

  /**
   * PATCH 请求
   */
  async patch<T = any>(url: string, data?: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
  }

  /**
   * DELETE 请求
   */
  async delete<T = any>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' })
  }

  /**
   * 通用请求方法
   */
  async request<T = any>(url: string, options: RequestOptions & RetryOptions = {}): Promise<T> {
    try {
      const fullUrl = this.baseUrl ? `${this.baseUrl}${url}` : url
      let config = { ...options }

      // 执行请求拦截器
      config = await this.interceptors.executeRequestInterceptors(config)

      // 发送请求
      const response = await fetchWithRetry(fullUrl, config)

      // 执行响应拦截器
      const interceptedResponse = await this.interceptors.executeResponseInterceptors(response)

      if (!interceptedResponse.ok) {
        throw new Error(`HTTP ${interceptedResponse.status}`)
      }

      const contentType = interceptedResponse.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        return await interceptedResponse.json()
      }

      return (await interceptedResponse.text()) as T
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      const interceptedError = await this.interceptors.executeErrorInterceptors(err)
      throw interceptedError
    }
  }

  /**
   * 获取拦截器管理器
   */
  getInterceptors(): RequestInterceptors {
    return this.interceptors
  }

  /**
   * 设置基础 URL
   */
  setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl
  }
}

/**
 * 请求工具集
 */
const request = {
  fetchWithRetry,
  fetchWithTimeout,
  serializeQuery,
  appendQuery,
  RequestInterceptors,
  HttpClient,
}

export { fetchWithRetry, fetchWithTimeout, serializeQuery, appendQuery, RequestInterceptors, HttpClient }
export type { RetryOptions, TimeoutOptions, RequestOptions, RequestInterceptor, ResponseInterceptor, ErrorInterceptor }
export default request
