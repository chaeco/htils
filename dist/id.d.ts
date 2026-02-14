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
export { IncrementalId, Snowflake };
export default id;
//# sourceMappingURL=id.d.ts.map