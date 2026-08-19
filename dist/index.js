'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CryptoJS = require('crypto-js');

/**
 * 命名转换工具：蛇形与驼峰双向转换
 * 支持纯对象、嵌套对象、数组及基础类型值
 */
const scformat = {
    /**
     * 判断值是否为纯对象
     */
    isPlainObject(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
    },
    /**
     * 判断值是否为 Record 数组
     */
    isRecordArray(value) {
        return Array.isArray(value) && (value.length === 0 || this.isPlainObject(value[0]));
    },
    /**
     * 蛇形命名转驼峰命名
     * @example scformat.snakeToCamel('user_name') // 'userName'
     */
    snakeToCamel(str) {
        if (!str || typeof str !== 'string')
            return str;
        return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
    },
    /**
     * 驼峰命名转蛇形命名
     * @example scformat.camelToSnake('userName') // 'user_name'
     */
    camelToSnake(str) {
        if (!str || typeof str !== 'string')
            return str;
        return str.replace(/(?<!^)[A-Z]/g, (char) => `_${char.toLowerCase()}`);
    },
    /**
     * 递归将蛇形键对象转换为驼峰键对象
     * @example scformat.snakeDataToCamel({ user_name: 'test' }) // { userName: 'test' }
     */
    snakeDataToCamel(data) {
        if (typeof data !== 'object' || data === null) {
            return data;
        }
        if (this.isRecordArray(data)) {
            return data.map((item) => this.snakeDataToCamel(item));
        }
        if (this.isPlainObject(data)) {
            const camelObj = {};
            Object.keys(data).forEach((snakeKey) => {
                const camelKey = this.snakeToCamel(snakeKey);
                const value = data[snakeKey];
                camelObj[camelKey] = typeof value === 'object' && value !== null ? this.snakeDataToCamel(value) : value;
            });
            return camelObj;
        }
        if (Array.isArray(data)) {
            return data;
        }
        return data;
    },
    /**
     * 递归将驼峰键对象转换为蛇形键对象
     * @example scformat.camelDataToSnake({ userName: 'test' }) // { user_name: 'test' }
     */
    camelDataToSnake(data) {
        if (typeof data !== 'object' || data === null) {
            return data;
        }
        if (this.isRecordArray(data)) {
            return data.map((item) => this.camelDataToSnake(item));
        }
        if (this.isPlainObject(data)) {
            const snakeObj = {};
            Object.keys(data).forEach((camelKey) => {
                const snakeKey = this.camelToSnake(camelKey);
                const value = data[camelKey];
                snakeObj[snakeKey] = typeof value === 'object' && value !== null ? this.camelDataToSnake(value) : value;
            });
            return snakeObj;
        }
        if (Array.isArray(data)) {
            return data;
        }
        return data;
    },
};

/**
 * 字符串处理工具函数 - 精简核心版本
 * 注：驼峰/蛇形转换请使用 scformat 模块，支持递归对象和数组
 */
const string = {
    /**
     * 首字母大写
     * @example capitalize('hello') // 'Hello'
     */
    capitalize(str) {
        if (!str)
            return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    /**
     * 转换为 kebab 命名
     * @example kebabCase('helloWorld') // 'hello-world'
     */
    kebabCase(str) {
        if (!str)
            return str;
        return str
            .replace(/([A-Z])/g, '-$1')
            .replace(/[_\s]+/g, '-')
            .toLowerCase()
            .replace(/^-/, '');
    },
    /**
     * 检查字符串是否为空
     * @example isEmpty('') // true
     */
    isEmpty(str) {
        return !str || str.length === 0;
    },
    /**
     * 检查字符串是否为空白
     * @example isBlank('   ') // true
     */
    isBlank(str) {
        return !str || str.trim().length === 0;
    },
    /**
     * 截断字符串
     * @example truncate('hello world', 5) // 'he...'
     */
    truncate(str, length, suffix = '...') {
        if (!str)
            return str;
        if (str.length <= length)
            return str;
        return str.slice(0, length) + suffix;
    },
    /**
     * 查找并替换第一个匹配项
     * @example replaceOnce('hello hello', 'hello', 'hi') // 'hi hello'
     */
    replaceOnce(str, search, replace) {
        if (!str)
            return str;
        return str.replace(search, replace);
    },
    /**
     * 忽略大小写的包含检查
     * @example includes('Hello', 'hello', false) // true
     */
    includes(str, substring, caseSensitive = true) {
        if (caseSensitive) {
            return str.includes(substring);
        }
        return str.toLowerCase().includes(substring.toLowerCase());
    },
    /**
     * 转换为大写
     * @example toUpper('hello') // 'HELLO'
     */
    toUpper(str) {
        return str.toUpperCase();
    },
    /**
     * 转换为小写
     * @example toLower('HELLO') // 'hello'
     */
    toLower(str) {
        return str.toLowerCase();
    },
    /**
     * 转换为 Title Case
     * @example toTitleCase('hello world') // 'Hello World'
     */
    toTitleCase(str) {
        if (!str)
            return str;
        return str
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    },
    /**
     * 重复字符串
     * @example repeat('a', 3) // 'aaa'
     */
    repeat(str, count) {
        return str.repeat(Math.max(0, count));
    },
};

/**
 * 数组处理工具函数
 */
const array = {
    /**
     * 数组去重
     * @example unique([1, 2, 2, 3]) // [1, 2, 3]
     */
    unique(arr) {
        return [...new Set(arr)];
    },
    /**
     * 数组扁平化
     * @example flatten([[1, 2], [3, [4, 5]]]) // [1, 2, 3, 4, 5]
     */
    flatten(arr, depth = Infinity) {
        if (depth === 0)
            return arr;
        return arr.reduce((acc, item) => {
            if (Array.isArray(item)) {
                acc.push(...this.flatten(item, depth - 1));
            }
            else {
                acc.push(item);
            }
            return acc;
        }, []);
    },
    /**
     * 数组分块
     * @example chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
     */
    chunk(arr, size) {
        if (size <= 0)
            return [];
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    },
    /**
     * 按属性分组
     * @example groupBy([{type: 'a', val: 1}, {type: 'b', val: 2}], 'type')
     */
    groupBy(arr, key) {
        return arr.reduce((acc, item) => {
            const groupKey = String(item[key]);
            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            acc[groupKey].push(item);
            return acc;
        }, {});
    },
    /**
     * 根据条件查找元素
     * @example find([1, 2, 3, 4], x => x > 2) // 3
     */
    find(arr, predicate) {
        for (let i = 0; i < arr.length; i++) {
            if (predicate(arr[i], i)) {
                return arr[i];
            }
        }
        return undefined;
    },
    /**
     * 查找索引
     * @example findIndex([1, 2, 3], x => x > 2) // 2
     */
    findIndex(arr, predicate) {
        for (let i = 0; i < arr.length; i++) {
            if (predicate(arr[i], i)) {
                return i;
            }
        }
        return -1;
    },
    /**
     * 检查数组是否包含某个元素
     * @example includes([1, 2, 3], 2) // true
     */
    includes(arr, item) {
        return arr.includes(item);
    },
    /**
     * 获取数组第一个元素
     * @example first([1, 2, 3]) // 1
     */
    first(arr) {
        return arr[0];
    },
    /**
     * 获取数组最后一个元素
     * @example last([1, 2, 3]) // 3
     */
    last(arr) {
        return arr[arr.length - 1];
    },
    /**
     * 过滤空值
     * @example compact([1, 0, 2, false, 3, '', 4]) // [1, 2, 3, 4]
     */
    compact(arr) {
        return arr.filter(item => !!item);
    },
    /**
     * 从数组中移除指定元素
     * @example remove([1, 2, 3, 2], 2) // [1, 3]
     */
    remove(arr, item) {
        return arr.filter(x => x !== item);
    },
    /**
     * 获取两个数组的差集
     * @example difference([1, 2, 3], [2, 3, 4]) // [1]
     */
    difference(arr1, arr2) {
        return arr1.filter(item => !arr2.includes(item));
    },
    /**
     * 获取指定长度的随机样本
     * @example sample([1, 2, 3, 4, 5], 2) // [3, 1] (随机)
     */
    sample(arr, size = 1) {
        const result = [];
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        for (let i = 0; i < Math.min(size, shuffled.length); i++) {
            result.push(shuffled[i]);
        }
        return result;
    },
    /**
     * 获取数组索引
     * @example indexOf([1, 2, 3], 2) // 1
     */
    indexOf(arr, item) {
        return arr.indexOf(item);
    },
    /**
     * 检查数组是否为空
     * @example isEmpty([]) // true
     */
    isEmpty(arr) {
        return arr.length === 0;
    },
    /**
     * 求和
     * @example sum([1, 2, 3]) // 6
     */
    sum(arr) {
        return arr.reduce((a, b) => a + b, 0);
    },
    /**
     * 求平均值
     * @example average([1, 2, 3]) // 2
     */
    average(arr) {
        return arr.length > 0 ? this.sum(arr) / arr.length : 0;
    },
    /**
     * 获取最大值
     * @example max([1, 2, 3]) // 3
     */
    max(arr) {
        return Math.max(...arr);
    },
    /**
     * 获取最小值
     * @example min([1, 2, 3]) // 1
     */
    min(arr) {
        return Math.min(...arr);
    },
};

/**
 * 对象处理工具函数
 */
const object = {
    /**
     * 判断值是否为纯对象
     */
    isPlainObject(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
    },
    /**
     * 深拷贝
     * @example deepClone({ a: { b: 1 } }) // { a: { b: 1 } }
     */
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        if (obj instanceof Array) {
            return obj.map((item) => this.deepClone(item));
        }
        if (obj instanceof Object) {
            const cloned = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    cloned[key] = this.deepClone(obj[key]);
                }
            }
            return cloned;
        }
        return obj;
    },
    /**
     * 浅拷贝
     * @example shallowClone({ a: { b: 1 } }) // { a: { b: 1 } }
     */
    shallowClone(obj) {
        return { ...obj };
    },
    /**
     * 合并对象
     * @example merge({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
     */
    merge(...objects) {
        return Object.assign({}, ...objects);
    },
    /**
     * 深度合并对象
     * @example deepMerge({ a: { b: 1 } }, { a: { c: 2 } }) // { a: { b: 1, c: 2 } }
     */
    deepMerge(...objects) {
        return objects.reduce((acc, obj) => {
            Object.keys(obj).forEach((key) => {
                const value = obj[key];
                if (this.isPlainObject(value) && this.isPlainObject(acc[key])) {
                    acc[key] = this.deepMerge(acc[key], value);
                }
                else {
                    acc[key] = value;
                }
            });
            return acc;
        }, {});
    },
    /**
     * 选取指定属性
     * @example pick({ a: 1, b: 2, c: 3 }, ['a', 'b']) // { a: 1, b: 2 }
     */
    pick(obj, keys) {
        const result = {};
        keys.forEach((key) => {
            if (key in obj) {
                result[key] = obj[key];
            }
        });
        return result;
    },
    /**
     * 排除指定属性
     * @example omit({ a: 1, b: 2, c: 3 }, ['c']) // { a: 1, b: 2 }
     */
    omit(obj, keys) {
        const result = { ...obj };
        keys.forEach((key) => {
            delete result[key];
        });
        return result;
    },
    /**
     * 判断对象是否为空
     * @example isEmpty({}) // true
     * @example isEmpty({ a: 1 }) // false
     */
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    },
    /**
     * 判断对象是否存在指定属性
     * @example hasKey({ a: 1 }, 'a') // true
     */
    hasKey(obj, key) {
        return key in obj;
    },
    /**
     * 获取对象的所有键
     * @example keys({ a: 1, b: 2 }) // ['a', 'b']
     */
    keys(obj) {
        return Object.keys(obj);
    },
    /**
     * 获取对象的所有值
     * @example values({ a: 1, b: 2 }) // [1, 2]
     */
    values(obj) {
        return Object.values(obj);
    },
    /**
     * 获取对象的所有键值对
     * @example entries({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
     */
    entries(obj) {
        return Object.entries(obj);
    },
    /**
     * 从键值对创建对象
     * @example fromEntries([['a', 1], ['b', 2]]) // { a: 1, b: 2 }
     */
    fromEntries(entries) {
        return Object.fromEntries(entries);
    },
    /**
     * 转换对象的键
     * @example mapKeys({ a: 1, b: 2 }, key => key.toUpperCase()) // { A: 1, B: 2 }
     */
    mapKeys(obj, fn) {
        const result = {};
        Object.keys(obj).forEach((key) => {
            result[fn(key)] = obj[key];
        });
        return result;
    },
    /**
     * 转换对象的值
     * @example mapValues({ a: 1, b: 2 }, val => val * 2) // { a: 2, b: 4 }
     */
    mapValues(obj, fn) {
        const result = {};
        Object.keys(obj).forEach((key) => {
            result[key] = fn(obj[key], key);
        });
        return result;
    },
    /**
     * 过滤对象的键值对
     * @example filter({ a: 1, b: 2, c: 3 }, val => val > 1) // { b: 2, c: 3 }
     */
    filter(obj, predicate) {
        const result = {};
        Object.keys(obj).forEach((key) => {
            const val = obj[key];
            if (predicate(val, key)) {
                result[key] = val;
            }
        });
        return result;
    },
    /**
     * 判断两个对象是否相等（深度比较）
     * @example isEqual({ a: 1 }, { a: 1 }) // true
     */
    isEqual(obj1, obj2) {
        if (obj1 === obj2)
            return true;
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
            return false;
        }
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length)
            return false;
        return keys1.every((key) => this.isEqual(obj1[key], obj2[key]));
    },
    /**
     * 反转对象的键和值
     * @example invert({ a: '1', b: '2' }) // { 1: 'a', 2: 'b' }
     */
    invert(obj) {
        const result = {};
        Object.keys(obj).forEach((key) => {
            result[obj[key]] = key;
        });
        return result;
    },
    /**
     * 检查对象是否包含特定的键值对
     * @example contains({ a: 1, b: 2 }, { a: 1 }) // true
     */
    contains(obj, target) {
        return Object.keys(target).every((key) => obj[key] === target[key]);
    },
    /**
     * 获取对象的嵌套属性值
     * @example get({ a: { b: { c: 1 } } }, 'a.b.c') // 1
     */
    get(obj, path, defaultValue) {
        const keys = path.split('.');
        let result = obj;
        for (const key of keys) {
            result = result?.[key];
            if (result === undefined) {
                return defaultValue;
            }
        }
        return result;
    },
    /**
     * 设置对象的嵌套属性值
     * @example set({ a: {} }, 'a.b.c', 1) // { a: { b: { c: 1 } } }
     */
    set(obj, path, value) {
        const keys = path.split('.');
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current) || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        current[keys[keys.length - 1]] = value;
        return obj;
    },
};

/**
 * 文件处理工具函数
 */
const file = {
    /**
     * 获取文件扩展名
     * @example getExtension('index.ts') // 'ts'
     */
    getExtension(filename) {
        const index = filename.lastIndexOf('.');
        return index > 0 ? filename.slice(index + 1) : '';
    },
    /**
     * 获取文件名（不含扩展名）
     * @example getBasename('index.ts') // 'index'
     */
    getBasename(filename) {
        const index = filename.lastIndexOf('.');
        return index > 0 ? filename.slice(0, index) : filename;
    },
    /**
     * 获取完整文件名
     * @example getFilename('path/to/index.ts') // 'index.ts'
     */
    getFilename(filepath) {
        return filepath.split('/').pop() || filepath;
    },
    /**
     * 获取文件目录路径
     * @example getDirectory('path/to/index.ts') // 'path/to'
     */
    getDirectory(filepath) {
        const parts = filepath.split('/');
        return parts.slice(0, -1).join('/') || '.';
    },
    /**
     * 判断文件是否具有指定扩展名
     * @example hasExtension('index.ts', 'ts') // true
     */
    hasExtension(filename, ext) {
        const extension = this.getExtension(filename);
        return extension.toLowerCase() === ext.toLowerCase();
    },
    /**
     * 改变文件扩展名
     * @example changeExtension('index.ts', 'js') // 'index.js'
     */
    changeExtension(filename, newExt) {
        const basename = this.getBasename(filename);
        return `${basename}.${newExt}`;
    },
    /**
     * 判断是否为文件路径格式
     * @example isFilePath('index.ts') // true
     * @example isFilePath('path/to/file.ts') // true
     */
    isFilePath(str) {
        return /\.[a-zA-Z0-9]+$/.test(str);
    },
    /**
     * 判断是否为目录路径格式
     * @example isDirectoryPath('src/') // true
     * @example isDirectoryPath('src') // true
     */
    isDirectoryPath(str) {
        return !this.isFilePath(str);
    },
    /**
     * 规范化路径分隔符（转换为前斜杠）
     * @example normalizePath('src\\utils\\index.ts') // 'src/utils/index.ts'
     */
    normalizePath(filepath) {
        return filepath.replace(/\\/g, '/');
    },
    /**
     * 获取文件的 MIME 类型（基于扩展名）
     * @example getMimeType('index.html') // 'text/html'
     */
    getMimeType(filename) {
        const ext = this.getExtension(filename).toLowerCase();
        const mimeMap = {
            'html': 'text/html',
            'htm': 'text/html',
            'css': 'text/css',
            'js': 'text/javascript',
            'json': 'application/json',
            'xml': 'application/xml',
            'pdf': 'application/pdf',
            'zip': 'application/zip',
            'txt': 'text/plain',
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif',
            'svg': 'image/svg+xml',
            'webp': 'image/webp',
            'mp4': 'video/mp4',
            'mp3': 'audio/mpeg',
            'wav': 'audio/wav',
            'ts': 'text/typescript',
            'tsx': 'text/typescript',
            'jsx': 'text/javascript',
        };
        return mimeMap[ext] || 'application/octet-stream';
    },
    /**
     * 判断是否为文本文件
     * @example isTextFile('index.ts') // true
     */
    isTextFile(filename) {
        const ext = this.getExtension(filename).toLowerCase();
        const textExtensions = ['txt', 'js', 'ts', 'jsx', 'tsx', 'html', 'css', 'json', 'md', 'yml', 'yaml', 'xml', 'svg', 'py', 'java', 'cpp', 'c', 'java'];
        return textExtensions.includes(ext);
    },
    /**
     * 判断是否为图片文件
     * @example isImageFile('image.png') // true
     */
    isImageFile(filename) {
        const ext = this.getExtension(filename).toLowerCase();
        const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp', 'tiff'];
        return imageExtensions.includes(ext);
    },
    /**
     * 判断是否为视频文件
     * @example isVideoFile('video.mp4') // true
     */
    isVideoFile(filename) {
        const ext = this.getExtension(filename).toLowerCase();
        const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'flv', 'wmv', 'webm'];
        return videoExtensions.includes(ext);
    },
    /**
     * 判断是否为音频文件
     * @example isAudioFile('song.mp3') // true
     */
    isAudioFile(filename) {
        const ext = this.getExtension(filename).toLowerCase();
        const audioExtensions = ['mp3', 'wav', 'flac', 'aac', 'wma', 'ogg'];
        return audioExtensions.includes(ext);
    },
    /**
     * 生成唯一的文件名（添加时间戳或随机数）
     * @example generateUniqueFilename('image.png') // 'image_1703072000000.png'
     */
    generateUniqueFilename(filename, useTimestamp = true) {
        const basename = this.getBasename(filename);
        const ext = this.getExtension(filename);
        const suffix = useTimestamp ? `_${Date.now()}` : `_${Math.random().toString(36).slice(2, 9)}`;
        return ext ? `${basename}${suffix}.${ext}` : `${basename}${suffix}`;
    },
};

