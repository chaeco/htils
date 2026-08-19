interface TreeOptions {
    idKey?: string;
    parentIdKey?: string;
    childrenKey?: string;
    rootParentId?: any;
}

/**
 * 列表转树形结构
 * @example listToTree(list, { idKey: 'id', parentIdKey: 'parentId', childrenKey: 'children' })
 */
declare function listToTree<T extends Record<string, any>>(list: T[], options?: TreeOptions): T[];
/**
 * 树形结构转列表（深度优先）
 * @example treeToList(tree, { childrenKey: 'children' })
 */
declare function treeToList<T extends Record<string, any>>(tree: T[], options?: TreeOptions): T[];
/**
 * 查找树节点
 * @example findNode(tree, node => node.id === 'target')
 */
declare function findNode<T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions): T | null;
/**
 * 查找节点路径
 * @example findPath(tree, node => node.id === 'target')
 */
declare function findPath<T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions): T[] | null;
/**
 * 过滤树节点
 * @example filterTree(tree, node => node.status === 'active')
 */
declare function filterTree<T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions): T[];
/**
 * 遍历树节点
 * @example forEachTree(tree, node => console.log(node.name))
 */
declare function forEachTree<T extends Record<string, any>>(tree: T[], callback: (node: T, index: number, parent?: T) => void, options?: TreeOptions): void;
/**
 * 映射树节点
 * @example mapTree(tree, node => ({ ...node, label: node.name }))
 */
declare function mapTree<T extends Record<string, any>, R extends Record<string, any>>(tree: T[], mapper: (node: T) => R, options?: TreeOptions): R[];
/**
 * 获取树的最大深度
 * @example getTreeDepth(tree)
 */
declare function getTreeDepth<T extends Record<string, any>>(tree: T[], options?: TreeOptions): number;
/**
 * 获取树的所有叶子节点
 * @example getLeafNodes(tree)
 */
declare function getLeafNodes<T extends Record<string, any>>(tree: T[], options?: TreeOptions): T[];
/**
 * 排序树节点
 * @example sortTree(tree, (a, b) => a.order - b.order)
 */
declare function sortTree<T extends Record<string, any>>(tree: T[], compareFn: (a: T, b: T) => number, options?: TreeOptions): T[];
/**
 * 查找节点的父节点
 * @example findParent(tree, node => node.id === 'child')
 */
declare function findParent<T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions): T | null;
/**
 * 查找节点的所有祖先
 * @example findAncestors(tree, node => node.id === 'child')
 */
declare function findAncestors<T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions): T[];
/**
 * 查找节点的所有后代
 * @example findDescendants(tree, node => node.id === 'parent')
 */
declare function findDescendants<T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions): T[];
/**
 * 树节点去重
 * @example uniqueTree(tree, node => node.id)
 */
declare function uniqueTree<T extends Record<string, any>>(tree: T[], getKey: (node: T) => any, options?: TreeOptions): T[];
/**
 * 扁平化树到指定深度
 * @example flattenToDepth(tree, 2)
 */
declare function flattenToDepth<T extends Record<string, any>>(tree: T[], depth: number, options?: TreeOptions): T[];
declare const tree: {
    listToTree: typeof listToTree;
    treeToList: typeof treeToList;
    findNode: typeof findNode;
    findPath: typeof findPath;
    findParent: typeof findParent;
    findAncestors: typeof findAncestors;
    findDescendants: typeof findDescendants;
    filterTree: typeof filterTree;
    forEachTree: typeof forEachTree;
    mapTree: typeof mapTree;
    sortTree: typeof sortTree;
    getTreeDepth: typeof getTreeDepth;
    getLeafNodes: typeof getLeafNodes;
    uniqueTree: typeof uniqueTree;
    flattenToDepth: typeof flattenToDepth;
};

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

/**
 * 文件处理工具 - 真实项目中的文件操作
 */
interface FileInfo {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    extension: string;
}
/**
 * 获取文件信息
 * @example getFileInfo(file)
 */
declare function getFileInfo(file: File): FileInfo;
/**
 * 验证文件类型
 * @example validateFileType(file, ['image/jpeg', 'image/png'])
 */
declare function validateFileType(file: File, allowedTypes: string[]): boolean;
/**
 * 验证文件大小
 * @example validateFileSize(file, 5 * 1024 * 1024) // 5MB
 */
declare function validateFileSize(file: File, maxSize: number): boolean;
/**
 * 格式化文件大小
 * @example formatFileSize(1024) // '1 KB'
 */
declare function formatFileSize(bytes: number): string;
/**
 * 读取文件为文本
 * @example await readFileAsText(file)
 */
declare function readFileAsText(file: File): Promise<string>;
/**
 * 读取文件为 Data URL
 * @example await readFileAsDataURL(file)
 */
declare function readFileAsDataURL(file: File): Promise<string>;
/**
 * 读取文件为 ArrayBuffer
 * @example await readFileAsArrayBuffer(file)
 */
declare function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer>;
/**
 * 下载文件
 * @example downloadFile('data.json', jsonString, 'application/json')
 */
declare function downloadFile(filename: string, content: string | Blob, type?: string): void;
/**
 * 下载 JSON 文件
 * @example downloadJSON('data.json', { key: 'value' })
 */
declare function downloadJSON(filename: string, data: any): void;
/**
 * 下载文本文件
 * @example downloadText('notes.txt', 'Hello World')
 */
declare function downloadText(filename: string, text: string): void;
/**
 * 下载 CSV 文件
 * @example downloadCSV('data.csv', [['Name', 'Age'], ['John', '30']])
 */
declare function downloadCSV(filename: string, data: string[][]): void;
/**
 * 图片压缩
 * @example await compressImage(file, 0.8, 1920, 1080)
 */
declare function compressImage(file: File, quality?: number, maxWidth?: number, maxHeight?: number): Promise<Blob>;
/**
 * 获取图片尺寸
 * @example await getImageDimensions(file)
 */
declare function getImageDimensions(file: File): Promise<{
    width: number;
    height: number;
}>;
/**
 * 创建文件选择器
 * @example await selectFile({ accept: 'image/*', multiple: false })
 */
declare function selectFile(options: {
    accept?: string;
    multiple?: boolean;
}): Promise<FileList | null>;
/**
 * Base64 转 Blob
 * @example base64ToBlob(base64String, 'image/png')
 */
declare function base64ToBlob(base64: string, type?: string): Blob;
/**
 * Base64 转 File
 * @example base64ToFile(base64String, 'image.png', 'image/png')
 */
declare function base64ToFile(base64: string, filename: string, type?: string): File;
/**
 * 文件切片上传辅助
 * @example sliceFile(file, 1024 * 1024) // 1MB chunks
 */
declare function sliceFile(file: File, chunkSize: number): Blob[];
/**
 * 计算文件 MD5
 * @example await calculateFileMD5(file)
 */
declare function calculateFileMD5(file: File): Promise<string>;
/**
 * 计算文件 SHA256
 * @example await calculateFileSHA256(file)
 */
declare function calculateFileSHA256(file: File): Promise<string>;
/**
 * 计算文件 SHA512
 * @example await calculateFileSHA512(file)
 */
declare function calculateFileSHA512(file: File): Promise<string>;
/**
 * 计算文件哈希值（支持多种算法）
 * @example await calculateFileHash(file, 'sha256')
 */
declare function calculateFileHash(file: File, algorithm?: 'md5' | 'sha256' | 'sha512'): Promise<string>;
/**
 * 计算文件 ETag（强 ETag，基于 MD5）
 * @example await calculateETag(file) // '"5d41402abc4b2a76b9719d911017c592"'
 */
declare function calculateETag(file: File): Promise<string>;
/**
 * 计算文件弱 ETag（W/ 前缀）
 * @example await calculateWeakETag(file) // 'W/"5d41402abc4b2a76b9719d911017c592"'
 */
declare function calculateWeakETag(file: File): Promise<string>;
/**
 * 计算文件 ETag（基于 SHA256）
 * @example await calculateETagSHA256(file)
 */
declare function calculateETagSHA256(file: File): Promise<string>;
/**
 * 计算文件 ETag（包含文件大小和修改时间）
 * @example await calculateETagWithMetadata(file) // '"1024-1703145600000-5d414..."'
 */
declare function calculateETagWithMetadata(file: File): Promise<string>;
/**
 * 验证文件 ETag 是否匹配
 * @example await validateETag(file, '"5d41402abc4b2a76b9719d911017c592"')
 */
declare function validateETag(file: File, etag: string): Promise<boolean>;
/**
 * 比较两个文件是否相同（基于内容哈希）
 * @example await compareFiles(file1, file2)
 */
declare function compareFiles(file1: File, file2: File): Promise<boolean>;
/**
 * 计算阿里云 OSS/AWS S3 ETag
 * @param file 文件对象
 * @param chunkSize 分片大小（不传或文件小于此值则返回单文件 MD5）
 * @param onProgress 进度回调 (当前进度 0-100, 当前分片索引, 总分片数)
 * @example
 * // 单文件: calculateOSSETag(file)
 * // 返回: '5d41402abc4b2a76b9719d911017c592'
 *
 * // 分片上传带进度:
 * calculateOSSETag(file, 5 * 1024 * 1024, (progress, current, total) => {
 *   console.log(`计算中: ${progress.toFixed(2)}% (${current}/${total})`)
 * })
 * // 返回: '5d41402abc4b2a76b9719d911017c592-10'
 */
declare function calculateOSSETag(file: File, chunkSize?: number, onProgress?: (progress: number, current: number, total: number) => void): Promise<string>;
/**
 * 验证 OSS 分片 ETag 格式
 * @example isOSSMultipartETag('5d41402abc4b2a76b9719d911017c592-10') // true
 * @example isOSSMultipartETag('5d41402abc4b2a76b9719d911017c592') // false
 */
declare function isOSSMultipartETag(etag: string): boolean;
/**
 * 解析 OSS 分片 ETag
 * @example parseOSSMultipartETag('5d41402abc4b2a76b9719d911017c592-10')
 * // 返回: { md5: '5d41402abc4b2a76b9719d911017c592', partCount: 10 }
 */
declare function parseOSSMultipartETag(etag: string): {
    md5: string;
    partCount: number;
} | null;
/**
 * 计算文件分片信息（用于 OSS 分片上传）
 * @example getOSSChunkInfo(file, 5 * 1024 * 1024)
 * // 返回: { chunkSize: 5242880, chunkCount: 10, lastChunkSize: 1024000 }
 */
declare function getOSSChunkInfo(file: File, chunkSize?: number): {
    chunkSize: number;
    chunkCount: number;
    lastChunkSize: number;
    totalSize: number;
};
/**
 * 批量上传文件
 * @example await uploadFiles(files, '/api/upload', (progress) => console.log(progress))
 */
declare function uploadFiles(files: File[], url: string, onProgress?: (progress: number, file: File) => void): Promise<any[]>;
declare const fileHandler: {
    getFileInfo: typeof getFileInfo;
    validateFileType: typeof validateFileType;
    validateFileSize: typeof validateFileSize;
    formatFileSize: typeof formatFileSize;
    readFileAsText: typeof readFileAsText;
    readFileAsDataURL: typeof readFileAsDataURL;
    readFileAsArrayBuffer: typeof readFileAsArrayBuffer;
    downloadFile: typeof downloadFile;
    downloadJSON: typeof downloadJSON;
    downloadText: typeof downloadText;
    downloadCSV: typeof downloadCSV;
    compressImage: typeof compressImage;
    getImageDimensions: typeof getImageDimensions;
    selectFile: typeof selectFile;
    base64ToBlob: typeof base64ToBlob;
    base64ToFile: typeof base64ToFile;
    sliceFile: typeof sliceFile;
    calculateFileMD5: typeof calculateFileMD5;
    calculateFileSHA256: typeof calculateFileSHA256;
    calculateFileSHA512: typeof calculateFileSHA512;
    calculateFileHash: typeof calculateFileHash;
    calculateETag: typeof calculateETag;
    calculateWeakETag: typeof calculateWeakETag;
    calculateETagSHA256: typeof calculateETagSHA256;
    calculateETagWithMetadata: typeof calculateETagWithMetadata;
    validateETag: typeof validateETag;
    compareFiles: typeof compareFiles;
    calculateOSSETag: typeof calculateOSSETag;
    isOSSMultipartETag: typeof isOSSMultipartETag;
    parseOSSMultipartETag: typeof parseOSSMultipartETag;
    getOSSChunkInfo: typeof getOSSChunkInfo;
    uploadFiles: typeof uploadFiles;
};

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

/**
 * 敏感信息脱敏工具
 * 用于在日志、展示等场景中对敏感信息进行处理
 */
/**
 * 脱敏电话号码
 * @example desensitizePhone('13812345678') => '138****5678'
 */
declare function desensitizePhone(phone: string): string;
/**
 * 脱敏邮箱
 * @example desensitizeEmail('user@example.com') => 'u***@example.com'
 */
declare function desensitizeEmail(email: string): string;
/**
 * 脱敏身份证号
 * @example desensitizeIdCard('110101199003071234') => '1101011990****1234'
 */
declare function desensitizeIdCard(id: string): string;
/**
 * 脱敏名字
 * @example desensitizeName('张三') => '张*'
 * @example desensitizeName('John Doe') => 'J*** D**'
 */
declare function desensitizeName(name: string): string;
/**
 * 脱敏银行卡号
 * @example desensitizeCardNumber('6222022409001234567') => '622202****1234567'
 */
declare function desensitizeCardNumber(card: string): string;
/**
 * 脱敏密钥/Token
 * @example desensitizeToken('abc123def456ghi789') => 'abc***789'
 */
declare function desensitizeToken(token: string): string;
/**
 * 脱敏 URL 中的敏感参数
 * @example desensitizeUrl('https://example.com?token=abc123&key=secret') => 'https://example.com?token=***&key=***'
 */
declare function desensitizeUrl(url: string, sensitiveParams?: string[]): string;
/**
 * 脱敏 JSON 对象中的敏感字段
 * @example desensitizeObject({ name: '张三', phone: '13812345678' }, ['phone']) => { name: '张三', phone: '138****5678' }
 */
