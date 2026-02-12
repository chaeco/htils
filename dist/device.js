"use strict";
/**
 * 设备检测工具 - 浏览器、操作系统、设备类型检测
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取用户代理字符串
 */
function getUserAgent() {
    return typeof navigator !== 'undefined' ? navigator.userAgent : '';
}
/**
 * 检测是否为移动设备
 * @example isMobile() // true/false
 */
function isMobile() {
    const ua = getUserAgent();
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}
/**
 * 检测是否为平板设备
 * @example isTablet() // true/false
 */
function isTablet() {
    const ua = getUserAgent();
    return /iPad|Android(?!.*Mobile)/i.test(ua);
}
/**
 * 检测是否为桌面设备
 * @example isDesktop() // true/false
 */
function isDesktop() {
    return !isMobile() && !isTablet();
}
/**
 * 检测是否为 iOS 设备
 * @example isIOS() // true/false
 */
function isIOS() {
    const ua = getUserAgent();
    return /iPhone|iPad|iPod/i.test(ua);
}
/**
 * 检测是否为 Android 设备
 * @example isAndroid() // true/false
 */
function isAndroid() {
    const ua = getUserAgent();
    return /Android/i.test(ua);
}
/**
 * 检测是否为 iPhone
 * @example isIPhone() // true/false
 */
function isIPhone() {
    const ua = getUserAgent();
    return /iPhone/i.test(ua);
}
/**
 * 检测是否为 iPad
 * @example isIPad() // true/false
 */
function isIPad() {
    const ua = getUserAgent();
    if (/iPad/i.test(ua))
        return true;
    if (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
        return true;
    }
    return false;
}
/**
 * 检测是否为微信浏览器
 * @example isWeChat() // true/false
 */
function isWeChat() {
    const ua = getUserAgent();
    return /MicroMessenger/i.test(ua);
}
/**
 * 检测是否为微信小程序
 * @example isMiniProgram() // true/false
 */
function isMiniProgram() {
    const ua = getUserAgent();
    return /miniProgram/i.test(ua) || (typeof window !== 'undefined' && typeof window.wx !== 'undefined');
}
/**
 * 检测是否为支付宝
 * @example isAlipay() // true/false
 */
function isAlipay() {
    const ua = getUserAgent();
    return /AlipayClient/i.test(ua);
}
/**
 * 获取浏览器名称
 * @example getBrowserName() // 'Chrome'
 */
function getBrowserName() {
    const ua = getUserAgent();
    if (/Edg/i.test(ua))
        return 'Edge';
    if (/Chrome/i.test(ua) && !/Edg/i.test(ua))
        return 'Chrome';
    if (/Safari/i.test(ua) && !/Chrome/i.test(ua))
        return 'Safari';
    if (/Firefox/i.test(ua))
        return 'Firefox';
    if (/MSIE|Trident/i.test(ua))
        return 'IE';
    if (/Opera|OPR/i.test(ua))
        return 'Opera';
    return 'Unknown';
}
/**
 * 获取浏览器版本
 * @example getBrowserVersion() // '120.0.0'
 */
function getBrowserVersion() {
    const ua = getUserAgent();
    const browser = getBrowserName();
    let match = null;
    switch (browser) {
        case 'Chrome':
            match = ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);
            break;
        case 'Safari':
            match = ua.match(/Version\/(\d+\.\d+\.\d+)/);
            break;
        case 'Firefox':
            match = ua.match(/Firefox\/(\d+\.\d+)/);
            break;
        case 'Edge':
            match = ua.match(/Edg\/(\d+\.\d+\.\d+\.\d+)/);
            break;
        case 'IE':
            match = ua.match(/(?:MSIE |rv:)(\d+\.\d+)/);
            break;
        case 'Opera':
            match = ua.match(/(?:Opera|OPR)\/(\d+\.\d+\.\d+)/);
            break;
    }
    return match ? match[1] : 'Unknown';
}
/**
 * 获取操作系统名称
 * @example getOSName() // 'Windows', 'macOS', 'iOS', 'Android', 'Linux'
 */
function getOSName() {
    const ua = getUserAgent();
    if (/Windows/i.test(ua))
        return 'Windows';
    if (/Mac OS X/i.test(ua))
        return 'macOS';
    if (/iPhone|iPad|iPod/i.test(ua))
        return 'iOS';
    if (/Android/i.test(ua))
        return 'Android';
    if (/Linux/i.test(ua))
        return 'Linux';
    return 'Unknown';
}
/**
 * 获取操作系统版本
 * @example getOSVersion() // '10.0', '14.0'
 */