/**
 * 数字处理工具函数
 */
const number = {
    /**
     * 四舍五入到指定小数位
     * @example round(3.14159, 2) // 3.14
     */
    round(num, precision = 0) {
        const factor = Math.pow(10, precision);
        return Math.round(num * factor) / factor;
    },
    /**
     * 向上取整到指定小数位
     * @example ceil(3.14, 1) // 3.2
     */
    ceil(num, precision = 0) {
        const factor = Math.pow(10, precision);
        return Math.ceil(num * factor) / factor;
    },
    /**
     * 向下取整到指定小数位
     * @example floor(3.19, 1) // 3.1
     */
    floor(num, precision = 0) {
        const factor = Math.pow(10, precision);
        return Math.floor(num * factor) / factor;
    },
    /**
     * 约束数字在指定范围内
     * @example clamp(5, 1, 3) // 3
     */
    clamp(num, min, max) {
        return Math.max(min, Math.min(max, num));
    },
    /**
     * 数字范围检查
     * @example inRange(5, 0, 10) // true
     */
    inRange(num, min, max) {
        return num >= min && num <= max;
    },
    /**
     * 字节转换
     * @example byteToMB(1024 * 1024) // 1
     */
    byteToKB(bytes) {
        return this.round(bytes / 1024, 2);
    },
    byteToMB(bytes) {
        return this.round(bytes / (1024 * 1024), 2);
    },
    byteToGB(bytes) {
        return this.round(bytes / (1024 * 1024 * 1024), 2);
    },
    /**
     * 百分比计算
     * @example percentage(50, 100) // 50
     */
    percentage(value, total) {
        return this.round((value / total) * 100, 2);
    },
    /**
     * 计算平均值
     * @example average(1, 2, 3, 4, 5) // 3
     */
    average(...nums) {
        if (nums.length === 0)
            return 0;
        const sum = nums.reduce((acc, val) => acc + val, 0);
        return this.round(sum / nums.length, 2);
    },
    /**
     * 计算总和
     * @example sum(1, 2, 3) // 6
     */
    sum(...nums) {
        return nums.reduce((acc, val) => acc + val, 0);
    },
    /**
     * 生成指定范围的随机整数
     * @example randomBetween(1, 10) // 5
     */
    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * 生成 0-1 的随机数
     * @example random() // 0.5
     */
    random() {
        return Math.random();
    },
    /**
     * 格式化数字为千位分隔符
     * @example formatWithCommas(1000000) // '1,000,000'
     */
    formatWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
};

/**
 * 数据验证工具函数
 */
const validate = {
    /**
     * 验证邮箱格式
     * @example isEmail('user@example.com') // true
     */
    isEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    /**
     * 验证URL格式
     * @example isUrl('https://example.com') // true
     */
    isUrl(url) {
        try {
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    },
    /**
     * 验证电话号码（中国格式）
     * @example isPhone('13800138000') // true
     */
    isPhone(phone) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        return phoneRegex.test(phone);
    },
    /**
     * 验证身份证号码（简化版）
     * @example isIdCard('110101199003071234') // true (format only)
     */
    isIdCard(idCard) {
        return /^\d{18}$/.test(idCard) || /^\d{15}$/.test(idCard);
    },
    /**
     * 验证中国统一社会信用代码
     * @example isSocialCreditCode('91110105MA00D66D4C') // true (format only)
     */
    isSocialCreditCode(code) {
        return /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(code);
    },
    /**
     * 验证邮政编码（中国）
     * @example isZipCode('100000') // true
     */
    isZipCode(zipCode) {
        return /^\d{6}$/.test(zipCode);
    },
    /**
     * 验证 IP 地址
     * @example isIp('192.168.1.1') // true
     */
    isIp(ip) {
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(ip))
            return false;
        const parts = ip.split('.');
        return parts.every(part => parseInt(part) <= 255);
    },
    /**
     * 验证 IPv4 地址
     * @example isIpv4('192.168.1.1') // true
     */
    isIpv4(ip) {
        return this.isIp(ip);
    },
    /**
     * 验证 IPv6 地址
     * @example isIpv6('::1') // true
     */
    isIpv6(ip) {
        const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
        return ipv6Regex.test(ip);
    },
    /**
     * 验证强密码
     * 至少包含大小写字母、数字、特殊字符，长度至少 8 位
     * @example isStrongPassword('Abc@1234') // true
     */
    isStrongPassword(password) {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongRegex.test(password);
    },
    /**
     * 验证是否为数字
     * @example isNumber('123') // true
     */
    isNumber(value) {
        return !isNaN(Number(value)) && value !== '';
    },
    /**
     * 验证是否为整数
     * @example isInteger('123') // true
     */
    isInteger(value) {
        return /^-?\d+$/.test(value);
    },
    /**
     * 验证是否为浮点数
     * @example isFloat('123.45') // true
     */
    isFloat(value) {
        return /^-?\d+\.\d+$/.test(value);
    },
    /**
     * 验证是否为十六进制颜色
     * @example isHexColor('#FFFFFF') // true
     */
    isHexColor(color) {
        return /^#[0-9A-Fa-f]{6}$/.test(color) || /^#[0-9A-Fa-f]{3}$/.test(color);
    },
    /**
     * 验证是否为中文字符
     * @example isChinese('你好') // true
     */
    isChinese(str) {
        return /^[\u4E00-\u9FA5]+$/.test(str);
    },
    /**
     * 验证是否为英文字符
     * @example isEnglish('hello') // true
     */
    isEnglish(str) {
        return /^[a-zA-Z]+$/.test(str);
    },
    /**
     * 验证是否为字母数字
     * @example isAlphanumeric('abc123') // true
     */
    isAlphanumeric(str) {
        return /^[a-zA-Z0-9]+$/.test(str);
    },
    /**
     * 验证长度范围
     * @example isLengthBetween('hello', 2, 10) // true
     */
    isLengthBetween(str, min, max) {
        return str.length >= min && str.length <= max;
    },
    /**
     * 验证是否为空值
     * @example isEmpty('') // true
     * @example isEmpty(null) // true
     */
    isEmpty(value) {
        return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0);
    },
    /**
     * 验证是否包含特定字符
     * @example contains('hello world', 'world') // true
     */
    contains(str, substring) {
        return str.includes(substring);
    },
    /**
     * 验证是否为纯数字
     * @example isPureNumber('12345') // true
     */
    isPureNumber(str) {
        return /^\d+$/.test(str);
    },
    /**
     * 验证是否为 UUID
     * @example isUUID('550e8400-e29b-41d4-a716-446655440000') // true
     */
    isUUID(uuid) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    },
    /**
     * 验证是否为 MAC 地址
     * @example isMacAddress('00:1A:2B:3C:4D:5E') // true
     */
    isMacAddress(mac) {
        const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
        return macRegex.test(mac);
    },
};

/**
 * 数据格式化工具函数
 */
