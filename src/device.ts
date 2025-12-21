/**
 * 设备检测工具 - 浏览器、操作系统、设备类型检测
 */

interface DeviceInfo {
  browser: {
    name: string
    version: string
  }
  os: {
    name: string
    version: string
  }
  device: {
    type: 'mobile' | 'tablet' | 'desktop'
    vendor: string
    model: string
  }
  engine: {
    name: string
    version: string
  }
}

export type { DeviceInfo }

/**
 * 获取用户代理字符串
 */
function getUserAgent(): string {
  return typeof navigator !== 'undefined' ? navigator.userAgent : ''
}

/**
 * 检测是否为移动设备
 * @example isMobile() // true/false
 */
function isMobile(): boolean {
  const ua = getUserAgent()
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
}

/**
 * 检测是否为平板设备
 * @example isTablet() // true/false
 */
function isTablet(): boolean {
  const ua = getUserAgent()
  return /iPad|Android(?!.*Mobile)/i.test(ua)
}

/**
 * 检测是否为桌面设备
 * @example isDesktop() // true/false
 */
function isDesktop(): boolean {
  return !isMobile() && !isTablet()
}

/**
 * 检测是否为 iOS 设备
 * @example isIOS() // true/false
 */
function isIOS(): boolean {
  const ua = getUserAgent()
  return /iPhone|iPad|iPod/i.test(ua)
}

/**
 * 检测是否为 Android 设备
 * @example isAndroid() // true/false
 */
function isAndroid(): boolean {
  const ua = getUserAgent()
  return /Android/i.test(ua)
}

/**
 * 检测是否为 iPhone
 * @example isIPhone() // true/false
 */
function isIPhone(): boolean {
  const ua = getUserAgent()
  return /iPhone/i.test(ua)
}

/**
 * 检测是否为 iPad
 * @example isIPad() // true/false
 */
function isIPad(): boolean {
  const ua = getUserAgent()
  return /iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

/**
 * 检测是否为微信浏览器
 * @example isWeChat() // true/false
 */
function isWeChat(): boolean {
  const ua = getUserAgent()
  return /MicroMessenger/i.test(ua)
}

/**
 * 检测是否为微信小程序
 * @example isMiniProgram() // true/false
 */
function isMiniProgram(): boolean {
  const ua = getUserAgent()
  return /miniProgram/i.test(ua) || typeof (window as any).wx !== 'undefined'
}

/**
 * 检测是否为支付宝
 * @example isAlipay() // true/false
 */
function isAlipay(): boolean {
  const ua = getUserAgent()
  return /AlipayClient/i.test(ua)
}

/**
 * 获取浏览器名称
 * @example getBrowserName() // 'Chrome'
 */
function getBrowserName(): string {
  const ua = getUserAgent()
  
  if (/Edg/i.test(ua)) return 'Edge'
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return 'Chrome'
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari'
  if (/Firefox/i.test(ua)) return 'Firefox'
  if (/MSIE|Trident/i.test(ua)) return 'IE'
  if (/Opera|OPR/i.test(ua)) return 'Opera'
  
  return 'Unknown'
}

/**
 * 获取浏览器版本
 * @example getBrowserVersion() // '120.0.0'
 */
function getBrowserVersion(): string {
  const ua = getUserAgent()
  const browser = getBrowserName()
  
  let match: RegExpMatchArray | null = null
  
  switch (browser) {
    case 'Chrome':
      match = ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/)
      break
    case 'Safari':
      match = ua.match(/Version\/(\d+\.\d+\.\d+)/)
      break
    case 'Firefox':
      match = ua.match(/Firefox\/(\d+\.\d+)/)
      break
    case 'Edge':
      match = ua.match(/Edg\/(\d+\.\d+\.\d+\.\d+)/)
      break
    case 'IE':
      match = ua.match(/(?:MSIE |rv:)(\d+\.\d+)/)
      break
    case 'Opera':
      match = ua.match(/(?:Opera|OPR)\/(\d+\.\d+\.\d+)/)
      break
  }
  
  return match ? match[1] : 'Unknown'
}

/**
 * 获取操作系统名称
 * @example getOSName() // 'Windows', 'macOS', 'iOS', 'Android', 'Linux'
 */
function getOSName(): string {
  const ua = getUserAgent()
  
  if (/Windows/i.test(ua)) return 'Windows'
  if (/Mac OS X/i.test(ua)) return 'macOS'
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS'
  if (/Android/i.test(ua)) return 'Android'
  if (/Linux/i.test(ua)) return 'Linux'
  
  return 'Unknown'
}

