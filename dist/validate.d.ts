/**
 * 数据验证工具函数
 */
declare const validate: {
    /**
     * 验证邮箱格式
     * @example isEmail('user@example.com') // true
     */
    isEmail(email: string): boolean;
    /**
     * 验证URL格式
     * @example isUrl('https://example.com') // true
     */
    isUrl(url: string): boolean;
    /**
     * 验证电话号码（中国格式）
     * @example isPhone('13800138000') // true
     */
    isPhone(phone: string): boolean;
    /**
     * 验证身份证号码（简化版）
     * @example isIdCard('110101199003071234') // true (format only)
     */
    isIdCard(idCard: string): boolean;
    /**
     * 验证中国统一社会信用代码
     * @example isSocialCreditCode('91110105MA00D66D4C') // true (format only)
     */
    isSocialCreditCode(code: string): boolean;
    /**
     * 验证邮政编码（中国）
     * @example isZipCode('100000') // true
     */
    isZipCode(zipCode: string): boolean;
    /**
     * 验证 IP 地址
     * @example isIp('192.168.1.1') // true
     */
    isIp(ip: string): boolean;
    /**
     * 验证 IPv4 地址
     * @example isIpv4('192.168.1.1') // true
     */
    isIpv4(ip: string): boolean;
    /**
     * 验证 IPv6 地址
     * @example isIpv6('::1') // true
     */
    isIpv6(ip: string): boolean;
    /**
     * 验证强密码
     * 至少包含大小写字母、数字、特殊字符，长度至少 8 位
     * @example isStrongPassword('Abc@1234') // true
     */
    isStrongPassword(password: string): boolean;
    /**
     * 验证是否为数字
     * @example isNumber('123') // true
     */
    isNumber(value: string): boolean;
    /**
     * 验证是否为整数
     * @example isInteger('123') // true
     */
    isInteger(value: string): boolean;
    /**
     * 验证是否为浮点数
     * @example isFloat('123.45') // true
     */
    isFloat(value: string): boolean;
    /**
     * 验证是否为十六进制颜色
     * @example isHexColor('#FFFFFF') // true
     */
    isHexColor(color: string): boolean;
    /**
     * 验证是否为中文字符
     * @example isChinese('你好') // true
     */
    isChinese(str: string): boolean;
    /**
     * 验证是否为英文字符
     * @example isEnglish('hello') // true
     */
    isEnglish(str: string): boolean;
    /**
     * 验证是否为字母数字
     * @example isAlphanumeric('abc123') // true
     */
    isAlphanumeric(str: string): boolean;
    /**
     * 验证长度范围
     * @example isLengthBetween('hello', 2, 10) // true
     */
    isLengthBetween(str: string, min: number, max: number): boolean;
    /**
     * 验证是否为空值
     * @example isEmpty('') // true
     * @example isEmpty(null) // true
     */
    isEmpty(value: any): boolean;
    /**
     * 验证是否包含特定字符
     * @example contains('hello world', 'world') // true
     */
    contains(str: string, substring: string): boolean;
    /**
     * 验证是否为纯数字
     * @example isPureNumber('12345') // true
     */
    isPureNumber(str: string): boolean;
    /**
     * 验证是否为 UUID
     * @example isUUID('550e8400-e29b-41d4-a716-446655440000') // true
     */
    isUUID(uuid: string): boolean;
    /**
     * 验证是否为 MAC 地址
     * @example isMacAddress('00:1A:2B:3C:4D:5E') // true
     */
    isMacAddress(mac: string): boolean;
};
export default validate;
//# sourceMappingURL=validate.d.ts.map