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
export default crypto;
//# sourceMappingURL=crypto.d.ts.map