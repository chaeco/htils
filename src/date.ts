/**
 * 日期处理工具函数
 */

const date = {
  /**
   * 获取当前日期
   * @example now() // Date object
   */
  now(): Date {
    return new Date()
  },

  /**
   * 获取时间戳（秒）
   * @example timestamp() // 1703072000
   */
  timestamp(): number {
    return Math.floor(Date.now() / 1000)
  },

  /**
   * 获取时间戳（毫秒）
   * @example timestampMs() // 1703072000000
   */
  timestampMs(): number {
    return Date.now()
  },

  /**
   * 将时间戳转换为日期对象
   * @example fromTimestamp(1703072000) // Date object
   */
  fromTimestamp(timestamp: number): Date {
    return new Date(timestamp * 1000)
  },

  /**
   * 将日期对象转换为时间戳
   * @example toTimestamp(new Date()) // 1703072000
   */
  toTimestamp(date: Date): number {
    return Math.floor(date.getTime() / 1000)
  },

  /**
   * 格式化日期
   * @example format(new Date('2024-01-01'), 'YYYY-MM-DD') // '2024-01-01'
   */
  format(date: Date, formatStr: string = 'YYYY-MM-DD HH:mm:ss'): string {
    const pad = (n: number) => String(n).padStart(2, '0')
    const replacements: Record<string, string> = {
      'YYYY': String(date.getFullYear()),
      'MM': pad(date.getMonth() + 1),
      'DD': pad(date.getDate()),
      'HH': pad(date.getHours()),
      'mm': pad(date.getMinutes()),
      'ss': pad(date.getSeconds()),
      'MS': String(date.getMilliseconds()),
    }

    let result = formatStr
    Object.keys(replacements)
      .sort((a, b) => b.length - a.length)
      .forEach(key => {
        result = result.replace(new RegExp(key, 'g'), replacements[key])
      })
    return result
  },

  /**
   * 解析日期字符串
   * @example parse('2024-01-01') // Date object
   */
  parse(dateStr: string): Date {
    return new Date(dateStr)
  },

  /**
   * 添加天数
   * @example addDays(new Date('2024-01-01'), 5) // 2024-01-06
   */
  addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  },

  /**
   * 添加小时
   * @example addHours(new Date(), 2) // Date 2 hours later
   */
  addHours(date: Date, hours: number): Date {
    const result = new Date(date)
    result.setHours(result.getHours() + hours)
    return result
  },

  /**
   * 添加分钟
   * @example addMinutes(new Date(), 30) // Date 30 minutes later
   */
  addMinutes(date: Date, minutes: number): Date {
    const result = new Date(date)
    result.setMinutes(result.getMinutes() + minutes)
    return result
  },

  /**
   * 添加秒数
   * @example addSeconds(new Date(), 30) // Date 30 seconds later
   */
  addSeconds(date: Date, seconds: number): Date {
    const result = new Date(date)
    result.setSeconds(result.getSeconds() + seconds)
    return result
  },

  /**
   * 添加月份
   * @example addMonths(new Date('2024-01-01'), 1) // 2024-02-01
   */
  addMonths(date: Date, months: number): Date {
    const result = new Date(date)
    result.setMonth(result.getMonth() + months)
    return result
  },

  /**
   * 添加年份
   * @example addYears(new Date('2024-01-01'), 1) // 2025-01-01
   */
  addYears(date: Date, years: number): Date {
    const result = new Date(date)
    result.setFullYear(result.getFullYear() + years)
    return result
  },

  /**
   * 计算两个日期之间的天数差
   * @example diffDays(new Date('2024-01-01'), new Date('2024-01-06')) // 5
   */
  diffDays(date1: Date, date2: Date): number {
    const msPerDay = 24 * 60 * 60 * 1000
    return Math.floor((date2.getTime() - date1.getTime()) / msPerDay)
  },

  /**
   * 计算两个日期之间的小时数差
   * @example diffHours(new Date(), new Date(Date.now() + 3600000)) // 1
   */
  diffHours(date1: Date, date2: Date): number {
    const msPerHour = 60 * 60 * 1000
    return Math.floor((date2.getTime() - date1.getTime()) / msPerHour)
  },

  /**
   * 计算两个日期之间的分钟数差
   * @example diffMinutes(new Date(), new Date(Date.now() + 60000)) // 1
   */
  diffMinutes(date1: Date, date2: Date): number {
    const msPerMinute = 60 * 1000
    return Math.floor((date2.getTime() - date1.getTime()) / msPerMinute)
  },

  /**
   * 获取该月的天数
   * @example getDaysInMonth(new Date('2024-02-01')) // 29 (leap year)
   */
  getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  },

  /**
   * 判断是否为闰年
   * @example isLeapYear(2024) // true
   */
  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  },

  /**
   * 获取周几（0 = 星期日）
   * @example getDay(new Date('2024-01-01')) // 1
   */
  getDay(date: Date): number {
    return date.getDay()
  },

  /**
   * 获取周几的名称
   * @example getDayName(new Date('2024-01-01')) // 'Monday'
   */
  getDayName(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[date.getDay()]
  },

  /**
   * 获取月份的名称
   * @example getMonthName(new Date('2024-01-01')) // 'January'
   */
  getMonthName(date: Date): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months[date.getMonth()]
  },

  /**
   * 获取年份的第几天
   * @example getDayOfYear(new Date('2024-01-01')) // 1
   */
  getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0)
    const diff = date.getTime() - start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    return Math.floor(diff / oneDay)
  },

  /**
   * 判断两个日期是否为同一天
   * @example isSameDay(new Date('2024-01-01'), new Date('2024-01-01 10:00:00')) // true
   */
  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
  },

  /**
   * 判断日期是否在指定范围内
   * @example isBetween(new Date('2024-01-05'), new Date('2024-01-01'), new Date('2024-01-10')) // true
   */
  isBetween(date: Date, startDate: Date, endDate: Date): boolean {
    return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime()
  },

  /**
   * 获取本周的开始日期
   * @example getWeekStart(new Date('2024-01-03')) // 2024-01-01 (Monday)
   */
  getWeekStart(date: Date): Date {
    const result = new Date(date)
    const day = result.getDay()
    const diff = result.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(result.setDate(diff))
  },

  /**
   * 获取本周的结束日期
   * @example getWeekEnd(new Date('2024-01-03')) // 2024-01-07 (Sunday)
   */
  getWeekEnd(date: Date): Date {
    const start = this.getWeekStart(date)
    return this.addDays(start, 6)
  },

  /**
   * 获取本月的开始日期
   * @example getMonthStart(new Date('2024-01-15')) // 2024-01-01
   */
  getMonthStart(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  },

  /**
   * 获取本月的结束日期
   * @example getMonthEnd(new Date('2024-01-15')) // 2024-01-31
   */
  getMonthEnd(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
  },

  /**
   * 相对时间表示（如："2 hours ago"）
   * @example fromNow(new Date(Date.now() - 7200000)) // '2 hours ago'
   */
  fromNow(date: Date): string {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffSecs < 60) return 'just now'
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`
    return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`
  },
}

export default date
