/**
 * 对象处理工具函数
 */

const object = {
  /**
   * 判断值是否为纯对象
   */
  isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype
  },

  /**
   * 深拷贝
   * @example deepClone({ a: { b: 1 } }) // { a: { b: 1 } }
   */
  deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime()) as unknown as T
    }

    if (obj instanceof Array) {
      return obj.map((item) => this.deepClone(item)) as unknown as T
    }

    if (obj instanceof Object) {
      const cloned = {} as T
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          cloned[key] = this.deepClone(obj[key])
        }
      }
      return cloned
    }

    return obj
  },

  /**
   * 浅拷贝
   * @example shallowClone({ a: { b: 1 } }) // { a: { b: 1 } }
   */
  shallowClone<T extends Record<string, any>>(obj: T): T {
    return { ...obj }
  },

  /**
   * 合并对象
   * @example merge({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
   */
  merge<T extends Record<string, any>>(...objects: T[]): T {
    return Object.assign({}, ...objects)
  },

  /**
   * 深度合并对象
   * @example deepMerge({ a: { b: 1 } }, { a: { c: 2 } }) // { a: { b: 1, c: 2 } }
   */
  deepMerge<T extends Record<string, any>>(...objects: T[]): T {
    return objects.reduce((acc: Record<string, any>, obj) => {
      Object.keys(obj).forEach((key) => {
        const value = obj[key]
        if (this.isPlainObject(value) && this.isPlainObject(acc[key])) {
          acc[key] = this.deepMerge(acc[key], value)
        } else {
          acc[key] = value
        }
      })
      return acc
    }, {} as T) as T
  },

  /**
   * 选取指定属性
   * @example pick({ a: 1, b: 2, c: 3 }, ['a', 'b']) // { a: 1, b: 2 }
   */
  pick<T extends Record<string, any>>(obj: T, keys: (keyof T)[]): Partial<T> {
    const result = {} as Record<string, any>
    keys.forEach((key) => {
      if (key in obj) {
        result[key as string] = (obj as Record<string, any>)[key as string]
      }
    })
    return result as Partial<T>
  },

  /**
   * 排除指定属性
   * @example omit({ a: 1, b: 2, c: 3 }, ['c']) // { a: 1, b: 2 }
   */
  omit<T extends Record<string, any>>(obj: T, keys: (keyof T)[]): Partial<T> {
    const result = { ...obj } as Record<string, any>
    keys.forEach((key) => {
      delete result[key as string]
    })
    return result as Partial<T>
  },

  /**
   * 判断对象是否为空
   * @example isEmpty({}) // true
   * @example isEmpty({ a: 1 }) // false
   */
  isEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0
  },

  /**
   * 判断对象是否存在指定属性
   * @example hasKey({ a: 1 }, 'a') // true
   */
  hasKey(obj: Record<string, any>, key: string): boolean {
    return key in obj
  },

  /**
   * 获取对象的所有键
   * @example keys({ a: 1, b: 2 }) // ['a', 'b']
   */
  keys(obj: Record<string, any>): string[] {
    return Object.keys(obj)
  },

  /**
   * 获取对象的所有值
   * @example values({ a: 1, b: 2 }) // [1, 2]
   */
  values(obj: Record<string, any>): any[] {
    return Object.values(obj)
  },

  /**
   * 获取对象的所有键值对
   * @example entries({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
   */
  entries(obj: Record<string, any>): Array<[string, any]> {
    return Object.entries(obj)
  },

  /**
   * 从键值对创建对象
   * @example fromEntries([['a', 1], ['b', 2]]) // { a: 1, b: 2 }
   */
  fromEntries(entries: Array<[string, any]>): Record<string, any> {
    return Object.fromEntries(entries)
  },

  /**
   * 转换对象的键
   * @example mapKeys({ a: 1, b: 2 }, key => key.toUpperCase()) // { A: 1, B: 2 }
   */
  mapKeys<T extends Record<string, any>>(obj: T, fn: (key: string) => string): Record<string, any> {
    const result: Record<string, any> = {}
    Object.keys(obj).forEach((key) => {
      result[fn(key)] = (obj as Record<string, any>)[key]
    })
    return result
  },

  /**
   * 转换对象的值
   * @example mapValues({ a: 1, b: 2 }, val => val * 2) // { a: 2, b: 4 }
   */
  mapValues<T extends Record<string, any>>(obj: T, fn: (value: any, key: string) => any): Record<string, any> {
    const result: Record<string, any> = {}
    Object.keys(obj).forEach((key: string) => {
      result[key] = fn((obj as Record<string, any>)[key], key)
    })
    return result
  },

  /**
   * 过滤对象的键值对
   * @example filter({ a: 1, b: 2, c: 3 }, val => val > 1) // { b: 2, c: 3 }
   */
  filter<T extends Record<string, any>>(obj: T, predicate: (value: any, key: string) => boolean): Partial<T> {
    const result = {} as Record<string, any>
    Object.keys(obj).forEach((key: string) => {
      const val = (obj as Record<string, any>)[key]
      if (predicate(val, key)) {
        result[key] = val
      }
    })
    return result as Partial<T>
  },

  /**
   * 判断两个对象是否相等（深度比较）
   * @example isEqual({ a: 1 }, { a: 1 }) // true
   */
  isEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      return false
    }

    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) return false

    return keys1.every((key) => this.isEqual(obj1[key], obj2[key]))
  },

  /**
   * 反转对象的键和值
   * @example invert({ a: '1', b: '2' }) // { 1: 'a', 2: 'b' }
   */
  invert(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {}
    Object.keys(obj).forEach((key) => {
      result[obj[key]] = key
    })
    return result
  },

  /**
   * 检查对象是否包含特定的键值对
   * @example contains({ a: 1, b: 2 }, { a: 1 }) // true
   */
  contains(obj: Record<string, any>, target: Record<string, any>): boolean {
    return Object.keys(target).every((key) => obj[key] === target[key])
  },

  /**
   * 获取对象的嵌套属性值
   * @example get({ a: { b: { c: 1 } } }, 'a.b.c') // 1
   */
  get(obj: Record<string, any>, path: string, defaultValue?: any): any {
    const keys = path.split('.')
    let result = obj
    for (const key of keys) {
      result = result?.[key]
      if (result === undefined) {
        return defaultValue
      }
    }
    return result
  },

  /**
   * 设置对象的嵌套属性值
   * @example set({ a: {} }, 'a.b.c', 1) // { a: { b: { c: 1 } } }
   */
  set(obj: Record<string, any>, path: string, value: any): Record<string, any> {
    const keys = path.split('.')
    let current: Record<string, any> = obj
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {}
      }
      current = current[key] as Record<string, any>
    }
    current[keys[keys.length - 1]] = value
    return obj
  },
}

export default object
