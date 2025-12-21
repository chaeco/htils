/**
 * 表单验证工具 - 真实项目中的表单处理
 */
interface ValidationRule {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validator?: (value: any) => boolean | string;
    message?: string;
}
interface ValidationResult {
    valid: boolean;
    errors: Record<string, string>;
}
interface FormField {
    value: any;
    rules?: ValidationRule[];
    touched?: boolean;
    dirty?: boolean;
}
/**
 * 表单验证器类
 */
declare class FormValidator {
    private fields;
    private errors;
    /**
     * 注册字段
     * @example validator.register('email', { value: '', rules: [{ required: true }] })
     */
    register(name: string, field: FormField): void;
    /**
     * 设置字段值
     * @example validator.setValue('email', 'user@example.com')
     */
    setValue(name: string, value: any): void;
    /**
     * 标记字段为已触摸
     * @example validator.touch('email')
     */
    touch(name: string): void;
    /**
     * 验证单个字段
     */
    private validateField;
    /**
     * 检查单条规则
     */
    private checkRule;
    /**
     * 验证所有字段
     * @example const result = validator.validateAll()
     */
    validateAll(): ValidationResult;
    /**
     * 获取字段错误
     * @example validator.getError('email')
     */
    getError(name: string): string | undefined;
    /**
     * 获取所有错误
     * @example validator.getAllErrors()
     */
    getAllErrors(): Record<string, string>;
    /**
     * 检查字段是否有效
     * @example validator.isValid('email')
     */
    isValid(name: string): boolean;
    /**
     * 检查表单是否有效
     * @example validator.isFormValid()
     */
    isFormValid(): boolean;
    /**
     * 重置字段
     * @example validator.reset('email')
     */
    reset(name?: string): void;
    /**
     * 获取字段值
     * @example validator.getValue('email')
     */
    getValue(name: string): any;
    /**
     * 获取所有字段值
     * @example validator.getValues()
     */
    getValues(): Record<string, any>;
}
/**
 * 常用验证规则预设
 */
declare const formRules: {
    email: {
        pattern: RegExp;
        message: string;
    };
    phone: {
        pattern: RegExp;
        message: string;
    };
    url: {
        pattern: RegExp;
        message: string;
    };
    password: {
        minLength: number;
        message: string;
    };
    strongPassword: {
        pattern: RegExp;
        message: string;
    };
    username: {
        pattern: RegExp;
        message: string;
    };
    idCard: {
        pattern: RegExp;
        message: string;
    };
    number: {
        pattern: RegExp;
        message: string;
    };
    integer: {
        pattern: RegExp;
        message: string;
    };
    decimal: {
        pattern: RegExp;
        message: string;
    };
};
declare const form: {
    FormValidator: typeof FormValidator;
    formRules: {
        email: {
            pattern: RegExp;
            message: string;
        };
        phone: {
            pattern: RegExp;
            message: string;
        };
        url: {
            pattern: RegExp;
            message: string;
        };
        password: {
            minLength: number;
            message: string;
        };
        strongPassword: {
            pattern: RegExp;
            message: string;
        };
        username: {
            pattern: RegExp;
            message: string;
        };
        idCard: {
            pattern: RegExp;
            message: string;
        };
        number: {
            pattern: RegExp;
            message: string;
        };
        integer: {
            pattern: RegExp;
            message: string;
        };
        decimal: {
            pattern: RegExp;
            message: string;
        };
    };
};
export { FormValidator, formRules };
export default form;
//# sourceMappingURL=form.d.ts.map