function getOSVersion() {
    const ua = getUserAgent();
    const os = getOSName();
    let match = null;
    switch (os) {
        case 'Windows':
            if (/Windows NT 10.0/i.test(ua))
                return '10';
            if (/Windows NT 6.3/i.test(ua))
                return '8.1';
            if (/Windows NT 6.2/i.test(ua))
                return '8';
            if (/Windows NT 6.1/i.test(ua))
                return '7';
            break;
        case 'macOS':
            match = ua.match(/Mac OS X (\d+[._]\d+[._]?\d*)/);
            if (match)
                return match[1].replace(/_/g, '.');
            break;
        case 'iOS':
            match = ua.match(/OS (\d+[._]\d+[._]?\d*)/);
            if (match)
                return match[1].replace(/_/g, '.');
            break;
        case 'Android':
            match = ua.match(/Android (\d+\.?\d*\.?\d*)/);
            if (match)
                return match[1];
            break;
    }
    return 'Unknown';
}
/**
 * 获取设备类型
 * @example getDeviceType() // 'mobile', 'tablet', 'desktop'
 */
function getDeviceType() {
    if (isTablet())
        return 'tablet';
    if (isMobile())
        return 'mobile';
    return 'desktop';
}
/**
 * 获取屏幕信息
 * @example getScreenInfo()
 */
function getScreenInfo() {
    if (typeof window === 'undefined' || typeof screen === 'undefined') {
        return {
            width: 0,
            height: 0,
            availWidth: 0,
            availHeight: 0,
            colorDepth: 0,
            pixelRatio: 1,
            orientation: 'portrait',
        };
    }
    return {
        width: screen.width,
        height: screen.height,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight,
        colorDepth: screen.colorDepth,
        pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
        orientation: screen.width > screen.height ? 'landscape' : 'portrait',
    };
}
/**
 * 检测是否支持触摸
 * @example isTouchDevice() // true/false
 */
function isTouchDevice() {
    if (typeof window === 'undefined')
        return false;
    return ('ontouchstart' in window ||
        (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) ||
        (typeof navigator !== 'undefined' && navigator.msMaxTouchPoints > 0));
}
/**
 * 检测是否为 Retina 屏幕
 * @example isRetina() // true/false
 */
function isRetina() {
    if (typeof window === 'undefined')
        return false;
    return (window.devicePixelRatio || 1) >= 2;
}
/**
 * 检测网络连接类型
 * @example getNetworkType() // '4g', 'wifi', 'none'
 */
function getNetworkType() {
    if (typeof navigator === 'undefined')
        return 'unknown';
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection)
        return 'unknown';
    return connection.effectiveType || connection.type || 'unknown';
}
/**
 * 检测是否在线
 * @example isOnline() // true/false
 */
function isOnline() {
    if (typeof navigator === 'undefined')
        return true;
    return navigator.onLine !== false;
}
/**
 * 获取语言
 * @example getLanguage() // 'zh-CN'
 */
function getLanguage() {
    if (typeof navigator === 'undefined')
        return 'en-US';
    return navigator.language || navigator.userLanguage || 'en-US';
}
/**
 * 获取完整设备信息
 * @example getDeviceInfo()
 */
function getDeviceInfo() {
    return {
        browser: {
            name: getBrowserName(),
            version: getBrowserVersion(),
        },
        os: {
            name: getOSName(),
            version: getOSVersion(),
        },
        device: {
            type: getDeviceType(),
            vendor: '',
            model: '',
        },
    };
}
/**
 * 检测是否为暗色模式
 * @example isDarkMode() // true/false
 */
function isDarkMode() {
    if (typeof window === 'undefined')
        return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
/**
 * 检测是否支持 WebP
 * @example supportsWebP()
 */
async function supportsWebP() {
    if (typeof document === 'undefined')
        return false;
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img.width > 0 && img.height > 0);
        img.onerror = () => resolve(false);
        img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
    });
}
/**
 * 检测是否支持 Service Worker
 * @example supportsServiceWorker() // true/false
 */
function supportsServiceWorker() {
    return typeof navigator !== 'undefined' && 'serviceWorker' in navigator;
}
/**
 * 检测是否支持 LocalStorage
 * @example supportsLocalStorage() // true/false
 */
function supportsLocalStorage() {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined')
        return false;
    try {
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * 检测是否支持 WebGL
 * @example supportsWebGL() // true/false
 */
function supportsWebGL() {
    if (typeof document === 'undefined')
        return false;
    try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    }
    catch {
        return false;
    }
}
const device = {
    // 设备检测
    isMobile,
    isTablet,
    isDesktop,
    isIOS,
    isAndroid,
    isIPhone,
    isIPad,
    isTouchDevice,
    isRetina,
    // 应用检测
    isWeChat,
    isMiniProgram,
    isAlipay,
    // 浏览器信息
    getBrowserName,
    getBrowserVersion,
    // 操作系统信息
    getOSName,
    getOSVersion,
    // 设备信息
    getDeviceType,
    getDeviceInfo,
    getScreenInfo,
    // 网络信息
    getNetworkType,
    isOnline,
    // 其他
    getLanguage,
    getUserAgent,
    isDarkMode,
    // 功能检测
    supportsWebP,
    supportsServiceWorker,
    supportsLocalStorage,
    supportsWebGL,
};
exports.default = device;
//# sourceMappingURL=device.js.map