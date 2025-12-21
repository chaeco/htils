/**
 * Cookie 管理工具 - 真实项目中的 Cookie 操作
 */

interface CookieOptions {
  expires?: number | Date // 过期时间（天数或Date对象）
  path?: string // 路径
  domain?: string // 域名
  secure?: boolean // 仅HTTPS
  sameSite?: 'Strict' | 'Lax' | 'None' // SameSite属性
}

/**
 * 设置 Cookie
 * @example setCookie('token', 'abc123', { expires: 7, path: '/' })
 */
function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  // 设置过期时间
  if (options.expires) {
    let expiresDate: Date
    if (typeof options.expires === 'number') {
      expiresDate = new Date()
      expiresDate.setTime(expiresDate.getTime() + options.expires * 24 * 60 * 60 * 1000)
    } else {
      expiresDate = options.expires
    }
    cookieString += `; expires=${expiresDate.toUTCString()}`
  }

  // 设置路径
  if (options.path) {
    cookieString += `; path=${options.path}`
  }

  // 设置域名
  if (options.domain) {
    cookieString += `; domain=${options.domain}`
  }

  // 设置安全标志
  if (options.secure) {
    cookieString += '; secure'
  }

  // 设置 SameSite
  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`
  }

  document.cookie = cookieString
}

/**
 * 获取 Cookie
 * @example getCookie('token')
 */
function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + '='
  const cookies = document.cookie.split(';')

  for (let cookie of cookies) {
    cookie = cookie.trim()
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length))
    }
  }

  return null
}

/**
 * 删除 Cookie
 * @example removeCookie('token')
 */
function removeCookie(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
  setCookie(name, '', {
    ...options,
    expires: -1,
  })
}

/**
 * 检查 Cookie 是否存在
 * @example hasCookie('token')
 */
function hasCookie(name: string): boolean {
  return getCookie(name) !== null
}

/**
 * 获取所有 Cookies
 * @example getAllCookies()
 */
function getAllCookies(): Record<string, string> {
  const cookies: Record<string, string> = {}
  const cookieStrings = document.cookie.split(';')

  for (let cookie of cookieStrings) {
    cookie = cookie.trim()
    const [name, value] = cookie.split('=')
    if (name) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(value || '')
    }
  }

  return cookies
}

/**
 * 清除所有 Cookies
 * @example clearAllCookies()
 */
function clearAllCookies(options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
  const cookies = getAllCookies()
  for (const name in cookies) {
    removeCookie(name, options)
  }
}

/**
 * Token 管理工具（基于 Cookie 或 LocalStorage）
 */
class TokenManager {
  private storage: 'cookie' | 'localStorage'
  private tokenKey: string
  private refreshTokenKey: string

  constructor(
    options: {
      storage?: 'cookie' | 'localStorage'
      tokenKey?: string
      refreshTokenKey?: string
    } = {}
  ) {
    this.storage = options.storage || 'localStorage'
    this.tokenKey = options.tokenKey || 'access_token'
    this.refreshTokenKey = options.refreshTokenKey || 'refresh_token'
  }

  /**
   * 设置访问令牌
   * @example tokenManager.setAccessToken('abc123', { expires: 1 })
   */
  setAccessToken(token: string, options?: CookieOptions): void {
    if (this.storage === 'cookie') {
      setCookie(this.tokenKey, token, options || { expires: 1, path: '/' })
    } else {
      localStorage.setItem(this.tokenKey, token)
    }
  }

  /**
   * 获取访问令牌
   * @example tokenManager.getAccessToken()
   */
  getAccessToken(): string | null {
    if (this.storage === 'cookie') {
      return getCookie(this.tokenKey)
    } else {
      return localStorage.getItem(this.tokenKey)
    }
  }

  /**
   * 设置刷新令牌
   * @example tokenManager.setRefreshToken('xyz789', { expires: 7 })
   */
  setRefreshToken(token: string, options?: CookieOptions): void {
    if (this.storage === 'cookie') {
      setCookie(this.refreshTokenKey, token, options || { expires: 7, path: '/' })
    } else {
      localStorage.setItem(this.refreshTokenKey, token)
    }
  }

  /**
   * 获取刷新令牌
   * @example tokenManager.getRefreshToken()
   */
  getRefreshToken(): string | null {
    if (this.storage === 'cookie') {
      return getCookie(this.refreshTokenKey)
    } else {
      return localStorage.getItem(this.refreshTokenKey)
    }
  }

  /**
   * 清除所有令牌
   * @example tokenManager.clearTokens()
   */
  clearTokens(): void {
    if (this.storage === 'cookie') {
      removeCookie(this.tokenKey, { path: '/' })
      removeCookie(this.refreshTokenKey, { path: '/' })
    } else {
      localStorage.removeItem(this.tokenKey)
      localStorage.removeItem(this.refreshTokenKey)
    }
  }

  /**
   * 检查是否已认证
   * @example tokenManager.isAuthenticated()
   */
  isAuthenticated(): boolean {
    return this.getAccessToken() !== null
  }

  /**
   * 获取 Authorization 头
   * @example tokenManager.getAuthorizationHeader()
   */
  getAuthorizationHeader(type: string = 'Bearer'): string | null {
    const token = this.getAccessToken()
    return token ? `${type} ${token}` : null
  }
}

const cookie = {
  setCookie,
  getCookie,
  removeCookie,
  hasCookie,
  getAllCookies,
  clearAllCookies,
  TokenManager,
}

export { TokenManager }
export type { CookieOptions }
export default cookie
