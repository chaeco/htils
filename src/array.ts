/**
 * 数组处理工具函数
 */

const array = {
  /**
   * 数组去重
   * @example unique([1, 2, 2, 3]) // [1, 2, 3]
   */
  unique<T>(arr: T[]): T[] {
    return [...new Set(arr)]
  },

  /**
   * 数组扁平化
   * @example flatten([[1, 2], [3, [4, 5]]]) // [1, 2, 3, 4, 5]
   */
  flatten<T>(arr: any[], depth: number = Infinity): T[] {
    if (depth === 0) return arr as T[]
    return arr.reduce((acc, item) => {
      if (Array.isArray(item)) {
        acc.push(...this.flatten(item, depth - 1))
      } else {
        acc.push(item)
      }
      return acc
    }, [])
  },

  /**
   * 数组分块
   * @example chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
   */
  chunk<T>(arr: T[], size: number): T[][] {
    if (size <= 0) return []
    const chunks: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  },

  /**
   * 按属性分组
   * @example groupBy([{type: 'a', val: 1}, {type: 'b', val: 2}], 'type')
   */
  groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
    return arr.reduce((acc, item) => {
      const groupKey = String(item[key])
      if (!acc[groupKey]) {
        acc[groupKey] = []
      }
      acc[groupKey].push(item)
      return acc
    }, {} as Record<string, T[]>)
  },

  /**
   * 根据条件查找元素
   * @example find([1, 2, 3, 4], x => x > 2) // 3
   */
  find<T>(arr: T[], predicate: (item: T, index: number) => boolean): T | undefined {
    for (let i = 0; i < arr.length; i++) {
      if (predicate(arr[i], i)) {
        return arr[i]
      }
    }
    return undefined
  },

  /**
   * 查找索引
   * @example findIndex([1, 2, 3], x => x > 2) // 2
   */
  findIndex<T>(arr: T[], predicate: (item: T, index: number) => boolean): number {
    for (let i = 0; i < arr.length; i++) {
      if (predicate(arr[i], i)) {
        return i
      }
    }
    return -1
  },

  /**
   * 检查数组是否包含某个元素
   * @example includes([1, 2, 3], 2) // true
   */
  includes<T>(arr: T[], item: T): boolean {
    return arr.includes(item)
  },

  /**
   * 获取数组第一个元素
   * @example first([1, 2, 3]) // 1
   */
  first<T>(arr: T[]): T | undefined {
    return arr[0]
  },

  /**
   * 获取数组最后一个元素
   * @example last([1, 2, 3]) // 3
   */
  last<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1]
  },

  /**
   * 过滤空值
   * @example compact([1, 0, 2, false, 3, '', 4]) // [1, 2, 3, 4]
   */
  compact<T>(arr: (T | null | undefined | false | 0 | '')[]): T[] {
    return arr.filter(item => !!item) as T[]
  },

  /**
   * 从数组中移除指定元素
   * @example remove([1, 2, 3, 2], 2) // [1, 3]
   */
  remove<T>(arr: T[], item: T): T[] {
    return arr.filter(x => x !== item)
  },

  /**
   * 获取两个数组的差集
   * @example difference([1, 2, 3], [2, 3, 4]) // [1]
   */
  difference<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.filter(item => !arr2.includes(item))
  },

  /**
   * 获取指定长度的随机样本
   * @example sample([1, 2, 3, 4, 5], 2) // [3, 1] (随机)
   */
  sample<T>(arr: T[], size: number = 1): T[] {
    const result: T[] = []
    const shuffled = [...arr].sort(() => Math.random() - 0.5)
    for (let i = 0; i < Math.min(size, shuffled.length); i++) {
      result.push(shuffled[i])
    }
    return result
  },

  /**
   * 获取数组索引
   * @example indexOf([1, 2, 3], 2) // 1
   */
  indexOf<T>(arr: T[], item: T): number {
    return arr.indexOf(item)
  },

  /**
   * 检查数组是否为空
   * @example isEmpty([]) // true
   */
  isEmpty<T>(arr: T[]): boolean {
    return arr.length === 0
  },

  /**
   * 求和
   * @example sum([1, 2, 3]) // 6
   */
  sum(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0)
  },

  /**
   * 求平均值
   * @example average([1, 2, 3]) // 2
   */
  average(arr: number[]): number {
    return arr.length > 0 ? this.sum(arr) / arr.length : 0
  },

  /**
   * 获取最大值
   * @example max([1, 2, 3]) // 3
   */
  max(arr: number[]): number {
    return Math.max(...arr)
  },

  /**
   * 获取最小值
   * @example min([1, 2, 3]) // 1
   */
  min(arr: number[]): number {
    return Math.min(...arr)
  },
}

export default array
