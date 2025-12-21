/**
 * Cookie 管理工具 - 真实项目中的 Cookie 操作
 */
interface CookieOptions {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
}
/**
 * 设置 Cookie
 * @example setCookie('token', 'abc123', { expires: 7, path: '/' })
 */
declare function setCookie(name: string, value: string, options?: CookieOptions): void;
/**
 * 获取 Cookie
 * @example getCookie('token')
 */
declare function getCookie(name: string): string | null;
/**
 * 删除 Cookie
 * @example removeCookie('token')
 */
declare function removeCookie(name: string, options?: Pick<CookieOptions, 'path' | 'domain'>): void;
/**
 * 检查 Cookie 是否存在
 * @example hasCookie('token')
 */
declare function hasCookie(name: string): boolean;
/**
 * 获取所有 Cookies
 * @example getAllCookies()
 */
declare function getAllCookies(): Record<string, string>;
/**
 * 清除所有 Cookies
 * @example clearAllCookies()
 */
declare function clearAllCookies(options?: Pick<CookieOptions, 'path' | 'domain'>): void;
/**
 * Token 管理工具（基于 Cookie 或 LocalStorage）
 */
declare class TokenManager {
    private storage;
    private tokenKey;
    private refreshTokenKey;
    constructor(options?: {
        storage?: 'cookie' | 'localStorage';
        tokenKey?: string;
        refreshTokenKey?: string;
    });
    /**
     * 设置访问令牌
     * @example tokenManager.setAccessToken('abc123', { expires: 1 })
     */
    setAccessToken(token: string, options?: CookieOptions): void;
    /**
     * 获取访问令牌
     * @example tokenManager.getAccessToken()
     */
    getAccessToken(): string | null;
    /**
     * 设置刷新令牌
     * @example tokenManager.setRefreshToken('xyz789', { expires: 7 })
     */
    setRefreshToken(token: string, options?: CookieOptions): void;
    /**
     * 获取刷新令牌
     * @example tokenManager.getRefreshToken()
     */
    getRefreshToken(): string | null;
    /**
     * 清除所有令牌
     * @example tokenManager.clearTokens()
     */
    clearTokens(): void;
    /**
     * 检查是否已认证
     * @example tokenManager.isAuthenticated()
     */
    isAuthenticated(): boolean;
    /**
     * 获取 Authorization 头
     * @example tokenManager.getAuthorizationHeader()
     */
    getAuthorizationHeader(type?: string): string | null;
}
declare const cookie: {
    setCookie: typeof setCookie;
    getCookie: typeof getCookie;
    removeCookie: typeof removeCookie;
    hasCookie: typeof hasCookie;
    getAllCookies: typeof getAllCookies;
    clearAllCookies: typeof clearAllCookies;
    TokenManager: typeof TokenManager;
};
export { TokenManager };
export type { CookieOptions };
export default cookie;
//# sourceMappingURL=cookie.d.ts.map