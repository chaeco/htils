"use strict";
/**
 * ID 生成器工具 - UUID、NanoID、雪花ID等
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snowflake = exports.IncrementalId = void 0;
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
exports.Snowflake = Snowflake;
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
exports.IncrementalId = IncrementalId;
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
exports.default = id;
//# sourceMappingURL=id.js.map