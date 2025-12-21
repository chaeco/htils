import { describe, it, expect } from 'vitest'
import crypto from '../crypto'

describe('Crypto Utils', () => {
  describe('md5', () => {
    it('should generate correct MD5 hash', () => {
      expect(crypto.md5('hello')).toBe('5d41402abc4b2a76b9719d911017c592')
      expect(crypto.md5('world')).toBe('7d793037a0760186574b0282f2f435e7')
    })

    it('should handle empty string', () => {
      expect(crypto.md5('')).toBe('d41d8cd98f00b204e9800998ecf8427e')
    })
  })

  describe('sha256', () => {
    it('should generate correct SHA256 hash', () => {
      expect(crypto.sha256('hello')).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')
    })
  })

  describe('base64Encode/Decode', () => {
    it('should encode and decode correctly', () => {
      const original = 'hello world'
      const encoded = crypto.base64Encode(original)
      const decoded = crypto.base64Decode(encoded)
      expect(decoded).toBe(original)
    })

    it('should handle special characters', () => {
      const original = '你好世界 🌍'
      const encoded = crypto.base64Encode(original)
      const decoded = crypto.base64Decode(encoded)
      expect(decoded).toBe(original)
    })
  })

  describe('aesEncrypt/Decrypt', () => {
    it('should encrypt and decrypt correctly', () => {
      const original = 'secret message'
      const key = 'my-secret-key'
      const encrypted = crypto.aesEncrypt(original, key)
      const decrypted = crypto.aesDecrypt(encrypted, key)
      expect(decrypted).toBe(original)
    })
  })

  describe('hash', () => {
    it('should support multiple algorithms', () => {
      const text = 'hello'
      expect(crypto.hash(text, 'md5')).toBe(crypto.md5(text))
      expect(crypto.hash(text, 'sha256')).toBe(crypto.sha256(text))
    })
  })
})