declare function desensitizeObject<T extends Record<string, any>>(obj: T, sensitiveFields?: string[]): T;
/**
 * 自定义脱敏（保留指定比例的前后字符）
 * @example desensitizeCustom('hello world', 0.2) => 'h***rld'
 */
declare function desensitizeCustom(text: string, ratio?: number): string;
/**
 * 脱敏日志信息
 * @example desensitizeLog('User logged in: 13812345678') => 'User logged in: 138****5678'
 */
declare function desensitizeLog(log: string, patterns?: Array<{
    pattern: RegExp;
    handler: (match: string) => string;
}>): string;
/**
 * 敏感信息处理工具集
 */
declare const sensitive: {
    desensitizePhone: typeof desensitizePhone;
    desensitizeEmail: typeof desensitizeEmail;
    desensitizeIdCard: typeof desensitizeIdCard;
    desensitizeName: typeof desensitizeName;
    desensitizeCardNumber: typeof desensitizeCardNumber;
    desensitizeToken: typeof desensitizeToken;
    desensitizeUrl: typeof desensitizeUrl;
    desensitizeObject: typeof desensitizeObject;
    desensitizeCustom: typeof desensitizeCustom;
    desensitizeLog: typeof desensitizeLog;
};

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

/**
 * 命名转换工具：蛇形与驼峰双向转换
 * 支持纯对象、嵌套对象、数组及基础类型值
 */
declare const scformat: {
    /**
     * 判断值是否为纯对象
     */
    isPlainObject(value: unknown): value is Record<string, unknown>;
    /**
     * 判断值是否为 Record 数组
     */
    isRecordArray(value: unknown): value is Record<string, unknown>[];
    /**
     * 蛇形命名转驼峰命名
     * @example scformat.snakeToCamel('user_name') // 'userName'
     */
    snakeToCamel(str: string): string;
    /**
     * 驼峰命名转蛇形命名
     * @example scformat.camelToSnake('userName') // 'user_name'
     */
    camelToSnake(str: string): string;
    /**
     * 递归将蛇形键对象转换为驼峰键对象
     * @example scformat.snakeDataToCamel({ user_name: 'test' }) // { userName: 'test' }
     */
    snakeDataToCamel(data: Record<string, unknown> | Record<string, unknown>[] | unknown): Record<string, unknown> | Record<string, unknown>[] | unknown;
    /**
     * 递归将驼峰键对象转换为蛇形键对象
     * @example scformat.camelDataToSnake({ userName: 'test' }) // { user_name: 'test' }
     */
    camelDataToSnake(data: Record<string, unknown> | Record<string, unknown>[] | unknown): Record<string, unknown> | Record<string, unknown>[] | unknown;
};

/**
 * 字符串处理工具函数 - 精简核心版本
 * 注：驼峰/蛇形转换请使用 scformat 模块，支持递归对象和数组
 */
declare const string: {
    /**
     * 首字母大写
     * @example capitalize('hello') // 'Hello'
     */
    capitalize(str: string): string;
    /**
     * 转换为 kebab 命名
     * @example kebabCase('helloWorld') // 'hello-world'
     */
    kebabCase(str: string): string;
    /**
     * 检查字符串是否为空
     * @example isEmpty('') // true
     */
    isEmpty(str: string): boolean;
    /**
     * 检查字符串是否为空白
     * @example isBlank('   ') // true
     */
    isBlank(str: string): boolean;
    /**
     * 截断字符串
     * @example truncate('hello world', 5) // 'he...'
     */
    truncate(str: string, length: number, suffix?: string): string;
    /**
     * 查找并替换第一个匹配项
     * @example replaceOnce('hello hello', 'hello', 'hi') // 'hi hello'
     */
    replaceOnce(str: string, search: string, replace: string): string;
    /**
     * 忽略大小写的包含检查
     * @example includes('Hello', 'hello', false) // true
     */
    includes(str: string, substring: string, caseSensitive?: boolean): boolean;
    /**
     * 转换为大写
     * @example toUpper('hello') // 'HELLO'
     */
    toUpper(str: string): string;
    /**
     * 转换为小写
     * @example toLower('HELLO') // 'hello'
     */
    toLower(str: string): string;
    /**
     * 转换为 Title Case
     * @example toTitleCase('hello world') // 'Hello World'
     */
    toTitleCase(str: string): string;
    /**
     * 重复字符串
     * @example repeat('a', 3) // 'aaa'
     */
    repeat(str: string, count: number): string;
};

/**
 * 数组处理工具函数
 */
declare const array: {
    /**
     * 数组去重
     * @example unique([1, 2, 2, 3]) // [1, 2, 3]
     */
    unique<T>(arr: T[]): T[];
    /**
     * 数组扁平化
     * @example flatten([[1, 2], [3, [4, 5]]]) // [1, 2, 3, 4, 5]
     */
    flatten<T>(arr: any[], depth?: number): T[];
    /**
     * 数组分块
     * @example chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
     */
    chunk<T>(arr: T[], size: number): T[][];
    /**
     * 按属性分组
     * @example groupBy([{type: 'a', val: 1}, {type: 'b', val: 2}], 'type')
     */
    groupBy<T>(arr: T[], key: keyof T): Record<string, T[]>;
    /**
     * 根据条件查找元素
     * @example find([1, 2, 3, 4], x => x > 2) // 3
     */
    find<T>(arr: T[], predicate: (item: T, index: number) => boolean): T | undefined;
    /**
     * 查找索引
     * @example findIndex([1, 2, 3], x => x > 2) // 2
     */
    findIndex<T>(arr: T[], predicate: (item: T, index: number) => boolean): number;
    /**
     * 检查数组是否包含某个元素
     * @example includes([1, 2, 3], 2) // true
     */
    includes<T>(arr: T[], item: T): boolean;
    /**
     * 获取数组第一个元素
     * @example first([1, 2, 3]) // 1
     */
    first<T>(arr: T[]): T | undefined;
    /**
     * 获取数组最后一个元素
     * @example last([1, 2, 3]) // 3
     */
    last<T>(arr: T[]): T | undefined;
    /**
     * 过滤空值
     * @example compact([1, 0, 2, false, 3, '', 4]) // [1, 2, 3, 4]
     */
    compact<T>(arr: (T | null | undefined | false | 0 | "")[]): T[];
    /**
     * 从数组中移除指定元素
     * @example remove([1, 2, 3, 2], 2) // [1, 3]
     */
    remove<T>(arr: T[], item: T): T[];
    /**
     * 获取两个数组的差集
     * @example difference([1, 2, 3], [2, 3, 4]) // [1]
     */
    difference<T>(arr1: T[], arr2: T[]): T[];
    /**
     * 获取指定长度的随机样本
     * @example sample([1, 2, 3, 4, 5], 2) // [3, 1] (随机)
     */
    sample<T>(arr: T[], size?: number): T[];
    /**
     * 获取数组索引
     * @example indexOf([1, 2, 3], 2) // 1
     */
    indexOf<T>(arr: T[], item: T): number;
    /**
     * 检查数组是否为空
     * @example isEmpty([]) // true
     */
    isEmpty<T>(arr: T[]): boolean;
    /**
     * 求和
     * @example sum([1, 2, 3]) // 6
     */
    sum(arr: number[]): number;
    /**
     * 求平均值
     * @example average([1, 2, 3]) // 2
     */
    average(arr: number[]): number;
    /**
     * 获取最大值
     * @example max([1, 2, 3]) // 3
     */
    max(arr: number[]): number;
    /**
     * 获取最小值
     * @example min([1, 2, 3]) // 1
     */
    min(arr: number[]): number;
};

/**
 * 对象处理工具函数
 */
declare const object: {
    /**
     * 判断值是否为纯对象
     */
    isPlainObject(value: unknown): value is Record<string, unknown>;
    /**
     * 深拷贝
     * @example deepClone({ a: { b: 1 } }) // { a: { b: 1 } }
     */
    deepClone<T>(obj: T): T;
    /**
     * 浅拷贝
     * @example shallowClone({ a: { b: 1 } }) // { a: { b: 1 } }
     */
    shallowClone<T extends Record<string, any>>(obj: T): T;
    /**
     * 合并对象
     * @example merge({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
     */
    merge<T extends Record<string, any>>(...objects: T[]): T;
    /**
     * 深度合并对象
     * @example deepMerge({ a: { b: 1 } }, { a: { c: 2 } }) // { a: { b: 1, c: 2 } }
     */
    deepMerge<T extends Record<string, any>>(...objects: T[]): T;
    /**
     * 选取指定属性
     * @example pick({ a: 1, b: 2, c: 3 }, ['a', 'b']) // { a: 1, b: 2 }
     */
    pick<T extends Record<string, any>>(obj: T, keys: (keyof T)[]): Partial<T>;
    /**
     * 排除指定属性
     * @example omit({ a: 1, b: 2, c: 3 }, ['c']) // { a: 1, b: 2 }
     */
    omit<T extends Record<string, any>>(obj: T, keys: (keyof T)[]): Partial<T>;
    /**
     * 判断对象是否为空
     * @example isEmpty({}) // true
     * @example isEmpty({ a: 1 }) // false
     */
    isEmpty(obj: Record<string, any>): boolean;
    /**
     * 判断对象是否存在指定属性
     * @example hasKey({ a: 1 }, 'a') // true
     */
    hasKey(obj: Record<string, any>, key: string): boolean;
    /**
     * 获取对象的所有键
     * @example keys({ a: 1, b: 2 }) // ['a', 'b']
     */
    keys(obj: Record<string, any>): string[];
    /**
     * 获取对象的所有值
     * @example values({ a: 1, b: 2 }) // [1, 2]
     */
    values(obj: Record<string, any>): any[];
    /**
     * 获取对象的所有键值对
     * @example entries({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
     */
    entries(obj: Record<string, any>): Array<[string, any]>;
    /**
     * 从键值对创建对象
     * @example fromEntries([['a', 1], ['b', 2]]) // { a: 1, b: 2 }
     */
    fromEntries(entries: Array<[string, any]>): Record<string, any>;
    /**
     * 转换对象的键
     * @example mapKeys({ a: 1, b: 2 }, key => key.toUpperCase()) // { A: 1, B: 2 }
     */
    mapKeys<T extends Record<string, any>>(obj: T, fn: (key: string) => string): Record<string, any>;
    /**
     * 转换对象的值
     * @example mapValues({ a: 1, b: 2 }, val => val * 2) // { a: 2, b: 4 }
     */
    mapValues<T extends Record<string, any>>(obj: T, fn: (value: any, key: string) => any): Record<string, any>;
    /**
     * 过滤对象的键值对
     * @example filter({ a: 1, b: 2, c: 3 }, val => val > 1) // { b: 2, c: 3 }
     */
    filter<T extends Record<string, any>>(obj: T, predicate: (value: any, key: string) => boolean): Partial<T>;
    /**
     * 判断两个对象是否相等（深度比较）
     * @example isEqual({ a: 1 }, { a: 1 }) // true
     */
    isEqual(obj1: any, obj2: any): boolean;
    /**
     * 反转对象的键和值
     * @example invert({ a: '1', b: '2' }) // { 1: 'a', 2: 'b' }
     */
    invert(obj: Record<string, any>): Record<string, any>;
    /**
     * 检查对象是否包含特定的键值对
     * @example contains({ a: 1, b: 2 }, { a: 1 }) // true
     */
    contains(obj: Record<string, any>, target: Record<string, any>): boolean;
    /**
     * 获取对象的嵌套属性值
     * @example get({ a: { b: { c: 1 } } }, 'a.b.c') // 1
     */
    get(obj: Record<string, any>, path: string, defaultValue?: any): any;
    /**
     * 设置对象的嵌套属性值
     * @example set({ a: {} }, 'a.b.c', 1) // { a: { b: { c: 1 } } }
     */
    set(obj: Record<string, any>, path: string, value: any): Record<string, any>;
};

/**
 * 文件处理工具函数
 */
declare const file: {
    /**
     * 获取文件扩展名
     * @example getExtension('index.ts') // 'ts'
     */
    getExtension(filename: string): string;
    /**
     * 获取文件名（不含扩展名）
     * @example getBasename('index.ts') // 'index'
     */
    getBasename(filename: string): string;
    /**
     * 获取完整文件名
     * @example getFilename('path/to/index.ts') // 'index.ts'
     */
    getFilename(filepath: string): string;
    /**
     * 获取文件目录路径
     * @example getDirectory('path/to/index.ts') // 'path/to'
     */
    getDirectory(filepath: string): string;
    /**
     * 判断文件是否具有指定扩展名
     * @example hasExtension('index.ts', 'ts') // true
     */
    hasExtension(filename: string, ext: string): boolean;
    /**
     * 改变文件扩展名
     * @example changeExtension('index.ts', 'js') // 'index.js'
     */
    changeExtension(filename: string, newExt: string): string;
    /**
     * 判断是否为文件路径格式
     * @example isFilePath('index.ts') // true
     * @example isFilePath('path/to/file.ts') // true
     */
    isFilePath(str: string): boolean;
    /**
     * 判断是否为目录路径格式
     * @example isDirectoryPath('src/') // true
     * @example isDirectoryPath('src') // true
     */
    isDirectoryPath(str: string): boolean;
    /**
     * 规范化路径分隔符（转换为前斜杠）
     * @example normalizePath('src\\utils\\index.ts') // 'src/utils/index.ts'
     */
    normalizePath(filepath: string): string;
    /**
     * 获取文件的 MIME 类型（基于扩展名）
     * @example getMimeType('index.html') // 'text/html'
     */
    getMimeType(filename: string): string;
    /**
     * 判断是否为文本文件
     * @example isTextFile('index.ts') // true
     */
    isTextFile(filename: string): boolean;
    /**
     * 判断是否为图片文件
     * @example isImageFile('image.png') // true
     */
    isImageFile(filename: string): boolean;
    /**
     * 判断是否为视频文件
     * @example isVideoFile('video.mp4') // true
     */
    isVideoFile(filename: string): boolean;
    /**
     * 判断是否为音频文件
     * @example isAudioFile('song.mp3') // true
     */
    isAudioFile(filename: string): boolean;
    /**
     * 生成唯一的文件名（添加时间戳或随机数）
     * @example generateUniqueFilename('image.png') // 'image_1703072000000.png'
     */
    generateUniqueFilename(filename: string, useTimestamp?: boolean): string;
};

