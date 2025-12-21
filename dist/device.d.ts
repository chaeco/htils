/**
 * 设备检测工具 - 浏览器、操作系统、设备类型检测
 */
interface DeviceInfo {
    browser: {
        name: string;
        version: string;
    };
    os: {
        name: string;
        version: string;
    };
    device: {
        type: 'mobile' | 'tablet' | 'desktop';
        vendor: string;
        model: string;
    };
    engine: {
        name: string;
        version: string;
    };
}
export type { DeviceInfo };
/**
 * 获取用户代理字符串
 */
declare function getUserAgent(): string;
/**
 * 检测是否为移动设备
 * @example isMobile() // true/false
 */
declare function isMobile(): boolean;
/**
 * 检测是否为平板设备
 * @example isTablet() // true/false
 */
declare function isTablet(): boolean;
/**
 * 检测是否为桌面设备
 * @example isDesktop() // true/false
 */
declare function isDesktop(): boolean;
/**
 * 检测是否为 iOS 设备
 * @example isIOS() // true/false
 */
declare function isIOS(): boolean;
/**
 * 检测是否为 Android 设备
 * @example isAndroid() // true/false
 */
declare function isAndroid(): boolean;
/**
 * 检测是否为 iPhone
 * @example isIPhone() // true/false
 */
declare function isIPhone(): boolean;
/**
 * 检测是否为 iPad
 * @example isIPad() // true/false
 */
declare function isIPad(): boolean;
/**
 * 检测是否为微信浏览器
 * @example isWeChat() // true/false
 */
declare function isWeChat(): boolean;
/**
 * 检测是否为微信小程序
 * @example isMiniProgram() // true/false
 */
declare function isMiniProgram(): boolean;
/**
 * 检测是否为支付宝
 * @example isAlipay() // true/false
 */
declare function isAlipay(): boolean;
/**
 * 获取浏览器名称
 * @example getBrowserName() // 'Chrome'
 */
declare function getBrowserName(): string;
/**
 * 获取浏览器版本
 * @example getBrowserVersion() // '120.0.0'
 */
declare function getBrowserVersion(): string;
/**
 * 获取操作系统名称
 * @example getOSName() // 'Windows', 'macOS', 'iOS', 'Android', 'Linux'
 */
declare function getOSName(): string;
/**
 * 获取操作系统版本
 * @example getOSVersion() // '10.0', '14.0'
 */
declare function getOSVersion(): string;
/**
 * 获取设备类型
 * @example getDeviceType() // 'mobile', 'tablet', 'desktop'
 */
declare function getDeviceType(): 'mobile' | 'tablet' | 'desktop';
/**
 * 获取屏幕信息
 * @example getScreenInfo()
 */
declare function getScreenInfo(): {
    width: number;
    height: number;
    availWidth: number;
    availHeight: number;
    colorDepth: number;
    pixelRatio: number;
    orientation: 'portrait' | 'landscape';
};
/**
 * 检测是否支持触摸
 * @example isTouchDevice() // true/false
 */
declare function isTouchDevice(): boolean;
/**
 * 检测是否为 Retina 屏幕
 * @example isRetina() // true/false
 */
declare function isRetina(): boolean;
/**
 * 检测网络连接类型
 * @example getNetworkType() // '4g', 'wifi', 'none'
 */
declare function getNetworkType(): string;
/**
 * 检测是否在线
 * @example isOnline() // true/false
 */
declare function isOnline(): boolean;
/**
 * 获取语言
 * @example getLanguage() // 'zh-CN'
 */
declare function getLanguage(): string;
/**
 * 获取完整设备信息
 * @example getDeviceInfo()
 */
declare function getDeviceInfo(): Partial<DeviceInfo>;
/**
 * 检测是否为暗色模式
 * @example isDarkMode() // true/false
 */
declare function isDarkMode(): boolean;
/**
 * 检测是否支持 WebP
 * @example supportsWebP()
 */
declare function supportsWebP(): Promise<boolean>;
/**
 * 检测是否支持 Service Worker
 * @example supportsServiceWorker() // true/false
 */
declare function supportsServiceWorker(): boolean;
/**
 * 检测是否支持 LocalStorage
 * @example supportsLocalStorage() // true/false
 */
declare function supportsLocalStorage(): boolean;
/**
 * 检测是否支持 WebGL
 * @example supportsWebGL() // true/false
 */
declare function supportsWebGL(): boolean;
declare const device: {
    isMobile: typeof isMobile;
    isTablet: typeof isTablet;
    isDesktop: typeof isDesktop;
    isIOS: typeof isIOS;
    isAndroid: typeof isAndroid;
    isIPhone: typeof isIPhone;
    isIPad: typeof isIPad;
    isTouchDevice: typeof isTouchDevice;
    isRetina: typeof isRetina;
    isWeChat: typeof isWeChat;
    isMiniProgram: typeof isMiniProgram;
    isAlipay: typeof isAlipay;
    getBrowserName: typeof getBrowserName;
    getBrowserVersion: typeof getBrowserVersion;
    getOSName: typeof getOSName;
    getOSVersion: typeof getOSVersion;
    getDeviceType: typeof getDeviceType;
    getDeviceInfo: typeof getDeviceInfo;
    getScreenInfo: typeof getScreenInfo;
    getNetworkType: typeof getNetworkType;
    isOnline: typeof isOnline;
    getLanguage: typeof getLanguage;
    getUserAgent: typeof getUserAgent;
    isDarkMode: typeof isDarkMode;
    supportsWebP: typeof supportsWebP;
    supportsServiceWorker: typeof supportsServiceWorker;
    supportsLocalStorage: typeof supportsLocalStorage;
    supportsWebGL: typeof supportsWebGL;
};
export default device;
//# sourceMappingURL=device.d.ts.map