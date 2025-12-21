/**
 * 敏感信息脱敏工具
 * 用于在日志、展示等场景中对敏感信息进行处理
 */
/**
 * 脱敏电话号码
 * @example desensitizePhone('13812345678') => '138****5678'
 */
declare function desensitizePhone(phone: string): string;
/**
 * 脱敏邮箱
 * @example desensitizeEmail('user@example.com') => 'u***@example.com'
 */
declare function desensitizeEmail(email: string): string;
/**
 * 脱敏身份证号
 * @example desensitizeIdCard('110101199003071234') => '1101011990****1234'
 */
declare function desensitizeIdCard(id: string): string;
/**
 * 脱敏名字
 * @example desensitizeName('张三') => '张*'
 * @example desensitizeName('John Doe') => 'J*** D**'
 */
declare function desensitizeName(name: string): string;
/**
 * 脱敏银行卡号
 * @example desensitizeCardNumber('6222022409001234567') => '622202****1234567'
 */
declare function desensitizeCardNumber(card: string): string;
/**
 * 脱敏密钥/Token
 * @example desensitizeToken('abc123def456ghi789') => 'abc***789'
 */
declare function desensitizeToken(token: string): string;
/**
 * 脱敏 URL 中的敏感参数
 * @example desensitizeUrl('https://example.com?token=abc123&key=secret') => 'https://example.com?token=***&key=***'
 */
declare function desensitizeUrl(url: string, sensitiveParams?: string[]): string;
/**
 * 脱敏 JSON 对象中的敏感字段
 * @example desensitizeObject({ name: '张三', phone: '13812345678' }, ['phone']) => { name: '张三', phone: '138****5678' }
 */
declare function desensitizeObject<T extends Record<string, any>>(obj: T, sensitiveFields?: string[]): T;
/**
 * 自定义脱敏（保留指定比例的前后字符）
 * @example desensitizeCustom('hello world', 0.2) => 'h***rld'
 */
declare function desensitizeCustom(text: string, ratio?: number): string;
/**
 * 脱敏日志信息
 * @example desensitizeLog('User logged in: 13812345678') => 'User logged in: 138****5678'
 */
declare function desensitizeLog(log: string, patterns?: Array<{
    pattern: RegExp;
    handler: (match: string) => string;
}>): string;
/**
 * 敏感信息处理工具集
 */
declare const sensitive: {
    desensitizePhone: typeof desensitizePhone;
    desensitizeEmail: typeof desensitizeEmail;
    desensitizeIdCard: typeof desensitizeIdCard;
    desensitizeName: typeof desensitizeName;
    desensitizeCardNumber: typeof desensitizeCardNumber;
    desensitizeToken: typeof desensitizeToken;
    desensitizeUrl: typeof desensitizeUrl;
    desensitizeObject: typeof desensitizeObject;
    desensitizeCustom: typeof desensitizeCustom;
    desensitizeLog: typeof desensitizeLog;
};
export { desensitizePhone, desensitizeEmail, desensitizeIdCard, desensitizeName, desensitizeCardNumber, desensitizeToken, desensitizeUrl, desensitizeObject, desensitizeCustom, desensitizeLog, };
export default sensitive;
//# sourceMappingURL=sensitive.d.ts.map