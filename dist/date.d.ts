/**
 * 日期处理工具函数
 */
declare const date: {
    /**
     * 获取当前日期
     * @example now() // Date object
     */
    now(): Date;
    /**
     * 获取时间戳（秒）
     * @example timestamp() // 1703072000
     */
    timestamp(): number;
    /**
     * 获取时间戳（毫秒）
     * @example timestampMs() // 1703072000000
     */
    timestampMs(): number;
    /**
     * 将时间戳转换为日期对象
     * @example fromTimestamp(1703072000) // Date object
     */
    fromTimestamp(timestamp: number): Date;
    /**
     * 将日期对象转换为时间戳
     * @example toTimestamp(new Date()) // 1703072000
     */
    toTimestamp(date: Date): number;
    /**
     * 格式化日期
     * @example format(new Date('2024-01-01'), 'YYYY-MM-DD') // '2024-01-01'
     */
    format(date: Date, formatStr?: string): string;
    /**
     * 解析日期字符串
     * @example parse('2024-01-01') // Date object
     */
    parse(dateStr: string): Date;
    /**
     * 添加天数
     * @example addDays(new Date('2024-01-01'), 5) // 2024-01-06
     */
    addDays(date: Date, days: number): Date;
    /**
     * 添加小时
     * @example addHours(new Date(), 2) // Date 2 hours later
     */
    addHours(date: Date, hours: number): Date;
    /**
     * 添加分钟
     * @example addMinutes(new Date(), 30) // Date 30 minutes later
     */
    addMinutes(date: Date, minutes: number): Date;
    /**
     * 添加秒数
     * @example addSeconds(new Date(), 30) // Date 30 seconds later
     */
    addSeconds(date: Date, seconds: number): Date;
    /**
     * 添加月份
     * @example addMonths(new Date('2024-01-01'), 1) // 2024-02-01
     */
    addMonths(date: Date, months: number): Date;
    /**
     * 添加年份
     * @example addYears(new Date('2024-01-01'), 1) // 2025-01-01
     */
    addYears(date: Date, years: number): Date;
    /**
     * 计算两个日期之间的天数差
     * @example diffDays(new Date('2024-01-01'), new Date('2024-01-06')) // 5
     */
    diffDays(date1: Date, date2: Date): number;
    /**
     * 计算两个日期之间的小时数差
     * @example diffHours(new Date(), new Date(Date.now() + 3600000)) // 1
     */
    diffHours(date1: Date, date2: Date): number;
    /**
     * 计算两个日期之间的分钟数差
     * @example diffMinutes(new Date(), new Date(Date.now() + 60000)) // 1
     */
    diffMinutes(date1: Date, date2: Date): number;
    /**
     * 获取该月的天数
     * @example getDaysInMonth(new Date('2024-02-01')) // 29 (leap year)
     */
    getDaysInMonth(date: Date): number;
    /**
     * 判断是否为闰年
     * @example isLeapYear(2024) // true
     */
    isLeapYear(year: number): boolean;
    /**
     * 获取周几（0 = 星期日）
     * @example getDay(new Date('2024-01-01')) // 1
     */
    getDay(date: Date): number;
    /**
     * 获取周几的名称
     * @example getDayName(new Date('2024-01-01')) // 'Monday'
     */
    getDayName(date: Date): string;
    /**
     * 获取月份的名称
     * @example getMonthName(new Date('2024-01-01')) // 'January'
     */
    getMonthName(date: Date): string;
    /**
     * 获取年份的第几天
     * @example getDayOfYear(new Date('2024-01-01')) // 1
     */
    getDayOfYear(date: Date): number;
    /**
     * 判断两个日期是否为同一天
     * @example isSameDay(new Date('2024-01-01'), new Date('2024-01-01 10:00:00')) // true
     */
    isSameDay(date1: Date, date2: Date): boolean;
    /**
     * 判断日期是否在指定范围内
     * @example isBetween(new Date('2024-01-05'), new Date('2024-01-01'), new Date('2024-01-10')) // true
     */
    isBetween(date: Date, startDate: Date, endDate: Date): boolean;
    /**
     * 获取本周的开始日期
     * @example getWeekStart(new Date('2024-01-03')) // 2024-01-01 (Monday)
     */
    getWeekStart(date: Date): Date;
    /**
     * 获取本周的结束日期
     * @example getWeekEnd(new Date('2024-01-03')) // 2024-01-07 (Sunday)
     */
    getWeekEnd(date: Date): Date;
    /**
     * 获取本月的开始日期
     * @example getMonthStart(new Date('2024-01-15')) // 2024-01-01
     */
    getMonthStart(date: Date): Date;
    /**
     * 获取本月的结束日期
     * @example getMonthEnd(new Date('2024-01-15')) // 2024-01-31
     */
    getMonthEnd(date: Date): Date;
    /**
     * 相对时间表示（如："2 hours ago"）
     * @example fromNow(new Date(Date.now() - 7200000)) // '2 hours ago'
     */
    fromNow(date: Date): string;
};
export default date;
//# sourceMappingURL=date.d.ts.map