const format = {
    /**
     * 格式化货币
     * @example formatCurrency(1234.5) // '$1,234.50'
     * @example formatCurrency(1234.5, 'CNY', 'zh-CN') // '¥1,234.50'
     */
    formatCurrency(amount, currency = 'USD', locale = 'en-US') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(amount);
    },
    /**
     * 格式化百分比
     * @example formatPercentage(0.5) // '50.00%'
     */
    formatPercentage(value, precision = 2) {
        return `${(value * 100).toFixed(precision)}%`;
    },
    /**
     * 格式化文件大小
     * @example formatFileSize(1024) // '1 KB'
     * @example formatFileSize(1024 * 1024) // '1 MB'
     */
    formatFileSize(bytes) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
    },
    /**
     * 格式化数字（千位分隔符）
     * @example formatNumber(1000000) // '1,000,000'
     */
    formatNumber(num, precision = 0) {
        return num.toFixed(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    /**
     * 格式化电话号码
     * @example formatPhone('13800138000') // '138-0013-8000'
     */
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length !== 11)
            return phone;
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    },
    /**
     * 格式化身份证号码
     * @example formatIdCard('110101199003071234') // '1101 0119 9003 0712 34'
     */
    formatIdCard(idCard) {
        const cleaned = idCard.replace(/\s/g, '');
        return cleaned.replace(/(\d{4})/g, '$1 ').trim();
    },
    /**
     * 格式化邮箱（隐藏部分字符）
     * @example formatEmail('user@example.com') // 'u***@example.com'
     */
    formatEmail(email) {
        const [name, domain] = email.split('@');
        if (!domain)
            return email;
        const hiddenName = name.charAt(0) + '*'.repeat(Math.max(name.length - 2, 1)) + (name.length > 1 ? name.charAt(name.length - 1) : '');
        return `${hiddenName}@${domain}`;
    },
    /**
     * 格式化银行卡号
     * @example formatBankCard('6222021234567890123') // '6222 0212 3456 7890 123'
     */
    formatBankCard(cardNumber) {
        const cleaned = cardNumber.replace(/\s/g, '');
        return cleaned.replace(/(\d{4})/g, '$1 ').trim();
    },
    /**
     * 格式化大小（存储空间）
     * @example formatSize(1024) // '1 KB'
     */
    formatSize(size) {
        return this.formatFileSize(size);
    },
    /**
     * 格式化时间（秒数转换）
     * @example formatTime(3661) // '1h 1m 1s'
     */
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        const parts = [];
        if (hours > 0)
            parts.push(`${hours}h`);
        if (minutes > 0)
            parts.push(`${minutes}m`);
        if (secs > 0 || parts.length === 0)
            parts.push(`${secs}s`);
        return parts.join(' ');
    },
    /**
     * 格式化日期
     * @example formatDate(new Date('2024-01-01')) // '2024-01-01'
     */
    formatDate(date, format = 'YYYY-MM-DD') {
        const pad = (n) => String(n).padStart(2, '0');
        const replacements = {
            'YYYY': date.getFullYear(),
            'MM': pad(date.getMonth() + 1),
            'DD': pad(date.getDate()),
            'HH': pad(date.getHours()),
            'mm': pad(date.getMinutes()),
            'ss': pad(date.getSeconds()),
        };
        let result = format;
        Object.keys(replacements).forEach(key => {
            result = result.replace(key, String(replacements[key]));
        });
        return result;
    },
    /**
     * 格式化 JSON
     * @example formatJson({a:1,b:2}) // '{\n  "a": 1,\n  "b": 2\n}'
     */
    formatJson(obj, space = 2) {
        return JSON.stringify(obj, null, space);
    },
    /**
     * 格式化 URL
     * @example formatUrl('https://example.com', {key: 'value'}) // 'https://example.com?key=value'
     */
    formatUrl(baseUrl, params) {
        if (!params || Object.keys(params).length === 0) {
            return baseUrl;
        }
        const queryString = Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${queryString}`;
    },
    /**
     * 格式化 HTML（转义）
     * @example formatHtml('<div>test</div>') // '&lt;div&gt;test&lt;/div&gt;'
     */
    formatHtml(html) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        };
        return html.replace(/[&<>"']/g, char => map[char]);
    },
    /**
     * 格式化 SQL 查询字符串
     * @example formatSql("SELECT * FROM users WHERE id = ?", [1]) // "SELECT * FROM users WHERE id = 1"
     */
    formatSql(sql, params) {
        let result = sql;
        params.forEach(param => {
            const value = typeof param === 'string' ? `'${param}'` : param;
            result = result.replace('?', value);
        });
        return result;
    },
    /**
     * 格式化驼峰字符串为空格分隔
     * @example formatCamelCase('helloWorld') // 'hello World'
     */
    formatCamelCase(str) {
        return str.replace(/([A-Z])/g, ' $1').trim();
    },
    /**
     * 格式化 Base64
     * @example formatBase64('hello') // 'aGVsbG8='
     */
    formatBase64(str) {
        if (typeof btoa !== 'undefined') {
            return btoa(unescape(encodeURIComponent(str)));
        }
        // Node.js 环境
        const BufferConstructor = globalThis.Buffer;
        return BufferConstructor?.from(str, 'utf8').toString('base64') ?? str;
    },
    /**
     * 解码 Base64
     * @example decodeBase64('aGVsbG8=') // 'hello'
     */
    decodeBase64(str) {
        if (typeof atob !== 'undefined') {
            return decodeURIComponent(escape(atob(str)));
        }
        // Node.js 环境
        const BufferConstructor = globalThis.Buffer;
        return BufferConstructor?.from(str, 'base64').toString('utf8') ?? str;
    },
};

/**
 * 日期处理工具函数
 */
const date = {
    /**
     * 获取当前日期
     * @example now() // Date object
     */
    now() {
        return new Date();
    },
    /**
     * 获取时间戳（秒）
     * @example timestamp() // 1703072000
     */
    timestamp() {
        return Math.floor(Date.now() / 1000);
    },
    /**
     * 获取时间戳（毫秒）
     * @example timestampMs() // 1703072000000
     */
    timestampMs() {
        return Date.now();
    },
    /**
     * 将时间戳转换为日期对象
     * @example fromTimestamp(1703072000) // Date object
     */
    fromTimestamp(timestamp) {
        return new Date(timestamp * 1000);
    },
    /**
     * 将日期对象转换为时间戳
     * @example toTimestamp(new Date()) // 1703072000
     */
    toTimestamp(date) {
        return Math.floor(date.getTime() / 1000);
    },
    /**
     * 格式化日期
     * @example format(new Date('2024-01-01'), 'YYYY-MM-DD') // '2024-01-01'
     */
    format(date, formatStr = 'YYYY-MM-DD HH:mm:ss') {
        const pad = (n) => String(n).padStart(2, '0');
        const replacements = {
            'YYYY': String(date.getFullYear()),
            'MM': pad(date.getMonth() + 1),
            'DD': pad(date.getDate()),
            'HH': pad(date.getHours()),
            'mm': pad(date.getMinutes()),
            'ss': pad(date.getSeconds()),
            'MS': String(date.getMilliseconds()),
        };
        let result = formatStr;
        Object.keys(replacements)
            .sort((a, b) => b.length - a.length)
            .forEach(key => {
            result = result.replace(new RegExp(key, 'g'), replacements[key]);
        });
        return result;
    },
    /**
     * 解析日期字符串
     * @example parse('2024-01-01') // Date object
     */
    parse(dateStr) {
        return new Date(dateStr);
    },
    /**
     * 添加天数
     * @example addDays(new Date('2024-01-01'), 5) // 2024-01-06
     */
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },
    /**
     * 添加小时
     * @example addHours(new Date(), 2) // Date 2 hours later
     */
    addHours(date, hours) {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return result;
    },
    /**
     * 添加分钟
     * @example addMinutes(new Date(), 30) // Date 30 minutes later
     */
    addMinutes(date, minutes) {
        const result = new Date(date);
        result.setMinutes(result.getMinutes() + minutes);
        return result;
    },
    /**
     * 添加秒数
     * @example addSeconds(new Date(), 30) // Date 30 seconds later
     */
    addSeconds(date, seconds) {
        const result = new Date(date);
        result.setSeconds(result.getSeconds() + seconds);
        return result;
    },
    /**
     * 添加月份
     * @example addMonths(new Date('2024-01-01'), 1) // 2024-02-01
     */
    addMonths(date, months) {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    },
    /**
     * 添加年份
     * @example addYears(new Date('2024-01-01'), 1) // 2025-01-01
     */
    addYears(date, years) {
        const result = new Date(date);
        result.setFullYear(result.getFullYear() + years);
        return result;
    },
    /**
     * 计算两个日期之间的天数差
     * @example diffDays(new Date('2024-01-01'), new Date('2024-01-06')) // 5
     */
    diffDays(date1, date2) {
        const msPerDay = 24 * 60 * 60 * 1000;
        return Math.floor((date2.getTime() - date1.getTime()) / msPerDay);
    },
    /**
     * 计算两个日期之间的小时数差
     * @example diffHours(new Date(), new Date(Date.now() + 3600000)) // 1
     */
    diffHours(date1, date2) {
        const msPerHour = 60 * 60 * 1000;
        return Math.floor((date2.getTime() - date1.getTime()) / msPerHour);
    },
    /**
     * 计算两个日期之间的分钟数差
     * @example diffMinutes(new Date(), new Date(Date.now() + 60000)) // 1
     */
    diffMinutes(date1, date2) {
        const msPerMinute = 60 * 1000;
        return Math.floor((date2.getTime() - date1.getTime()) / msPerMinute);
    },
    /**
     * 获取该月的天数
     * @example getDaysInMonth(new Date('2024-02-01')) // 29 (leap year)
     */
    getDaysInMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    },
    /**
     * 判断是否为闰年
     * @example isLeapYear(2024) // true
     */
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },
    /**
     * 获取周几（0 = 星期日）
     * @example getDay(new Date('2024-01-01')) // 1
     */
    getDay(date) {
        return date.getDay();
    },
    /**
     * 获取周几的名称
     * @example getDayName(new Date('2024-01-01')) // 'Monday'
     */
    getDayName(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    },
    /**
     * 获取月份的名称
     * @example getMonthName(new Date('2024-01-01')) // 'January'
     */
    getMonthName(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[date.getMonth()];
    },
    /**
     * 获取年份的第几天
     * @example getDayOfYear(new Date('2024-01-01')) // 1
     */
    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    },
    /**
     * 判断两个日期是否为同一天
     * @example isSameDay(new Date('2024-01-01'), new Date('2024-01-01 10:00:00')) // true
     */
    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    },
    /**
     * 判断日期是否在指定范围内
     * @example isBetween(new Date('2024-01-05'), new Date('2024-01-01'), new Date('2024-01-10')) // true
     */
    isBetween(date, startDate, endDate) {
        return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime();
    },
    /**
     * 获取本周的开始日期
     * @example getWeekStart(new Date('2024-01-03')) // 2024-01-01 (Monday)
     */
    getWeekStart(date) {
        const result = new Date(date);
        const day = result.getDay();
        const diff = result.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(result.setDate(diff));
    },
    /**
     * 获取本周的结束日期
     * @example getWeekEnd(new Date('2024-01-03')) // 2024-01-07 (Sunday)
     */
    getWeekEnd(date) {
        const start = this.getWeekStart(date);
        return this.addDays(start, 6);
    },
    /**
     * 获取本月的开始日期
     * @example getMonthStart(new Date('2024-01-15')) // 2024-01-01
     */
    getMonthStart(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    },
    /**
     * 获取本月的结束日期
     * @example getMonthEnd(new Date('2024-01-15')) // 2024-01-31
     */
    getMonthEnd(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },
    /**
     * 相对时间表示（如："2 hours ago"）
     * @example fromNow(new Date(Date.now() - 7200000)) // '2 hours ago'
     */
    fromNow(date) {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        if (diffSecs < 60)
            return 'just now';
        if (diffMins < 60)
            return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24)
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7)
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        if (diffDays < 30)
            return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
        if (diffDays < 365)
            return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
        return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
    },
};

/**
 * 类型检查工具函数
 */
const type = {
    /**
     * 获取精确的数据类型
     * @example getType({}) // 'Object'
     */
    getType(value) {
        return Object.prototype.toString.call(value).slice(8, -1);
    },
    /**
     * 判断是否为对象
     * @example isObject({}) // true
     */
    isObject(value) {
        return this.getType(value) === 'Object';
    },
    /**
     * 判断是否为数组
     * @example isArray([]) // true
     */
    isArray(value) {
        return Array.isArray(value);
    },
    /**
     * 判断是否为字符串
     * @example isString('hello') // true
     */
    isString(value) {
        return typeof value === 'string';
    },
    /**
     * 判断是否为数字
     * @example isNumber(123) // true
     */
    isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    },
    /**
     * 判断是否为布尔值
     * @example isBoolean(true) // true
     */
    isBoolean(value) {
        return typeof value === 'boolean';
    },
    /**
     * 判断是否为函数
     * @example isFunction(() => {}) // true
     */
    isFunction(value) {
        return typeof value === 'function';
    },
    /**
     * 判断是否为 null
     * @example isNull(null) // true
     */
    isNull(value) {
        return value === null;
    },
    /**
     * 判断是否为 undefined
     * @example isUndefined(undefined) // true
     */
    isUndefined(value) {
        return value === undefined;
    },
    /**
     * 判断是否为 null 或 undefined
     * @example isNil(null) // true
     */
    isNil(value) {
        return value === null || value === undefined;
    },
    /**
     * 判断是否为日期对象
     * @example isDate(new Date()) // true
     */
    isDate(value) {
        return this.getType(value) === 'Date';
    },
    /**
     * 判断是否为正则表达式
     * @example isRegExp(/test/) // true
     */
    isRegExp(value) {
        return this.getType(value) === 'RegExp';
    },
    /**
     * 判断是否为 Map
     * @example isMap(new Map()) // true
     */
    isMap(value) {
        return this.getType(value) === 'Map';
    },
    /**
     * 判断是否为 Set
     * @example isSet(new Set()) // true
     */
    isSet(value) {
        return this.getType(value) === 'Set';
    },
    /**
     * 判断是否为 Symbol
     * @example isSymbol(Symbol('test')) // true
     */
    isSymbol(value) {
        return typeof value === 'symbol';
    },
    /**
     * 判断是否为 Promise
     * @example isPromise(Promise.resolve()) // true
     */
    isPromise(value) {
        return this.getType(value) === 'Promise' || (value && typeof value.then === 'function');
    },
    /**
     * 判断是否为 WeakMap
     * @example isWeakMap(new WeakMap()) // true
     */
    isWeakMap(value) {
        return this.getType(value) === 'WeakMap';
    },
    /**
     * 判断是否为 WeakSet
     * @example isWeakSet(new WeakSet()) // true
     */
    isWeakSet(value) {
        return this.getType(value) === 'WeakSet';
    },
    /**
     * 判断是否为可迭代对象
     * @example isIterable([1, 2, 3]) // true
     */
    isIterable(value) {
        return value !== null && typeof value[Symbol.iterator] === 'function';
    },
    /**
     * 判断是否为空对象
     * @example isEmptyObject({}) // true
     */
    isEmptyObject(value) {
        if (!this.isObject(value))
            return false;
        return Object.keys(value).length === 0;
    },
    /**
     * 判断是否为空数组
     * @example isEmptyArray([]) // true
     */
    isEmptyArray(value) {
        if (!this.isArray(value))
            return false;
        return value.length === 0;
    },
    /**
     * 判断是否为空字符串
     * @example isEmptyString('') // true
     */
    isEmptyString(value) {
        if (!this.isString(value))
            return false;
        return value.trim().length === 0;
    },
    /**
     * 判断是否为平凡对象（纯 Object）
     * @example isPlainObject({}) // true
     * @example isPlainObject(new MyClass()) // false
     */
    isPlainObject(value) {
        if (this.getType(value) !== 'Object')
            return false;
        return Object.getPrototypeOf(value) === Object.prototype;
    },
    /**
     * 判断值是否为 truthy
     * @example isTruthy(1) // true
     * @example isTruthy(0) // false
     */
    isTruthy(value) {
        return !!value;
    },
    /**
     * 判断值是否为 falsy
     * @example isFalsy(0) // true
     * @example isFalsy(1) // false
     */
    isFalsy(value) {
        return !value;
    },
    /**
     * 判断是否为原始类型
     * @example isPrimitive('hello') // true
     */
    isPrimitive(value) {
        const type = typeof value;
        return type !== 'object' || value === null;
    },
};

/**
 * URL 处理工具函数
 */
const url = {
    /**
     * 解析 URL
     * @example parse('https://example.com:8080/path?key=value#hash')
     */
    parse(urlStr) {
        return new URL(urlStr);
    },
    /**
     * 获取 URL 的协议
     * @example getProtocol('https://example.com') // 'https:'
     */
    getProtocol(urlStr) {
        try {
            return new URL(urlStr).protocol;
        }
        catch {
            return '';
        }
    },
    /**
     * 获取 URL 的主机名
     * @example getHost('https://example.com') // 'example.com'
     */
    getHost(urlStr) {
        try {
            return new URL(urlStr).host;
        }
        catch {
            return '';
        }
    },
    /**
     * 获取 URL 的端口
     * @example getPort('https://example.com:8080') // '8080'
     */
    getPort(urlStr) {
        try {
            return new URL(urlStr).port;
        }
        catch {
            return '';
        }
    },
    /**
     * 获取 URL 的路径
     * @example getPath('https://example.com/path/to/page') // '/path/to/page'
     */
    getPath(urlStr) {
        try {
            return new URL(urlStr).pathname;
        }
        catch {
            return '';
        }
    },
    /**
     * 获取 URL 的查询字符串
     * @example getQuery('https://example.com?key=value') // 'key=value'
     */
    getQuery(urlStr) {
        try {
            return new URL(urlStr).search.slice(1);
        }
        catch {
            return '';
        }
    },
    /**
     * 获取 URL 的哈希值
     * @example getHash('https://example.com#section') // 'section'
     */
    getHash(urlStr) {
        try {
            return new URL(urlStr).hash.slice(1);
        }
        catch {
            return '';
        }
    },
    /**
     * 解析查询参数
     * @example parseQuery('key=value&foo=bar') // { key: 'value', foo: 'bar' }
     */
    parseQuery(queryStr) {
        const params = {};
        if (!queryStr)
            return params;
        const pairs = queryStr.split('&');
        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) {
                params[decodeURIComponent(key)] = decodeURIComponent(value || '');
            }
        });
        return params;
    },
    /**
     * 构建查询字符串
     * @example buildQuery({ key: 'value', foo: 'bar' }) // 'key=value&foo=bar'
     */
    buildQuery(params) {
        return Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    },
    /**
     * 追加查询参数到 URL
     * @example addQuery('https://example.com?foo=bar', { key: 'value' })
     * // 'https://example.com?foo=bar&key=value'
     */
    addQuery(urlStr, params) {
        try {
            const urlObj = new URL(urlStr);
            Object.entries(params).forEach(([key, value]) => {
                urlObj.searchParams.append(key, String(value));
            });
            return urlObj.toString();
        }
        catch {
            return urlStr;
        }
    },
    /**
     * 移除查询参数
     * @example removeQuery('https://example.com?foo=bar&key=value', 'foo')
     * // 'https://example.com?key=value'
     */
    removeQuery(urlStr, key) {
        try {
            const urlObj = new URL(urlStr);
            urlObj.searchParams.delete(key);
            return urlObj.toString();
        }
        catch {
            return urlStr;
        }
    },
    /**
     * 获取单个查询参数值
     * @example getQueryParam('https://example.com?key=value', 'key') // 'value'
     */
    getQueryParam(urlStr, key) {
        try {
            return new URL(urlStr).searchParams.get(key);
        }
        catch {
            return null;
        }
    },
    /**
     * 判断 URL 是否有效
     * @example isValidUrl('https://example.com') // true
     */
    isValidUrl(urlStr) {
        try {
            new URL(urlStr);
            return true;
        }
        catch {
            return false;
        }
    },
    /**
     * 判断 URL 是否为绝对 URL
     * @example isAbsoluteUrl('https://example.com') // true
     */
    isAbsoluteUrl(urlStr) {
        return /^https?:\/\//.test(urlStr);
    },
    /**
     * 判断 URL 是否为相对 URL
     * @example isRelativeUrl('/path/to/page') // true
     */
    isRelativeUrl(urlStr) {
        return !this.isAbsoluteUrl(urlStr);
    },
    /**
     * 解码 URL
     * @example decode('hello%20world') // 'hello world'
     */
    decode(urlStr) {
        return decodeURIComponent(urlStr);
    },
    /**
     * 编码 URL
     * @example encode('hello world') // 'hello%20world'
     */
    encode(urlStr) {
        return encodeURIComponent(urlStr);
    },
    /**
     * 连接 URL 路径
     * @example join('https://example.com', 'path', 'to', 'page')
     * // 'https://example.com/path/to/page'
     */
    join(...parts) {
        return parts
            .map((part, index) => {
            let p = part.replace(/^\/+|\/+$/g, '');
            if (index > 0)
                p = '/' + p;
            return p;
        })
            .join('');
    },
    /**
     * 获取 URL 的来源（协议 + 主机）
     * @example getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
     */
    getOrigin(urlStr) {
        try {
            const urlObj = new URL(urlStr);
            return urlObj.origin;
        }
        catch {
            return '';
        }
    },
    /**
     * 获取 URL 的基础（协议 + 主机 + 路径）
     * @example getBase('https://example.com/path/to/page?key=value')
     * // 'https://example.com/path/to/page'
     */
    getBase(urlStr) {
        try {
            const urlObj = new URL(urlStr);
            return `${urlObj.origin}${urlObj.pathname}`;
        }
        catch {
            return '';
        }
    },
};

/**
 * Promise 异步操作工具函数
 */
const promise = {
    /**
     * 延迟执行
     * @example await sleep(1000) // wait 1 second
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    /**
     * 带超时的 Promise
     * @example await timeout(fetch(...), 5000)
     */
    timeout(promise, ms) {
        return Promise.race([
            promise,
            new Promise((_, reject) => setTimeout(() => reject(new Error(`Promise timeout after ${ms}ms`)), ms)),
        ]);
    },
    /**
     * 重试机制
     * @example await retry(() => fetchData(), 3, 1000)
     */
    async retry(fn, times = 3, delay = 1000) {
        let lastError;
        for (let i = 0; i < times; i++) {
            try {
                return await fn();
            }
            catch (error) {
                lastError = error;
                if (i < times - 1) {
                    await this.sleep(delay);
                }
            }
        }
        throw lastError || new Error('Retry failed');
    },
    /**
     * 串行执行
     * @example await series([() => Promise.resolve(1), () => Promise.resolve(2)])
     */
    async series(tasks) {
        const results = [];
        for (const task of tasks) {
            results.push(await Promise.resolve(task()));
        }
        return results;
    },
    /**
     * 并行执行
     * @example await parallel([promise1, promise2])
     */
    async parallel(promises) {
        return Promise.all(promises);
    },
    /**
     * 并发控制
     * @example await concurrency([promise1, promise2, promise3], 2)
     * 结果顺序与输入顺序一致（类似 Promise.all），并发度受 limit 限制
     */
    async concurrency(promises, limit) {
        const result = new Array(promises.length);
        const executing = [];
        for (let i = 0; i < promises.length; i++) {
            const p = Promise.resolve(promises[i]).then(value => {
                result[i] = value;
                executing.splice(executing.indexOf(p), 1);
            });
            executing.push(p);
            if (executing.length >= limit) {
                await Promise.race(executing);
            }
        }
        await Promise.all(executing);
        return result;
    },
    /**
     * 轮询直到满足条件
     * @example await poll(() => checkStatus(), 10, 1000)
     */
    async poll(fn, times = 10, interval = 1000) {
        let lastError;
        for (let i = 0; i < times; i++) {
            try {
                return await fn();
            }
            catch (error) {
                lastError = error;
                if (i < times - 1) {
                    await this.sleep(interval);
                }
            }
        }
        throw lastError || new Error('Poll failed');
    },
    /**
     * 可取消的 Promise
     */
    cancellable(promise) {
        let cancel = null;
        const wrappedPromise = new Promise((resolve, reject) => {
            cancel = () => reject(new Error('Promise cancelled'));
            promise.then(resolve).catch(reject);
        });
        return {
            promise: wrappedPromise,
            cancel: () => cancel?.(),
        };
    },
    /**
     * Callback 转 Promise
     */
    promisify(fn) {
        return new Promise((resolve, reject) => {
            fn((err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    },
    /**
     * 等待任意 Promise 完成
     * @example await race([promise1, promise2])
     */
    async race(promises) {
        return Promise.race(promises);
    },
    /**
     * 处理 Promise 结果（不抛出错误）
     * @example const [err, data] = await handle(promise)
     */
    async handle(promise) {
        return promise
            .then((data) => [null, data])
            .catch((err) => [err, undefined]);
    },
};

/**
 * 防抖和节流工具函数
 */
const debounceThrottle = {
    /**
     * 防抖：等待延迟时间后，如果没有再次调用，则执行函数
     * @example const debouncedFn = debounce(handleInput, 300)
     */
    debounce(fn, delay, options = {}) {
        let timeoutId = null;
        let lastInvokeTime = 0;
        let result;
        const { leading = false, trailing = true, maxWait } = options;
        const invokeFunc = (time) => {
            result = fn();
            lastInvokeTime = time;
            timeoutId = null;
        };
        const shouldInvoke = (time) => {
            if (timeoutId === null) {
                return (time - lastInvokeTime) >= delay;
            }
            return false;
        };
        const timerExpired = () => {
            const time = Date.now();
            if (shouldInvoke(time)) {
                if (trailing) {
                    timeoutId = setTimeout(() => invokeFunc(Date.now()), delay);
                }
                else {
                    timeoutId = null;
                }
            }
        };
        const debounced = function (...args) {
            const time = Date.now();
            const isInvoking = shouldInvoke(time);
            if (timeoutId)
                clearTimeout(timeoutId);
            if (isInvoking) {
                if (leading && timeoutId === null) {
                    result = fn.apply(this, args);
                    lastInvokeTime = time;
                }
                else {
                    timeoutId = setTimeout(timerExpired, delay);
                }
            }
            return result;
        };
        debounced.cancel = () => {
            if (timeoutId)
                clearTimeout(timeoutId);
            timeoutId = null;
            lastInvokeTime = 0;
        };
        debounced.flush = () => {
            return timeoutId === null ? result : invokeFunc(Date.now());
        };
        return debounced;
    },
    /**
     * 节流：在延迟时间内，最多执行一次函数
     * @example const throttledFn = throttle(handleScroll, 300)
     */
    throttle(fn, limit, options = {}) {
        let lastRan = 0;
        let timeoutId = null;
        const { leading = true, trailing = true } = options;
        return function (...args) {
            const now = Date.now();
            if (leading && !lastRan) {
                fn.apply(this, args);
                lastRan = now;
            }
            else if (trailing) {
                if (timeoutId)
                    clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    if (now - lastRan >= limit) {
                        fn.apply(this, args);
                        lastRan = now;
                    }
                }, limit - (now - lastRan));
            }
        };
    },
    /**
     * 立即执行，然后防抖后续调用
     * @example const leadingDebounce = immediate(handleClick, 300)
     */
    immediate(fn, delay) {
        let timeoutId = null;
        let hasBeenCalled = false;
        return function (...args) {
            if (!hasBeenCalled) {
                fn.apply(this, args);
                hasBeenCalled = true;
            }
            if (timeoutId)
                clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                hasBeenCalled = false;
            }, delay);
        };
    },
    /**
     * 节流，但保证最后一次调用必须执行
     * @example const throttleWithTrailing = throttleWithTrailing(handleEvent, 1000)
     */
    throttleWithTrailing(fn, limit) {
        let inThrottle = false;
        let lastArgs = null;
        return function (...args) {
            lastArgs = args;
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => {
                    inThrottle = false;
                    if (lastArgs) {
                        fn.apply(this, lastArgs);
                        lastArgs = null;
                    }
                }, limit);
            }
        };
    },
    /**
     * 防止快速重复调用（冷却时间）
     * @example const cooldown = withCooldown(handleClick, 2000)
     */
    withCooldown(fn, cooldownTime) {
        let lastCallTime = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCallTime >= cooldownTime) {
                lastCallTime = now;
                fn.apply(this, args);
                return true;
            }
            return false;
        };
    },
};

/**
 * 本地存储工具函数（支持 localStorage 和 sessionStorage）
 */
/**
 * 内存存储抽象，用于非浏览器环境
 */
class MemoryStorage {
    constructor() {
        this.data = {};
    }
    get length() {
        return Object.keys(this.data).length;
    }
    clear() {
        this.data = {};
    }
    getItem(key) {
        return this.data[key] || null;
    }
    key(index) {
        return Object.keys(this.data)[index] || null;
    }
    removeItem(key) {
        delete this.data[key];
    }
    setItem(key, value) {
        this.data[key] = value;
    }
}
class Storage {
    constructor(isSession = false, prefix = 'app_') {
        this.prefix = prefix;
        if (typeof window !== 'undefined') {
            this.storage = isSession ? sessionStorage : localStorage;
        }
        else {
            // Node.js 环境使用内存存储
            this.storage = new MemoryStorage();
        }
    }
    getKey(key) {
        return `${this.prefix}${key}`;
    }
    /**
     * 设置值
     * @example storage.set('user', { name: 'John' }, { expires: 3600000 })
     */
    set(key, value, options = {}) {
        try {
            const data = {
                value,
                timestamp: Date.now(),
                expires: options.expires,
                version: options.version,
            };
            this.storage.setItem(this.getKey(key), JSON.stringify(data));
        }
        catch (error) {
            console.error(`Failed to set storage key "${key}":`, error);
        }
    }
    /**
     * 获取值
     * @example const user = storage.get<User>('user')
     */
    get(key, defaultValue) {
        try {
            const fullKey = this.getKey(key);
            const item = this.storage.getItem(fullKey);
            if (!item) {
                return defaultValue ?? null;
            }
            const data = JSON.parse(item);
            // 检查过期时间
            if (data.expires && Date.now() - data.timestamp > data.expires) {
                this.remove(key);
                return defaultValue ?? null;
            }
            return data.value;
        }
        catch (error) {
            console.error(`Failed to get storage key "${key}":`, error);
            return defaultValue ?? null;
        }
    }
    /**
     * 判断是否存在某个键
     * @example if (storage.has('user')) { ... }
     */
    has(key) {
        return this.storage.getItem(this.getKey(key)) !== null;
    }
    /**
     * 删除某个值
     * @example storage.remove('user')
     */
    remove(key) {
        try {
            this.storage.removeItem(this.getKey(key));
        }
        catch (error) {
            console.error(`Failed to remove storage key "${key}":`, error);
        }
    }
    /**
     * 清空所有值
     * @example storage.clear()
     */
    clear() {
        try {
            const keysToRemove = [];
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                if (key && key.startsWith(this.prefix)) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => this.storage.removeItem(key));
        }
        catch (error) {
            console.error('Failed to clear storage:', error);
        }
    }
    /**
     * 获取所有键
     * @example const keys = storage.keys()
     */
    keys() {
        const keys = [];
        try {
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                if (key && key.startsWith(this.prefix)) {
                    keys.push(key.replace(this.prefix, ''));
                }
            }
        }
        catch (error) {
            console.error('Failed to get storage keys:', error);
        }
        return keys;
    }
    /**
     * 增加数值
     * @example storage.increment('counter', 1)
     */
    increment(key, step = 1) {
        const current = this.get(key, 0) ?? 0;
        const newValue = current + step;
        this.set(key, newValue);
        return newValue;
    }
    /**
     * 减少数值
     * @example storage.decrement('counter', 1)
     */
    decrement(key, step = 1) {
        return this.increment(key, -step);
    }
    /**
     * 追加数组元素
     * @example storage.push('items', 'newItem')
     */
    push(key, value) {
        const arr = this.get(key, []) ?? [];
        arr.push(value);
        this.set(key, arr);
        return arr;
    }
    /**
     * 移除数组元素
     * @example storage.pop('items')
     */
    pop(key) {
        const arr = this.get(key, []) ?? [];
        const value = arr.pop();
        this.set(key, arr);
        return value;
    }
    /**
     * 获取存储大小（字节）
     * @example const size = storage.getSize('user')
     */
    getSize(key) {
        try {
            const item = this.storage.getItem(this.getKey(key));
            if (!item)
                return 0;
            if (typeof Blob !== 'undefined') {
                return new Blob([item]).size;
            }
            // Node.js fallback
            return typeof Buffer !== 'undefined' ? Buffer.byteLength(item) : item.length;
        }
        catch (error) {
            return 0;
        }
    }
    /**
     * 获取总容量使用情况
     * @example const usage = storage.getTotalSize()
     */
    getTotalSize() {
        let total = 0;
        try {
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                if (key) {
                    const item = this.storage.getItem(key);
                    if (item) {
                        if (typeof Blob !== 'undefined') {
                            total += new Blob([item]).size;
                        }
                        else {
                            total += typeof Buffer !== 'undefined' ? Buffer.byteLength(item) : item.length;
                        }
                    }
                }
            }
        }
        catch (error) {
            console.error('Failed to get total storage size:', error);
        }
        return total;
    }
    /**
     * 清理过期的数据
     * @example storage.cleanup()
     */
    cleanup() {
        let removedCount = 0;
        try {
            const keys = this.keys();
            keys.forEach(key => {
                const fullKey = this.getKey(key);
                const item = this.storage.getItem(fullKey);
                if (item) {
                    try {
                        const data = JSON.parse(item);
                        if (data.expires && Date.now() - data.timestamp > data.expires) {
                            this.remove(key);
                            removedCount++;
                        }
                    }
                    catch (error) {
                        // 无效数据，删除
                        this.storage.removeItem(fullKey);
                        removedCount++;
                    }
                }
            });
        }
        catch (error) {
            console.error('Failed to cleanup storage:', error);
        }
        return removedCount;
    }
}
// 延迟初始化实例，避免 Node.js 环境错误
let localStorage_ = null;
let sessionStorage_ = null;
const getLocalStorage = () => {
    if (!localStorage_) {
        localStorage_ = new Storage(false, 'app_');
    }
    return localStorage_;
};
const getSessionStorage = () => {
    if (!sessionStorage_) {
        sessionStorage_ = new Storage(true, 'session_');
    }
    return sessionStorage_;
};

/**
 * 日志记录工具
 */
class Logger {
    constructor(options = {}) {
        this.level = 'info';
        this.prefix = '[LOG]';
        this.timestamp = true;
        this.colors = true;
        this.maxLogs = 1000;
        this.logs = [];
        this.levelMap = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3,
        };
        this.colorMap = {
            default: '\x1b[0m',
            success: '\x1b[32m',
            warning: '\x1b[33m',
            error: '\x1b[31m',
            info: '\x1b[36m',
        };
        /**
         * 性能计时
         * @example logger.time('apiCall'); ... logger.timeEnd('apiCall')
         */
        this.timers = {};
        this.level = options.level || 'info';
        this.prefix = options.prefix || '[LOG]';
        this.timestamp = options.timestamp !== false;
        this.colors = options.colors !== false;
        this.maxLogs = options.maxLogs || 1000;
        this.callback = options.callback;
    }
    getTimestamp() {
        const now = new Date();
        return now.toISOString();
    }
    formatMessage(level, message) {
        const timeStr = this.timestamp ? `[${this.getTimestamp()}]` : '';
        const prefixStr = this.prefix ? `${this.prefix}` : '';
        return `${timeStr} ${prefixStr} [${level.toUpperCase()}] ${message}`;
    }
    colorize(text, color) {
        if (!this.colors || typeof window !== 'undefined')
            return text;
        return `${this.colorMap[color]}${text}${this.colorMap.default}`;
    }
    addLog(entry) {
        this.logs.push(entry);
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
        this.callback?.(entry);
    }
    shouldLog(level) {
        return this.levelMap[level] >= this.levelMap[this.level];
    }
    /**
     * 调试日志
     * @example logger.debug('Debug message', { data: 123 })
     */
    debug(message, data) {
        if (!this.shouldLog('debug'))
            return;
        const entry = {
            timestamp: Date.now(),
            level: 'debug',
            message,
            data,
        };
        this.addLog(entry);
        console.log(this.colorize(this.formatMessage('debug', message), 'default'), data || '');
    }
    /**
     * 信息日志
     * @example logger.info('User logged in', { userId: 123 })
     */
    info(message, data) {
        if (!this.shouldLog('info'))
            return;
        const entry = {
            timestamp: Date.now(),
            level: 'info',
            message,
            data,
        };
        this.addLog(entry);
        console.log(this.colorize(this.formatMessage('info', message), 'info'), data || '');
    }
    /**
     * 警告日志
     * @example logger.warn('Invalid input', { input: 'xxx' })
     */
    warn(message, data) {
        if (!this.shouldLog('warn'))
            return;
        const entry = {
            timestamp: Date.now(),
            level: 'warn',
            message,
            data,
        };
        this.addLog(entry);
        console.warn(this.colorize(this.formatMessage('warn', message), 'warning'), data || '');
    }
    /**
     * 错误日志
     * @example logger.error('Request failed', error)
     */
    error(message, error) {
        if (!this.shouldLog('error'))
            return;
        const entry = {
            timestamp: Date.now(),
            level: 'error',
            message,
            data: error,
            stack: error?.stack,
        };
        this.addLog(entry);
        console.error(this.colorize(this.formatMessage('error', message), 'error'), error || '');
    }
    /**
     * 设置日志级别
     * @example logger.setLevel('debug')
     */
    setLevel(level) {
        this.level = level;
    }
    /**
     * 获取所有日志
     * @example const logs = logger.getLogs()
     */
    getLogs(level) {
        return level ? this.logs.filter(log => log.level === level) : [...this.logs];
    }
    /**
     * 清空日志
     * @example logger.clear()
     */
    clear() {
        this.logs = [];
    }
    /**
     * 导出日志为 JSON
     * @example const json = logger.exportJson()
     */
    exportJson() {
        return JSON.stringify(this.logs, null, 2);
    }
    /**
     * 导出日志为 CSV
     * @example const csv = logger.exportCsv()
     */
    exportCsv() {
        if (this.logs.length === 0)
            return '';
        const headers = ['timestamp', 'level', 'message', 'data', 'stack'];
        const rows = this.logs.map(log => [
            new Date(log.timestamp).toISOString(),
            log.level,
            log.message,
            JSON.stringify(log.data || ''),
            log.stack || '',
        ]);
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
        ].join('\n');
        return csvContent;
    }
    /**
     * 获取日志统计信息
     * @example const stats = logger.getStats()
     */
    getStats() {
        return {
            debug: this.logs.filter(log => log.level === 'debug').length,
            info: this.logs.filter(log => log.level === 'info').length,
            warn: this.logs.filter(log => log.level === 'warn').length,
            error: this.logs.filter(log => log.level === 'error').length,
        };
    }
    time(label) {
        this.timers[label] = Date.now();
    }
    timeEnd(label) {
        const startTime = this.timers[label];
        if (!startTime) {
            this.warn(`Timer "${label}" not found`);
            return 0;
        }
        const duration = Date.now() - startTime;
        this.info(`${label}: ${duration}ms`);
        delete this.timers[label];
        return duration;
    }
    /**
     * 标记位置
     * @example logger.mark('checkpoint1')
     */
    mark(label) {
        this.info(`✓ ${label}`);
    }
    /**
     * 表格输出
     * @example logger.table([{name: 'John', age: 30}])
     */
    table(data) {
        console.table(data);
        this.info(`Table output: ${data.length} items`);
    }
}
const logger = new Logger();

/**
 * 事件总线/发布订阅工具
 */
class EventBus {
    constructor() {
        this.events = new Map();
        this.onceEvents = new Map();
    }
    /**
     * 订阅事件
     * @example bus.on('user:login', (user) => console.log(user))
     */
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(callback);
        // 返回取消订阅函数
        return () => this.off(event, callback);
    }
    /**
     * 订阅一次事件
     * @example bus.once('user:logout', (user) => console.log(user))
     */
    once(event, callback) {
        const wrapper = (...args) => {
            callback(...args);
            this.off(event, wrapper);
        };
        if (!this.onceEvents.has(event)) {
            this.onceEvents.set(event, new Set());
        }
        this.onceEvents.get(event).add(wrapper);
        return this.on(event, wrapper);
    }
    /**
     * 取消订阅
     * @example bus.off('user:login', callback)
     */
    off(event, callback) {
        if (!callback) {
            this.events.delete(event);
            this.onceEvents.delete(event);
            return;
        }
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.delete(callback);
        }
        const onceCallbacks = this.onceEvents.get(event);
        if (onceCallbacks) {
            onceCallbacks.delete(callback);
        }
    }
    /**
     * 发布事件
     * @example bus.emit('user:login', user)
     */
    emit(event, ...args) {
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(...args);
                }
                catch (error) {
                    console.error(`Error in event "${event}":`, error);
                }
            });
        }
    }
    /**
     * 获取事件的订阅者数量
     * @example const count = bus.listenerCount('user:login')
     */
    listenerCount(event) {
        const callbacks = this.events.get(event);
        return callbacks ? callbacks.size : 0;
    }
    /**
     * 获取所有事件名称
     * @example const events = bus.eventNames()
     */
    eventNames() {
        return Array.from(this.events.keys());
    }
    /**
     * 获取特定事件的所有监听器
     * @example const listeners = bus.listeners('user:login')
     */
    listeners(event) {
        const callbacks = this.events.get(event);
        return callbacks ? Array.from(callbacks) : [];
    }
    /**
     * 清除所有事件
     * @example bus.clear()
     */
    clear() {
        this.events.clear();
        this.onceEvents.clear();
    }
    /**
     * 清除特定事件
     * @example bus.clearEvent('user:login')
     */
    clearEvent(event) {
        this.events.delete(event);
        this.onceEvents.delete(event);
    }
    /**
     * 等待事件，返回 Promise
     * @example const user = await bus.waitFor('user:login')
     */
    waitFor(event, timeout) {
        return new Promise((resolve, reject) => {
            const timer = timeout ? setTimeout(() => {
                unsubscribe();
                reject(new Error(`Event "${event}" timeout`));
            }, timeout) : null;
            const unsubscribe = this.once(event, (...args) => {
                if (timer)
                    clearTimeout(timer);
                resolve(args.length === 1 ? args[0] : args);
            });
        });
    }
    /**
     * 异步发布事件，等待所有处理完成
     * @example await bus.asyncEmit('user:login', user)
     */
    async asyncEmit(event, ...args) {
        const callbacks = this.events.get(event);
        if (!callbacks)
            return;
        for (const callback of Array.from(callbacks)) {
            try {
                await callback(...args);
            }
            catch (error) {
                console.error(`Error in event "${event}":`, error);
            }
        }
    }
    /**
     * 先发先执行（如果已有监听器则立即执行，否则等待）
     * @example bus.emitOrWait('system:ready')
     */
    emitOrWait(event, ...args) {
        if (this.listenerCount(event) > 0) {
            this.emit(event, ...args);
            return Promise.resolve();
        }
        return this.waitFor(event);
    }
}
const eventBus = new EventBus();

/**
 * 缓存管理工具
 */
class Cache {
    constructor(options = {}) {
        this.cache = new Map();
        this.accessOrder = []; // LRU 追踪
        this.ttl = options.ttl ?? null;
        this.maxSize = options.maxSize ?? null;
        this.onEvict = options.onEvict;
    }
    /**
     * 设置缓存
     * @example cache.set('user:1', userData)
     */
    set(key, value, ttl) {
        // 检查是否需要驱逐
        if (this.maxSize && this.cache.size >= this.maxSize && !this.cache.has(key)) {
            this.evictLRU();
        }
        this.cache.set(key, {
            value,
            timestamp: Date.now(),
            ttl: ttl !== undefined ? ttl : this.ttl,
        });
        // 更新访问顺序
        this.updateAccessOrder(key);
    }
    /**
     * 获取缓存
     * @example const data = cache.get('user:1')
     */
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            return null;
        }
        // 检查 TTL
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
            this.delete(key);
            return null;
        }
        // 更新访问顺序
        this.updateAccessOrder(key);
        return entry.value;
    }
    /**
     * 判断缓存是否存在
     * @example if (cache.has('user:1')) { ... }
     */
    has(key) {
        return this.get(key) !== null;
    }
    /**
     * 删除缓存
     * @example cache.delete('user:1')
     */
    delete(key) {
        const entry = this.cache.get(key);
        if (entry) {
            this.onEvict?.(key, entry.value);
            this.cache.delete(key);
            this.accessOrder = this.accessOrder.filter(k => k !== key);
            return true;
        }
        return false;
    }
    /**
     * 清空所有缓存
     * @example cache.clear()
     */
    clear() {
        this.cache.forEach((entry, key) => {
            this.onEvict?.(key, entry.value);
        });
        this.cache.clear();
        this.accessOrder = [];
    }
    /**
     * 获取缓存的大小
     * @example const size = cache.size()
     */
    size() {
        return this.cache.size;
    }
    /**
     * 获取所有的键
     * @example const keys = cache.keys()
     */
    keys() {
        return Array.from(this.cache.keys());
    }
    /**
     * 获取所有的值
     * @example const values = cache.values()
     */
    values() {
        return Array.from(this.cache.values()).map(entry => entry.value);
    }
    /**
     * 获取所有的键值对
     * @example const entries = cache.entries()
     */
    entries() {
        return Array.from(this.cache.entries()).map(([key, entry]) => [key, entry.value]);
    }
    /**
     * 更新或设置，带有工厂函数
     * @example cache.getOrSet('user:1', () => fetchUser(1))
     */
    getOrSet(key, factory) {
        const cached = this.get(key);
        if (cached !== null) {
            return cached;
        }
        const result = factory();
        if (result instanceof Promise) {
            return result.then(value => {
                this.set(key, value);
                return value;
            });
        }
        else {
            this.set(key, result);
            return result;
        }
    }
    /**
     * 删除匹配的键
     * @example cache.deleteMatching(/^user:/)
     */
    deleteMatching(pattern) {
        const keysToDelete = [];
        this.cache.forEach((_, key) => {
            if (pattern instanceof RegExp) {
                if (pattern.test(key)) {
                    keysToDelete.push(key);
                }
            }
            else if (pattern(key)) {
                keysToDelete.push(key);
            }
        });
        keysToDelete.forEach(key => this.delete(key));
        return keysToDelete.length;
    }
    /**
     * 清理过期缓存
     * @example cache.cleanup()
     */
    cleanup() {
        let count = 0;
        const keysToDelete = [];
        this.cache.forEach((entry, key) => {
            if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
                keysToDelete.push(key);
            }
        });
        keysToDelete.forEach(key => {
            if (this.delete(key)) {
                count++;
            }
        });
        return count;
    }
    /**
     * 获取缓存统计信息
     * @example const stats = cache.getStats()
     */
    getStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            defaultTtl: this.ttl,
            hits: 0, // 需要实现计数
            misses: 0,
        };
    }
    /**
     * LRU 驱逐（驱逐最少使用的）
     */
    evictLRU() {
        if (this.accessOrder.length > 0) {
            const keyToEvict = this.accessOrder[0];
            this.delete(keyToEvict);
        }
    }
    /**
     * 更新访问顺序
     */
    updateAccessOrder(key) {
        // 移除如果已存在
        const index = this.accessOrder.indexOf(key);
        if (index > -1) {
            this.accessOrder.splice(index, 1);
        }
        // 添加到末尾
        this.accessOrder.push(key);
    }
    /**
     * 返回迭代器
     */
    [Symbol.iterator]() {
        return this.entries()[Symbol.iterator]();
    }
}

/**
 * 加密和哈希工具 - 使用 crypto-js 实现
 */
/**
 * MD5 哈希
 * @example md5('hello') // '5d41402abc4b2a76b9719d911017c592'
 */
function md5(str) {
    return CryptoJS.MD5(str).toString();
}
/**
 * SHA1 哈希
 * @example sha1('hello') // 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d'
 */
function sha1(str) {
    return CryptoJS.SHA1(str).toString();
}
/**
 * SHA256 哈希
 * @example sha256('hello') // '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
 */
function sha256(str) {
    return CryptoJS.SHA256(str).toString();
}
/**
 * SHA512 哈希
 * @example sha512('hello')
 */
function sha512(str) {
    return CryptoJS.SHA512(str).toString();
}
/**
 * SHA3 哈希
 * @example sha3('hello')
 */
function sha3(str) {
    return CryptoJS.SHA3(str).toString();
}
/**
 * HMAC-MD5
 * @example hmacMD5('message', 'secret')
 */
function hmacMD5(message, secret) {
    return CryptoJS.HmacMD5(message, secret).toString();
}
/**
 * HMAC-SHA1
 * @example hmacSHA1('message', 'secret')
 */
function hmacSHA1(message, secret) {
    return CryptoJS.HmacSHA1(message, secret).toString();
}
/**
 * HMAC-SHA256
 * @example hmacSHA256('message', 'secret')
 */
function hmacSHA256(message, secret) {
    return CryptoJS.HmacSHA256(message, secret).toString();
}
/**
 * HMAC-SHA512
 * @example hmacSHA512('message', 'secret')
 */
function hmacSHA512(message, secret) {
    return CryptoJS.HmacSHA512(message, secret).toString();
}
/**
 * Base64 编码
 * @example base64Encode('hello') // 'aGVsbG8='
 */
function base64Encode(str) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
}
/**
 * Base64 解码
 * @example base64Decode('aGVsbG8=') // 'hello'
 */
function base64Decode(str) {
    return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8);
}
/**
 * AES 加密
 * @example aesEncrypt('hello', 'secret-key')
 */
function aesEncrypt(message, key) {
    return CryptoJS.AES.encrypt(message, key).toString();
}
/**
 * AES 解密
 * @example aesDecrypt(encrypted, 'secret-key')
 */
function aesDecrypt(ciphertext, key) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
/**
 * DES 加密
 * @example desEncrypt('hello', 'secret-key')
 */
function desEncrypt(message, key) {
    return CryptoJS.DES.encrypt(message, key).toString();
}
/**
 * DES 解密
 * @example desDecrypt(encrypted, 'secret-key')
 */
function desDecrypt(ciphertext, key) {
    const bytes = CryptoJS.DES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
/**
 * Triple DES 加密
 * @example tripleDesEncrypt('hello', 'secret-key')
 */
function tripleDesEncrypt(message, key) {
    return CryptoJS.TripleDES.encrypt(message, key).toString();
}
/**
 * Triple DES 解密
 * @example tripleDesDecrypt(encrypted, 'secret-key')
 */
function tripleDesDecrypt(ciphertext, key) {
    const bytes = CryptoJS.TripleDES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
/**
 * RC4 加密
 * @example rc4Encrypt('hello', 'secret-key')
 */
function rc4Encrypt(message, key) {
    return CryptoJS.RC4.encrypt(message, key).toString();
}
/**
 * RC4 解密
 * @example rc4Decrypt(encrypted, 'secret-key')
 */
function rc4Decrypt(ciphertext, key) {
    const bytes = CryptoJS.RC4.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
/**
 * Rabbit 加密
 * @example rabbitEncrypt('hello', 'secret-key')
 */
function rabbitEncrypt(message, key) {
    return CryptoJS.Rabbit.encrypt(message, key).toString();
}
/**
 * Rabbit 解密
 * @example rabbitDecrypt(encrypted, 'secret-key')
 */
function rabbitDecrypt(ciphertext, key) {
    const bytes = CryptoJS.Rabbit.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
/**
 * PBKDF2 密钥派生
 * @example pbkdf2('password', 'salt', 1000, 256)
 */
function pbkdf2(password, salt, iterations = 1000, keySize = 256) {
    return CryptoJS.PBKDF2(password, salt, {
        keySize: keySize / 32,
        iterations,
    }).toString();
}
/**
 * 生成随机字节
 * @example randomBytes(16) // 生成16字节随机数
 */
function randomBytes(size) {
    return CryptoJS.lib.WordArray.random(size).toString();
}
/**
 * 计算文件 MD5（从 ArrayBuffer）
 * @example md5FromArrayBuffer(buffer)
 */
function md5FromArrayBuffer(buffer) {
    const wordArray = CryptoJS.lib.WordArray.create(buffer);
    return CryptoJS.MD5(wordArray).toString();
}
/**
 * 计算文件 SHA256（从 ArrayBuffer）
 * @example sha256FromArrayBuffer(buffer)
 */
function sha256FromArrayBuffer(buffer) {
    const wordArray = CryptoJS.lib.WordArray.create(buffer);
    return CryptoJS.SHA256(wordArray).toString();
}
/**
 * 计算文件 SHA512（从 ArrayBuffer）
 * @example sha512FromArrayBuffer(buffer)
 */
function sha512FromArrayBuffer(buffer) {
    const wordArray = CryptoJS.lib.WordArray.create(buffer);
    return CryptoJS.SHA512(wordArray).toString();
}
/**
 * URL 安全的 Base64 编码
 * @example base64UrlEncode('hello+world=')
 */
function base64UrlEncode(str) {
    return base64Encode(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
/**
 * URL 安全的 Base64 解码
 * @example base64UrlDecode('aGVsbG8td29ybGQ')
 */
function base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }
    return base64Decode(str);
}
/**
 * 计算字符串的哈希值（多种算法）
 * @example hash('hello', 'md5')
 */
function hash(str, algorithm = 'sha256') {
    switch (algorithm) {
        case 'md5':
            return md5(str);
        case 'sha1':
            return sha1(str);
        case 'sha256':
            return sha256(str);
        case 'sha512':
            return sha512(str);
        case 'sha3':
            return sha3(str);
        default:
            return sha256(str);
    }
}
/**
 * 加密对象（转 JSON 后加密）
 * @example encryptObject({ user: 'john' }, 'secret')
 */
function encryptObject(obj, key) {
    return aesEncrypt(JSON.stringify(obj), key);
}
/**
 * 解密对象
 * @example decryptObject(encrypted, 'secret')
 */
function decryptObject(ciphertext, key) {
    const decrypted = aesDecrypt(ciphertext, key);
    return JSON.parse(decrypted);
}
/**
 * 简单的字符串混淆（不安全）
 * @example obfuscate('hello')
 */
function obfuscate(str) {
    return base64Encode(str).split('').reverse().join('');
}
/**
 * 反混淆
 * @example deobfuscate(obfuscated)
 */
function deobfuscate(str) {
    return base64Decode(str.split('').reverse().join(''));
}
const crypto$1 = {
    // 哈希算法
    md5,
    sha1,
    sha256,
    sha512,
    sha3,
    hash,
    // HMAC
    hmacMD5,
    hmacSHA1,
    hmacSHA256,
    hmacSHA512,
    // Base64
    base64Encode,
    base64Decode,
    base64UrlEncode,
    base64UrlDecode,
    // 对称加密
    aesEncrypt,
    aesDecrypt,
    desEncrypt,
    desDecrypt,
    tripleDesEncrypt,
    tripleDesDecrypt,
    rc4Encrypt,
    rc4Decrypt,
    rabbitEncrypt,
    rabbitDecrypt,
    // 对象加密
    encryptObject,
    decryptObject,
    // 工具
    pbkdf2,
    randomBytes,
    md5FromArrayBuffer,
    sha256FromArrayBuffer,
    sha512FromArrayBuffer,
    obfuscate,
    deobfuscate,
};

/**
 * 网络请求相关工具
 */
/**
 * 延迟执行（用于重试等待）
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * 计算退避延迟时间
 * @example getBackoffDelay(2, 1000) => 4000
 */
function getBackoffDelay(attempt, baseDelay) {
    return baseDelay * Math.pow(2, attempt - 1);
}
/**
 * 带重试的 fetch
 * @example await fetchWithRetry('https://api.example.com/data')
 */
async function fetchWithRetry(url, options = {}) {
    const { maxRetries = 3, delay: delayTime = 1000, backoff = true, onRetry, timeout = 30000, ...fetchOptions } = options;
    let lastError = null;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            const response = await fetch(url, {
                ...fetchOptions,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            // 重试 5xx 错误或 429（Too Many Requests）
            if (response.ok || (response.status !== 500 && response.status !== 429 && response.status < 500)) {
                return response;
            }
            if (attempt < maxRetries) {
                lastError = new Error(`HTTP ${response.status}`);
                const waitTime = backoff ? getBackoffDelay(attempt + 1, delayTime) : delayTime;
                onRetry?.(attempt + 1, lastError);
                await delay(waitTime);
            }
            else {
                return response;
            }
        }
        catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            if (attempt < maxRetries) {
                const waitTime = backoff ? getBackoffDelay(attempt + 1, delayTime) : delayTime;
                onRetry?.(attempt + 1, lastError);
                await delay(waitTime);
            }
            else {
                throw lastError;
            }
        }
    }
    throw lastError || new Error('Unknown error');
}
/**
 * 带超时的 fetch
 * @example await fetchWithTimeout('https://api.example.com/data', { timeout: 5000 })
 */
async function fetchWithTimeout(url, options = {}) {
    const { timeout = 30000, ...fetchOptions } = options;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...fetchOptions,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
    }
    catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}
/**
 * 查询参数序列化
 * @example serializeQuery({ a: 1, b: 'hello' }) => 'a=1&b=hello'
 */
function serializeQuery(params) {
    return Object.entries(params)
        .filter(([_, value]) => value !== null && value !== undefined)
        .map(([key, value]) => {
        const encodedKey = encodeURIComponent(key);
        if (Array.isArray(value)) {
            return value.map(v => `${encodedKey}=${encodeURIComponent(v)}`).join('&');
        }
        return `${encodedKey}=${encodeURIComponent(value)}`;
    })
        .join('&');
}
/**
 * URL 中添加查询参数
 * @example appendQuery('https://example.com', { page: 1 }) => 'https://example.com?page=1'
 */
function appendQuery(url, params) {
    if (!params || Object.keys(params).length === 0) {
        return url;
    }
    const queryString = serializeQuery(params);
    const separator = url.includes('?') ? '&' : '?';
    return url + separator + queryString;
}
/**
 * 请求拦截器类
 */
class RequestInterceptors {
    constructor() {
        this.requestInterceptors = [];
        this.responseInterceptors = [];
        this.errorInterceptors = [];
    }
    /**
     * 添加请求拦截器
     */
    addRequestInterceptor(interceptor) {
        this.requestInterceptors.push(interceptor);
        return () => {
            this.requestInterceptors = this.requestInterceptors.filter(i => i !== interceptor);
        };
    }
    /**
     * 添加响应拦截器
     */
    addResponseInterceptor(interceptor) {
        this.responseInterceptors.push(interceptor);
        return () => {
            this.responseInterceptors = this.responseInterceptors.filter(i => i !== interceptor);
        };
    }
    /**
     * 添加错误拦截器
     */
    addErrorInterceptor(interceptor) {
        this.errorInterceptors.push(interceptor);
        return () => {
            this.errorInterceptors = this.errorInterceptors.filter(i => i !== interceptor);
        };
    }
    /**
     * 执行请求拦截器
     */
    async executeRequestInterceptors(config) {
        let result = config;
        for (const interceptor of this.requestInterceptors) {
            result = await interceptor(result);
        }
        return result;
    }
    /**
     * 执行响应拦截器
     */
    async executeResponseInterceptors(response) {
        let result = response;
        for (const interceptor of this.responseInterceptors) {
            result = await interceptor(result);
        }
        return result;
    }
    /**
     * 执行错误拦截器
     */
    async executeErrorInterceptors(error) {
        let result = error;
        for (const interceptor of this.errorInterceptors) {
            result = await interceptor(result);
        }
        return result;
    }
    /**
     * 清空所有拦截器
     */
    clear() {
        this.requestInterceptors = [];
        this.responseInterceptors = [];
        this.errorInterceptors = [];
    }
}
/**
 * 简单的 HTTP 客户端
 */
class HttpClient {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
        this.interceptors = new RequestInterceptors();
    }
    /**
     * GET 请求
     */
    async get(url, options = {}) {
        return this.request(url, { ...options, method: 'GET' });
    }
    /**
     * POST 请求
     */
    async post(url, data, options = {}) {
        return this.request(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
    }
    /**
     * PUT 请求
     */
    async put(url, data, options = {}) {
        return this.request(url, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
    }
    /**
     * PATCH 请求
     */
    async patch(url, data, options = {}) {
        return this.request(url, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
    }
    /**
     * DELETE 请求
     */
    async delete(url, options = {}) {
        return this.request(url, { ...options, method: 'DELETE' });
    }
    /**
     * 通用请求方法
     */
    async request(url, options = {}) {
        try {
            const fullUrl = this.baseUrl ? `${this.baseUrl}${url}` : url;
            let config = { ...options };
            // 执行请求拦截器
            config = await this.interceptors.executeRequestInterceptors(config);
            // 发送请求
            const response = await fetchWithRetry(fullUrl, config);
            // 执行响应拦截器
            const interceptedResponse = await this.interceptors.executeResponseInterceptors(response);
            if (!interceptedResponse.ok) {
                throw new Error(`HTTP ${interceptedResponse.status}`);
            }
            const contentType = interceptedResponse.headers.get('content-type');
            if (contentType?.includes('application/json')) {
                return await interceptedResponse.json();
            }
            return (await interceptedResponse.text());
        }
        catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            const interceptedError = await this.interceptors.executeErrorInterceptors(err);
            throw interceptedError;
        }
    }
    /**
     * 获取拦截器管理器
     */
    getInterceptors() {
        return this.interceptors;
    }
    /**
     * 设置基础 URL
     */
    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
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
};

/**
 * 敏感信息脱敏工具
 * 用于在日志、展示等场景中对敏感信息进行处理
 */
/**
 * 脱敏电话号码
 * @example desensitizePhone('13812345678') => '138****5678'
 */
function desensitizePhone(phone) {
    if (!phone)
        return '';
    const str = String(phone).trim();
    if (str.length < 7)
        return str;
    // 保留前三位和后四位
    return str.slice(0, 3) + '****' + str.slice(-4);
}
/**
 * 脱敏邮箱
 * @example desensitizeEmail('user@example.com') => 'u***@example.com'
 */
function desensitizeEmail(email) {
    if (!email)
        return '';
    const str = String(email).trim();
    const atIndex = str.indexOf('@');
    if (atIndex === -1)
        return str;
    // 邮箱名仅保留第一个字符
    const name = str.slice(0, atIndex);
    const domain = str.slice(atIndex);
    if (name.length === 1) {
        return name + '***' + domain;
    }
    return name.charAt(0) + '***' + domain;
}
/**
 * 脱敏身份证号
 * @example desensitizeIdCard('110101199003071234') => '1101011990****1234'
 */
function desensitizeIdCard(id) {
    if (!id)
        return '';
    const str = String(id).trim();
    if (str.length < 8)
        return str;
    // 保留前6位和后4位
    return str.slice(0, 6) + '****' + str.slice(-4);
}
/**
 * 脱敏名字
 * @example desensitizeName('张三') => '张*'
 * @example desensitizeName('John Doe') => 'J*** D**'
 */
function desensitizeName(name) {
    if (!name)
        return '';
    const str = String(name).trim();
    if (str.length === 1)
        return str;
    // 中文名处理
    if (/[\u4e00-\u9fa5]/.test(str)) {
        if (str.length === 2) {
            return str.charAt(0) + '*';
        }
        return str.charAt(0) + '*'.repeat(str.length - 2) + str.charAt(str.length - 1);
    }
    // 英文名处理（保留首字母，其他替换为 *）
    return str
        .split(' ')
        .map(part => {
        if (part.length === 1)
            return part;
        return part.charAt(0) + '*'.repeat(part.length - 1);
    })
        .join(' ');
}
/**
 * 脱敏银行卡号
 * @example desensitizeCardNumber('6222022409001234567') => '622202****1234567'
 */
function desensitizeCardNumber(card) {
    if (!card)
        return '';
    const str = String(card).replace(/\s/g, '');
    if (str.length < 8)
        return str;
    // 保留前6位和后7位
    return str.slice(0, 6) + '****' + str.slice(-7);
}
/**
 * 脱敏密钥/Token
 * @example desensitizeToken('abc123def456ghi789') => 'abc***789'
 */
function desensitizeToken(token) {
    if (!token)
        return '';
    const str = String(token).trim();
    if (str.length <= 8)
        return '***';
    // 保留前3位和后3位
    return str.slice(0, 3) + '***' + str.slice(-3);
}
/**
 * 脱敏 URL 中的敏感参数
 * @example desensitizeUrl('https://example.com?token=abc123&key=secret') => 'https://example.com?token=***&key=***'
 */
function desensitizeUrl(url, sensitiveParams = ['token', 'key', 'password', 'secret']) {
    if (!url)
        return '';
    try {
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        sensitiveParams.forEach(param => {
            if (params.has(param)) {
                params.set(param, '***');
            }
        });
        urlObj.search = params.toString();
        return urlObj.toString();
    }
    catch {
        return url;
    }
}
/**
 * 脱敏 JSON 对象中的敏感字段
 * @example desensitizeObject({ name: '张三', phone: '13812345678' }, ['phone']) => { name: '张三', phone: '138****5678' }
 */
function desensitizeObject(obj, sensitiveFields = ['password', 'token', 'secret', 'apiKey']) {
    if (!obj || typeof obj !== 'object')
        return obj;
    const result = { ...obj };
    sensitiveFields.forEach(field => {
        if (field in result) {
            const value = result[field];
            if (typeof value === 'string') {
                // 根据字段名自动识别脱敏方式
                if (field.toLowerCase().includes('phone')) {
                    result[field] = desensitizePhone(value);
                }
                else if (field.toLowerCase().includes('email')) {
                    result[field] = desensitizeEmail(value);
                }
                else if (field.toLowerCase().includes('id') && field.toLowerCase().includes('card')) {
                    result[field] = desensitizeIdCard(value);
                }
                else if (field.toLowerCase().includes('token')) {
                    result[field] = desensitizeToken(value);
                }
                else {
                    // 默认保留前 20% 和后 20%
                    result[field] = desensitizeCustom(value, 0.2);
                }
            }
        }
    });
    return result;
}
/**
 * 自定义脱敏（保留指定比例的前后字符）
 * @example desensitizeCustom('hello world', 0.2) => 'h***rld'
 */
function desensitizeCustom(text, ratio = 0.2) {
    if (!text)
        return '';
    const str = String(text).trim();
    if (str.length <= 4)
        return '***';
    const keepCount = Math.max(1, Math.ceil(str.length * ratio));
    const hideCount = str.length - keepCount * 2;
    return str.slice(0, keepCount) + '*'.repeat(Math.max(3, hideCount)) + str.slice(-keepCount);
}
/**
 * 脱敏日志信息
 * @example desensitizeLog('User logged in: 13812345678') => 'User logged in: 138****5678'
 */
function desensitizeLog(log, patterns = []) {
    if (!log)
        return '';
    let result = log;
    // 默认模式
    const defaultPatterns = [
        {
            pattern: /\d{11}(?=\s|$|[,.\];])/g, // 11位数字（手机号）
            handler: desensitizePhone,
        },
        {
            pattern: /[\w.-]+@[\w.-]+\.\w+/g, // 邮箱
            handler: desensitizeEmail,
        },
        {
            pattern: /\b[0-9a-f]{32}\b/gi, // MD5 哈希
            handler: desensitizeToken,
        },
    ];
    const allPatterns = [...defaultPatterns, ...patterns];
    allPatterns.forEach(({ pattern, handler }) => {
        result = result.replace(pattern, match => handler(match));
    });
    return result;
}
/**
 * 敏感信息处理工具集
 */
const sensitive = {
    desensitizePhone,
    desensitizeEmail,
    desensitizeIdCard,
    desensitizeName,
    desensitizeCardNumber,
    desensitizeToken,
    desensitizeUrl,
    desensitizeObject,
    desensitizeCustom,
    desensitizeLog,
};

/**
 * 表单验证工具 - 真实项目中的表单处理
 */
/**
 * 表单验证器类
 */
class FormValidator {
    constructor() {
        this.fields = new Map();
        this.errors = new Map();
    }
    /**
     * 注册字段
     * @example validator.register('email', { value: '', rules: [{ required: true }] })
     */
    register(name, field) {
        this.fields.set(name, { ...field, touched: false, dirty: false });
    }
    /**
     * 设置字段值
     * @example validator.setValue('email', 'user@example.com')
     */
    setValue(name, value) {
        const field = this.fields.get(name);
        if (field) {
            field.value = value;
            field.dirty = true;
            this.validateField(name);
        }
    }
    /**
     * 标记字段为已触摸
     * @example validator.touch('email')
     */
    touch(name) {
        const field = this.fields.get(name);
        if (field) {
            field.touched = true;
            this.validateField(name);
        }
    }
    /**
     * 验证单个字段
     */
    validateField(name) {
        const field = this.fields.get(name);
        if (!field || !field.rules)
            return true;
        for (const rule of field.rules) {
            const error = this.checkRule(field.value, rule);
            if (error) {
                this.errors.set(name, error);
                return false;
            }
        }
        this.errors.delete(name);
        return true;
    }
    /**
     * 检查单条规则
     */
    checkRule(value, rule) {
        // 必填验证
        if (rule.required && (value === '' || value === null || value === undefined)) {
            return rule.message || '此字段为必填项';
        }
        // 如果值为空且不是必填，跳过其他验证
        if (!value && !rule.required) {
            return null;
        }
        // 最小值验证
        if (rule.min !== undefined && Number(value) < rule.min) {
            return rule.message || `值不能小于 ${rule.min}`;
        }
        // 最大值验证
        if (rule.max !== undefined && Number(value) > rule.max) {
            return rule.message || `值不能大于 ${rule.max}`;
        }
        // 最小长度验证
        if (rule.minLength !== undefined && String(value).length < rule.minLength) {
            return rule.message || `长度不能少于 ${rule.minLength} 个字符`;
        }
        // 最大长度验证
        if (rule.maxLength !== undefined && String(value).length > rule.maxLength) {
            return rule.message || `长度不能超过 ${rule.maxLength} 个字符`;
        }
        // 正则验证
        if (rule.pattern && !rule.pattern.test(String(value))) {
            return rule.message || '格式不正确';
        }
        // 自定义验证
        if (rule.validator) {
            const result = rule.validator(value);
            if (typeof result === 'string') {
                return result;
            }
            if (!result) {
                return rule.message || '验证失败';
            }
        }
        return null;
    }
    /**
     * 验证所有字段
     * @example const result = validator.validateAll()
     */
    validateAll() {
        this.errors.clear();
        for (const [name] of this.fields) {
            this.validateField(name);
        }
        return {
            valid: this.errors.size === 0,
            errors: Object.fromEntries(this.errors),
        };
    }
    /**
     * 获取字段错误
     * @example validator.getError('email')
     */
    getError(name) {
        return this.errors.get(name);
    }
    /**
     * 获取所有错误
     * @example validator.getAllErrors()
     */
    getAllErrors() {
        return Object.fromEntries(this.errors);
    }
    /**
     * 检查字段是否有效
     * @example validator.isValid('email')
     */
    isValid(name) {
        return !this.errors.has(name);
    }
    /**
     * 检查表单是否有效
     * @example validator.isFormValid()
     */
    isFormValid() {
        return this.errors.size === 0;
    }
    /**
     * 重置字段
     * @example validator.reset('email')
     */
    reset(name) {
        if (name) {
            const field = this.fields.get(name);
            if (field) {
                field.touched = false;
                field.dirty = false;
                this.errors.delete(name);
            }
        }
        else {
            for (const [fieldName, field] of this.fields) {
                field.touched = false;
                field.dirty = false;
                this.errors.delete(fieldName);
            }
        }
    }
    /**
     * 获取字段值
     * @example validator.getValue('email')
     */
    getValue(name) {
        return this.fields.get(name)?.value;
    }
    /**
     * 获取所有字段值
     * @example validator.getValues()
     */
    getValues() {
        const values = {};
        for (const [name, field] of this.fields) {
            values[name] = field.value;
        }
        return values;
    }
}
/**
 * 常用验证规则预设
 */
const formRules = {
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '请输入有效的邮箱地址',
    },
    phone: {
        pattern: /^1[3-9]\d{9}$/,
        message: '请输入有效的手机号码',
    },
    url: {
        pattern: /^https?:\/\/.+/,
        message: '请输入有效的网址',
    },
    password: {
        minLength: 6,
        message: '密码长度至少为 6 位',
    },
    strongPassword: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: '密码必须包含大小写字母、数字和特殊字符，至少 8 位',
    },
    username: {
        pattern: /^[a-zA-Z0-9_]{3,16}$/,
        message: '用户名只能包含字母、数字和下划线，长度 3-16 位',
    },
    idCard: {
        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        message: '请输入有效的身份证号码',
    },
    number: {
        pattern: /^\d+$/,
        message: '请输入数字',
    },
    integer: {
        pattern: /^-?\d+$/,
        message: '请输入整数',
    },
    decimal: {
        pattern: /^-?\d+(\.\d+)?$/,
        message: '请输入有效的数字',
    },
};
const form = {
    FormValidator,
    formRules,
};

/**
 * DOM 操作工具 - 浏览器环境常用 DOM 操作
 */
/**
 * 查询单个元素
 * @example querySelector('.class')
 */
function querySelector(selector, parent) {
    if (typeof document === 'undefined' && !parent)
        return null;
    return (parent || document).querySelector(selector);
}
/**
 * 查询多个元素
 * @example querySelectorAll('.item')
 */
function querySelectorAll(selector, parent) {
    if (typeof document === 'undefined' && !parent)
        return [];
    return Array.from((parent || document).querySelectorAll(selector));
}
/**
 * 添加类名
 * @example addClass(el, 'active')
 */
function addClass(element, ...classNames) {
    element.classList.add(...classNames);
}
/**
 * 移除类名
 * @example removeClass(el, 'active')
 */
function removeClass(element, ...classNames) {
    element.classList.remove(...classNames);
}
/**
 * 切换类名
 * @example toggleClass(el, 'active')
 */
function toggleClass(element, className, force) {
    return element.classList.toggle(className, force);
}
/**
 * 检查是否包含类名
 * @example hasClass(el, 'active')
 */
function hasClass(element, className) {
    return element.classList.contains(className);
}
/**
 * 获取/设置元素属性
 * @example attr(el, 'data-id') // get
 * @example attr(el, 'data-id', '123') // set
 */
function attr(element, name, value) {
    if (value === undefined) {
        return element.getAttribute(name);
    }
    element.setAttribute(name, value);
}
/**
 * 移除元素属性
 * @example removeAttr(el, 'data-id')
 */
function removeAttr(element, name) {
    element.removeAttribute(name);
}
/**
 * 获取/设置元素样式
 * @example css(el, 'color') // get
 * @example css(el, 'color', 'red') // set
 * @example css(el, { color: 'red', fontSize: '14px' }) // set multiple
 */
function css(element, prop, value) {
    if (typeof prop === 'string') {
        if (value === undefined) {
            if (typeof window === 'undefined')
                return '';
            return window.getComputedStyle(element).getPropertyValue(prop);
        }
        element.style.setProperty(prop, value);
    }
    else {
        Object.entries(prop).forEach(([key, val]) => {
            element.style.setProperty(key, val);
        });
    }
}
/**
 * 显示元素
 * @example show(el)
 */
function show(element, display = 'block') {
    element.style.display = display;
}
/**
 * 隐藏元素
 * @example hide(el)
 */
function hide(element) {
    element.style.display = 'none';
}
/**
 * 切换显示/隐藏
 * @example toggle(el)
 */
function toggle(element, display = 'block') {
    if (element.style.display === 'none') {
        show(element, display);
    }
    else {
        hide(element);
    }
}
/**
 * 获取元素位置信息
 * @example getOffset(el)
 */
function getOffset(element) {
    if (typeof window === 'undefined')
        return { top: 0, left: 0 };
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + (window.pageYOffset || 0),
        left: rect.left + (window.pageXOffset || 0),
    };
}
/**
 * 获取元素尺寸
 * @example getSize(el)
 */
function getSize(element) {
    const rect = element.getBoundingClientRect();
    return {
        width: rect.width,
        height: rect.height,
    };
}
/**
 * 滚动到指定元素
 * @example scrollToElement(el, { behavior: 'smooth' })
 */
function scrollToElement(element, options) {
    if (typeof element.scrollIntoView === 'function') {
        element.scrollIntoView(options || { behavior: 'smooth', block: 'start' });
    }
}
/**
 * 滚动到顶部
 * @example scrollToTop()
 */
function scrollToTop(smooth = true) {
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo({
            top: 0,
            behavior: smooth ? 'smooth' : 'auto',
        });
    }
}
/**
 * 获取滚动位置
 * @example getScrollPosition()
 */
function getScrollPosition() {
    if (typeof window === 'undefined')
        return { x: 0, y: 0 };
    return {
        x: window.pageXOffset || (typeof document !== 'undefined' ? document.documentElement.scrollLeft : 0),
        y: window.pageYOffset || (typeof document !== 'undefined' ? document.documentElement.scrollTop : 0),
    };
}
/**
 * 检查元素是否在视口内
 * @example isInViewport(el)
 */
function isInViewport(element) {
    if (typeof window === 'undefined')
        return false;
    const rect = element.getBoundingClientRect();
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || (typeof document !== 'undefined' ? document.documentElement.clientHeight : 0)) &&
        rect.right <= (window.innerWidth || (typeof document !== 'undefined' ? document.documentElement.clientWidth : 0)));
}
/**
 * 创建元素
 * @example createElement('div', { className: 'box', textContent: 'Hello' })
 */
function createElement(tagName, props) {
    if (typeof document === 'undefined')
        return null;
    const element = document.createElement(tagName);
    if (props) {
        Object.assign(element, props);
    }
    return element;
}
/**
 * 添加事件监听
 * @example on(el, 'click', handler)
 */
function on(element, event, handler, options) {
    element.addEventListener(event, handler, options);
}
/**
 * 移除事件监听
 * @example off(el, 'click', handler)
 */
function off(element, event, handler, options) {
    element.removeEventListener(event, handler, options);
}
/**
 * 一次性事件监听
 * @example once(el, 'click', handler)
 */
function once(element, event, handler) {
    const wrappedHandler = (e) => {
        handler(e);
        element.removeEventListener(event, wrappedHandler);
    };
    element.addEventListener(event, wrappedHandler);
}
/**
 * 委托事件监听
 * @example delegate(container, '.button', 'click', handler)
 */
function delegate(element, selector, event, handler) {
    element.addEventListener(event, (e) => {
        const target = e.target.closest(selector);
        if (target && element.contains(target)) {
            const customEvent = e;
            customEvent.delegateTarget = target;
            handler(customEvent);
        }
    });
}
/**
 * 获取元素文本内容
 * @example text(el) // get
 * @example text(el, 'Hello') // set
 */
function text(element, content) {
    if (content === undefined) {
        return element.textContent || '';
    }
    element.textContent = content;
}
/**
 * 获取元素HTML内容
 * @example html(el) // get
 * @example html(el, '<span>Hello</span>') // set
 */
function html(element, content) {
    if (content === undefined) {
        return element.innerHTML;
    }
    element.innerHTML = content;
}
/**
 * 插入元素
 * @example append(parent, child)
 */
function append(parent, ...children) {
    parent.append(...children);
}
/**
 * 前置插入元素
 * @example prepend(parent, child)
 */
function prepend(parent, ...children) {
    parent.prepend(...children);
}
/**
 * 移除元素
 * @example remove(el)
 */
function remove(element) {
    element.remove();
}
/**
 * 复制元素
 * @example clone(el, true)
 */
function clone(element, deep = true) {
    return element.cloneNode(deep);
}
/**
 * 获取父元素
 * @example parent(el)
 */
function parent(element) {
    return element.parentElement;
}
/**
 * 获取子元素
 * @example children(el)
 */
function children(element) {
    return Array.from(element.children);
}
/**
 * 获取兄弟元素
 * @example siblings(el)
 */
function siblings(element) {
    return Array.from(element.parentElement?.children || []).filter(el => el !== element);
}
/**
 * 获取下一个兄弟元素
 * @example next(el)
 */
function next(element) {
    return element.nextElementSibling;
}
/**
 * 获取上一个兄弟元素
 * @example prev(el)
 */
function prev(element) {
    return element.previousElementSibling;
}
/**
 * 检查元素是否匹配选择器
 * @example matches(el, '.active')
 */
function matches(element, selector) {
    return element.matches(selector);
}
/**
 * 查找最近的匹配元素
 * @example closest(el, '.container')
 */
function closest(element, selector) {
    return element.closest(selector);
}
const dom = {
    querySelector,
    querySelectorAll,
    addClass,
    removeClass,
    toggleClass,
    hasClass,
    attr,
    removeAttr,
    css,
    show,
    hide,
    toggle,
    getOffset,
    getSize,
    scrollToElement,
    scrollToTop,
    getScrollPosition,
    isInViewport,
    createElement,
    on,
    off,
    once,
    delegate,
    text,
    html,
    append,
    prepend,
    remove,
    clone,
    parent,
    children,
    siblings,
    next,
    prev,
    matches,
    closest,
};

/**
 * Cookie 管理工具 - 真实项目中的 Cookie 操作
 */
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
    if (typeof document !== 'undefined') {
        document.cookie = cookieString;
    }
}
/**
 * 获取 Cookie
 * @example getCookie('token')
 */
function getCookie(name) {
    if (typeof document === 'undefined')
        return null;
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
    if (typeof document === 'undefined')
        return cookies;
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
        else if (typeof localStorage !== 'undefined') {
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
        else if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(this.tokenKey);
        }
        return null;
    }
    /**
     * 设置刷新令牌
     * @example tokenManager.setRefreshToken('xyz789', { expires: 7 })
     */
    setRefreshToken(token, options) {
        if (this.storage === 'cookie') {
            setCookie(this.refreshTokenKey, token, options || { expires: 7, path: '/' });
        }
        else if (typeof localStorage !== 'undefined') {
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
        else if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(this.refreshTokenKey);
        }
        return null;
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
        else if (typeof localStorage !== 'undefined') {
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
const cookie = {
    setCookie,
    getCookie,
    removeCookie,
    hasCookie,
    getAllCookies,
    clearAllCookies,
    TokenManager,
};

/**
 * 性能监控工具 - 真实项目中的性能监控
 */
/**
 * 性能监控类
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.observers = [];
        if (typeof window !== 'undefined') {
            this.initObservers();
            this.measureLoadTimes();
        }
    }
    /**
     * 初始化性能观察器
     */
    initObservers() {
        // 监听 FCP 和 LCP
        if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
            try {
                const paintObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.name === 'first-contentful-paint') {
                            this.metrics.fcp = entry.startTime;
                        }
                    }
                });
                paintObserver.observe({ entryTypes: ['paint'] });
                this.observers.push(paintObserver);
                // LCP
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                this.observers.push(lcpObserver);
                // FID
                const fidObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.metrics.fid = entry.processingStart - entry.startTime;
                    }
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
                this.observers.push(fidObserver);
                // CLS
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                            this.metrics.cls = clsValue;
                        }
                    }
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
                this.observers.push(clsObserver);
            }
            catch (e) {
                console.warn('Performance Observer not fully supported', e);
            }
        }
    }
    /**
     * 测量页面加载时间
     */
    measureLoadTimes() {
        if (typeof window === 'undefined')
            return;
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    this.metrics.ttfb = perfData.responseStart - perfData.requestStart;
                    this.metrics.domLoad = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
                    this.metrics.windowLoad = perfData.loadEventEnd - perfData.loadEventStart;
                }
            }, 0);
        });
    }
    /**
     * 获取所有性能指标
     * @example monitor.getMetrics()
     */
    getMetrics() {
        return { ...this.metrics };
    }
    /**
     * 获取页面加载时间
     * @example monitor.getPageLoadTime()
     */
    getPageLoadTime() {
        if (typeof performance === 'undefined' || typeof performance.getEntriesByType !== 'function')
            return null;
        const perfData = performance.getEntriesByType('navigation')[0];
        if (!perfData)
            return null;
        return perfData.loadEventEnd - perfData.fetchStart;
    }
    /**
     * 获取资源加载时间
     * @example monitor.getResourceTiming()
     */
    getResourceTiming() {
        if (typeof performance === 'undefined' || typeof performance.getEntriesByType !== 'function')
            return [];
        return performance.getEntriesByType('resource');
    }
    /**
     * 标记时间点
     * @example monitor.mark('user-action-start')
     */
    mark(name) {
        if (typeof performance !== 'undefined' && typeof performance.mark === 'function') {
            performance.mark(name);
        }
    }
    /**
     * 测量两个标记之间的时间
     * @example monitor.measure('user-action', 'start', 'end')
     */
    measure(name, startMark, endMark) {
        if (typeof performance !== 'undefined' && typeof performance.measure === 'function') {
            performance.measure(name, startMark, endMark);
            const measures = performance.getEntriesByName(name, 'measure');
            return measures[measures.length - 1]?.duration || 0;
        }
        return 0;
    }
    /**
     * 清除标记
     * @example monitor.clearMarks('my-mark')
     */
    clearMarks(name) {
        if (typeof performance !== 'undefined' && typeof performance.clearMarks === 'function') {
            if (name) {
                performance.clearMarks(name);
            }
            else {
                performance.clearMarks();
            }
        }
    }
    /**
     * 清除测量
     * @example monitor.clearMeasures('my-measure')
     */
    clearMeasures(name) {
        if (typeof performance !== 'undefined' && typeof performance.clearMeasures === 'function') {
            if (name) {
                performance.clearMeasures(name);
            }
            else {
                performance.clearMeasures();
            }
        }
    }
    /**
     * 获取内存使用情况（仅 Chrome）
     * @example monitor.getMemoryInfo()
     */
    getMemoryInfo() {
        if (typeof performance === 'undefined')
            return null;
        const memory = performance.memory;
        if (!memory)
            return null;
        return {
            usedJSHeapSize: memory.usedJSHeapSize,
            totalJSHeapSize: memory.totalJSHeapSize,
            jsHeapSizeLimit: memory.jsHeapSizeLimit,
            usedPercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
        };
    }
    /**
     * 销毁观察器
     */
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}
/**
 * FPS 监控器
 */
class FPSMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
        this.frames = 0;
        this.rafId = null;
    }
    /**
     * 开始监控 FPS
     * @example fpsMonitor.start((fps) => console.log('FPS:', fps))
     */
    start(callback) {
        if (typeof requestAnimationFrame === 'undefined') {
            console.warn('requestAnimationFrame is not supported in this environment');
            return;
        }
        this.callback = callback;
        this.rafId = requestAnimationFrame(this.measureFPS.bind(this));
    }
    /**
     * 测量 FPS
     */
    measureFPS(time) {
        this.frames++;
        if (time >= this.lastTime + 1000) {
            this.fps = Math.round((this.frames * 1000) / (time - this.lastTime));
            this.callback?.(this.fps);
            this.frames = 0;
            this.lastTime = time;
        }
        if (typeof requestAnimationFrame !== 'undefined') {
            this.rafId = requestAnimationFrame(this.measureFPS.bind(this));
        }
    }
    /**
     * 获取当前 FPS
     * @example fpsMonitor.getFPS()
     */
    getFPS() {
        return this.fps;
    }
    /**
     * 停止监控
     */
    stop() {
        if (this.rafId !== null && typeof cancelAnimationFrame !== 'undefined') {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }
}
/**
 * 函数执行时间测量
 * @example measureTime(() => { // do something })
 */
function measureTime(fn, label) {
    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const result = fn();
    const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const duration = end - start;
    if (label) {
        console.log(`[${label}] 执行时间: ${duration.toFixed(2)}ms`);
    }
    return result;
}
/**
 * 异步函数执行时间测量
 * @example await measureAsyncTime(async () => { // do something })
 */
async function measureAsyncTime(fn, label) {
    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const result = await fn();
    const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const duration = end - start;
    if (label) {
        console.log(`[${label}] 执行时间: ${duration.toFixed(2)}ms`);
    }
    return result;
}
/**
 * 长任务监控
 */
function monitorLongTasks(callback) {
    if (typeof window === 'undefined' || !('PerformanceLongTaskTiming' in window)) {
        console.warn('Long Tasks API not supported');
        return () => { };
    }
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
            if (entry.duration > 50) {
                callback(entry.duration, [entry]);
            }
        });
    });
    try {
        observer.observe({ entryTypes: ['longtask'] });
    }
    catch (e) {
        console.warn('Failed to observe long tasks', e);
    }
    return () => observer.disconnect();
}
/**
 * 获取网络信息
 * @example getNetworkInfo()
 */
function getNetworkInfo() {
    if (typeof navigator === 'undefined')
        return null;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection)
        return null;
    return {
        effectiveType: connection.effectiveType, // 4g, 3g, 2g, slow-2g
        downlink: connection.downlink, // Mbps
        rtt: connection.rtt, // ms
        saveData: connection.saveData, // boolean
    };
}
/**
 * 创建性能监控实例
 */
const performanceMonitor = new PerformanceMonitor();
const performance_ = {
    PerformanceMonitor,
    FPSMonitor,
    measureTime,
    measureAsyncTime,
    monitorLongTasks,
    getNetworkInfo,
    monitor: performanceMonitor,
};

/**
 * 文件处理工具 - 真实项目中的文件操作
 */
/**
 * 获取文件信息
 * @example getFileInfo(file)
 */
function getFileInfo(file) {
    return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        extension: file.name.split('.').pop() || '',
    };
}
/**
 * 验证文件类型
 * @example validateFileType(file, ['image/jpeg', 'image/png'])
 */
function validateFileType(file, allowedTypes) {
    return allowedTypes.includes(file.type);
}
/**
 * 验证文件大小
 * @example validateFileSize(file, 5 * 1024 * 1024) // 5MB
 */
function validateFileSize(file, maxSize) {
    return file.size <= maxSize;
}
/**
 * 格式化文件大小
 * @example formatFileSize(1024) // '1 KB'
 */
function formatFileSize(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
/**
 * 读取文件为文本
 * @example await readFileAsText(file)
 */
function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        if (typeof FileReader === 'undefined') {
            return reject(new Error('FileReader not supported'));
        }
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}
/**
 * 读取文件为 Data URL
 * @example await readFileAsDataURL(file)
 */
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        if (typeof FileReader === 'undefined') {
            return reject(new Error('FileReader not supported'));
        }
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
/**
 * 读取文件为 ArrayBuffer
 * @example await readFileAsArrayBuffer(file)
 */
function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        if (typeof FileReader === 'undefined') {
            return reject(new Error('FileReader not supported'));
        }
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}
/**
 * 下载文件
 * @example downloadFile('data.json', jsonString, 'application/json')
 */
function downloadFile(filename, content, type) {
    if (typeof document === 'undefined' || typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') {
        return;
    }
    const blob = content instanceof Blob ? content : new Blob([content], { type: type || 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
/**
 * 下载 JSON 文件
 * @example downloadJSON('data.json', { key: 'value' })
 */
function downloadJSON(filename, data) {
    const json = JSON.stringify(data, null, 2);
    downloadFile(filename, json, 'application/json');
}
/**
 * 下载文本文件
 * @example downloadText('notes.txt', 'Hello World')
 */
function downloadText(filename, text) {
    downloadFile(filename, text, 'text/plain');
}
/**
 * 下载 CSV 文件
 * @example downloadCSV('data.csv', [['Name', 'Age'], ['John', '30']])
 */
function downloadCSV(filename, data) {
    const csv = data.map(row => row.join(',')).join('\n');
    downloadFile(filename, '\ufeff' + csv, 'text/csv;charset=utf-8');
}
/**
 * 图片压缩
 * @example await compressImage(file, 0.8, 1920, 1080)
 */
function compressImage(file, quality = 0.8, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
        if (typeof FileReader === 'undefined' || typeof document === 'undefined') {
            return reject(new Error('当前环境不支持图片压缩'));
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            if (typeof Image === 'undefined') {
                return reject(new Error('当前环境不支持图片处理'));
            }
            const img = new Image();
            img.src = e.target?.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    return reject(new Error('Canvas context not supported'));
                }
                let { width, height } = img;
                // 计算新尺寸
                if (maxWidth && width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                if (maxHeight && height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    }
                    else {
                        reject(new Error('压缩失败'));
                    }
                }, file.type, quality);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}
/**
 * 获取图片尺寸
 * @example await getImageDimensions(file)
 */
function getImageDimensions(file) {
    return new Promise((resolve, reject) => {
        if (typeof FileReader === 'undefined') {
            return reject(new Error('FileReader not supported'));
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            if (typeof Image === 'undefined') {
                return reject(new Error('Image not supported'));
            }
            const img = new Image();
            img.src = e.target?.result;
            img.onload = () => resolve({ width: img.width, height: img.height });
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}
/**
 * 创建文件选择器
 * @example await selectFile({ accept: 'image/*', multiple: false })
 */
function selectFile(options) {
    return new Promise((resolve, reject) => {
        if (typeof document === 'undefined') {
            return resolve(null);
        }
        const input = document.createElement('input');
        input.type = 'file';
        if (options.accept)
            input.accept = options.accept;
        if (options.multiple)
            input.multiple = options.multiple;
        input.onchange = () => resolve(input.files);
        input.click();
    });
}
/**
 * Base64 转 Blob
 * @example base64ToBlob(base64String, 'image/png')
 */
function base64ToBlob(base64, type = 'application/octet-stream') {
    const base64Data = base64.split(',')[1] || base64;
    let byteString;
    if (typeof atob !== 'undefined') {
        byteString = atob(base64Data);
    }
    else {
        byteString = Buffer.from(base64Data, 'base64').toString('binary');
    }
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type });
}
/**
 * Base64 转 File
 * @example base64ToFile(base64String, 'image.png', 'image/png')
 */
function base64ToFile(base64, filename, type) {
    const blob = base64ToBlob(base64, type);
    return new File([blob], filename, { type: blob.type });
}
/**
 * 文件切片上传辅助
 * @example sliceFile(file, 1024 * 1024) // 1MB chunks
 */
function sliceFile(file, chunkSize) {
    const chunks = [];
    let start = 0;
    while (start < file.size) {
        const end = Math.min(start + chunkSize, file.size);
        chunks.push(file.slice(start, end));
        start = end;
    }
    return chunks;
}
/**
 * 计算文件 MD5
 * @example await calculateFileMD5(file)
 */
async function calculateFileMD5(file) {
    const buffer = await readFileAsArrayBuffer(file);
    return crypto$1.md5FromArrayBuffer(buffer);
}
/**
 * 计算文件 SHA256
 * @example await calculateFileSHA256(file)
 */
async function calculateFileSHA256(file) {
    const buffer = await readFileAsArrayBuffer(file);
    return crypto$1.sha256FromArrayBuffer(buffer);
}
/**
 * 计算文件 SHA512
 * @example await calculateFileSHA512(file)
 */
async function calculateFileSHA512(file) {
    const buffer = await readFileAsArrayBuffer(file);
    return crypto$1.sha512FromArrayBuffer(buffer);
}
/**
 * 计算文件哈希值（支持多种算法）
 * @example await calculateFileHash(file, 'sha256')
 */
async function calculateFileHash(file, algorithm = 'sha256') {
    const buffer = await readFileAsArrayBuffer(file);
    switch (algorithm) {
        case 'md5':
            return crypto$1.md5FromArrayBuffer(buffer);
        case 'sha256':
            return crypto$1.sha256FromArrayBuffer(buffer);
        case 'sha512':
            return crypto$1.sha512FromArrayBuffer(buffer);
        default:
            return crypto$1.sha256FromArrayBuffer(buffer);
    }
}
/**
 * 计算文件 ETag（强 ETag，基于 MD5）
 * @example await calculateETag(file) // '"5d41402abc4b2a76b9719d911017c592"'
 */
async function calculateETag(file) {
    const hash = await calculateFileMD5(file);
    return `"${hash}"`;
}
/**
 * 计算文件弱 ETag（W/ 前缀）
 * @example await calculateWeakETag(file) // 'W/"5d41402abc4b2a76b9719d911017c592"'
 */
async function calculateWeakETag(file) {
    const hash = await calculateFileMD5(file);
    return `W/"${hash}"`;
}
/**
 * 计算文件 ETag（基于 SHA256）
 * @example await calculateETagSHA256(file)
 */
async function calculateETagSHA256(file) {
    const hash = await calculateFileSHA256(file);
    return `"${hash}"`;
}
/**
 * 计算文件 ETag（包含文件大小和修改时间）
 * @example await calculateETagWithMetadata(file) // '"1024-1703145600000-5d414..."'
 */
async function calculateETagWithMetadata(file) {
    const hash = await calculateFileMD5(file);
    return `"${file.size}-${file.lastModified}-${hash.substring(0, 8)}"`;
}
/**
 * 验证文件 ETag 是否匹配
 * @example await validateETag(file, '"5d41402abc4b2a76b9719d911017c592"')
 */
async function validateETag(file, etag) {
    const calculatedETag = await calculateETag(file);
    return calculatedETag === etag;
}
/**
 * 比较两个文件是否相同（基于内容哈希）
 * @example await compareFiles(file1, file2)
 */
async function compareFiles(file1, file2) {
    if (file1.size !== file2.size)
        return false;
    const hash1 = await calculateFileMD5(file1);
    const hash2 = await calculateFileMD5(file2);
    return hash1 === hash2;
}
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
async function calculateOSSETag(file, chunkSize, onProgress) {
    // 单文件情况：直接返回 MD5
    if (!chunkSize || file.size <= chunkSize) {
        const buffer = await readFileAsArrayBuffer(file);
        onProgress?.(100, 1, 1);
        return crypto$1.md5FromArrayBuffer(buffer);
    }
    // 分片上传情况：OSS 算法
    const chunks = sliceFile(file, chunkSize);
    const totalChunks = chunks.length;
    // 计算每个分片的 MD5
    const partMD5s = [];
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const buffer = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(chunk);
        });
        partMD5s.push(crypto$1.md5FromArrayBuffer(buffer));
        // 报告进度
        const progress = ((i + 1) / totalChunks) * 100;
        onProgress?.(progress, i + 1, totalChunks);
    }
    // 将所有 MD5（十六进制）转为二进制并拼接
    const concatenated = new Uint8Array(partMD5s.length * 16);
    let offset = 0;
    for (const md5 of partMD5s) {
        for (let i = 0; i < 16; i++) {
            concatenated[offset++] = parseInt(md5.substring(i * 2, i * 2 + 2), 16);
        }
    }
    // 对拼接后的数据计算 MD5
    const finalMD5 = crypto$1.md5FromArrayBuffer(concatenated.buffer);
    return `${finalMD5}-${chunks.length}`;
}
/**
 * 验证 OSS 分片 ETag 格式
 * @example isOSSMultipartETag('5d41402abc4b2a76b9719d911017c592-10') // true
 * @example isOSSMultipartETag('5d41402abc4b2a76b9719d911017c592') // false
 */
function isOSSMultipartETag(etag) {
    return /^[a-f0-9]{32}-\d+$/i.test(etag);
}
/**
 * 解析 OSS 分片 ETag
 * @example parseOSSMultipartETag('5d41402abc4b2a76b9719d911017c592-10')
 * // 返回: { md5: '5d41402abc4b2a76b9719d911017c592', partCount: 10 }
 */
function parseOSSMultipartETag(etag) {
    const match = etag.match(/^([a-f0-9]{32})-(\d+)$/i);
    if (!match)
        return null;
    return {
        md5: match[1],
        partCount: parseInt(match[2], 10),
    };
}
/**
 * 计算文件分片信息（用于 OSS 分片上传）
 * @example getOSSChunkInfo(file, 5 * 1024 * 1024)
 * // 返回: { chunkSize: 5242880, chunkCount: 10, lastChunkSize: 1024000 }
 */
function getOSSChunkInfo(file, chunkSize = 5 * 1024 * 1024) {
    const chunkCount = Math.ceil(file.size / chunkSize);
    const lastChunkSize = file.size % chunkSize || chunkSize;
    return {
        chunkSize,
        chunkCount,
        lastChunkSize,
        totalSize: file.size,
    };
}
/**
 * 批量上传文件
 * @example await uploadFiles(files, '/api/upload', (progress) => console.log(progress))
 */
async function uploadFiles(files, url, onProgress) {
    const uploads = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const progress = (e.loaded / e.total) * 100;
                    onProgress?.(progress, file);
                }
            });
            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                }
                else {
                    reject(new Error(`上传失败: ${xhr.statusText}`));
                }
            });
            xhr.addEventListener('error', () => reject(new Error('网络错误')));
            xhr.addEventListener('abort', () => reject(new Error('上传取消')));
            xhr.open('POST', url);
            xhr.send(formData);
        });
    });
    return Promise.all(uploads);
}
const fileHandler = {
    getFileInfo,
    validateFileType,
    validateFileSize,
    formatFileSize,
    readFileAsText,
    readFileAsDataURL,
    readFileAsArrayBuffer,
    downloadFile,
    downloadJSON,
    downloadText,
    downloadCSV,
    compressImage,
    getImageDimensions,
    selectFile,
    base64ToBlob,
    base64ToFile,
    sliceFile,
    calculateFileMD5,
    calculateFileSHA256,
    calculateFileSHA512,
    calculateFileHash,
    calculateETag,
    calculateWeakETag,
    calculateETagSHA256,
    calculateETagWithMetadata,
    validateETag,
    compareFiles,
    calculateOSSETag,
    isOSSMultipartETag,
    parseOSSMultipartETag,
    getOSSChunkInfo,
    uploadFiles,
};

/**
 * 设备检测工具 - 浏览器、操作系统、设备类型检测
 */
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

/**
 * 剪贴板操作工具 - 复制、粘贴、读取剪贴板
 */
/**
 * 复制文本到剪贴板（现代浏览器）
 * @example await copy('Hello World')
 */
async function copy(text) {
    // 优先使用 Clipboard API
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof window !== 'undefined' && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        }
        catch (error) {
            console.error('Clipboard API failed:', error);
        }
    }
    // 降级方案：使用 execCommand
    return copyFallback(text);
}
/**
 * 复制文本的降级方案（兼容老浏览器）
 */
function copyFallback(text) {
    if (typeof document === 'undefined')
        return false;
    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '-9999px';
        textarea.setAttribute('readonly', '');
        document.body.appendChild(textarea);
        // iOS 兼容
        if (typeof navigator !== 'undefined' && navigator.userAgent.match(/ipad|iphone/i)) {
            const range = document.createRange();
            range.selectNodeContents(textarea);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
            textarea.setSelectionRange(0, text.length);
        }
        else {
            textarea.select();
        }
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
    }
    catch (error) {
        console.error('Copy fallback failed:', error);
        return false;
    }
}
/**
 * 从剪贴板读取文本
 * @example const text = await paste()
 */
async function paste() {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof window !== 'undefined' && window.isSecureContext) {
        try {
            return await navigator.clipboard.readText();
        }
        catch (error) {
            console.error('Clipboard read failed:', error);
            throw new Error('无法读取剪贴板内容，可能需要用户授权');
        }
    }
    throw new Error('当前环境不支持读取剪贴板');
}
/**
 * 复制 HTML 到剪贴板
 * @example await copyHTML('<p>Hello <strong>World</strong></p>')
 */
async function copyHTML(html) {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof window !== 'undefined' && window.isSecureContext) {
        try {
            const blob = new Blob([html], { type: 'text/html' });
            const data = [new window.ClipboardItem({ 'text/html': blob })];
            await navigator.clipboard.write(data);
            return true;
        }
        catch (error) {
            console.error('Copy HTML failed:', error);
            return false;
        }
    }
    // 降级：只复制纯文本
    const text = html.replace(/<[^>]*>/g, '');
    return copyFallback(text);
}
/**
 * 复制图片到剪贴板
 * @example await copyImage(blob)
 */
async function copyImage(blob) {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof window !== 'undefined' && window.isSecureContext) {
        try {
            const data = [new window.ClipboardItem({ [blob.type]: blob })];
            await navigator.clipboard.write(data);
            return true;
        }
        catch (error) {
            console.error('Copy image failed:', error);
            return false;
        }
    }
    throw new Error('当前环境不支持复制图片');
}
/**
 * 复制图片 URL 为图片
 * @example await copyImageFromURL('https://example.com/image.png')
 */
async function copyImageFromURL(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return await copyImage(blob);
    }
    catch (error) {
        console.error('Copy image from URL failed:', error);
        return false;
    }
}
/**
 * 从剪贴板读取图片
 * @example const blob = await pasteImage()
 */
async function pasteImage() {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof window !== 'undefined' && window.isSecureContext) {
        try {
            const items = await navigator.clipboard.read();
            for (const item of items) {
                for (const type of item.types) {
                    if (type.startsWith('image/')) {
                        return await item.getType(type);
                    }
                }
            }
            return null;
        }
        catch (error) {
            console.error('Paste image failed:', error);
            return null;
        }
    }
    throw new Error('当前环境不支持读取剪贴板图片');
}
/**
 * 监听剪贴板变化（仅支持文本）
 * @example onPaste((text) => console.log('粘贴:', text))
 */
function onPaste(callback) {
    if (typeof document === 'undefined')
        return () => { };
    const handler = async (e) => {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain');
        if (text) {
            callback(text);
        }
    };
    document.addEventListener('paste', handler);
    // 返回取消监听的函数
    return () => {
        document.removeEventListener('paste', handler);
    };
}
/**
 * 监听复制事件
 * @example onCopy((text) => console.log('复制:', text))
 */
function onCopy(callback) {
    if (typeof document === 'undefined')
        return () => { };
    const handler = (e) => {
        const selection = typeof window !== 'undefined' ? window.getSelection() : null;
        const text = selection?.toString() || '';
        if (text) {
            callback(text);
        }
    };
    document.addEventListener('copy', handler);
    return () => {
        document.removeEventListener('copy', handler);
    };
}
/**
 * 拦截复制事件并修改内容
 * @example interceptCopy((text) => text + '\n来源: example.com')
 */
function interceptCopy(modifier) {
    if (typeof document === 'undefined')
        return () => { };
    const handler = (e) => {
        e.preventDefault();
        const selection = typeof window !== 'undefined' ? window.getSelection() : null;
        const text = selection?.toString() || '';
        if (text && e.clipboardData) {
            const modifiedText = modifier(text);
            e.clipboardData.setData('text/plain', modifiedText);
        }
    };
    document.addEventListener('copy', handler);
    return () => {
        document.removeEventListener('copy', handler);
    };
}
/**
 * 复制 DOM 元素为图片
 * @example await copyElementAsImage(element)
 */
async function copyElementAsImage(element) {
    try {
        // 需要配合 html2canvas 或类似库使用
        // 这里提供接口定义
        throw new Error('需要引入 html2canvas 库来实现此功能');
    }
    catch (error) {
        console.error('Copy element as image failed:', error);
        return false;
    }
}
/**
 * 检查是否支持剪贴板 API
 * @example supportsClipboard() // true/false
 */
function supportsClipboard() {
    return !!(typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        typeof window !== 'undefined' &&
        window.isSecureContext);
}
/**
 * 请求剪贴板权限
 * @example await requestPermission()
 */
async function requestPermission() {
    if (typeof navigator === 'undefined' || !navigator.permissions)
        return false;
    try {
        const result = await navigator.permissions.query({ name: 'clipboard-read' });
        return result.state === 'granted';
    }
    catch (error) {
        console.error('Request clipboard permission failed:', error);
        return false;
    }
}
/**
 * 复制多种格式到剪贴板
 * @example await copyMultiple({ text: 'Hello', html: '<p>Hello</p>' })
 */
async function copyMultiple(data) {
    if (typeof navigator === 'undefined' ||
        !navigator.clipboard ||
        typeof window === 'undefined' ||
        !window.isSecureContext) {
        // 降级：只复制文本
        if (data.text) {
            return copyFallback(data.text);
        }
        return false;
    }
    try {
        const items = {};
        if (data.text) {
            items['text/plain'] = new Blob([data.text], { type: 'text/plain' });
        }
        if (data.html) {
            items['text/html'] = new Blob([data.html], { type: 'text/html' });
        }
        if (data.rtf) {
            items['text/rtf'] = new Blob([data.rtf], { type: 'text/rtf' });
        }
        const clipboardItem = new window.ClipboardItem(items);
        await navigator.clipboard.write([clipboardItem]);
        return true;
    }
    catch (error) {
        console.error('Copy multiple formats failed:', error);
        return false;
    }
}
const clipboard = {
    copy,
    copyFallback,
    paste,
    copyHTML,
    copyImage,
    copyImageFromURL,
    pasteImage,
    copyElementAsImage,
    copyMultiple,
    onPaste,
    onCopy,
    interceptCopy,
    supportsClipboard,
    requestPermission,
};

/**
 * 树形数据处理工具 - 列表与树的转换、查找、遍历
 */
/**
 * 列表转树形结构
 * @example listToTree(list, { idKey: 'id', parentIdKey: 'parentId', childrenKey: 'children' })
 */
function listToTree(list, options = {}) {
    const { idKey = 'id', parentIdKey = 'parentId', childrenKey = 'children', rootParentId = null, } = options;
    const map = new Map();
    const result = [];
    // 创建映射
    list.forEach(item => {
        map.set(item[idKey], { ...item, [childrenKey]: [] });
    });
    // 构建树
    list.forEach(item => {
        const node = map.get(item[idKey]);
        const parentId = item[parentIdKey];
        if (parentId === rootParentId || parentId === undefined) {
            result.push(node);
        }
        else {
            const parent = map.get(parentId);
            if (parent) {
                parent[childrenKey].push(node);
            }
            else {
                // 找不到父节点，作为根节点
                result.push(node);
            }
        }
    });
    return result;
}
/**
 * 树形结构转列表（深度优先）
 * @example treeToList(tree, { childrenKey: 'children' })
 */
function treeToList(tree, options = {}) {
    const { childrenKey = 'children' } = options;
    const result = [];
    function traverse(nodes, parent) {
        nodes.forEach(node => {
            const { [childrenKey]: children, ...rest } = node;
            result.push(rest);
            if (children && children.length > 0) {
                traverse(children);
            }
        });
    }
    traverse(tree);
    return result;
}
/**
 * 查找树节点
 * @example findNode(tree, node => node.id === 'target')
 */
function findNode(tree, predicate, options = {}) {
    const { childrenKey = 'children' } = options;
    for (const node of tree) {
        if (predicate(node)) {
            return node;
        }
        if (node[childrenKey] && node[childrenKey].length > 0) {
            const found = findNode(node[childrenKey], predicate, options);
            if (found)
                return found;
        }
    }
    return null;
}
/**
 * 查找节点路径
 * @example findPath(tree, node => node.id === 'target')
 */
function findPath(tree, predicate, options = {}) {
    const { childrenKey = 'children' } = options;
    function traverse(nodes, path) {
        for (const node of nodes) {
            const currentPath = [...path, node];
            if (predicate(node)) {
                return currentPath;
            }
            if (node[childrenKey] && node[childrenKey].length > 0) {
                const found = traverse(node[childrenKey], currentPath);
                if (found)
                    return found;
            }
        }
        return null;
    }
    return traverse(tree, []);
}
/**
 * 过滤树节点
 * @example filterTree(tree, node => node.status === 'active')
 */
function filterTree(tree, predicate, options = {}) {
    const { childrenKey = 'children' } = options;
    function filter(nodes) {
        return nodes
            .filter(predicate)
            .map(node => {
            if (node[childrenKey] && node[childrenKey].length > 0) {
                return {
                    ...node,
                    [childrenKey]: filter(node[childrenKey]),
                };
            }
            return node;
        });
    }
    return filter(tree);
}
/**
 * 遍历树节点
 * @example forEachTree(tree, node => console.log(node.name))
 */
function forEachTree(tree, callback, options = {}) {
    const { childrenKey = 'children' } = options;
    function traverse(nodes, parent) {
        nodes.forEach((node, index) => {
            callback(node, index, parent);
            if (node[childrenKey] && node[childrenKey].length > 0) {
                traverse(node[childrenKey], node);
            }
        });
    }
    traverse(tree);
}
/**
 * 映射树节点
 * @example mapTree(tree, node => ({ ...node, label: node.name }))
 */
function mapTree(tree, mapper, options = {}) {
    const { childrenKey = 'children' } = options;
    function map(nodes) {
        return nodes.map(node => {
            const mapped = mapper(node);
            if (node[childrenKey] && node[childrenKey].length > 0) {
                return {
                    ...mapped,
                    [childrenKey]: map(node[childrenKey]),
                };
            }
            return mapped;
        });
    }
    return map(tree);
}
/**
 * 获取树的最大深度
 * @example getTreeDepth(tree)
 */
function getTreeDepth(tree, options = {}) {
    const { childrenKey = 'children' } = options;
    function getDepth(nodes) {
        if (!nodes || nodes.length === 0)
            return 0;
        let maxDepth = 0;
        for (const node of nodes) {
            if (node[childrenKey] && node[childrenKey].length > 0) {
                const depth = getDepth(node[childrenKey]);
                maxDepth = Math.max(maxDepth, depth);
            }
        }
        return maxDepth + 1;
    }
    return getDepth(tree);
}
/**
 * 获取树的所有叶子节点
 * @example getLeafNodes(tree)
 */
function getLeafNodes(tree, options = {}) {
    const { childrenKey = 'children' } = options;
    const leaves = [];
    function traverse(nodes) {
        nodes.forEach(node => {
            if (!node[childrenKey] || node[childrenKey].length === 0) {
                leaves.push(node);
            }
            else {
                traverse(node[childrenKey]);
            }
        });
    }
    traverse(tree);
    return leaves;
}
/**
 * 排序树节点
 * @example sortTree(tree, (a, b) => a.order - b.order)
 */
function sortTree(tree, compareFn, options = {}) {
    const { childrenKey = 'children' } = options;
    function sort(nodes) {
        const sorted = [...nodes].sort(compareFn);
        return sorted.map(node => {
            if (node[childrenKey] && node[childrenKey].length > 0) {
                return {
                    ...node,
                    [childrenKey]: sort(node[childrenKey]),
                };
            }
            return node;
        });
    }
    return sort(tree);
}
/**
 * 查找节点的父节点
 * @example findParent(tree, node => node.id === 'child')
 */
function findParent(tree, predicate, options = {}) {
    const { childrenKey = 'children' } = options;
    function traverse(nodes, parent = null) {
        for (const node of nodes) {
            if (predicate(node)) {
                return parent;
            }
            if (node[childrenKey] && node[childrenKey].length > 0) {
                const found = traverse(node[childrenKey], node);
                if (found !== undefined)
                    return found;
            }
        }
        return null;
    }
    return traverse(tree);
}
/**
 * 查找节点的所有祖先
 * @example findAncestors(tree, node => node.id === 'child')
 */
function findAncestors(tree, predicate, options = {}) {
    const path = findPath(tree, predicate, options);
    return path ? path.slice(0, -1) : [];
}
/**
 * 查找节点的所有后代
 * @example findDescendants(tree, node => node.id === 'parent')
 */
function findDescendants(tree, predicate, options = {}) {
    const { childrenKey = 'children' } = options;
    const target = findNode(tree, predicate, options);
    if (!target || !target[childrenKey])
        return [];
    return treeToList(target[childrenKey], options);
}
/**
 * 树节点去重
 * @example uniqueTree(tree, node => node.id)
 */
function uniqueTree(tree, getKey, options = {}) {
    const { childrenKey = 'children' } = options;
    const seen = new Set();
    function unique(nodes) {
        return nodes
            .filter(node => {
            const key = getKey(node);
            if (seen.has(key))
                return false;
            seen.add(key);
            return true;
        })
            .map(node => {
            if (node[childrenKey] && node[childrenKey].length > 0) {
                return {
                    ...node,
                    [childrenKey]: unique(node[childrenKey]),
                };
            }
            return node;
        });
    }
    return unique(tree);
}
/**
 * 扁平化树到指定深度
 * @example flattenToDepth(tree, 2)
 */
function flattenToDepth(tree, depth, options = {}) {
    const { childrenKey = 'children' } = options;
    function flatten(nodes, currentDepth) {
        if (currentDepth >= depth) {
            return nodes.map(node => {
                const { [childrenKey]: _, ...rest } = node;
                return rest;
            });
        }
        return nodes.map(node => {
            if (node[childrenKey] && node[childrenKey].length > 0) {
                return {
                    ...node,
                    [childrenKey]: flatten(node[childrenKey], currentDepth + 1),
                };
            }
            return node;
        });
    }
    return flatten(tree, 0);
}
const tree = {
    listToTree,
    treeToList,
    findNode,
    findPath,
    findParent,
    findAncestors,
    findDescendants,
    filterTree,
    forEachTree,
    mapTree,
    sortTree,
    getTreeDepth,
    getLeafNodes,
    uniqueTree,
    flattenToDepth,
};

/**
 * ID 生成器工具 - UUID、NanoID、雪花ID等
 */
/**
 * 生成 UUID v4
 * @example uuid() // '550e8400-e29b-41d4-a716-446655440000'
 */
function uuid() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // 降级方案
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
/**
 * 生成简短的 UUID（无横杠）
 * @example shortUuid() // '550e8400e29b41d4a716446655440000'
 */
function shortUuid() {
    return uuid().replace(/-/g, '');
}
/**
 * 生成 NanoID
 * @example nanoid() // 'V1StGXR8_Z5jdHi6B-myT'
 */
function nanoid(size = 21) {
    const alphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
    let id = '';
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        const bytes = crypto.getRandomValues(new Uint8Array(size));
        for (let i = 0; i < size; i++) {
            id += alphabet[bytes[i] & 63];
        }
    }
    else {
        // 降级方案
        for (let i = 0; i < size; i++) {
            id += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
    }
    return id;
}
/**
 * 生成自定义长度的随机字符串
 * @example randomString(10) // 'a3f8k2m9x1'
 */
function randomString(length, chars) {
    const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characters = chars || defaultChars;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
/**
 * 生成数字 ID
 * @example randomNumber(1000, 9999) // 5847
 */
function randomNumber(min = 100000, max = 999999) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * 生成时间戳 ID
 * @example timestampId() // '1703145600000'
 */
function timestampId() {
    return Date.now().toString();
}
/**
 * 生成带前缀的时间戳 ID
 * @example prefixedTimestampId('user') // 'user_1703145600000'
 */
function prefixedTimestampId(prefix) {
    return `${prefix}_${Date.now()}`;
}
/**
 * 生成雪花 ID
 * 标准 64 位 ID (使用 BigInt)
 * @example snowflake() // '7139051117411713024'
 */
function snowflake() {
    return defaultSnowflake.nextId();
}
/**
 * 生成 ObjectId（类似 MongoDB）
 * @example objectId() // '507f1f77bcf86cd799439011'
 */
function objectId() {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const machineId = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    const processId = Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
    const counter = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    return timestamp + machineId + processId + counter;
}
/**
 * 生成 GUID（全局唯一标识符，与 UUID 相同）
 * @example guid() // '550e8400-e29b-41d4-a716-446655440000'
 */
function guid() {
    return uuid();
}
/**
 * 生成 ULID（Universally Unique Lexicographically Sortable Identifier）
 * @example ulid() // '01ARZ3NDEKTSV4RRFFQ69G5FAV'
 */
function ulid() {
    const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford's Base32
    const TIME_LEN = 10;
    const RANDOM_LEN = 16;
    const time = Date.now();
    let id = '';
    // 时间部分
    let timeValue = time;
    for (let i = TIME_LEN - 1; i >= 0; i--) {
        id = ENCODING.charAt(timeValue % 32) + id;
        timeValue = Math.floor(timeValue / 32);
    }
    // 随机部分
    for (let i = 0; i < RANDOM_LEN; i++) {
        id += ENCODING.charAt(Math.floor(Math.random() * 32));
    }
    return id;
}
/**
 * 生成短 ID（基于时间戳和随机数）
 * @example shortId() // 'k2m9x1a3f8'
 */
function shortId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 7);
    return timestamp + randomStr;
}
/**
 * 生成有序 ID（可排序）
 * @example orderedId() // '20231221120000_a3f8k2m9'
 */
function orderedId() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const random = randomString(8);
    return `${year}${month}${day}${hours}${minutes}${seconds}_${random}`;
}
/**
 * 雪花 ID 生成器
 * 标准 64 位 ID (使用 BigInt)
 * 1位符号位 + 41位时间戳 + 10位机器ID + 12位序列号
 */
class Snowflake {
    constructor(workerId = 0) {
        this.sequence = 0n;
        this.lastTimestamp = -1n;
        if (workerId < 0 || BigInt(workerId) > Snowflake.MAX_WORKER_ID) {
            throw new Error(`Worker ID must be between 0 and ${Snowflake.MAX_WORKER_ID}`);
        }
        this.workerId = BigInt(workerId);
    }
    /**
     * 生成下一个 ID
     */
    nextId() {
        let timestamp = BigInt(Date.now());
        if (timestamp < this.lastTimestamp) {
            throw new Error('Clock moved backwards!');
        }
        if (timestamp === this.lastTimestamp) {
            this.sequence = (this.sequence + 1n) & Snowflake.MAX_SEQUENCE;
            if (this.sequence === 0n) {
                // 等待下一毫秒
                while (timestamp <= this.lastTimestamp) {
                    timestamp = BigInt(Date.now());
                }
            }
        }
        else {
            this.sequence = 0n;
        }
        this.lastTimestamp = timestamp;
        const id = ((timestamp - Snowflake.EPOCH) << (Snowflake.WORKER_ID_BITS + Snowflake.SEQUENCE_BITS)) |
            (this.workerId << Snowflake.SEQUENCE_BITS) |
            this.sequence;
        return id.toString();
    }
}
Snowflake.EPOCH = 1609459200000n; // 2021-01-01
Snowflake.WORKER_ID_BITS = 10n;
Snowflake.SEQUENCE_BITS = 12n;
Snowflake.MAX_WORKER_ID = -1n ^ (-1n << Snowflake.WORKER_ID_BITS);
Snowflake.MAX_SEQUENCE = -1n ^ (-1n << Snowflake.SEQUENCE_BITS);
const defaultSnowflake = new Snowflake(0);
/**
 * 创建雪花 ID 生成器
 * @example const gen = createSnowflake(1)
 */
function createSnowflake(workerId = 0) {
    return new Snowflake(workerId);
}
/**
 * 生成数字递增 ID（基于计数器）
 * 注意：这是单实例计数器，不适用于分布式系统
 */
class IncrementalId {
    constructor(start = 1, prefix = '') {
        this.counter = start;
        this.prefix = prefix;
    }
    /**
     * 获取下一个 ID
     * @example incrementalId.next() // 'ID_00001'
     */
    next() {
        const id = this.prefix + String(this.counter).padStart(5, '0');
        this.counter++;
        return id;
    }
    /**
     * 重置计数器
     */
    reset(start = 1) {
        this.counter = start;
    }
    /**
     * 获取当前计数
     */
    current() {
        return this.counter;
    }
}
/**
 * 创建递增 ID 生成器
 * @example const gen = createIncrementalId(1, 'USER_')
 */
function createIncrementalId(start = 1, prefix = '') {
    return new IncrementalId(start, prefix);
}
/**
 * 验证 UUID 格式
 * @example isUuid('550e8400-e29b-41d4-a716-446655440000') // true
 */
function isUuid(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}
/**
 * 验证 ObjectId 格式
 * @example isObjectId('507f1f77bcf86cd799439011') // true
 */
function isObjectId(id) {
    return /^[0-9a-f]{24}$/.test(id);
}
/**
 * 生成批量 ID
 * @example generateBatch(10) // ['id1', 'id2', ...]
 */
function generateBatch(count, generator = uuid) {
    return Array.from({ length: count }, generator);
}
/**
 * 生成哈希 ID（基于内容）
 * @example hashId('user@example.com') // 'a3f8k2m9x1'
 */
function hashId(content) {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
        const char = content.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
}
const id = {
    // UUID 系列
    uuid,
    shortUuid,
    guid,
    // 短 ID
    nanoid,
    shortId,
    // 随机字符串
    randomString,
    randomNumber,
    // 时间相关
    timestampId,
    prefixedTimestampId,
    orderedId,
    // 特殊 ID
    snowflake,
    createSnowflake,
    Snowflake,
    objectId,
    ulid,
    // 递增 ID
    createIncrementalId,
    IncrementalId,
    // 工具函数
    isUuid,
    isObjectId,
    generateBatch,
    hashId,
};

/**
 * 工具函数模块
 */
/**
 * 工具函数集合
 */
const htils = {
    scformat,
    string,
    array,
    object,
    file,
    number,
    validate,
    format,
    date,
    type,
    url,
    promise,
    debounceThrottle,
    Storage,
    getLocalStorage,
    getSessionStorage,
    Logger,
    logger,
    EventBus,
    eventBus,
    Cache,
    crypto: crypto$1,
    request,
    sensitive,
    form,
    FormValidator,
    formRules,
    dom,
    cookie,
    TokenManager,
    performance: performance_,
    PerformanceMonitor,
    FPSMonitor,
    fileHandler,
    device,
    clipboard,
    tree,
    id,
    IncrementalId,
    createSnowflake,
};

exports.Cache = Cache;
exports.EventBus = EventBus;
exports.FPSMonitor = FPSMonitor;
exports.FormValidator = FormValidator;
exports.IncrementalId = IncrementalId;
exports.Logger = Logger;
exports.PerformanceMonitor = PerformanceMonitor;
exports.Snowflake = Snowflake;
exports.Storage = Storage;
exports.TokenManager = TokenManager;
exports.array = array;
exports.clipboard = clipboard;
exports.cookie = cookie;
exports.createSnowflake = createSnowflake;
exports.crypto = crypto$1;
exports.date = date;
exports.debounceThrottle = debounceThrottle;
exports.default = htils;
exports.device = device;
exports.dom = dom;
exports.eventBus = eventBus;
exports.file = file;
exports.fileHandler = fileHandler;
exports.form = form;
exports.formRules = formRules;
exports.format = format;
exports.getLocalStorage = getLocalStorage;
exports.getSessionStorage = getSessionStorage;
exports.id = id;
exports.logger = logger;
exports.number = number;
exports.object = object;
exports.performance_ = performance_;
exports.promise = promise;
exports.request = request;
exports.scformat = scformat;
exports.sensitive = sensitive;
exports.string = string;
exports.tree = tree;
exports.type = type;
exports.url = url;
exports.validate = validate;
//# sourceMappingURL=index.js.map
