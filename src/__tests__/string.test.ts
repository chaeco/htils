import { describe, it, expect } from 'vitest'
import string from '../string'

describe('String Utils', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(string.capitalize('hello')).toBe('Hello')
      expect(string.capitalize('world')).toBe('World')
    })

    it('should handle empty string', () => {
      expect(string.capitalize('')).toBe('')
    })

    it('should handle single character', () => {
      expect(string.capitalize('a')).toBe('A')
    })
  })

  describe('truncate', () => {
    it('should truncate long strings', () => {
      expect(string.truncate('hello world', 5)).toBe('hello...')
    })

    it('should not truncate short strings', () => {
      expect(string.truncate('hello', 10)).toBe('hello')
    })

    it('should use custom suffix', () => {
      expect(string.truncate('hello world', 5, '---')).toBe('hello---')
    })
  })

  describe('isBlank', () => {
    it('should check if string is blank', () => {
      expect(string.isBlank('')).toBe(true)
      expect(string.isBlank('  ')).toBe(true)
      expect(string.isBlank('hello')).toBe(false)
    })
  })
})
