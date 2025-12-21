/**
 * 工具函数模块
 */
import scformat from './snake-camel-format';
import string from './string';
import array from './array';
import object from './object';
import file from './file';
import number from './number';
import validate from './validate';
import format from './format';
import date from './date';
import type from './type';
import url from './url';
import promise from './promise';
import debounceThrottle from './debounceThrottle';
import { Storage, getLocalStorage, getSessionStorage } from './storage';
import { Logger, logger } from './logger';
import { EventBus, eventBus } from './eventBus';
import Cache from './cache';
import crypto from './crypto';
import request from './request';
import sensitive from './sensitive';
import form, { FormValidator, formRules } from './form';
import dom from './dom';
import cookie, { TokenManager } from './cookie';
import performance_, { PerformanceMonitor, FPSMonitor } from './performance';
import fileHandler from './fileHandler';
import device from './device';
import clipboard from './clipboard';
import tree from './tree';
import id, { IncrementalId } from './id';
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
        fetchWithRetry: typeof import("./request").fetchWithRetry;
        fetchWithTimeout: typeof import("./request").fetchWithTimeout;
        serializeQuery: typeof import("./request").serializeQuery;
        appendQuery: typeof import("./request").appendQuery;
        RequestInterceptors: typeof import("./request").RequestInterceptors;
        HttpClient: typeof import("./request").HttpClient;
    };
    sensitive: {
        desensitizePhone: typeof import("./sensitive").desensitizePhone;
        desensitizeEmail: typeof import("./sensitive").desensitizeEmail;
        desensitizeIdCard: typeof import("./sensitive").desensitizeIdCard;
        desensitizeName: typeof import("./sensitive").desensitizeName;
        desensitizeCardNumber: typeof import("./sensitive").desensitizeCardNumber;
        desensitizeToken: typeof import("./sensitive").desensitizeToken;
        desensitizeUrl: typeof import("./sensitive").desensitizeUrl;
        desensitizeObject: typeof import("./sensitive").desensitizeObject;
        desensitizeCustom: typeof import("./sensitive").desensitizeCustom;
        desensitizeLog: typeof import("./sensitive").desensitizeLog;
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
        createElement: <K extends keyof HTMLElementTagNameMap>(tagName: K, props?: Partial<HTMLElementTagNameMap[K]>) => HTMLElementTagNameMap[K];
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
        setCookie: (name: string, value: string, options?: import("./cookie").CookieOptions) => void;
        getCookie: (name: string) => string | null;
        removeCookie: (name: string, options?: Pick<import("./cookie").CookieOptions, "path" | "domain">) => void;
        hasCookie: (name: string) => boolean;
        getAllCookies: () => Record<string, string>;
        clearAllCookies: (options?: Pick<import("./cookie").CookieOptions, "path" | "domain">) => void;
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
        getFileInfo: (file: File) => import("./fileHandler").FileInfo;
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
        getDeviceInfo: () => Partial<import("./device").DeviceInfo>;
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
        listToTree: <T extends Record<string, any>>(list: T[], options?: import("./tree").TreeOptions) => T[];
        treeToList: <T extends Record<string, any>>(tree: T[], options?: import("./tree").TreeOptions) => T[];
        findNode: <T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: import("./tree").TreeOptions) => T | null;
        findPath: <T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: import("./tree").TreeOptions) => T[] | null;
        findParent: <T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: import("./tree").TreeOptions) => T | null;
        findAncestors: <T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: import("./tree").TreeOptions) => T[];
        findDescendants: <T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: import("./tree").TreeOptions) => T[];
        filterTree: <T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: import("./tree").TreeOptions) => T[];
        forEachTree: <T extends Record<string, any>>(tree: T[], callback: (node: T, index: number, parent?: T) => void, options?: import("./tree").TreeOptions) => void;
        mapTree: <T extends Record<string, any>, R extends Record<string, any>>(tree: T[], mapper: (node: T) => R, options?: import("./tree").TreeOptions) => R[];
        sortTree: <T extends Record<string, any>>(tree: T[], compareFn: (a: T, b: T) => number, options?: import("./tree").TreeOptions) => T[];
        getTreeDepth: <T extends Record<string, any>>(tree: T[], options?: import("./tree").TreeOptions) => number;
        getLeafNodes: <T extends Record<string, any>>(tree: T[], options?: import("./tree").TreeOptions) => T[];
        uniqueTree: <T extends Record<string, any>>(tree: T[], getKey: (node: T) => any, options?: import("./tree").TreeOptions) => T[];
        flattenToDepth: <T extends Record<string, any>>(tree: T[], depth: number, options?: import("./tree").TreeOptions) => T[];
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
};
export { scformat, string, array, object, file, number, validate, format, date, type, url, promise, debounceThrottle, Storage, getLocalStorage, getSessionStorage, Logger, logger, EventBus, eventBus, Cache, crypto, request, sensitive, form, FormValidator, formRules, dom, cookie, TokenManager, performance_, PerformanceMonitor, FPSMonitor, fileHandler, device, clipboard, tree, id, IncrementalId, };
export default htils;
//# sourceMappingURL=index.d.ts.map