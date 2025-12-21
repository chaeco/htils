"use strict";
/**
 * Cookie 管理工具 - 真实项目中的 Cookie 操作
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManager = void 0;
/**
 * 设置 Cookie
 * @example setCookie('token', 'abc123', { expires: 7, path: '/' })
 */
function setCookie(name, value, options = {}) {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    // 设置过期时间
    if (options.expires) {
        let expiresDate;
        if (typeof options.expires === 'number') {
            expiresDate = new Date();
            expiresDate.setTime(expiresDate.getTime() + options.expires * 24 * 60 * 60 * 1000);
        }
        else {
            expiresDate = options.expires;
        }
        cookieString += `; expires=${expiresDate.toUTCString()}`;
    }
    // 设置路径
    if (options.path) {
        cookieString += `; path=${options.path}`;
    }
    // 设置域名
    if (options.domain) {
        cookieString += `; domain=${options.domain}`;
    }
    // 设置安全标志
    if (options.secure) {
        cookieString += '; secure';
    }
    // 设置 SameSite
    if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
    }
    document.cookie = cookieString;
}
/**
 * 获取 Cookie
 * @example getCookie('token')
 */
function getCookie(name) {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}
/**
 * 删除 Cookie
 * @example removeCookie('token')
 */
function removeCookie(name, options = {}) {
    setCookie(name, '', {
        ...options,
        expires: -1,
    });
}
/**
 * 检查 Cookie 是否存在
 * @example hasCookie('token')
 */
function hasCookie(name) {
    return getCookie(name) !== null;
}
/**
 * 获取所有 Cookies
 * @example getAllCookies()
 */
function getAllCookies() {
    const cookies = {};
    const cookieStrings = document.cookie.split(';');
    for (let cookie of cookieStrings) {
        cookie = cookie.trim();
        const [name, value] = cookie.split('=');
        if (name) {
            cookies[decodeURIComponent(name)] = decodeURIComponent(value || '');
        }
    }
    return cookies;
}
/**
 * 清除所有 Cookies
 * @example clearAllCookies()
 */
function clearAllCookies(options = {}) {
    const cookies = getAllCookies();
    for (const name in cookies) {
        removeCookie(name, options);
    }
}
/**
 * Token 管理工具（基于 Cookie 或 LocalStorage）
 */
class TokenManager {
    constructor(options = {}) {
        this.storage = options.storage || 'localStorage';
        this.tokenKey = options.tokenKey || 'access_token';
        this.refreshTokenKey = options.refreshTokenKey || 'refresh_token';
    }
    /**
     * 设置访问令牌
     * @example tokenManager.setAccessToken('abc123', { expires: 1 })
     */
    setAccessToken(token, options) {
        if (this.storage === 'cookie') {
            setCookie(this.tokenKey, token, options || { expires: 1, path: '/' });
        }
        else {
            localStorage.setItem(this.tokenKey, token);
        }
    }
    /**
     * 获取访问令牌
     * @example tokenManager.getAccessToken()
     */
    getAccessToken() {
        if (this.storage === 'cookie') {
            return getCookie(this.tokenKey);
        }
        else {
            return localStorage.getItem(this.tokenKey);
        }
    }
    /**
     * 设置刷新令牌
     * @example tokenManager.setRefreshToken('xyz789', { expires: 7 })
     */
    setRefreshToken(token, options) {
        if (this.storage === 'cookie') {
            setCookie(this.refreshTokenKey, token, options || { expires: 7, path: '/' });
        }
        else {
            localStorage.setItem(this.refreshTokenKey, token);
        }
    }
    /**
     * 获取刷新令牌
     * @example tokenManager.getRefreshToken()
     */
    getRefreshToken() {
        if (this.storage === 'cookie') {
            return getCookie(this.refreshTokenKey);
        }
        else {
            return localStorage.getItem(this.refreshTokenKey);
        }
    }
    /**
     * 清除所有令牌
     * @example tokenManager.clearTokens()
     */
    clearTokens() {
        if (this.storage === 'cookie') {
            removeCookie(this.tokenKey, { path: '/' });
            removeCookie(this.refreshTokenKey, { path: '/' });
        }
        else {
            localStorage.removeItem(this.tokenKey);
            localStorage.removeItem(this.refreshTokenKey);
        }
    }
    /**
     * 检查是否已认证
     * @example tokenManager.isAuthenticated()
     */
    isAuthenticated() {
        return this.getAccessToken() !== null;
    }
    /**
     * 获取 Authorization 头
     * @example tokenManager.getAuthorizationHeader()
     */
    getAuthorizationHeader(type = 'Bearer') {
        const token = this.getAccessToken();
        return token ? `${type} ${token}` : null;
    }
}
exports.TokenManager = TokenManager;
const cookie = {
    setCookie,
    getCookie,
    removeCookie,
    hasCookie,
    getAllCookies,
    clearAllCookies,
    TokenManager,
};
exports.default = cookie;
//# sourceMappingURL=cookie.js.map