/**
 * 数字处理工具函数
 */
declare const number: {
    /**
     * 四舍五入到指定小数位
     * @example round(3.14159, 2) // 3.14
     */
    round(num: number, precision?: number): number;
    /**
     * 向上取整到指定小数位
     * @example ceil(3.14, 1) // 3.2
     */
    ceil(num: number, precision?: number): number;
    /**
     * 向下取整到指定小数位
     * @example floor(3.19, 1) // 3.1
     */
    floor(num: number, precision?: number): number;
    /**
     * 约束数字在指定范围内
     * @example clamp(5, 1, 3) // 3
     */
    clamp(num: number, min: number, max: number): number;
    /**
     * 数字范围检查
     * @example inRange(5, 0, 10) // true
     */
    inRange(num: number, min: number, max: number): boolean;
    /**
     * 字节转换
     * @example byteToMB(1024 * 1024) // 1
     */
    byteToKB(bytes: number): number;
    byteToMB(bytes: number): number;
    byteToGB(bytes: number): number;
    /**
     * 百分比计算
     * @example percentage(50, 100) // 50
     */
    percentage(value: number, total: number): number;
    /**
     * 计算平均值
     * @example average(1, 2, 3, 4, 5) // 3
     */
    average(...nums: number[]): number;
    /**
     * 计算总和
     * @example sum(1, 2, 3) // 6
     */
    sum(...nums: number[]): number;
    /**
     * 生成指定范围的随机整数
     * @example randomBetween(1, 10) // 5
     */
    randomBetween(min: number, max: number): number;
    /**
     * 生成 0-1 的随机数
     * @example random() // 0.5
     */
    random(): number;
    /**
     * 格式化数字为千位分隔符
     * @example formatWithCommas(1000000) // '1,000,000'
     */
    formatWithCommas(num: number): string;
};

/**
 * 数据验证工具函数
 */
declare const validate: {
    /**
     * 验证邮箱格式
     * @example isEmail('user@example.com') // true
     */
    isEmail(email: string): boolean;
    /**
     * 验证URL格式
     * @example isUrl('https://example.com') // true
     */
    isUrl(url: string): boolean;
    /**
     * 验证电话号码（中国格式）
     * @example isPhone('13800138000') // true
     */
    isPhone(phone: string): boolean;
    /**
     * 验证身份证号码（简化版）
     * @example isIdCard('110101199003071234') // true (format only)
     */
    isIdCard(idCard: string): boolean;
    /**
     * 验证中国统一社会信用代码
     * @example isSocialCreditCode('91110105MA00D66D4C') // true (format only)
     */
    isSocialCreditCode(code: string): boolean;
    /**
     * 验证邮政编码（中国）
     * @example isZipCode('100000') // true
     */
    isZipCode(zipCode: string): boolean;
    /**
     * 验证 IP 地址
     * @example isIp('192.168.1.1') // true
     */
    isIp(ip: string): boolean;
    /**
     * 验证 IPv4 地址
     * @example isIpv4('192.168.1.1') // true
     */
    isIpv4(ip: string): boolean;
    /**
     * 验证 IPv6 地址
     * @example isIpv6('::1') // true
     */
    isIpv6(ip: string): boolean;
    /**
     * 验证强密码
     * 至少包含大小写字母、数字、特殊字符，长度至少 8 位
     * @example isStrongPassword('Abc@1234') // true
     */
    isStrongPassword(password: string): boolean;
    /**
     * 验证是否为数字
     * @example isNumber('123') // true
     */
    isNumber(value: string): boolean;
    /**
     * 验证是否为整数
     * @example isInteger('123') // true
     */
    isInteger(value: string): boolean;
    /**
     * 验证是否为浮点数
     * @example isFloat('123.45') // true
     */
    isFloat(value: string): boolean;
    /**
     * 验证是否为十六进制颜色
     * @example isHexColor('#FFFFFF') // true
     */
    isHexColor(color: string): boolean;
    /**
     * 验证是否为中文字符
     * @example isChinese('你好') // true
     */
    isChinese(str: string): boolean;
    /**
     * 验证是否为英文字符
     * @example isEnglish('hello') // true
     */
    isEnglish(str: string): boolean;
    /**
     * 验证是否为字母数字
     * @example isAlphanumeric('abc123') // true
     */
    isAlphanumeric(str: string): boolean;
    /**
     * 验证长度范围
     * @example isLengthBetween('hello', 2, 10) // true
     */
    isLengthBetween(str: string, min: number, max: number): boolean;
    /**
     * 验证是否为空值
     * @example isEmpty('') // true
     * @example isEmpty(null) // true
     */
    isEmpty(value: any): boolean;
    /**
     * 验证是否包含特定字符
     * @example contains('hello world', 'world') // true
     */
    contains(str: string, substring: string): boolean;
    /**
     * 验证是否为纯数字
     * @example isPureNumber('12345') // true
     */
    isPureNumber(str: string): boolean;
    /**
     * 验证是否为 UUID
     * @example isUUID('550e8400-e29b-41d4-a716-446655440000') // true
     */
    isUUID(uuid: string): boolean;
    /**
     * 验证是否为 MAC 地址
     * @example isMacAddress('00:1A:2B:3C:4D:5E') // true
     */
    isMacAddress(mac: string): boolean;
};

/**
 * 数据格式化工具函数
 */
declare const format: {
    /**
     * 格式化货币
     * @example formatCurrency(1234.5) // '$1,234.50'
     * @example formatCurrency(1234.5, 'CNY', 'zh-CN') // '¥1,234.50'
     */
    formatCurrency(amount: number, currency?: string, locale?: string): string;
    /**
     * 格式化百分比
     * @example formatPercentage(0.5) // '50.00%'
     */
    formatPercentage(value: number, precision?: number): string;
    /**
     * 格式化文件大小
     * @example formatFileSize(1024) // '1 KB'
     * @example formatFileSize(1024 * 1024) // '1 MB'
     */
    formatFileSize(bytes: number): string;
    /**
     * 格式化数字（千位分隔符）
     * @example formatNumber(1000000) // '1,000,000'
     */
    formatNumber(num: number, precision?: number): string;
    /**
     * 格式化电话号码
     * @example formatPhone('13800138000') // '138-0013-8000'
     */
    formatPhone(phone: string): string;
    /**
     * 格式化身份证号码
     * @example formatIdCard('110101199003071234') // '1101 0119 9003 0712 34'
     */
    formatIdCard(idCard: string): string;
    /**
     * 格式化邮箱（隐藏部分字符）
     * @example formatEmail('user@example.com') // 'u***@example.com'
     */
    formatEmail(email: string): string;
    /**
     * 格式化银行卡号
     * @example formatBankCard('6222021234567890123') // '6222 0212 3456 7890 123'
     */
    formatBankCard(cardNumber: string): string;
    /**
     * 格式化大小（存储空间）
     * @example formatSize(1024) // '1 KB'
     */
    formatSize(size: number): string;
    /**
     * 格式化时间（秒数转换）
     * @example formatTime(3661) // '1h 1m 1s'
     */
    formatTime(seconds: number): string;
    /**
     * 格式化日期
     * @example formatDate(new Date('2024-01-01')) // '2024-01-01'
     */
    formatDate(date: Date, format?: string): string;
    /**
     * 格式化 JSON
     * @example formatJson({a:1,b:2}) // '{\n  "a": 1,\n  "b": 2\n}'
     */
    formatJson(obj: any, space?: number): string;
    /**
     * 格式化 URL
     * @example formatUrl('https://example.com', {key: 'value'}) // 'https://example.com?key=value'
     */
    formatUrl(baseUrl: string, params?: Record<string, any>): string;
    /**
     * 格式化 HTML（转义）
     * @example formatHtml('<div>test</div>') // '&lt;div&gt;test&lt;/div&gt;'
     */
    formatHtml(html: string): string;
    /**
     * 格式化 SQL 查询字符串
     * @example formatSql("SELECT * FROM users WHERE id = ?", [1]) // "SELECT * FROM users WHERE id = 1"
     */
    formatSql(sql: string, params: any[]): string;
    /**
     * 格式化驼峰字符串为空格分隔
     * @example formatCamelCase('helloWorld') // 'hello World'
     */
    formatCamelCase(str: string): string;
    /**
     * 格式化 Base64
     * @example formatBase64('hello') // 'aGVsbG8='
     */
    formatBase64(str: string): string;
    /**
     * 解码 Base64
     * @example decodeBase64('aGVsbG8=') // 'hello'
     */
    decodeBase64(str: string): string;
};

/**
 * 日期处理工具函数
 */
declare const date: {
    /**
     * 获取当前日期
     * @example now() // Date object
     */
    now(): Date;
    /**
     * 获取时间戳（秒）
     * @example timestamp() // 1703072000
     */
    timestamp(): number;
    /**
     * 获取时间戳（毫秒）
     * @example timestampMs() // 1703072000000
     */
    timestampMs(): number;
    /**
     * 将时间戳转换为日期对象
     * @example fromTimestamp(1703072000) // Date object
     */
    fromTimestamp(timestamp: number): Date;
    /**
     * 将日期对象转换为时间戳
     * @example toTimestamp(new Date()) // 1703072000
     */
    toTimestamp(date: Date): number;
    /**
     * 格式化日期
     * @example format(new Date('2024-01-01'), 'YYYY-MM-DD') // '2024-01-01'
     */
    format(date: Date, formatStr?: string): string;
    /**
     * 解析日期字符串
     * @example parse('2024-01-01') // Date object
     */
    parse(dateStr: string): Date;
    /**
     * 添加天数
     * @example addDays(new Date('2024-01-01'), 5) // 2024-01-06
     */
    addDays(date: Date, days: number): Date;
    /**
     * 添加小时
     * @example addHours(new Date(), 2) // Date 2 hours later
     */
    addHours(date: Date, hours: number): Date;
    /**
     * 添加分钟
     * @example addMinutes(new Date(), 30) // Date 30 minutes later
     */
    addMinutes(date: Date, minutes: number): Date;
    /**
     * 添加秒数
     * @example addSeconds(new Date(), 30) // Date 30 seconds later
     */
    addSeconds(date: Date, seconds: number): Date;
    /**
     * 添加月份
     * @example addMonths(new Date('2024-01-01'), 1) // 2024-02-01
     */
    addMonths(date: Date, months: number): Date;
    /**
     * 添加年份
     * @example addYears(new Date('2024-01-01'), 1) // 2025-01-01
     */
    addYears(date: Date, years: number): Date;
    /**
     * 计算两个日期之间的天数差
     * @example diffDays(new Date('2024-01-01'), new Date('2024-01-06')) // 5
     */
    diffDays(date1: Date, date2: Date): number;
    /**
     * 计算两个日期之间的小时数差
     * @example diffHours(new Date(), new Date(Date.now() + 3600000)) // 1
     */
    diffHours(date1: Date, date2: Date): number;
    /**
     * 计算两个日期之间的分钟数差
     * @example diffMinutes(new Date(), new Date(Date.now() + 60000)) // 1
     */
    diffMinutes(date1: Date, date2: Date): number;
    /**
     * 获取该月的天数
     * @example getDaysInMonth(new Date('2024-02-01')) // 29 (leap year)
     */
    getDaysInMonth(date: Date): number;
    /**
     * 判断是否为闰年
     * @example isLeapYear(2024) // true
     */
    isLeapYear(year: number): boolean;
    /**
     * 获取周几（0 = 星期日）
     * @example getDay(new Date('2024-01-01')) // 1
     */
    getDay(date: Date): number;
    /**
     * 获取周几的名称
     * @example getDayName(new Date('2024-01-01')) // 'Monday'
     */
    getDayName(date: Date): string;
    /**
     * 获取月份的名称
     * @example getMonthName(new Date('2024-01-01')) // 'January'
     */
    getMonthName(date: Date): string;
    /**
     * 获取年份的第几天
     * @example getDayOfYear(new Date('2024-01-01')) // 1
     */
    getDayOfYear(date: Date): number;
    /**
     * 判断两个日期是否为同一天
     * @example isSameDay(new Date('2024-01-01'), new Date('2024-01-01 10:00:00')) // true
     */
    isSameDay(date1: Date, date2: Date): boolean;
    /**
     * 判断日期是否在指定范围内
     * @example isBetween(new Date('2024-01-05'), new Date('2024-01-01'), new Date('2024-01-10')) // true
     */
    isBetween(date: Date, startDate: Date, endDate: Date): boolean;
    /**
     * 获取本周的开始日期
     * @example getWeekStart(new Date('2024-01-03')) // 2024-01-01 (Monday)
     */
    getWeekStart(date: Date): Date;
    /**
     * 获取本周的结束日期
     * @example getWeekEnd(new Date('2024-01-03')) // 2024-01-07 (Sunday)
     */
    getWeekEnd(date: Date): Date;
    /**
     * 获取本月的开始日期
     * @example getMonthStart(new Date('2024-01-15')) // 2024-01-01
     */
    getMonthStart(date: Date): Date;
    /**
     * 获取本月的结束日期
     * @example getMonthEnd(new Date('2024-01-15')) // 2024-01-31
     */
    getMonthEnd(date: Date): Date;
    /**
     * 相对时间表示（如："2 hours ago"）
     * @example fromNow(new Date(Date.now() - 7200000)) // '2 hours ago'
     */
    fromNow(date: Date): string;
};

/**
 * 类型检查工具函数
 */
