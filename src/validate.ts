/**
 * 数据验证工具函数
 */

const validate = {
  /**
   * 验证邮箱格式
   * @example isEmail('user@example.com') // true
   */
  isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * 验证URL格式
   * @example isUrl('https://example.com') // true
   */
  isUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  /**
   * 验证电话号码（中国格式）
   * @example isPhone('13800138000') // true
   */
  isPhone(phone: string): boolean {
    const phoneRegex = /^1[3-9]\d{9}$/
    return phoneRegex.test(phone)
  },

  /**
   * 验证身份证号码（简化版）
   * @example isIdCard('110101199003071234') // true (format only)
   */
  isIdCard(idCard: string): boolean {
    return /^\d{18}$/.test(idCard) || /^\d{15}$/.test(idCard)
  },

  /**
   * 验证中国统一社会信用代码
   * @example isSocialCreditCode('91110105MA00D66D4C') // true (format only)
   */
  isSocialCreditCode(code: string): boolean {
    return /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(code)
  },

  /**
   * 验证邮政编码（中国）
   * @example isZipCode('100000') // true
   */
  isZipCode(zipCode: string): boolean {
    return /^\d{6}$/.test(zipCode)
  },

  /**
   * 验证 IP 地址
   * @example isIp('192.168.1.1') // true
   */
  isIp(ip: string): boolean {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/
    if (!ipRegex.test(ip)) return false
    const parts = ip.split('.')
    return parts.every(part => parseInt(part) <= 255)
  },

  /**
   * 验证 IPv4 地址
   * @example isIpv4('192.168.1.1') // true
   */
  isIpv4(ip: string): boolean {
    return this.isIp(ip)
  },

  /**
   * 验证 IPv6 地址
   * @example isIpv6('::1') // true
   */
  isIpv6(ip: string): boolean {
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/
    return ipv6Regex.test(ip)
  },

  /**
   * 验证强密码
   * 至少包含大小写字母、数字、特殊字符，长度至少 8 位
   * @example isStrongPassword('Abc@1234') // true
   */
  isStrongPassword(password: string): boolean {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return strongRegex.test(password)
  },

  /**
   * 验证是否为数字
   * @example isNumber('123') // true
   */
  isNumber(value: string): boolean {
    return !isNaN(Number(value)) && value !== ''
  },

  /**
   * 验证是否为整数
   * @example isInteger('123') // true
   */
  isInteger(value: string): boolean {
    return /^-?\d+$/.test(value)
  },

  /**
   * 验证是否为浮点数
   * @example isFloat('123.45') // true
   */
  isFloat(value: string): boolean {
    return /^-?\d+\.\d+$/.test(value)
  },

  /**
   * 验证是否为十六进制颜色
   * @example isHexColor('#FFFFFF') // true
   */
  isHexColor(color: string): boolean {
    return /^#[0-9A-Fa-f]{6}$/.test(color) || /^#[0-9A-Fa-f]{3}$/.test(color)
  },

  /**
   * 验证是否为中文字符
   * @example isChinese('你好') // true
   */
  isChinese(str: string): boolean {
    return /^[\u4E00-\u9FA5]+$/.test(str)
  },

  /**
   * 验证是否为英文字符
   * @example isEnglish('hello') // true
   */
  isEnglish(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str)
  },

  /**
   * 验证是否为字母数字
   * @example isAlphanumeric('abc123') // true
   */
  isAlphanumeric(str: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(str)
  },

  /**
   * 验证长度范围
   * @example isLengthBetween('hello', 2, 10) // true
   */
  isLengthBetween(str: string, min: number, max: number): boolean {
    return str.length >= min && str.length <= max
  },

  /**
   * 验证是否为空值
   * @example isEmpty('') // true
   * @example isEmpty(null) // true
   */
  isEmpty(value: any): boolean {
    return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)
  },

  /**
   * 验证是否包含特定字符
   * @example contains('hello world', 'world') // true
   */
  contains(str: string, substring: string): boolean {
    return str.includes(substring)
  },

  /**
   * 验证是否为纯数字
   * @example isPureNumber('12345') // true
   */
  isPureNumber(str: string): boolean {
    return /^\d+$/.test(str)
  },

  /**
   * 验证是否为 UUID
   * @example isUUID('550e8400-e29b-41d4-a716-446655440000') // true
   */
  isUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    return uuidRegex.test(uuid)
  },

  /**
   * 验证是否为 MAC 地址
   * @example isMacAddress('00:1A:2B:3C:4D:5E') // true
   */
  isMacAddress(mac: string): boolean {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    return macRegex.test(mac)
  },
}

export default validate
