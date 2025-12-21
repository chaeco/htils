/**
 * 数字处理工具函数
 */

const number = {
  /**
   * 四舍五入到指定小数位
   * @example round(3.14159, 2) // 3.14
   */
  round(num: number, precision: number = 0): number {
    const factor = Math.pow(10, precision)
    return Math.round(num * factor) / factor
  },

  /**
   * 向上取整到指定小数位
   * @example ceil(3.14, 1) // 3.2
   */
  ceil(num: number, precision: number = 0): number {
    const factor = Math.pow(10, precision)
    return Math.ceil(num * factor) / factor
  },

  /**
   * 向下取整到指定小数位
   * @example floor(3.19, 1) // 3.1
   */
  floor(num: number, precision: number = 0): number {
    const factor = Math.pow(10, precision)
    return Math.floor(num * factor) / factor
  },

  /**
   * 约束数字在指定范围内
   * @example clamp(5, 1, 3) // 3
   */
  clamp(num: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, num))
  },

  /**
   * 数字范围检查
   * @example inRange(5, 0, 10) // true
   */
  inRange(num: number, min: number, max: number): boolean {
    return num >= min && num <= max
  },

  /**
   * 字节转换
   * @example byteToMB(1024 * 1024) // 1
   */
  byteToKB(bytes: number): number {
    return this.round(bytes / 1024, 2)
  },

  byteToMB(bytes: number): number {
    return this.round(bytes / (1024 * 1024), 2)
  },

  byteToGB(bytes: number): number {
    return this.round(bytes / (1024 * 1024 * 1024), 2)
  },

  /**
   * 百分比计算
   * @example percentage(50, 100) // 50
   */
  percentage(value: number, total: number): number {
    return this.round((value / total) * 100, 2)
  },

  /**
   * 计算平均值
   * @example average(1, 2, 3, 4, 5) // 3
   */
  average(...nums: number[]): number {
    if (nums.length === 0) return 0
    const sum = nums.reduce((acc, val) => acc + val, 0)
    return this.round(sum / nums.length, 2)
  },

  /**
   * 计算总和
   * @example sum(1, 2, 3) // 6
   */
  sum(...nums: number[]): number {
    return nums.reduce((acc, val) => acc + val, 0)
  },

  /**
   * 生成指定范围的随机整数
   * @example randomBetween(1, 10) // 5
   */
  randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  /**
   * 生成 0-1 的随机数
   * @example random() // 0.5
   */
  random(): number {
    return Math.random()
  },

  /**
   * 格式化数字为千位分隔符
   * @example formatWithCommas(1000000) // '1,000,000'
   */
  formatWithCommas(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },

}

export default number
