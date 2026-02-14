import { describe, it, expect } from 'vitest'
import id from '../id'

describe('ID Generators', () => {
  describe('uuid', () => {
    it('should generate valid UUID v4', () => {
      const uuid1 = id.uuid()
      const uuid2 = id.uuid()
      expect(uuid1).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(uuid1).not.toBe(uuid2)
    })
  })

  describe('nanoid', () => {
    it('should generate nanoid with default length', () => {
      const nid = id.nanoid()
      expect(nid).toHaveLength(21)
    })

    it('should generate nanoid with custom length', () => {
      const nid = id.nanoid(10)
      expect(nid).toHaveLength(10)
    })

    it('should generate unique ids', () => {
      const nid1 = id.nanoid()
      const nid2 = id.nanoid()
      expect(nid1).not.toBe(nid2)
    })
  })

  describe('randomString', () => {
    it('should generate string with specified length', () => {
      expect(id.randomString(10)).toHaveLength(10)
      expect(id.randomString(20)).toHaveLength(20)
    })

    it('should use custom characters', () => {
      const result = id.randomString(10, '01')
      expect(result).toMatch(/^[01]+$/)
    })
  })

  describe('isUuid', () => {
    it('should validate UUID format', () => {
      expect(id.isUuid(id.uuid())).toBe(true)
      expect(id.isUuid('550e8400-e29b-41d4-a716-446655440000')).toBe(true)
      expect(id.isUuid('invalid-uuid')).toBe(false)
      expect(id.isUuid('123')).toBe(false)
    })
  })

  describe('IncrementalId', () => {
    it('should generate sequential ids', () => {
      const gen = id.createIncrementalId(1, 'ID_')
      expect(gen.next()).toBe('ID_00001')
      expect(gen.next()).toBe('ID_00002')
      expect(gen.next()).toBe('ID_00003')
    })

    it('should reset counter', () => {
      const gen = id.createIncrementalId(1, 'ID_')
      gen.next()
      gen.next()
      gen.reset(10)
      expect(gen.next()).toBe('ID_00010')
    })
  })

  describe('snowflake', () => {
    it('should generate valid snowflake id', () => {
      const sid = id.snowflake()
      expect(typeof sid).toBe('string')
      expect(BigInt(sid)).toBeGreaterThan(0n)
    })

    it('should generate unique ids', () => {
      const sid1 = id.snowflake()
      const sid2 = id.snowflake()
      expect(sid1).not.toBe(sid2)
    })

    it('should use custom worker id', () => {
      const gen = id.createSnowflake(1)
      const sid = gen.nextId()
      expect(typeof sid).toBe('string')
    })
  })

  describe('hashId', () => {
    it('should generate consistent hash for same input', () => {
      const hash1 = id.hashId('test@example.com')
      const hash2 = id.hashId('test@example.com')
      expect(hash1).toBe(hash2)
    })

    it('should generate different hash for different input', () => {
      const hash1 = id.hashId('test1@example.com')
      const hash2 = id.hashId('test2@example.com')
      expect(hash1).not.toBe(hash2)
    })
  })
})
