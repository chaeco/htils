import { describe, it, expect } from 'vitest'
import scformat from '../snake-camel-format'

describe('scformat - 驼峰/蛇形转换', () => {
  // 字符串转换
  it('snakeToCamel - 蛇形转驼峰', () => {
    expect(scformat.snakeToCamel('user_name')).toBe('userName')
    expect(scformat.snakeToCamel('first_name_last_name')).toBe('firstNameLastName')
    expect(scformat.snakeToCamel('single')).toBe('single')
    expect(scformat.snakeToCamel('')).toBe('')
  })

  it('camelToSnake - 驼峰转蛇形', () => {
    expect(scformat.camelToSnake('userName')).toBe('user_name')
    expect(scformat.camelToSnake('firstNameLastName')).toBe('first_name_last_name')
    expect(scformat.camelToSnake('single')).toBe('single')
    expect(scformat.camelToSnake('')).toBe('')
  })

  // 对象转换
  it('snakeDataToCamel - 递归蛇形对象转驼峰', () => {
    const input = { user_name: 'tom', user_age: 20, nested_obj: { first_name: 'John' } }
    const result = scformat.snakeDataToCamel(input)
    expect(result).toEqual({
      userName: 'tom',
      userAge: 20,
      nestedObj: { firstName: 'John' },
    })
  })

  it('snakeDataToCamel - 数组转换', () => {
    const input = [
      { user_name: 'tom', user_age: 20 },
      { user_name: 'jerry', user_age: 18 },
    ]
    const result = scformat.snakeDataToCamel(input)
    expect(Array.isArray(result)).toBe(true)
    expect((result as any[])[0]).toEqual({ userName: 'tom', userAge: 20 })
  })

  it('camelDataToSnake - 递归驼峰对象转蛇形', () => {
    const input = { userName: 'tom', userAge: 20, nestedObj: { firstName: 'John' } }
    const result = scformat.camelDataToSnake(input)
    expect(result).toEqual({
      user_name: 'tom',
      user_age: 20,
      nested_obj: { first_name: 'John' },
    })
  })

  it('camelDataToSnake - 数组转换', () => {
    const input = [
      { userName: 'tom', userAge: 20 },
      { userName: 'jerry', userAge: 18 },
    ]
    const result = scformat.camelDataToSnake(input)
    expect(Array.isArray(result)).toBe(true)
    expect((result as any[])[0]).toEqual({ user_name: 'tom', user_age: 20 })
  })

  it('嵌套深层结构', () => {
    const input = {
      user_info: {
        first_name: 'John',
        contact_info: {
          email_address: 'john@example.com',
          phone_number: '123-456-7890',
        },
      },
    }
    const result = scformat.snakeDataToCamel(input)
    expect((result as any).userInfo.firstName).toBe('John')
    expect((result as any).userInfo.contactInfo.emailAddress).toBe('john@example.com')
  })

  it('基础类型保留', () => {
    expect(scformat.snakeDataToCamel(null)).toBe(null)
    expect(scformat.snakeDataToCamel(undefined)).toBe(undefined)
    expect(scformat.snakeDataToCamel(123)).toBe(123)
    expect(scformat.snakeDataToCamel('string')).toBe('string')
  })
})