declare const type: {
    /**
     * 获取精确的数据类型
     * @example getType({}) // 'Object'
     */
    getType(value: any): string;
    /**
     * 判断是否为对象
     * @example isObject({}) // true
     */
    isObject(value: any): boolean;
    /**
     * 判断是否为数组
     * @example isArray([]) // true
     */
    isArray(value: any): boolean;
    /**
     * 判断是否为字符串
     * @example isString('hello') // true
     */
    isString(value: any): boolean;
    /**
     * 判断是否为数字
     * @example isNumber(123) // true
     */
    isNumber(value: any): boolean;
    /**
     * 判断是否为布尔值
     * @example isBoolean(true) // true
     */
    isBoolean(value: any): boolean;
    /**
     * 判断是否为函数
     * @example isFunction(() => {}) // true
     */
    isFunction(value: any): boolean;
    /**
     * 判断是否为 null
     * @example isNull(null) // true
     */
    isNull(value: any): boolean;
    /**
     * 判断是否为 undefined
     * @example isUndefined(undefined) // true
     */
    isUndefined(value: any): boolean;
    /**
     * 判断是否为 null 或 undefined
     * @example isNil(null) // true
     */
    isNil(value: any): boolean;
    /**
     * 判断是否为日期对象
     * @example isDate(new Date()) // true
     */
    isDate(value: any): boolean;
    /**
     * 判断是否为正则表达式
     * @example isRegExp(/test/) // true
     */
    isRegExp(value: any): boolean;
    /**
     * 判断是否为 Map
     * @example isMap(new Map()) // true
     */
    isMap(value: any): boolean;
    /**
     * 判断是否为 Set
     * @example isSet(new Set()) // true
     */
    isSet(value: any): boolean;
    /**
     * 判断是否为 Symbol
     * @example isSymbol(Symbol('test')) // true
     */
    isSymbol(value: any): boolean;
    /**
     * 判断是否为 Promise
     * @example isPromise(Promise.resolve()) // true
     */
    isPromise(value: any): boolean;
    /**
     * 判断是否为 WeakMap
     * @example isWeakMap(new WeakMap()) // true
     */
    isWeakMap(value: any): boolean;
    /**
     * 判断是否为 WeakSet
     * @example isWeakSet(new WeakSet()) // true
     */
    isWeakSet(value: any): boolean;
    /**
     * 判断是否为可迭代对象
     * @example isIterable([1, 2, 3]) // true
     */
    isIterable(value: any): boolean;
    /**
     * 判断是否为空对象
     * @example isEmptyObject({}) // true
     */
    isEmptyObject(value: any): boolean;
    /**
     * 判断是否为空数组
     * @example isEmptyArray([]) // true
     */
    isEmptyArray(value: any): boolean;
    /**
     * 判断是否为空字符串
     * @example isEmptyString('') // true
     */
    isEmptyString(value: any): boolean;
    /**
     * 判断是否为平凡对象（纯 Object）
     * @example isPlainObject({}) // true
     * @example isPlainObject(new MyClass()) // false
     */
    isPlainObject(value: any): boolean;
    /**
     * 判断值是否为 truthy
     * @example isTruthy(1) // true
     * @example isTruthy(0) // false
     */
    isTruthy(value: any): boolean;
    /**
     * 判断值是否为 falsy
     * @example isFalsy(0) // true
     * @example isFalsy(1) // false
     */
    isFalsy(value: any): boolean;
    /**
     * 判断是否为原始类型
     * @example isPrimitive('hello') // true
     */
    isPrimitive(value: any): boolean;
};

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

/**
 * Promise 异步操作工具函数
 */
declare const promise: {
    /**
     * 延迟执行
     * @example await sleep(1000) // wait 1 second
     */
    sleep(ms: number): Promise<void>;
    /**
     * 带超时的 Promise
     * @example await timeout(fetch(...), 5000)
     */
    timeout<T>(promise: Promise<T>, ms: number): Promise<T>;
    /**
     * 重试机制
     * @example await retry(() => fetchData(), 3, 1000)
     */
    retry<T>(fn: () => Promise<T>, times?: number, delay?: number): Promise<T>;
    /**
     * 串行执行
     * @example await series([() => Promise.resolve(1), () => Promise.resolve(2)])
     */
    series<T>(tasks: Array<() => Promise<T> | T>): Promise<T[]>;
    /**
     * 并行执行
     * @example await parallel([promise1, promise2])
     */
    parallel<T>(promises: Promise<T>[]): Promise<T[]>;
    /**
     * 并发控制
     * @example await concurrency([promise1, promise2, promise3], 2)
     * 结果顺序与输入顺序一致（类似 Promise.all），并发度受 limit 限制
     */
    concurrency<T>(promises: Promise<T>[], limit: number): Promise<T[]>;
    /**
     * 轮询直到满足条件
     * @example await poll(() => checkStatus(), 10, 1000)
     */
    poll<T>(fn: () => Promise<T>, times?: number, interval?: number): Promise<T>;
    /**
     * 可取消的 Promise
     */
    cancellable<T>(promise: Promise<T>): {
        promise: Promise<T>;
        cancel: () => void;
    };
    /**
     * Callback 转 Promise
     */
    promisify<T>(fn: (callback: (err: any, result?: T) => void) => void): Promise<T>;
    /**
     * 等待任意 Promise 完成
     * @example await race([promise1, promise2])
     */
    race<T>(promises: Promise<T>[]): Promise<T>;
    /**
     * 处理 Promise 结果（不抛出错误）
     * @example const [err, data] = await handle(promise)
     */
    handle<T, E = Error>(promise: Promise<T>): Promise<[E | null, T | undefined]>;
};

/**
 * 防抖和节流工具函数
 */
declare const debounceThrottle: {
    /**
     * 防抖：等待延迟时间后，如果没有再次调用，则执行函数
     * @example const debouncedFn = debounce(handleInput, 300)
     */
    debounce<T extends (...args: any[]) => any>(fn: T, delay: number, options?: {
        leading?: boolean;
        trailing?: boolean;
        maxWait?: number;
    }): (...args: Parameters<T>) => void;
    /**
     * 节流：在延迟时间内，最多执行一次函数
     * @example const throttledFn = throttle(handleScroll, 300)
     */
    throttle<T extends (...args: any[]) => any>(fn: T, limit: number, options?: {
        leading?: boolean;
        trailing?: boolean;
    }): (...args: Parameters<T>) => void;
    /**
     * 立即执行，然后防抖后续调用
     * @example const leadingDebounce = immediate(handleClick, 300)
     */
    immediate<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void;
    /**
     * 节流，但保证最后一次调用必须执行
     * @example const throttleWithTrailing = throttleWithTrailing(handleEvent, 1000)
     */
    throttleWithTrailing<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void;
    /**
     * 防止快速重复调用（冷却时间）
     * @example const cooldown = withCooldown(handleClick, 2000)
     */
    withCooldown<T extends (...args: any[]) => any>(fn: T, cooldownTime: number): (...args: Parameters<T>) => boolean;
};

/**
 * 本地存储工具函数（支持 localStorage 和 sessionStorage）
 */
interface StorageOptions {
    expires?: number;
    version?: number;
}
declare class Storage {
    private prefix;
    private storage;
    constructor(isSession?: boolean, prefix?: string);
    private getKey;
    /**
     * 设置值
     * @example storage.set('user', { name: 'John' }, { expires: 3600000 })
     */
    set<T>(key: string, value: T, options?: StorageOptions): void;
    /**
     * 获取值
     * @example const user = storage.get<User>('user')
     */
    get<T>(key: string, defaultValue?: T): T | null;
    /**
     * 判断是否存在某个键
     * @example if (storage.has('user')) { ... }
     */
    has(key: string): boolean;
    /**
     * 删除某个值
     * @example storage.remove('user')
     */
    remove(key: string): void;
    /**
     * 清空所有值
     * @example storage.clear()
     */
    clear(): void;
    /**
     * 获取所有键
     * @example const keys = storage.keys()
     */
    keys(): string[];
    /**
     * 增加数值
     * @example storage.increment('counter', 1)
     */
    increment(key: string, step?: number): number;
    /**
     * 减少数值
     * @example storage.decrement('counter', 1)
     */
    decrement(key: string, step?: number): number;
    /**
     * 追加数组元素
     * @example storage.push('items', 'newItem')
     */
    push<T>(key: string, value: T): T[];
    /**
     * 移除数组元素
     * @example storage.pop('items')
     */
    pop<T>(key: string): T | undefined;
    /**
     * 获取存储大小（字节）
     * @example const size = storage.getSize('user')
     */
    getSize(key: string): number;
    /**
     * 获取总容量使用情况
     * @example const usage = storage.getTotalSize()
     */
    getTotalSize(): number;
    /**
     * 清理过期的数据
     * @example storage.cleanup()
     */
    cleanup(): number;
}
declare const getLocalStorage: () => Storage;
declare const getSessionStorage: () => Storage;

/**
 * 日志记录工具
 */
type LogLevel = 'debug' | 'info' | 'warn' | 'error';
interface LoggerOptions {
    level?: LogLevel;
    prefix?: string;
    timestamp?: boolean;
    colors?: boolean;
    maxLogs?: number;
    callback?: (log: LogEntry) => void;
}
interface LogEntry {
    timestamp: number;
    level: LogLevel;
    message: string;
    data?: any;
    stack?: string;
}
declare class Logger {
    private level;
    private prefix;
    private timestamp;
    private colors;
    private maxLogs;
    private logs;
    private callback?;
    private levelMap;
    private colorMap;
    constructor(options?: LoggerOptions);
    private getTimestamp;
    private formatMessage;
    private colorize;
    private addLog;
    private shouldLog;
    /**
     * 调试日志
     * @example logger.debug('Debug message', { data: 123 })
     */
    debug(message: string, data?: any): void;
    /**
     * 信息日志
     * @example logger.info('User logged in', { userId: 123 })
     */
    info(message: string, data?: any): void;
    /**
     * 警告日志
     * @example logger.warn('Invalid input', { input: 'xxx' })
     */
    warn(message: string, data?: any): void;
    /**
     * 错误日志
     * @example logger.error('Request failed', error)
     */
    error(message: string, error?: Error | any): void;
    /**
     * 设置日志级别
     * @example logger.setLevel('debug')
     */
    setLevel(level: LogLevel): void;
    /**
     * 获取所有日志
     * @example const logs = logger.getLogs()
     */
    getLogs(level?: LogLevel): LogEntry[];
    /**
     * 清空日志
     * @example logger.clear()
     */
    clear(): void;
    /**
     * 导出日志为 JSON
     * @example const json = logger.exportJson()
     */
    exportJson(): string;
    /**
     * 导出日志为 CSV
     * @example const csv = logger.exportCsv()
     */
    exportCsv(): string;
    /**
     * 获取日志统计信息
     * @example const stats = logger.getStats()
     */
    getStats(): Record<LogLevel, number>;
    /**
     * 性能计时
     * @example logger.time('apiCall'); ... logger.timeEnd('apiCall')
     */
    private timers;
    time(label: string): void;
    timeEnd(label: string): number;
    /**
     * 标记位置
     * @example logger.mark('checkpoint1')
     */
    mark(label: string): void;
    /**
     * 表格输出
     * @example logger.table([{name: 'John', age: 30}])
     */
    table(data: any[]): void;
}
declare const logger: Logger;

/**
 * 事件总线/发布订阅工具
 */
type EventCallback = (...args: any[]) => void;
declare class EventBus {
    private events;
    private onceEvents;
    /**
     * 订阅事件
     * @example bus.on('user:login', (user) => console.log(user))
     */
    on(event: string, callback: EventCallback): () => void;
    /**
     * 订阅一次事件
     * @example bus.once('user:logout', (user) => console.log(user))
     */
    once(event: string, callback: EventCallback): () => void;
    /**
     * 取消订阅
     * @example bus.off('user:login', callback)
     */
    off(event: string, callback?: EventCallback): void;
    /**
     * 发布事件
     * @example bus.emit('user:login', user)
     */
    emit(event: string, ...args: any[]): void;
    /**
     * 获取事件的订阅者数量
     * @example const count = bus.listenerCount('user:login')
     */
    listenerCount(event: string): number;
    /**
     * 获取所有事件名称
     * @example const events = bus.eventNames()
     */
    eventNames(): string[];
    /**
     * 获取特定事件的所有监听器
     * @example const listeners = bus.listeners('user:login')
     */
    listeners(event: string): EventCallback[];
    /**
     * 清除所有事件
     * @example bus.clear()
     */
    clear(): void;
    /**
     * 清除特定事件
     * @example bus.clearEvent('user:login')
     */
    clearEvent(event: string): void;
    /**
     * 等待事件，返回 Promise
     * @example const user = await bus.waitFor('user:login')
     */
    waitFor(event: string, timeout?: number): Promise<any>;
    /**
     * 异步发布事件，等待所有处理完成
     * @example await bus.asyncEmit('user:login', user)
     */
    asyncEmit(event: string, ...args: any[]): Promise<void>;
    /**
     * 先发先执行（如果已有监听器则立即执行，否则等待）
     * @example bus.emitOrWait('system:ready')
     */
    emitOrWait(event: string, ...args: any[]): Promise<void>;
}
declare const eventBus: EventBus;

/**
 * 缓存管理工具
 */
interface CacheOptions<T> {
    ttl?: number;
    maxSize?: number;
    onEvict?: (key: string, value: T) => void;
}
declare class Cache<T = any> {
    private cache;
    private ttl;
    private maxSize;
    private onEvict?;
    private accessOrder;
    constructor(options?: CacheOptions<T>);
    /**
     * 设置缓存
     * @example cache.set('user:1', userData)
     */
    set(key: string, value: T, ttl?: number): void;
    /**
     * 获取缓存
     * @example const data = cache.get('user:1')
     */
    get(key: string): T | null;
    /**
     * 判断缓存是否存在
     * @example if (cache.has('user:1')) { ... }
     */
    has(key: string): boolean;
    /**
     * 删除缓存
     * @example cache.delete('user:1')
     */
    delete(key: string): boolean;
    /**
     * 清空所有缓存
     * @example cache.clear()
     */
    clear(): void;
    /**
     * 获取缓存的大小
     * @example const size = cache.size()
     */
    size(): number;
    /**
     * 获取所有的键
     * @example const keys = cache.keys()
     */
    keys(): string[];
    /**
     * 获取所有的值
     * @example const values = cache.values()
     */
    values(): T[];
    /**
     * 获取所有的键值对
     * @example const entries = cache.entries()
     */
    entries(): Array<[string, T]>;
    /**
     * 更新或设置，带有工厂函数
     * @example cache.getOrSet('user:1', () => fetchUser(1))
     */
    getOrSet(key: string, factory: () => T | Promise<T>): T | Promise<T>;
    /**
     * 删除匹配的键
     * @example cache.deleteMatching(/^user:/)
     */
    deleteMatching(pattern: RegExp | ((key: string) => boolean)): number;
    /**
     * 清理过期缓存
     * @example cache.cleanup()
     */
    cleanup(): number;
    /**
     * 获取缓存统计信息
     * @example const stats = cache.getStats()
     */
    getStats(): {
        size: number;
        maxSize: number | null;
        defaultTtl: number | null;
        hits: number;
        misses: number;
    };
    /**
     * LRU 驱逐（驱逐最少使用的）
     */
    private evictLRU;
    /**
     * 更新访问顺序
     */
    private updateAccessOrder;
    /**
     * 返回迭代器
     */
    [Symbol.iterator](): ArrayIterator<[string, T]>;
}

