/**
 * 敏感信息脱敏工具
 * 用于在日志、展示等场景中对敏感信息进行处理
 */

/**
 * 脱敏电话号码
 * @example desensitizePhone('13812345678') => '138****5678'
 */
function desensitizePhone(phone: string): string {
  if (!phone) return ''
  const str = String(phone).trim()
  if (str.length < 7) return str

  // 保留前三位和后四位
  return str.slice(0, 3) + '****' + str.slice(-4)
}

/**
 * 脱敏邮箱
 * @example desensitizeEmail('user@example.com') => 'u***@example.com'
 */
function desensitizeEmail(email: string): string {
  if (!email) return ''
  const str = String(email).trim()
  const atIndex = str.indexOf('@')

  if (atIndex === -1) return str

  // 邮箱名仅保留第一个字符
  const name = str.slice(0, atIndex)
  const domain = str.slice(atIndex)

  if (name.length === 1) {
    return name + '***' + domain
  }

  return name.charAt(0) + '***' + domain
}

/**
 * 脱敏身份证号
 * @example desensitizeIdCard('110101199003071234') => '1101011990****1234'
 */
function desensitizeIdCard(id: string): string {
  if (!id) return ''
  const str = String(id).trim()

  if (str.length < 8) return str

  // 保留前6位和后4位
  return str.slice(0, 6) + '****' + str.slice(-4)
}

/**
 * 脱敏名字
 * @example desensitizeName('张三') => '张*'
 * @example desensitizeName('John Doe') => 'J*** D**'
 */
function desensitizeName(name: string): string {
  if (!name) return ''
  const str = String(name).trim()

  if (str.length === 1) return str

  // 中文名处理
  if (/[\u4e00-\u9fa5]/.test(str)) {
    if (str.length === 2) {
      return str.charAt(0) + '*'
    }
    return str.charAt(0) + '*'.repeat(str.length - 2) + str.charAt(str.length - 1)
  }

  // 英文名处理（保留首字母，其他替换为 *）
  return str
    .split(' ')
    .map(part => {
      if (part.length === 1) return part
      return part.charAt(0) + '*'.repeat(part.length - 1)
    })
    .join(' ')
}

/**
 * 脱敏银行卡号
 * @example desensitizeCardNumber('6222022409001234567') => '622202****1234567'
 */
function desensitizeCardNumber(card: string): string {
  if (!card) return ''
  const str = String(card).replace(/\s/g, '')

  if (str.length < 8) return str

  // 保留前6位和后7位
  return str.slice(0, 6) + '****' + str.slice(-7)
}

/**
 * 脱敏密钥/Token
 * @example desensitizeToken('abc123def456ghi789') => 'abc***789'
 */
function desensitizeToken(token: string): string {
  if (!token) return ''
  const str = String(token).trim()

  if (str.length <= 8) return '***'

  // 保留前3位和后3位
  return str.slice(0, 3) + '***' + str.slice(-3)
}

/**
 * 脱敏 URL 中的敏感参数
 * @example desensitizeUrl('https://example.com?token=abc123&key=secret') => 'https://example.com?token=***&key=***'
 */
function desensitizeUrl(url: string, sensitiveParams: string[] = ['token', 'key', 'password', 'secret']): string {
  if (!url) return ''

  try {
    const urlObj = new URL(url)
    const params = new URLSearchParams(urlObj.search)

    sensitiveParams.forEach(param => {
      if (params.has(param)) {
        params.set(param, '***')
      }
    })

    urlObj.search = params.toString()
    return urlObj.toString()
  } catch {
    return url
  }
}

/**
 * 脱敏 JSON 对象中的敏感字段
 * @example desensitizeObject({ name: '张三', phone: '13812345678' }, ['phone']) => { name: '张三', phone: '138****5678' }
 */
function desensitizeObject<T extends Record<string, any>>(
  obj: T,
  sensitiveFields: string[] = ['password', 'token', 'secret', 'apiKey']
): T {
  if (!obj || typeof obj !== 'object') return obj

  const result: any = { ...obj }

  sensitiveFields.forEach(field => {
    if (field in result) {
      const value = result[field]
      if (typeof value === 'string') {
        // 根据字段名自动识别脱敏方式
        if (field.toLowerCase().includes('phone')) {
          result[field] = desensitizePhone(value)
        } else if (field.toLowerCase().includes('email')) {
          result[field] = desensitizeEmail(value)
        } else if (field.toLowerCase().includes('id') && field.toLowerCase().includes('card')) {
          result[field] = desensitizeIdCard(value)
        } else if (field.toLowerCase().includes('token')) {
          result[field] = desensitizeToken(value)
        } else {
          // 默认保留前 20% 和后 20%
          result[field] = desensitizeCustom(value, 0.2)
        }
      }
    }
  })

  return result
}

/**
 * 自定义脱敏（保留指定比例的前后字符）
 * @example desensitizeCustom('hello world', 0.2) => 'h***rld'
 */
function desensitizeCustom(text: string, ratio: number = 0.2): string {
  if (!text) return ''
  const str = String(text).trim()

  if (str.length <= 4) return '***'

  const keepCount = Math.max(1, Math.ceil(str.length * ratio))
  const hideCount = str.length - keepCount * 2

  return str.slice(0, keepCount) + '*'.repeat(Math.max(3, hideCount)) + str.slice(-keepCount)
}

/**
 * 脱敏日志信息
 * @example desensitizeLog('User logged in: 13812345678') => 'User logged in: 138****5678'
 */
function desensitizeLog(log: string, patterns: Array<{ pattern: RegExp; handler: (match: string) => string }> = []): string {
  if (!log) return ''

  let result = log

  // 默认模式
  const defaultPatterns = [
    {
      pattern: /\d{11}(?=\s|$|[,.\];])/g, // 11位数字（手机号）
      handler: desensitizePhone,
    },
    {
      pattern: /[\w.-]+@[\w.-]+\.\w+/g, // 邮箱
      handler: desensitizeEmail,
    },
    {
      pattern: /\b[0-9a-f]{32}\b/gi, // MD5 哈希
      handler: desensitizeToken,
    },
  ]

  const allPatterns = [...defaultPatterns, ...patterns]

  allPatterns.forEach(({ pattern, handler }) => {
    result = result.replace(pattern, match => handler(match))
  })

  return result
}

/**
 * 敏感信息处理工具集
 */
const sensitive = {
  desensitizePhone,
  desensitizeEmail,
  desensitizeIdCard,
  desensitizeName,
  desensitizeCardNumber,
  desensitizeToken,
  desensitizeUrl,
  desensitizeObject,
  desensitizeCustom,
  desensitizeLog,
}

export {
  desensitizePhone,
  desensitizeEmail,
  desensitizeIdCard,
  desensitizeName,
  desensitizeCardNumber,
  desensitizeToken,
  desensitizeUrl,
  desensitizeObject,
  desensitizeCustom,
  desensitizeLog,
}
export default sensitive
