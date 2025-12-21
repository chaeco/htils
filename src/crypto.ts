/**
 * 加密和哈希工具 - 使用 crypto-js 实现
 */

import CryptoJS from 'crypto-js'

/**
 * MD5 哈希
 * @example md5('hello') // '5d41402abc4b2a76b9719d911017c592'
 */
function md5(str: string): string {
  return CryptoJS.MD5(str).toString()
}

/**
 * SHA1 哈希
 * @example sha1('hello') // 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d'
 */
function sha1(str: string): string {
  return CryptoJS.SHA1(str).toString()
}

/**
 * SHA256 哈希
 * @example sha256('hello') // '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
 */
function sha256(str: string): string {
  return CryptoJS.SHA256(str).toString()
}

/**
 * SHA512 哈希
 * @example sha512('hello')
 */
function sha512(str: string): string {
  return CryptoJS.SHA512(str).toString()
}

/**
 * SHA3 哈希
 * @example sha3('hello')
 */
function sha3(str: string): string {
  return CryptoJS.SHA3(str).toString()
}

/**
 * HMAC-MD5
 * @example hmacMD5('message', 'secret')
 */
function hmacMD5(message: string, secret: string): string {
  return CryptoJS.HmacMD5(message, secret).toString()
}

/**
 * HMAC-SHA1
 * @example hmacSHA1('message', 'secret')
 */
function hmacSHA1(message: string, secret: string): string {
  return CryptoJS.HmacSHA1(message, secret).toString()
}

/**
 * HMAC-SHA256
 * @example hmacSHA256('message', 'secret')
 */
function hmacSHA256(message: string, secret: string): string {
  return CryptoJS.HmacSHA256(message, secret).toString()
}

/**
 * HMAC-SHA512
 * @example hmacSHA512('message', 'secret')
 */
function hmacSHA512(message: string, secret: string): string {
  return CryptoJS.HmacSHA512(message, secret).toString()
}

/**
 * Base64 编码
 * @example base64Encode('hello') // 'aGVsbG8='
 */
function base64Encode(str: string): string {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str))
}

/**
 * Base64 解码
 * @example base64Decode('aGVsbG8=') // 'hello'
 */
function base64Decode(str: string): string {
  return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8)
}

/**
 * AES 加密
 * @example aesEncrypt('hello', 'secret-key')
 */
function aesEncrypt(message: string, key: string): string {
  return CryptoJS.AES.encrypt(message, key).toString()
}

/**
 * AES 解密
 * @example aesDecrypt(encrypted, 'secret-key')
 */
function aesDecrypt(ciphertext: string, key: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}

/**
 * DES 加密
 * @example desEncrypt('hello', 'secret-key')
 */
function desEncrypt(message: string, key: string): string {
  return CryptoJS.DES.encrypt(message, key).toString()
}

/**
 * DES 解密
 * @example desDecrypt(encrypted, 'secret-key')
 */