/**
 * 加密和哈希工具 - 使用 crypto-js 实现
 */
/**
 * MD5 哈希
 * @example md5('hello') // '5d41402abc4b2a76b9719d911017c592'
 */
declare function md5(str: string): string;
/**
 * SHA1 哈希
 * @example sha1('hello') // 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d'
 */
declare function sha1(str: string): string;
/**
 * SHA256 哈希
 * @example sha256('hello') // '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
 */
declare function sha256(str: string): string;
/**
 * SHA512 哈希
 * @example sha512('hello')
 */
declare function sha512(str: string): string;
/**
 * SHA3 哈希
 * @example sha3('hello')
 */
declare function sha3(str: string): string;
/**
 * HMAC-MD5
 * @example hmacMD5('message', 'secret')
 */
declare function hmacMD5(message: string, secret: string): string;
/**
 * HMAC-SHA1
 * @example hmacSHA1('message', 'secret')
 */
declare function hmacSHA1(message: string, secret: string): string;
/**
 * HMAC-SHA256
 * @example hmacSHA256('message', 'secret')
 */
declare function hmacSHA256(message: string, secret: string): string;
/**
 * HMAC-SHA512
 * @example hmacSHA512('message', 'secret')
 */
declare function hmacSHA512(message: string, secret: string): string;
/**
 * Base64 编码
 * @example base64Encode('hello') // 'aGVsbG8='
 */
declare function base64Encode(str: string): string;
/**
 * Base64 解码
 * @example base64Decode('aGVsbG8=') // 'hello'
 */
declare function base64Decode(str: string): string;
/**
 * AES 加密
 * @example aesEncrypt('hello', 'secret-key')
 */
declare function aesEncrypt(message: string, key: string): string;
/**
 * AES 解密
 * @example aesDecrypt(encrypted, 'secret-key')
 */
declare function aesDecrypt(ciphertext: string, key: string): string;
/**
 * DES 加密
 * @example desEncrypt('hello', 'secret-key')
 */
declare function desEncrypt(message: string, key: string): string;
/**
 * DES 解密
 * @example desDecrypt(encrypted, 'secret-key')
 */
declare function desDecrypt(ciphertext: string, key: string): string;
/**
 * Triple DES 加密
 * @example tripleDesEncrypt('hello', 'secret-key')
 */
declare function tripleDesEncrypt(message: string, key: string): string;
/**
 * Triple DES 解密
 * @example tripleDesDecrypt(encrypted, 'secret-key')
 */
declare function tripleDesDecrypt(ciphertext: string, key: string): string;
/**
 * RC4 加密
 * @example rc4Encrypt('hello', 'secret-key')
 */
declare function rc4Encrypt(message: string, key: string): string;
/**
 * RC4 解密
 * @example rc4Decrypt(encrypted, 'secret-key')
 */
declare function rc4Decrypt(ciphertext: string, key: string): string;
/**
 * Rabbit 加密
 * @example rabbitEncrypt('hello', 'secret-key')
 */
declare function rabbitEncrypt(message: string, key: string): string;
/**
 * Rabbit 解密
 * @example rabbitDecrypt(encrypted, 'secret-key')
 */
declare function rabbitDecrypt(ciphertext: string, key: string): string;
/**
 * PBKDF2 密钥派生
 * @example pbkdf2('password', 'salt', 1000, 256)
 */
declare function pbkdf2(password: string, salt: string, iterations?: number, keySize?: number): string;
/**
 * 生成随机字节
 * @example randomBytes(16) // 生成16字节随机数
 */
declare function randomBytes(size: number): string;
/**
 * 计算文件 MD5（从 ArrayBuffer）
 * @example md5FromArrayBuffer(buffer)
 */
declare function md5FromArrayBuffer(buffer: ArrayBuffer): string;
/**
 * 计算文件 SHA256（从 ArrayBuffer）
 * @example sha256FromArrayBuffer(buffer)
 */
declare function sha256FromArrayBuffer(buffer: ArrayBuffer): string;
/**
 * 计算文件 SHA512（从 ArrayBuffer）
 * @example sha512FromArrayBuffer(buffer)
 */
declare function sha512FromArrayBuffer(buffer: ArrayBuffer): string;
/**
 * URL 安全的 Base64 编码
 * @example base64UrlEncode('hello+world=')
 */
declare function base64UrlEncode(str: string): string;
/**
 * URL 安全的 Base64 解码
 * @example base64UrlDecode('aGVsbG8td29ybGQ')
 */
declare function base64UrlDecode(str: string): string;
/**
 * 计算字符串的哈希值（多种算法）
 * @example hash('hello', 'md5')
 */
declare function hash(str: string, algorithm?: 'md5' | 'sha1' | 'sha256' | 'sha512' | 'sha3'): string;
/**
 * 加密对象（转 JSON 后加密）
 * @example encryptObject({ user: 'john' }, 'secret')
 */
declare function encryptObject(obj: any, key: string): string;
/**
 * 解密对象
 * @example decryptObject(encrypted, 'secret')
 */
declare function decryptObject<T = any>(ciphertext: string, key: string): T;
/**
 * 简单的字符串混淆（不安全）
 * @example obfuscate('hello')
 */
declare function obfuscate(str: string): string;
/**
 * 反混淆
 * @example deobfuscate(obfuscated)
 */
declare function deobfuscate(str: string): string;
declare const crypto: {
    md5: typeof md5;
    sha1: typeof sha1;
    sha256: typeof sha256;
    sha512: typeof sha512;
    sha3: typeof sha3;
    hash: typeof hash;
    hmacMD5: typeof hmacMD5;
    hmacSHA1: typeof hmacSHA1;
    hmacSHA256: typeof hmacSHA256;
    hmacSHA512: typeof hmacSHA512;
    base64Encode: typeof base64Encode;
    base64Decode: typeof base64Decode;
    base64UrlEncode: typeof base64UrlEncode;
    base64UrlDecode: typeof base64UrlDecode;
    aesEncrypt: typeof aesEncrypt;
    aesDecrypt: typeof aesDecrypt;
    desEncrypt: typeof desEncrypt;
    desDecrypt: typeof desDecrypt;
    tripleDesEncrypt: typeof tripleDesEncrypt;
    tripleDesDecrypt: typeof tripleDesDecrypt;
    rc4Encrypt: typeof rc4Encrypt;
    rc4Decrypt: typeof rc4Decrypt;
    rabbitEncrypt: typeof rabbitEncrypt;
    rabbitDecrypt: typeof rabbitDecrypt;
    encryptObject: typeof encryptObject;
    decryptObject: typeof decryptObject;
    pbkdf2: typeof pbkdf2;
    randomBytes: typeof randomBytes;
    md5FromArrayBuffer: typeof md5FromArrayBuffer;
    sha256FromArrayBuffer: typeof sha256FromArrayBuffer;
    sha512FromArrayBuffer: typeof sha512FromArrayBuffer;
    obfuscate: typeof obfuscate;
    deobfuscate: typeof deobfuscate;
};

/**
 * 表单验证工具 - 真实项目中的表单处理
 */
interface ValidationRule {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validator?: (value: any) => boolean | string;
    message?: string;
}
interface ValidationResult {
    valid: boolean;
    errors: Record<string, string>;
}
interface FormField {
    value: any;
    rules?: ValidationRule[];
    touched?: boolean;
    dirty?: boolean;
}
/**
 * 表单验证器类
 */
declare class FormValidator {
    private fields;
    private errors;
    /**
     * 注册字段
     * @example validator.register('email', { value: '', rules: [{ required: true }] })
     */
    register(name: string, field: FormField): void;
    /**
     * 设置字段值
     * @example validator.setValue('email', 'user@example.com')
     */
    setValue(name: string, value: any): void;
    /**
     * 标记字段为已触摸
     * @example validator.touch('email')
     */
    touch(name: string): void;
    /**
     * 验证单个字段
     */
    private validateField;
    /**
     * 检查单条规则
     */
    private checkRule;
    /**
     * 验证所有字段
     * @example const result = validator.validateAll()
     */
    validateAll(): ValidationResult;
    /**
     * 获取字段错误
     * @example validator.getError('email')
     */
    getError(name: string): string | undefined;
    /**
     * 获取所有错误
     * @example validator.getAllErrors()
     */
    getAllErrors(): Record<string, string>;
    /**
     * 检查字段是否有效
     * @example validator.isValid('email')
     */
    isValid(name: string): boolean;
    /**
     * 检查表单是否有效
     * @example validator.isFormValid()
     */
    isFormValid(): boolean;
    /**
     * 重置字段
     * @example validator.reset('email')
     */
    reset(name?: string): void;
    /**
     * 获取字段值
     * @example validator.getValue('email')
     */
    getValue(name: string): any;
    /**
     * 获取所有字段值
     * @example validator.getValues()
     */
    getValues(): Record<string, any>;
}
/**
 * 常用验证规则预设
 */
declare const formRules: {
    email: {
        pattern: RegExp;
        message: string;
    };
    phone: {
        pattern: RegExp;
        message: string;
    };
    url: {
        pattern: RegExp;
        message: string;
    };
    password: {
        minLength: number;
        message: string;
    };
    strongPassword: {
        pattern: RegExp;
        message: string;
    };
    username: {
        pattern: RegExp;
        message: string;
    };
    idCard: {
        pattern: RegExp;
        message: string;
    };
    number: {
        pattern: RegExp;
        message: string;
    };
    integer: {
        pattern: RegExp;
        message: string;
    };
    decimal: {
        pattern: RegExp;
        message: string;
    };
};
declare const form: {
    FormValidator: typeof FormValidator;
    formRules: {
        email: {
            pattern: RegExp;
            message: string;
        };
        phone: {
            pattern: RegExp;
            message: string;
        };
        url: {
            pattern: RegExp;
            message: string;
        };
        password: {
            minLength: number;
            message: string;
        };
        strongPassword: {
            pattern: RegExp;
            message: string;
        };
        username: {
            pattern: RegExp;
            message: string;
        };
        idCard: {
            pattern: RegExp;
            message: string;
        };
        number: {
            pattern: RegExp;
            message: string;
        };
        integer: {
            pattern: RegExp;
            message: string;
        };
        decimal: {
            pattern: RegExp;
            message: string;
        };
    };
};

/**
 * DOM 操作工具 - 浏览器环境常用 DOM 操作
 */
/**
 * 查询单个元素
 * @example querySelector('.class')
 */
declare function querySelector<T extends Element = Element>(selector: string, parent?: Element | Document): T | null;
/**
 * 查询多个元素
 * @example querySelectorAll('.item')
 */
declare function querySelectorAll<T extends Element = Element>(selector: string, parent?: Element | Document): T[];
/**
 * 添加类名
 * @example addClass(el, 'active')
 */
declare function addClass(element: Element, ...classNames: string[]): void;
/**
 * 移除类名
 * @example removeClass(el, 'active')
 */
declare function removeClass(element: Element, ...classNames: string[]): void;
/**
 * 切换类名
 * @example toggleClass(el, 'active')
 */
declare function toggleClass(element: Element, className: string, force?: boolean): boolean;
/**
 * 检查是否包含类名
 * @example hasClass(el, 'active')
 */
declare function hasClass(element: Element, className: string): boolean;
/**
 * 获取/设置元素属性
 * @example attr(el, 'data-id') // get
 * @example attr(el, 'data-id', '123') // set
 */
declare function attr(element: Element, name: string, value?: string): string | null | void;
/**
 * 移除元素属性
 * @example removeAttr(el, 'data-id')
 */
declare function removeAttr(element: Element, name: string): void;
/**
 * 获取/设置元素样式
 * @example css(el, 'color') // get
 * @example css(el, 'color', 'red') // set
 * @example css(el, { color: 'red', fontSize: '14px' }) // set multiple
 */
declare function css(element: HTMLElement, prop: string | Record<string, string>, value?: string): string | void;
/**
 * 显示元素
 * @example show(el)
 */
declare function show(element: HTMLElement, display?: string): void;
/**
 * 隐藏元素
 * @example hide(el)
 */
declare function hide(element: HTMLElement): void;
/**
 * 切换显示/隐藏
 * @example toggle(el)
 */
declare function toggle(element: HTMLElement, display?: string): void;
/**
 * 获取元素位置信息
 * @example getOffset(el)
 */
declare function getOffset(element: Element): {
    top: number;
    left: number;
};
/**
 * 获取元素尺寸
 * @example getSize(el)
 */
declare function getSize(element: Element): {
    width: number;
    height: number;
};
/**
 * 滚动到指定元素
 * @example scrollToElement(el, { behavior: 'smooth' })
 */
declare function scrollToElement(element: Element, options?: ScrollIntoViewOptions): void;
/**
 * 滚动到顶部
 * @example scrollToTop()
 */
declare function scrollToTop(smooth?: boolean): void;
/**
 * 获取滚动位置
 * @example getScrollPosition()
 */
declare function getScrollPosition(): {
    x: number;
    y: number;
};
/**
 * 检查元素是否在视口内
 * @example isInViewport(el)
 */
declare function isInViewport(element: Element): boolean;
/**
 * 创建元素
 * @example createElement('div', { className: 'box', textContent: 'Hello' })
 */
declare function createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: Partial<HTMLElementTagNameMap[K]>): HTMLElementTagNameMap[K] | null;
/**
 * 添加事件监听
 * @example on(el, 'click', handler)
 */
