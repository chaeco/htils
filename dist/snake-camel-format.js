"use strict";
/**
 * 命名转换工具：蛇形与驼峰双向转换
 * 支持纯对象、嵌套对象、数组及基础类型值
 */
Object.defineProperty(exports, "__esModule", { value: true });
const scformat = {
    /**
     * 判断值是否为纯对象
     */
    isPlainObject(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
    },
    /**
     * 判断值是否为 Record 数组
     */
    isRecordArray(value) {
        return Array.isArray(value) && (value.length === 0 || this.isPlainObject(value[0]));
    },
    /**
     * 蛇形命名转驼峰命名
     * @example scformat.snakeToCamel('user_name') // 'userName'
     */
    snakeToCamel(str) {
        if (!str || typeof str !== 'string')
            return str;
        return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
    },
    /**
     * 驼峰命名转蛇形命名
     * @example scformat.camelToSnake('userName') // 'user_name'
     */
    camelToSnake(str) {
        if (!str || typeof str !== 'string')
            return str;
        return str.replace(/(?<!^)[A-Z]/g, (char) => `_${char.toLowerCase()}`);
    },
    /**
     * 递归将蛇形键对象转换为驼峰键对象
     * @example scformat.snakeDataToCamel({ user_name: 'test' }) // { userName: 'test' }
     */
    snakeDataToCamel(data) {
        if (typeof data !== 'object' || data === null) {
            return data;
        }
        if (this.isRecordArray(data)) {
            return data.map((item) => this.snakeDataToCamel(item));
        }
        if (this.isPlainObject(data)) {
            const camelObj = {};
            Object.keys(data).forEach((snakeKey) => {
                const camelKey = this.snakeToCamel(snakeKey);
                const value = data[snakeKey];
                camelObj[camelKey] = typeof value === 'object' && value !== null ? this.snakeDataToCamel(value) : value;
            });
            return camelObj;
        }
        if (Array.isArray(data)) {
            return data;
        }
        return data;
    },
    /**
     * 递归将驼峰键对象转换为蛇形键对象
     * @example scformat.camelDataToSnake({ userName: 'test' }) // { user_name: 'test' }
     */
    camelDataToSnake(data) {
        if (typeof data !== 'object' || data === null) {
            return data;
        }
        if (this.isRecordArray(data)) {
            return data.map((item) => this.camelDataToSnake(item));
        }
        if (this.isPlainObject(data)) {
            const snakeObj = {};
            Object.keys(data).forEach((camelKey) => {
                const snakeKey = this.camelToSnake(camelKey);
                const value = data[camelKey];
                snakeObj[snakeKey] = typeof value === 'object' && value !== null ? this.camelDataToSnake(value) : value;
            });
            return snakeObj;
        }
        if (Array.isArray(data)) {
            return data;
        }
        return data;
    },
};
exports.default = scformat;
//# sourceMappingURL=snake-camel-format.js.map