/**
 * 获取操作系统版本
 * @example getOSVersion() // '10.0', '14.0'
 */
function getOSVersion(): string {
  const ua = getUserAgent()
  const os = getOSName()
  
  let match: RegExpMatchArray | null = null
  
  switch (os) {
    case 'Windows':
      if (/Windows NT 10.0/i.test(ua)) return '10'
      if (/Windows NT 6.3/i.test(ua)) return '8.1'
      if (/Windows NT 6.2/i.test(ua)) return '8'
      if (/Windows NT 6.1/i.test(ua)) return '7'
      break
    case 'macOS':
      match = ua.match(/Mac OS X (\d+[._]\d+[._]?\d*)/)
      if (match) return match[1].replace(/_/g, '.')
      break
    case 'iOS':
      match = ua.match(/OS (\d+[._]\d+[._]?\d*)/)
      if (match) return match[1].replace(/_/g, '.')
      break
    case 'Android':
      match = ua.match(/Android (\d+\.?\d*\.?\d*)/)
      if (match) return match[1]
      break
  }
  
  return 'Unknown'
}

/**
 * 获取设备类型
 * @example getDeviceType() // 'mobile', 'tablet', 'desktop'
 */
function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (isTablet()) return 'tablet'
  if (isMobile()) return 'mobile'
  return 'desktop'
}

/**
 * 获取屏幕信息
 * @example getScreenInfo()
 */
function getScreenInfo(): {
  width: number
  height: number
  availWidth: number
  availHeight: number
  colorDepth: number
  pixelRatio: number
  orientation: 'portrait' | 'landscape'
} {
  if (typeof window === 'undefined' || typeof screen === 'undefined') {
    return {
      width: 0,
      height: 0,
      availWidth: 0,
      availHeight: 0,
      colorDepth: 0,
      pixelRatio: 1,
      orientation: 'portrait',
    }
  }

  return {
    width: screen.width,
    height: screen.height,
    availWidth: screen.availWidth,
    availHeight: screen.availHeight,
    colorDepth: screen.colorDepth,
    pixelRatio: window.devicePixelRatio || 1,
    orientation: screen.width > screen.height ? 'landscape' : 'portrait',
  }
}

/**
 * 检测是否支持触摸
 * @example isTouchDevice() // true/false
 */
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  )
}

/**
 * 检测是否为 Retina 屏幕
 * @example isRetina() // true/false
 */
function isRetina(): boolean {
  if (typeof window === 'undefined') return false
  return window.devicePixelRatio >= 2
}

/**
 * 检测网络连接类型
 * @example getNetworkType() // '4g', 'wifi', 'none'
 */
function getNetworkType(): string {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
  
  if (!connection) return 'unknown'
  
  return connection.effectiveType || connection.type || 'unknown'
}

/**
 * 检测是否在线
 * @example isOnline() // true/false
 */
function isOnline(): boolean {
  if (typeof navigator === 'undefined') return true
  return navigator.onLine
}

/**
 * 获取语言
 * @example getLanguage() // 'zh-CN'
 */
function getLanguage(): string {
  if (typeof navigator === 'undefined') return 'en-US'
  return navigator.language || (navigator as any).userLanguage || 'en-US'
}

/**
 * 获取完整设备信息
 * @example getDeviceInfo()
 */
function getDeviceInfo(): Partial<DeviceInfo> {
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
  }
}

/**
 * 检测是否为暗色模式
 * @example isDarkMode() // true/false
 */
function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * 检测是否支持 WebP
 * @example supportsWebP()
 */
async function supportsWebP(): Promise<boolean> {
  if (typeof document === 'undefined') return false
  
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img.width > 0 && img.height > 0)
    img.onerror = () => resolve(false)
    img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA'
  })
}

/**
 * 检测是否支持 Service Worker
 * @example supportsServiceWorker() // true/false
 */
function supportsServiceWorker(): boolean {
  return typeof navigator !== 'undefined' && 'serviceWorker' in navigator
}

/**
 * 检测是否支持 LocalStorage
 * @example supportsLocalStorage() // true/false
 */
function supportsLocalStorage(): boolean {
  try {
    const test = '__test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

/**
 * 检测是否支持 WebGL
 * @example supportsWebGL() // true/false
 */
function supportsWebGL(): boolean {
  if (typeof document === 'undefined') return false
  
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
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
}

export default device
