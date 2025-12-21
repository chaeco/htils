/**
 * 数字处理工具函数
 */
declare const number: {
    /**
     * 四舍五入到指定小数位
     * @example round(3.14159, 2) // 3.14
     */
    round(num: number, precision?: number): number;
    /**
     * 向上取整到指定小数位
     * @example ceil(3.14, 1) // 3.2
     */
    ceil(num: number, precision?: number): number;
    /**
     * 向下取整到指定小数位
     * @example floor(3.19, 1) // 3.1
     */
    floor(num: number, precision?: number): number;
    /**
     * 约束数字在指定范围内
     * @example clamp(5, 1, 3) // 3
     */
    clamp(num: number, min: number, max: number): number;
    /**
     * 数字范围检查
     * @example inRange(5, 0, 10) // true
     */
    inRange(num: number, min: number, max: number): boolean;
    /**
     * 字节转换
     * @example byteToMB(1024 * 1024) // 1
     */
    byteToKB(bytes: number): number;
    byteToMB(bytes: number): number;
    byteToGB(bytes: number): number;
    /**
     * 百分比计算
     * @example percentage(50, 100) // 50
     */
    percentage(value: number, total: number): number;
    /**
     * 计算平均值
     * @example average(1, 2, 3, 4, 5) // 3
     */
    average(...nums: number[]): number;
    /**
     * 计算总和
     * @example sum(1, 2, 3) // 6
     */
    sum(...nums: number[]): number;
    /**
     * 生成指定范围的随机整数
     * @example randomBetween(1, 10) // 5
     */
    randomBetween(min: number, max: number): number;
    /**
     * 生成 0-1 的随机数
     * @example random() // 0.5
     */
    random(): number;
    /**
     * 格式化数字为千位分隔符
     * @example formatWithCommas(1000000) // '1,000,000'
     */
    formatWithCommas(num: number): string;
};
export default number;
//# sourceMappingURL=number.d.ts.map