declare function on<K extends keyof HTMLElementEventMap>(element: Element | Window | Document, event: K, handler: (e: HTMLElementEventMap[K]) => void, options?: AddEventListenerOptions): void;
/**
 * 移除事件监听
 * @example off(el, 'click', handler)
 */
declare function off<K extends keyof HTMLElementEventMap>(element: Element | Window | Document, event: K, handler: (e: HTMLElementEventMap[K]) => void, options?: EventListenerOptions): void;
/**
 * 一次性事件监听
 * @example once(el, 'click', handler)
 */
declare function once<K extends keyof HTMLElementEventMap>(element: Element | Window | Document, event: K, handler: (e: HTMLElementEventMap[K]) => void): void;
/**
 * 委托事件监听
 * @example delegate(container, '.button', 'click', handler)
 */
declare function delegate<K extends keyof HTMLElementEventMap>(element: Element, selector: string, event: K, handler: (e: HTMLElementEventMap[K] & {
    delegateTarget: Element;
}) => void): void;
/**
 * 获取元素文本内容
 * @example text(el) // get
 * @example text(el, 'Hello') // set
 */
declare function text(element: Element, content?: string): string | void;
/**
 * 获取元素HTML内容
 * @example html(el) // get
 * @example html(el, '<span>Hello</span>') // set
 */
declare function html(element: Element, content?: string): string | void;
/**
 * 插入元素
 * @example append(parent, child)
 */
declare function append(parent: Element, ...children: (Element | string)[]): void;
/**
 * 前置插入元素
 * @example prepend(parent, child)
 */
declare function prepend(parent: Element, ...children: (Element | string)[]): void;
/**
 * 移除元素
 * @example remove(el)
 */
declare function remove(element: Element): void;
/**
 * 复制元素
 * @example clone(el, true)
 */
declare function clone<T extends Node>(element: T, deep?: boolean): T;
/**
 * 获取父元素
 * @example parent(el)
 */
declare function parent(element: Element): Element | null;
/**
 * 获取子元素
 * @example children(el)
 */
declare function children(element: Element): Element[];
/**
 * 获取兄弟元素
 * @example siblings(el)
 */
declare function siblings(element: Element): Element[];
/**
 * 获取下一个兄弟元素
 * @example next(el)
 */
declare function next(element: Element): Element | null;
/**
 * 获取上一个兄弟元素
 * @example prev(el)
 */
declare function prev(element: Element): Element | null;
/**
 * 检查元素是否匹配选择器
 * @example matches(el, '.active')
 */
declare function matches(element: Element, selector: string): boolean;
/**
 * 查找最近的匹配元素
 * @example closest(el, '.container')
 */
declare function closest(element: Element, selector: string): Element | null;
declare const dom: {
    querySelector: typeof querySelector;
    querySelectorAll: typeof querySelectorAll;
    addClass: typeof addClass;
    removeClass: typeof removeClass;
    toggleClass: typeof toggleClass;
    hasClass: typeof hasClass;
    attr: typeof attr;
    removeAttr: typeof removeAttr;
    css: typeof css;
    show: typeof show;
    hide: typeof hide;
    toggle: typeof toggle;
    getOffset: typeof getOffset;
    getSize: typeof getSize;
    scrollToElement: typeof scrollToElement;
    scrollToTop: typeof scrollToTop;
    getScrollPosition: typeof getScrollPosition;
    isInViewport: typeof isInViewport;
    createElement: typeof createElement;
    on: typeof on;
    off: typeof off;
    once: typeof once;
    delegate: typeof delegate;
    text: typeof text;
    html: typeof html;
    append: typeof append;
    prepend: typeof prepend;
    remove: typeof remove;
    clone: typeof clone;
    parent: typeof parent;
    children: typeof children;
    siblings: typeof siblings;
    next: typeof next;
    prev: typeof prev;
    matches: typeof matches;
    closest: typeof closest;
};

/**
 * 性能监控工具 - 真实项目中的性能监控
 */
interface PerformanceMetrics {
    fcp?: number;
    lcp?: number;
    fid?: number;
    cls?: number;
    ttfb?: number;
    domLoad?: number;
    windowLoad?: number;
}
interface MemoryInfo {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
    usedPercentage: number;
}
/**
 * 性能监控类
 */
declare class PerformanceMonitor {
    private metrics;
    private observers;
    constructor();
    /**
     * 初始化性能观察器
     */
    private initObservers;
    /**
     * 测量页面加载时间
     */
    private measureLoadTimes;
    /**
     * 获取所有性能指标
     * @example monitor.getMetrics()
     */
    getMetrics(): PerformanceMetrics;
    /**
     * 获取页面加载时间
     * @example monitor.getPageLoadTime()
     */
    getPageLoadTime(): number | null;
    /**
     * 获取资源加载时间
     * @example monitor.getResourceTiming()
     */
    getResourceTiming(): PerformanceResourceTiming[];
    /**
     * 标记时间点
     * @example monitor.mark('user-action-start')
     */
    mark(name: string): void;
    /**
     * 测量两个标记之间的时间
     * @example monitor.measure('user-action', 'start', 'end')
     */
    measure(name: string, startMark: string, endMark: string): number;
    /**
     * 清除标记
     * @example monitor.clearMarks('my-mark')
     */
    clearMarks(name?: string): void;
    /**
     * 清除测量
     * @example monitor.clearMeasures('my-measure')
     */
    clearMeasures(name?: string): void;
    /**
     * 获取内存使用情况（仅 Chrome）
     * @example monitor.getMemoryInfo()
     */
    getMemoryInfo(): MemoryInfo | null;
    /**
     * 销毁观察器
     */
    destroy(): void;
}
/**
 * FPS 监控器
 */
declare class FPSMonitor {
    private fps;
    private lastTime;
    private frames;
    private rafId;
    private callback?;
    /**
     * 开始监控 FPS
     * @example fpsMonitor.start((fps) => console.log('FPS:', fps))
     */
    start(callback?: (fps: number) => void): void;
    /**
     * 测量 FPS
     */
    private measureFPS;
    /**
     * 获取当前 FPS
     * @example fpsMonitor.getFPS()
     */
    getFPS(): number;
    /**
     * 停止监控
     */
    stop(): void;
}
/**
 * 函数执行时间测量
 * @example measureTime(() => { // do something })
 */
declare function measureTime<T>(fn: () => T, label?: string): T;
/**
 * 异步函数执行时间测量
 * @example await measureAsyncTime(async () => { // do something })
 */
declare function measureAsyncTime<T>(fn: () => Promise<T>, label?: string): Promise<T>;
/**
 * 长任务监控
 */
declare function monitorLongTasks(callback: (duration: number, entries: PerformanceEntry[]) => void): () => void;
/**
 * 获取网络信息
 * @example getNetworkInfo()
 */
declare function getNetworkInfo(): any;
declare const performance_: {
    PerformanceMonitor: typeof PerformanceMonitor;
    FPSMonitor: typeof FPSMonitor;
    measureTime: typeof measureTime;
    measureAsyncTime: typeof measureAsyncTime;
    monitorLongTasks: typeof monitorLongTasks;
    getNetworkInfo: typeof getNetworkInfo;
    monitor: PerformanceMonitor;
};

/**
 * 剪贴板操作工具 - 复制、粘贴、读取剪贴板
 */
/**
 * 复制文本到剪贴板（现代浏览器）
 * @example await copy('Hello World')
 */
declare function copy(text: string): Promise<boolean>;
/**
 * 复制文本的降级方案（兼容老浏览器）
 */
declare function copyFallback(text: string): boolean;
/**
 * 从剪贴板读取文本
 * @example const text = await paste()
 */
declare function paste(): Promise<string>;
/**
 * 复制 HTML 到剪贴板
 * @example await copyHTML('<p>Hello <strong>World</strong></p>')
 */
declare function copyHTML(html: string): Promise<boolean>;
/**
 * 复制图片到剪贴板
 * @example await copyImage(blob)
 */
declare function copyImage(blob: Blob): Promise<boolean>;
/**
 * 复制图片 URL 为图片
 * @example await copyImageFromURL('https://example.com/image.png')
 */
declare function copyImageFromURL(url: string): Promise<boolean>;
/**
 * 从剪贴板读取图片
 * @example const blob = await pasteImage()
 */
declare function pasteImage(): Promise<Blob | null>;
/**
 * 监听剪贴板变化（仅支持文本）
 * @example onPaste((text) => console.log('粘贴:', text))
 */
declare function onPaste(callback: (text: string) => void): () => void;
/**
 * 监听复制事件
 * @example onCopy((text) => console.log('复制:', text))
 */
declare function onCopy(callback: (text: string) => void): () => void;
/**
 * 拦截复制事件并修改内容
 * @example interceptCopy((text) => text + '\n来源: example.com')
 */
declare function interceptCopy(modifier: (text: string) => string): () => void;
/**
 * 复制 DOM 元素为图片
 * @example await copyElementAsImage(element)
 */
declare function copyElementAsImage(element: HTMLElement): Promise<boolean>;
/**
 * 检查是否支持剪贴板 API
 * @example supportsClipboard() // true/false
 */
declare function supportsClipboard(): boolean;
/**
 * 请求剪贴板权限
 * @example await requestPermission()
 */
declare function requestPermission(): Promise<boolean>;
/**
 * 复制多种格式到剪贴板
 * @example await copyMultiple({ text: 'Hello', html: '<p>Hello</p>' })
 */
declare function copyMultiple(data: {
    text?: string;
    html?: string;
    rtf?: string;
}): Promise<boolean>;
declare const clipboard: {
    copy: typeof copy;
    copyFallback: typeof copyFallback;
    paste: typeof paste;
    copyHTML: typeof copyHTML;
    copyImage: typeof copyImage;
    copyImageFromURL: typeof copyImageFromURL;
    pasteImage: typeof pasteImage;
    copyElementAsImage: typeof copyElementAsImage;
    copyMultiple: typeof copyMultiple;
    onPaste: typeof onPaste;
    onCopy: typeof onCopy;
    interceptCopy: typeof interceptCopy;
    supportsClipboard: typeof supportsClipboard;
    requestPermission: typeof requestPermission;
};

/**
 * ID 生成器工具 - UUID、NanoID、雪花ID等
 */
/**
 * 生成 UUID v4
 * @example uuid() // '550e8400-e29b-41d4-a716-446655440000'
 */
declare function uuid(): string;
/**
 * 生成简短的 UUID（无横杠）
 * @example shortUuid() // '550e8400e29b41d4a716446655440000'
 */
declare function shortUuid(): string;
/**
 * 生成 NanoID
 * @example nanoid() // 'V1StGXR8_Z5jdHi6B-myT'
 */
declare function nanoid(size?: number): string;
/**
 * 生成自定义长度的随机字符串
 * @example randomString(10) // 'a3f8k2m9x1'
 */
declare function randomString(length: number, chars?: string): string;
/**
 * 生成数字 ID
 * @example randomNumber(1000, 9999) // 5847
 */
declare function randomNumber(min?: number, max?: number): number;
/**
 * 生成时间戳 ID
 * @example timestampId() // '1703145600000'
 */
declare function timestampId(): string;
/**
 * 生成带前缀的时间戳 ID
 * @example prefixedTimestampId('user') // 'user_1703145600000'
 */
declare function prefixedTimestampId(prefix: string): string;
/**
 * 生成雪花 ID
 * 标准 64 位 ID (使用 BigInt)
 * @example snowflake() // '7139051117411713024'
 */
declare function snowflake(): string;
/**
 * 生成 ObjectId（类似 MongoDB）
 * @example objectId() // '507f1f77bcf86cd799439011'
 */
declare function objectId(): string;
/**
 * 生成 GUID（全局唯一标识符，与 UUID 相同）
 * @example guid() // '550e8400-e29b-41d4-a716-446655440000'
 */
declare function guid(): string;
/**
 * 生成 ULID（Universally Unique Lexicographically Sortable Identifier）
 * @example ulid() // '01ARZ3NDEKTSV4RRFFQ69G5FAV'
 */
declare function ulid(): string;
/**
 * 生成短 ID（基于时间戳和随机数）
 * @example shortId() // 'k2m9x1a3f8'
 */
declare function shortId(): string;
/**
 * 生成有序 ID（可排序）
 * @example orderedId() // '20231221120000_a3f8k2m9'
 */
declare function orderedId(): string;
/**
 * 雪花 ID 生成器
 * 标准 64 位 ID (使用 BigInt)
 * 1位符号位 + 41位时间戳 + 10位机器ID + 12位序列号
 */
declare class Snowflake {
    private static readonly EPOCH;
    private static readonly WORKER_ID_BITS;
    private static readonly SEQUENCE_BITS;
    private static readonly MAX_WORKER_ID;
    private static readonly MAX_SEQUENCE;
    private workerId;
    private sequence;
    private lastTimestamp;
    constructor(workerId?: number);
    /**
     * 生成下一个 ID
     */
    nextId(): string;
}
/**
 * 创建雪花 ID 生成器
 * @example const gen = createSnowflake(1)
 */
declare function createSnowflake(workerId?: number): Snowflake;
/**
 * 生成数字递增 ID（基于计数器）
 * 注意：这是单实例计数器，不适用于分布式系统
 */
declare class IncrementalId {
    private counter;
    private prefix;
    constructor(start?: number, prefix?: string);
    /**
     * 获取下一个 ID
     * @example incrementalId.next() // 'ID_00001'
     */
    next(): string;
    /**
     * 重置计数器
     */
    reset(start?: number): void;
    /**
     * 获取当前计数
     */
    current(): number;
}
/**
 * 创建递增 ID 生成器
 * @example const gen = createIncrementalId(1, 'USER_')
 */
declare function createIncrementalId(start?: number, prefix?: string): IncrementalId;
/**
 * 验证 UUID 格式
 * @example isUuid('550e8400-e29b-41d4-a716-446655440000') // true
 */
declare function isUuid(id: string): boolean;
/**
 * 验证 ObjectId 格式
 * @example isObjectId('507f1f77bcf86cd799439011') // true
 */
declare function isObjectId(id: string): boolean;
/**
 * 生成批量 ID
 * @example generateBatch(10) // ['id1', 'id2', ...]
 */
