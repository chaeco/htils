import { describe, it, expect } from 'vitest'
import array from '../array'

describe('Array Utils', () => {
  describe('unique', () => {
    it('should remove duplicates', () => {
      expect(array.unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4])
      expect(array.unique(['a', 'b', 'b', 'c'])).toEqual(['a', 'b', 'c'])
    })

    it('should handle empty array', () => {
      expect(array.unique([])).toEqual([])
    })
  })

  describe('chunk', () => {
    it('should split array into chunks', () => {
      expect(array.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
      expect(array.chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]])
    })

    it('should handle empty array', () => {
      expect(array.chunk([], 2)).toEqual([])
    })
  })

  describe('flatten', () => {
    it('should flatten nested arrays', () => {
      expect(array.flatten([1, [2, [3, 4]], 5])).toEqual([1, 2, 3, 4, 5])
      expect(array.flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4])
    })

    it('should handle empty array', () => {
      expect(array.flatten([])).toEqual([])
    })
  })

  describe('groupBy', () => {
    it('should group array by key', () => {
      const data = [
        { type: 'fruit', name: 'apple' },
        { type: 'fruit', name: 'banana' },
        { type: 'vegetable', name: 'carrot' }
      ]
      const result = array.groupBy(data, 'type')
      expect(result.fruit).toHaveLength(2)
      expect(result.vegetable).toHaveLength(1)
    })
  })
})
