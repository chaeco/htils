/**
 * 命名转换工具：蛇形与驼峰双向转换
 * 支持纯对象、嵌套对象、数组及基础类型值
 */
declare const scformat: {
    /**
     * 判断值是否为纯对象
     */
    isPlainObject(value: unknown): value is Record<string, unknown>;
    /**
     * 判断值是否为 Record 数组
     */
    isRecordArray(value: unknown): value is Record<string, unknown>[];
    /**
     * 蛇形命名转驼峰命名
     * @example scformat.snakeToCamel('user_name') // 'userName'
     */
    snakeToCamel(str: string): string;
    /**
     * 驼峰命名转蛇形命名
     * @example scformat.camelToSnake('userName') // 'user_name'
     */
    camelToSnake(str: string): string;
    /**
     * 递归将蛇形键对象转换为驼峰键对象
     * @example scformat.snakeDataToCamel({ user_name: 'test' }) // { userName: 'test' }
     */
    snakeDataToCamel(data: Record<string, unknown> | Record<string, unknown>[] | unknown): Record<string, unknown> | Record<string, unknown>[] | unknown;
    /**
     * 递归将驼峰键对象转换为蛇形键对象
     * @example scformat.camelDataToSnake({ userName: 'test' }) // { user_name: 'test' }
     */
    camelDataToSnake(data: Record<string, unknown> | Record<string, unknown>[] | unknown): Record<string, unknown> | Record<string, unknown>[] | unknown;
};
export default scformat;
//# sourceMappingURL=snake-camel-format.d.ts.map