declare function generateBatch(count: number, generator?: () => string): string[];
/**
 * 生成哈希 ID（基于内容）
 * @example hashId('user@example.com') // 'a3f8k2m9x1'
 */
declare function hashId(content: string): string;
declare const id: {
    uuid: typeof uuid;
    shortUuid: typeof shortUuid;
    guid: typeof guid;
    nanoid: typeof nanoid;
    shortId: typeof shortId;
    randomString: typeof randomString;
    randomNumber: typeof randomNumber;
    timestampId: typeof timestampId;
    prefixedTimestampId: typeof prefixedTimestampId;
    orderedId: typeof orderedId;
    snowflake: typeof snowflake;
    createSnowflake: typeof createSnowflake;
    Snowflake: typeof Snowflake;
    objectId: typeof objectId;
    ulid: typeof ulid;
    createIncrementalId: typeof createIncrementalId;
    IncrementalId: typeof IncrementalId;
    isUuid: typeof isUuid;
    isObjectId: typeof isObjectId;
    generateBatch: typeof generateBatch;
    hashId: typeof hashId;
};

/**
 * 工具函数集合
 */
declare const htils: {
    scformat: {
        isPlainObject(value: unknown): value is Record<string, unknown>;
        isRecordArray(value: unknown): value is Record<string, unknown>[];
        snakeToCamel(str: string): string;
        camelToSnake(str: string): string;
        snakeDataToCamel(data: Record<string, unknown> | Record<string, unknown>[] | unknown): Record<string, unknown> | Record<string, unknown>[] | unknown;
        camelDataToSnake(data: Record<string, unknown> | Record<string, unknown>[] | unknown): Record<string, unknown> | Record<string, unknown>[] | unknown;
    };
    string: {
        capitalize(str: string): string;
        kebabCase(str: string): string;
        isEmpty(str: string): boolean;
        isBlank(str: string): boolean;
        truncate(str: string, length: number, suffix?: string): string;
        replaceOnce(str: string, search: string, replace: string): string;
        includes(str: string, substring: string, caseSensitive?: boolean): boolean;
        toUpper(str: string): string;
        toLower(str: string): string;
        toTitleCase(str: string): string;
        repeat(str: string, count: number): string;
    };
    array: {
        unique<T>(arr: T[]): T[];
        flatten<T>(arr: any[], depth?: number): T[];
        chunk<T>(arr: T[], size: number): T[][];
        groupBy<T>(arr: T[], key: keyof T): Record<string, T[]>;
        find<T>(arr: T[], predicate: (item: T, index: number) => boolean): T | undefined;
        findIndex<T>(arr: T[], predicate: (item: T, index: number) => boolean): number;
        includes<T>(arr: T[], item: T): boolean;
        first<T>(arr: T[]): T | undefined;
        last<T>(arr: T[]): T | undefined;
        compact<T>(arr: (T | null | undefined | false | 0 | "")[]): T[];
        remove<T>(arr: T[], item: T): T[];
        difference<T>(arr1: T[], arr2: T[]): T[];
        sample<T>(arr: T[], size?: number): T[];
        indexOf<T>(arr: T[], item: T): number;
        isEmpty<T>(arr: T[]): boolean;
        sum(arr: number[]): number;
        average(arr: number[]): number;
        max(arr: number[]): number;
        min(arr: number[]): number;
    };
    object: {
        isPlainObject(value: unknown): value is Record<string, unknown>;
        deepClone<T>(obj: T): T;
        shallowClone<T extends Record<string, any>>(obj: T): T;
        merge<T extends Record<string, any>>(...objects: T[]): T;
        deepMerge<T extends Record<string, any>>(...objects: T[]): T;
        pick<T extends Record<string, any>>(obj: T, keys: (keyof T)[]): Partial<T>;
        omit<T extends Record<string, any>>(obj: T, keys: (keyof T)[]): Partial<T>;
        isEmpty(obj: Record<string, any>): boolean;
        hasKey(obj: Record<string, any>, key: string): boolean;
        keys(obj: Record<string, any>): string[];
        values(obj: Record<string, any>): any[];
        entries(obj: Record<string, any>): Array<[string, any]>;
        fromEntries(entries: Array<[string, any]>): Record<string, any>;
        mapKeys<T extends Record<string, any>>(obj: T, fn: (key: string) => string): Record<string, any>;
        mapValues<T extends Record<string, any>>(obj: T, fn: (value: any, key: string) => any): Record<string, any>;
        filter<T extends Record<string, any>>(obj: T, predicate: (value: any, key: string) => boolean): Partial<T>;
        isEqual(obj1: any, obj2: any): boolean;
        invert(obj: Record<string, any>): Record<string, any>;
        contains(obj: Record<string, any>, target: Record<string, any>): boolean;
        get(obj: Record<string, any>, path: string, defaultValue?: any): any;
        set(obj: Record<string, any>, path: string, value: any): Record<string, any>;
    };
    file: {
        getExtension(filename: string): string;
        getBasename(filename: string): string;
        getFilename(filepath: string): string;
        getDirectory(filepath: string): string;
        hasExtension(filename: string, ext: string): boolean;
        changeExtension(filename: string, newExt: string): string;
        isFilePath(str: string): boolean;
        isDirectoryPath(str: string): boolean;
        normalizePath(filepath: string): string;
        getMimeType(filename: string): string;
        isTextFile(filename: string): boolean;
        isImageFile(filename: string): boolean;
        isVideoFile(filename: string): boolean;
        isAudioFile(filename: string): boolean;
        generateUniqueFilename(filename: string, useTimestamp?: boolean): string;
    };
    number: {
        round(num: number, precision?: number): number;
        ceil(num: number, precision?: number): number;
        floor(num: number, precision?: number): number;
        clamp(num: number, min: number, max: number): number;
        inRange(num: number, min: number, max: number): boolean;
        byteToKB(bytes: number): number;
        byteToMB(bytes: number): number;
        byteToGB(bytes: number): number;
        percentage(value: number, total: number): number;
        average(...nums: number[]): number;
        sum(...nums: number[]): number;
        randomBetween(min: number, max: number): number;
        random(): number;
        formatWithCommas(num: number): string;
    };
    validate: {
        isEmail(email: string): boolean;
        isUrl(url: string): boolean;
        isPhone(phone: string): boolean;
        isIdCard(idCard: string): boolean;
        isSocialCreditCode(code: string): boolean;
        isZipCode(zipCode: string): boolean;
        isIp(ip: string): boolean;
        isIpv4(ip: string): boolean;
        isIpv6(ip: string): boolean;
        isStrongPassword(password: string): boolean;
        isNumber(value: string): boolean;
        isInteger(value: string): boolean;
        isFloat(value: string): boolean;
        isHexColor(color: string): boolean;
        isChinese(str: string): boolean;
        isEnglish(str: string): boolean;
        isAlphanumeric(str: string): boolean;
        isLengthBetween(str: string, min: number, max: number): boolean;
        isEmpty(value: any): boolean;
        contains(str: string, substring: string): boolean;
        isPureNumber(str: string): boolean;
        isUUID(uuid: string): boolean;
        isMacAddress(mac: string): boolean;
    };
    format: {
        formatCurrency(amount: number, currency?: string, locale?: string): string;
        formatPercentage(value: number, precision?: number): string;
        formatFileSize(bytes: number): string;
        formatNumber(num: number, precision?: number): string;
        formatPhone(phone: string): string;
        formatIdCard(idCard: string): string;
        formatEmail(email: string): string;
        formatBankCard(cardNumber: string): string;
        formatSize(size: number): string;
        formatTime(seconds: number): string;
        formatDate(date: Date, format?: string): string;
        formatJson(obj: any, space?: number): string;
        formatUrl(baseUrl: string, params?: Record<string, any>): string;
        formatHtml(html: string): string;
        formatSql(sql: string, params: any[]): string;
        formatCamelCase(str: string): string;
        formatBase64(str: string): string;
        decodeBase64(str: string): string;
    };
    date: {
        now(): Date;
        timestamp(): number;
        timestampMs(): number;
        fromTimestamp(timestamp: number): Date;
        toTimestamp(date: Date): number;
        format(date: Date, formatStr?: string): string;
        parse(dateStr: string): Date;
        addDays(date: Date, days: number): Date;
        addHours(date: Date, hours: number): Date;
        addMinutes(date: Date, minutes: number): Date;
        addSeconds(date: Date, seconds: number): Date;
        addMonths(date: Date, months: number): Date;
        addYears(date: Date, years: number): Date;
        diffDays(date1: Date, date2: Date): number;
        diffHours(date1: Date, date2: Date): number;
        diffMinutes(date1: Date, date2: Date): number;
        getDaysInMonth(date: Date): number;
        isLeapYear(year: number): boolean;
        getDay(date: Date): number;
        getDayName(date: Date): string;
        getMonthName(date: Date): string;
        getDayOfYear(date: Date): number;
        isSameDay(date1: Date, date2: Date): boolean;
        isBetween(date: Date, startDate: Date, endDate: Date): boolean;
        getWeekStart(date: Date): Date;
        getWeekEnd(date: Date): Date;
        getMonthStart(date: Date): Date;
        getMonthEnd(date: Date): Date;
        fromNow(date: Date): string;
    };
    type: {
        getType(value: any): string;
        isObject(value: any): boolean;
        isArray(value: any): boolean;
        isString(value: any): boolean;
        isNumber(value: any): boolean;
        isBoolean(value: any): boolean;
        isFunction(value: any): boolean;
        isNull(value: any): boolean;
        isUndefined(value: any): boolean;
        isNil(value: any): boolean;
        isDate(value: any): boolean;
        isRegExp(value: any): boolean;
        isMap(value: any): boolean;
        isSet(value: any): boolean;
        isSymbol(value: any): boolean;
        isPromise(value: any): boolean;
        isWeakMap(value: any): boolean;
        isWeakSet(value: any): boolean;
        isIterable(value: any): boolean;
        isEmptyObject(value: any): boolean;
        isEmptyArray(value: any): boolean;
        isEmptyString(value: any): boolean;
        isPlainObject(value: any): boolean;
        isTruthy(value: any): boolean;
        isFalsy(value: any): boolean;
        isPrimitive(value: any): boolean;
    };
    url: {
        parse(urlStr: string): URL;
        getProtocol(urlStr: string): string;
        getHost(urlStr: string): string;
        getPort(urlStr: string): string;
        getPath(urlStr: string): string;
        getQuery(urlStr: string): string;
        getHash(urlStr: string): string;
        parseQuery(queryStr: string): Record<string, string>;
        buildQuery(params: Record<string, any>): string;
        addQuery(urlStr: string, params: Record<string, any>): string;
        removeQuery(urlStr: string, key: string): string;
        getQueryParam(urlStr: string, key: string): string | null;
        isValidUrl(urlStr: string): boolean;
        isAbsoluteUrl(urlStr: string): boolean;
        isRelativeUrl(urlStr: string): boolean;
        decode(urlStr: string): string;
        encode(urlStr: string): string;
        join(...parts: string[]): string;
        getOrigin(urlStr: string): string;
        getBase(urlStr: string): string;
    };
    promise: {
        sleep(ms: number): Promise<void>;
        timeout<T>(promise: Promise<T>, ms: number): Promise<T>;
        retry<T>(fn: () => Promise<T>, times?: number, delay?: number): Promise<T>;
        series<T>(tasks: Array<() => Promise<T> | T>): Promise<T[]>;
        parallel<T>(promises: Promise<T>[]): Promise<T[]>;
        concurrency<T>(promises: Promise<T>[], limit: number): Promise<T[]>;
        poll<T>(fn: () => Promise<T>, times?: number, interval?: number): Promise<T>;
        cancellable<T>(promise: Promise<T>): {
            promise: Promise<T>;
            cancel: () => void;
        };
        promisify<T>(fn: (callback: (err: any, result?: T) => void) => void): Promise<T>;
        race<T>(promises: Promise<T>[]): Promise<T>;
        handle<T, E = Error>(promise: Promise<T>): Promise<[E | null, T | undefined]>;
    };
    debounceThrottle: {
        debounce<T extends (...args: any[]) => any>(fn: T, delay: number, options?: {
            leading?: boolean;
            trailing?: boolean;
            maxWait?: number;
        }): (...args: Parameters<T>) => void;
        throttle<T extends (...args: any[]) => any>(fn: T, limit: number, options?: {
            leading?: boolean;
            trailing?: boolean;
        }): (...args: Parameters<T>) => void;
        immediate<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void;
        throttleWithTrailing<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void;
        withCooldown<T extends (...args: any[]) => any>(fn: T, cooldownTime: number): (...args: Parameters<T>) => boolean;
    };
    Storage: typeof Storage;
    getLocalStorage: () => Storage;
    getSessionStorage: () => Storage;
    Logger: typeof Logger;
    logger: Logger;
    EventBus: typeof EventBus;
    eventBus: EventBus;
    Cache: typeof Cache;
    crypto: {
        md5: (str: string) => string;
        sha1: (str: string) => string;
        sha256: (str: string) => string;
        sha512: (str: string) => string;
        sha3: (str: string) => string;
        hash: (str: string, algorithm?: "md5" | "sha1" | "sha256" | "sha512" | "sha3") => string;
        hmacMD5: (message: string, secret: string) => string;
        hmacSHA1: (message: string, secret: string) => string;
        hmacSHA256: (message: string, secret: string) => string;
        hmacSHA512: (message: string, secret: string) => string;
        base64Encode: (str: string) => string;
        base64Decode: (str: string) => string;
        base64UrlEncode: (str: string) => string;
        base64UrlDecode: (str: string) => string;
        aesEncrypt: (message: string, key: string) => string;
        aesDecrypt: (ciphertext: string, key: string) => string;
        desEncrypt: (message: string, key: string) => string;
        desDecrypt: (ciphertext: string, key: string) => string;
        tripleDesEncrypt: (message: string, key: string) => string;
        tripleDesDecrypt: (ciphertext: string, key: string) => string;
        rc4Encrypt: (message: string, key: string) => string;
        rc4Decrypt: (ciphertext: string, key: string) => string;
        rabbitEncrypt: (message: string, key: string) => string;
        rabbitDecrypt: (ciphertext: string, key: string) => string;
        encryptObject: (obj: any, key: string) => string;
        decryptObject: <T = any>(ciphertext: string, key: string) => T;
        pbkdf2: (password: string, salt: string, iterations?: number, keySize?: number) => string;
        randomBytes: (size: number) => string;
        md5FromArrayBuffer: (buffer: ArrayBuffer) => string;
        sha256FromArrayBuffer: (buffer: ArrayBuffer) => string;
        sha512FromArrayBuffer: (buffer: ArrayBuffer) => string;
        obfuscate: (str: string) => string;
        deobfuscate: (str: string) => string;
    };
    request: {
        fetchWithRetry: typeof fetchWithRetry;
        fetchWithTimeout: typeof fetchWithTimeout;
        serializeQuery: typeof serializeQuery;
        appendQuery: typeof appendQuery;
        RequestInterceptors: typeof RequestInterceptors;
        HttpClient: typeof HttpClient;
    };
    sensitive: {
        desensitizePhone: typeof desensitizePhone;
        desensitizeEmail: typeof desensitizeEmail;
        desensitizeIdCard: typeof desensitizeIdCard;
        desensitizeName: typeof desensitizeName;
        desensitizeCardNumber: typeof desensitizeCardNumber;
        desensitizeToken: typeof desensitizeToken;
        desensitizeUrl: typeof desensitizeUrl;
        desensitizeObject: typeof desensitizeObject;
        desensitizeCustom: typeof desensitizeCustom;
        desensitizeLog: typeof desensitizeLog;
    };
    form: {
        FormValidator: typeof FormValidator;
        formRules: {
            email: {
                pattern: RegExp;
                message: string;
            };
            phone: {
                pattern: RegExp;
                message: string;
            };
            url: {
                pattern: RegExp;
                message: string;
            };
            password: {
                minLength: number;
                message: string;
            };
            strongPassword: {
                pattern: RegExp;
                message: string;
            };
            username: {
                pattern: RegExp;
                message: string;
            };
            idCard: {
                pattern: RegExp;
                message: string;
            };
            number: {
                pattern: RegExp;
                message: string;
            };
            integer: {
                pattern: RegExp;
                message: string;
            };
            decimal: {
                pattern: RegExp;
                message: string;
            };
        };
    };
    FormValidator: typeof FormValidator;
    formRules: {
        email: {
            pattern: RegExp;
            message: string;
        };
        phone: {
            pattern: RegExp;
            message: string;
        };
        url: {
            pattern: RegExp;
            message: string;
        };
        password: {
            minLength: number;
            message: string;
        };
        strongPassword: {
            pattern: RegExp;
            message: string;
        };
        username: {
            pattern: RegExp;
            message: string;
        };
        idCard: {
            pattern: RegExp;
            message: string;
        };
        number: {
            pattern: RegExp;
            message: string;
        };
        integer: {
            pattern: RegExp;
            message: string;
        };
        decimal: {
            pattern: RegExp;
            message: string;
        };
    };
    dom: {
        querySelector: <T extends Element = Element>(selector: string, parent?: Element | Document) => T | null;
        querySelectorAll: <T extends Element = Element>(selector: string, parent?: Element | Document) => T[];
        addClass: (element: Element, ...classNames: string[]) => void;
        removeClass: (element: Element, ...classNames: string[]) => void;
        toggleClass: (element: Element, className: string, force?: boolean) => boolean;
        hasClass: (element: Element, className: string) => boolean;
        attr: (element: Element, name: string, value?: string) => string | null | void;
        removeAttr: (element: Element, name: string) => void;
        css: (element: HTMLElement, prop: string | Record<string, string>, value?: string) => string | void;
        show: (element: HTMLElement, display?: string) => void;
        hide: (element: HTMLElement) => void;
        toggle: (element: HTMLElement, display?: string) => void;
        getOffset: (element: Element) => {
            top: number;
            left: number;
        };
        getSize: (element: Element) => {
            width: number;
            height: number;
        };
        scrollToElement: (element: Element, options?: ScrollIntoViewOptions) => void;
        scrollToTop: (smooth?: boolean) => void;
        getScrollPosition: () => {
            x: number;
            y: number;
        };
        isInViewport: (element: Element) => boolean;
        createElement: <K extends keyof HTMLElementTagNameMap>(tagName: K, props?: Partial<HTMLElementTagNameMap[K]>) => HTMLElementTagNameMap[K] | null;
        on: <K extends keyof HTMLElementEventMap>(element: Element | Window | Document, event: K, handler: (e: HTMLElementEventMap[K]) => void, options?: AddEventListenerOptions) => void;
        off: <K extends keyof HTMLElementEventMap>(element: Element | Window | Document, event: K, handler: (e: HTMLElementEventMap[K]) => void, options?: EventListenerOptions) => void;
        once: <K extends keyof HTMLElementEventMap>(element: Element | Window | Document, event: K, handler: (e: HTMLElementEventMap[K]) => void) => void;
        delegate: <K extends keyof HTMLElementEventMap>(element: Element, selector: string, event: K, handler: (e: HTMLElementEventMap[K] & {
            delegateTarget: Element;
        }) => void) => void;
        text: (element: Element, content?: string) => string | void;
        html: (element: Element, content?: string) => string | void;
        append: (parent: Element, ...children: (Element | string)[]) => void;
        prepend: (parent: Element, ...children: (Element | string)[]) => void;
        remove: (element: Element) => void;
        clone: <T extends Node>(element: T, deep?: boolean) => T;
        parent: (element: Element) => Element | null;
        children: (element: Element) => Element[];
        siblings: (element: Element) => Element[];
        next: (element: Element) => Element | null;
        prev: (element: Element) => Element | null;
        matches: (element: Element, selector: string) => boolean;
        closest: (element: Element, selector: string) => Element | null;
    };
    cookie: {
        setCookie: (name: string, value: string, options?: CookieOptions) => void;
        getCookie: (name: string) => string | null;
        removeCookie: (name: string, options?: Pick<CookieOptions, "path" | "domain">) => void;
        hasCookie: (name: string) => boolean;
        getAllCookies: () => Record<string, string>;
        clearAllCookies: (options?: Pick<CookieOptions, "path" | "domain">) => void;
        TokenManager: typeof TokenManager;
    };
    TokenManager: typeof TokenManager;
    performance: {
        PerformanceMonitor: typeof PerformanceMonitor;
        FPSMonitor: typeof FPSMonitor;
        measureTime: <T>(fn: () => T, label?: string) => T;
        measureAsyncTime: <T>(fn: () => Promise<T>, label?: string) => Promise<T>;
        monitorLongTasks: (callback: (duration: number, entries: PerformanceEntry[]) => void) => () => void;
        getNetworkInfo: () => any;
        monitor: PerformanceMonitor;
    };
    PerformanceMonitor: typeof PerformanceMonitor;
    FPSMonitor: typeof FPSMonitor;
    fileHandler: {
        getFileInfo: (file: File) => FileInfo;
        validateFileType: (file: File, allowedTypes: string[]) => boolean;
        validateFileSize: (file: File, maxSize: number) => boolean;
        formatFileSize: (bytes: number) => string;
        readFileAsText: (file: File) => Promise<string>;
        readFileAsDataURL: (file: File) => Promise<string>;
        readFileAsArrayBuffer: (file: File) => Promise<ArrayBuffer>;
        downloadFile: (filename: string, content: string | Blob, type?: string) => void;
        downloadJSON: (filename: string, data: any) => void;
        downloadText: (filename: string, text: string) => void;
        downloadCSV: (filename: string, data: string[][]) => void;
        compressImage: (file: File, quality?: number, maxWidth?: number, maxHeight?: number) => Promise<Blob>;
        getImageDimensions: (file: File) => Promise<{
            width: number;
            height: number;
        }>;
        selectFile: (options: {
            accept?: string;
            multiple?: boolean;
        }) => Promise<FileList | null>;
        base64ToBlob: (base64: string, type?: string) => Blob;
        base64ToFile: (base64: string, filename: string, type?: string) => File;
        sliceFile: (file: File, chunkSize: number) => Blob[];
        calculateFileMD5: (file: File) => Promise<string>;
        calculateFileSHA256: (file: File) => Promise<string>;
        calculateFileSHA512: (file: File) => Promise<string>;
        calculateFileHash: (file: File, algorithm?: "md5" | "sha256" | "sha512") => Promise<string>;
        calculateETag: (file: File) => Promise<string>;
        calculateWeakETag: (file: File) => Promise<string>;
        calculateETagSHA256: (file: File) => Promise<string>;
        calculateETagWithMetadata: (file: File) => Promise<string>;
        validateETag: (file: File, etag: string) => Promise<boolean>;
        compareFiles: (file1: File, file2: File) => Promise<boolean>;
        calculateOSSETag: (file: File, chunkSize?: number, onProgress?: (progress: number, current: number, total: number) => void) => Promise<string>;
        isOSSMultipartETag: (etag: string) => boolean;
        parseOSSMultipartETag: (etag: string) => {
            md5: string;
            partCount: number;
        } | null;
        getOSSChunkInfo: (file: File, chunkSize?: number) => {
            chunkSize: number;
            chunkCount: number;
            lastChunkSize: number;
            totalSize: number;
        };
        uploadFiles: (files: File[], url: string, onProgress?: (progress: number, file: File) => void) => Promise<any[]>;
    };
    device: {
        isMobile: () => boolean;
        isTablet: () => boolean;
        isDesktop: () => boolean;
        isIOS: () => boolean;
        isAndroid: () => boolean;
        isIPhone: () => boolean;
        isIPad: () => boolean;
        isTouchDevice: () => boolean;
        isRetina: () => boolean;
        isWeChat: () => boolean;
        isMiniProgram: () => boolean;
        isAlipay: () => boolean;
        getBrowserName: () => string;
        getBrowserVersion: () => string;
        getOSName: () => string;
        getOSVersion: () => string;
        getDeviceType: () => "mobile" | "tablet" | "desktop";
        getDeviceInfo: () => Partial<DeviceInfo>;
        getScreenInfo: () => {
            width: number;
            height: number;
            availWidth: number;
            availHeight: number;
            colorDepth: number;
            pixelRatio: number;
            orientation: "portrait" | "landscape";
        };
        getNetworkType: () => string;
        isOnline: () => boolean;
        getLanguage: () => string;
        getUserAgent: () => string;
        isDarkMode: () => boolean;
        supportsWebP: () => Promise<boolean>;
        supportsServiceWorker: () => boolean;
        supportsLocalStorage: () => boolean;
        supportsWebGL: () => boolean;
    };
    clipboard: {
        copy: (text: string) => Promise<boolean>;
        copyFallback: (text: string) => boolean;
        paste: () => Promise<string>;
        copyHTML: (html: string) => Promise<boolean>;
        copyImage: (blob: Blob) => Promise<boolean>;
        copyImageFromURL: (url: string) => Promise<boolean>;
        pasteImage: () => Promise<Blob | null>;
        copyElementAsImage: (element: HTMLElement) => Promise<boolean>;
        copyMultiple: (data: {
            text?: string;
            html?: string;
            rtf?: string;
        }) => Promise<boolean>;
        onPaste: (callback: (text: string) => void) => () => void;
        onCopy: (callback: (text: string) => void) => () => void;
        interceptCopy: (modifier: (text: string) => string) => () => void;
        supportsClipboard: () => boolean;
        requestPermission: () => Promise<boolean>;
    };
    tree: {
        listToTree: <T extends Record<string, any>>(list: T[], options?: TreeOptions) => T[];
        treeToList: <T extends Record<string, any>>(tree: T[], options?: TreeOptions) => T[];
        findNode: <T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions) => T | null;
        findPath: <T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions) => T[] | null;
        findParent: <T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions) => T | null;
        findAncestors: <T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions) => T[];
        findDescendants: <T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions) => T[];
        filterTree: <T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions) => T[];
        forEachTree: <T extends Record<string, any>>(tree: T[], callback: (node: T, index: number, parent?: T) => void, options?: TreeOptions) => void;
        mapTree: <T extends Record<string, any>, R extends Record<string, any>>(tree: T[], mapper: (node: T) => R, options?: TreeOptions) => R[];
        sortTree: <T extends Record<string, any>>(tree: T[], compareFn: (a: T, b: T) => number, options?: TreeOptions) => T[];
        getTreeDepth: <T extends Record<string, any>>(tree: T[], options?: TreeOptions) => number;
        getLeafNodes: <T extends Record<string, any>>(tree: T[], options?: TreeOptions) => T[];
        uniqueTree: <T extends Record<string, any>>(tree: T[], getKey: (node: T) => any, options?: TreeOptions) => T[];
        flattenToDepth: <T extends Record<string, any>>(tree: T[], depth: number, options?: TreeOptions) => T[];
    };
    id: {
        uuid: () => string;
        shortUuid: () => string;
        guid: () => string;
        nanoid: (size?: number) => string;
        shortId: () => string;
        randomString: (length: number, chars?: string) => string;
        randomNumber: (min?: number, max?: number) => number;
        timestampId: () => string;
        prefixedTimestampId: (prefix: string) => string;
        orderedId: () => string;
        snowflake: () => string;
        createSnowflake: typeof createSnowflake;
        Snowflake: typeof Snowflake;
        objectId: () => string;
        ulid: () => string;
        createIncrementalId: (start?: number, prefix?: string) => IncrementalId;
        IncrementalId: typeof IncrementalId;
        isUuid: (id: string) => boolean;
        isObjectId: (id: string) => boolean;
        generateBatch: (count: number, generator?: () => string) => string[];
        hashId: (content: string) => string;
    };
    IncrementalId: typeof IncrementalId;
    createSnowflake: typeof createSnowflake;
};

export { Cache, EventBus, FPSMonitor, FormValidator, IncrementalId, Logger, PerformanceMonitor, Snowflake, Storage, TokenManager, array, clipboard, cookie, createSnowflake, crypto, date, debounceThrottle, htils as default, device, dom, eventBus, file, fileHandler, form, formRules, format, getLocalStorage, getSessionStorage, id, logger, number, object, performance_, promise, request, scformat, sensitive, string, tree, type, url, validate };