function desDecrypt(ciphertext: string, key: string): string {
  const bytes = CryptoJS.DES.decrypt(ciphertext, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}

/**
 * Triple DES 加密
 * @example tripleDesEncrypt('hello', 'secret-key')
 */
function tripleDesEncrypt(message: string, key: string): string {
  return CryptoJS.TripleDES.encrypt(message, key).toString()
}

/**
 * Triple DES 解密
 * @example tripleDesDecrypt(encrypted, 'secret-key')
 */
function tripleDesDecrypt(ciphertext: string, key: string): string {
  const bytes = CryptoJS.TripleDES.decrypt(ciphertext, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}

/**
 * RC4 加密
 * @example rc4Encrypt('hello', 'secret-key')
 */
function rc4Encrypt(message: string, key: string): string {
  return CryptoJS.RC4.encrypt(message, key).toString()
}

/**
 * RC4 解密
 * @example rc4Decrypt(encrypted, 'secret-key')
 */
function rc4Decrypt(ciphertext: string, key: string): string {
  const bytes = CryptoJS.RC4.decrypt(ciphertext, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}

/**
 * Rabbit 加密
 * @example rabbitEncrypt('hello', 'secret-key')
 */
function rabbitEncrypt(message: string, key: string): string {
  return CryptoJS.Rabbit.encrypt(message, key).toString()
}

/**
 * Rabbit 解密
 * @example rabbitDecrypt(encrypted, 'secret-key')
 */
function rabbitDecrypt(ciphertext: string, key: string): string {
  const bytes = CryptoJS.Rabbit.decrypt(ciphertext, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}

/**
 * PBKDF2 密钥派生
 * @example pbkdf2('password', 'salt', 1000, 256)
 */
function pbkdf2(
  password: string,
  salt: string,
  iterations: number = 1000,
  keySize: number = 256
): string {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: keySize / 32,
    iterations,
  }).toString()
}

/**
 * 生成随机字节
 * @example randomBytes(16) // 生成16字节随机数
 */
function randomBytes(size: number): string {
  return CryptoJS.lib.WordArray.random(size).toString()
}

/**
 * 计算文件 MD5（从 ArrayBuffer）
 * @example md5FromArrayBuffer(buffer)
 */
function md5FromArrayBuffer(buffer: ArrayBuffer): string {
  const wordArray = CryptoJS.lib.WordArray.create(buffer as any)
  return CryptoJS.MD5(wordArray).toString()
}

/**
 * 计算文件 SHA256（从 ArrayBuffer）
 * @example sha256FromArrayBuffer(buffer)
 */
function sha256FromArrayBuffer(buffer: ArrayBuffer): string {
  const wordArray = CryptoJS.lib.WordArray.create(buffer as any)
  return CryptoJS.SHA256(wordArray).toString()
}

/**
 * 计算文件 SHA512（从 ArrayBuffer）
 * @example sha512FromArrayBuffer(buffer)
 */
function sha512FromArrayBuffer(buffer: ArrayBuffer): string {
  const wordArray = CryptoJS.lib.WordArray.create(buffer as any)
  return CryptoJS.SHA512(wordArray).toString()
}

/**
 * URL 安全的 Base64 编码
 * @example base64UrlEncode('hello+world=')
 */
function base64UrlEncode(str: string): string {
  return base64Encode(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/**
 * URL 安全的 Base64 解码
 * @example base64UrlDecode('aGVsbG8td29ybGQ')
 */
function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) {
    str += '='
  }
  return base64Decode(str)
}

/**
 * 计算字符串的哈希值（多种算法）
 * @example hash('hello', 'md5')
 */
function hash(str: string, algorithm: 'md5' | 'sha1' | 'sha256' | 'sha512' | 'sha3' = 'sha256'): string {
  switch (algorithm) {
    case 'md5':
      return md5(str)
    case 'sha1':
      return sha1(str)
    case 'sha256':
      return sha256(str)
    case 'sha512':
      return sha512(str)
    case 'sha3':
      return sha3(str)
    default:
      return sha256(str)
  }
}

/**
 * 加密对象（转 JSON 后加密）
 * @example encryptObject({ user: 'john' }, 'secret')
 */
function encryptObject(obj: any, key: string): string {
  return aesEncrypt(JSON.stringify(obj), key)
}

/**
 * 解密对象
 * @example decryptObject(encrypted, 'secret')
 */
function decryptObject<T = any>(ciphertext: string, key: string): T {
  const decrypted = aesDecrypt(ciphertext, key)
  return JSON.parse(decrypted)
}

/**
 * 简单的字符串混淆（不安全）
 * @example obfuscate('hello')
 */
function obfuscate(str: string): string {
  return base64Encode(str).split('').reverse().join('')
}

/**
 * 反混淆
 * @example deobfuscate(obfuscated)
 */
function deobfuscate(str: string): string {
  return base64Decode(str.split('').reverse().join(''))
}

const crypto = {
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
}

export default crypto
