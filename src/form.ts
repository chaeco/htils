/**
 * 表单验证工具 - 真实项目中的表单处理
 */

interface ValidationRule {
  required?: boolean
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  validator?: (value: any) => boolean | string
  message?: string
}

interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
}

interface FormField {
  value: any
  rules?: ValidationRule[]
  touched?: boolean
  dirty?: boolean
}

/**
 * 表单验证器类
 */
class FormValidator {
  private fields: Map<string, FormField> = new Map()
  private errors: Map<string, string> = new Map()

  /**
   * 注册字段
   * @example validator.register('email', { value: '', rules: [{ required: true }] })
   */
  register(name: string, field: FormField): void {
    this.fields.set(name, { ...field, touched: false, dirty: false })
  }

  /**
   * 设置字段值
   * @example validator.setValue('email', 'user@example.com')
   */
  setValue(name: string, value: any): void {
    const field = this.fields.get(name)
    if (field) {
      field.value = value
      field.dirty = true
      this.validateField(name)
    }
  }

  /**
   * 标记字段为已触摸
   * @example validator.touch('email')
   */
  touch(name: string): void {
    const field = this.fields.get(name)
    if (field) {
      field.touched = true
      this.validateField(name)
    }
  }

  /**
   * 验证单个字段
   */
  private validateField(name: string): boolean {
    const field = this.fields.get(name)
    if (!field || !field.rules) return true

    for (const rule of field.rules) {
      const error = this.checkRule(field.value, rule)
      if (error) {
        this.errors.set(name, error)
        return false
      }
    }

    this.errors.delete(name)
    return true
  }

  /**
   * 检查单条规则
   */
  private checkRule(value: any, rule: ValidationRule): string | null {
    // 必填验证
    if (rule.required && (value === '' || value === null || value === undefined)) {
      return rule.message || '此字段为必填项'
    }

    // 如果值为空且不是必填，跳过其他验证
    if (!value && !rule.required) {
      return null
    }

    // 最小值验证
    if (rule.min !== undefined && Number(value) < rule.min) {
      return rule.message || `值不能小于 ${rule.min}`
    }

    // 最大值验证
    if (rule.max !== undefined && Number(value) > rule.max) {
      return rule.message || `值不能大于 ${rule.max}`
    }

    // 最小长度验证
    if (rule.minLength !== undefined && String(value).length < rule.minLength) {
      return rule.message || `长度不能少于 ${rule.minLength} 个字符`
    }

    // 最大长度验证
    if (rule.maxLength !== undefined && String(value).length > rule.maxLength) {
      return rule.message || `长度不能超过 ${rule.maxLength} 个字符`
    }

    // 正则验证
    if (rule.pattern && !rule.pattern.test(String(value))) {
      return rule.message || '格式不正确'
    }

    // 自定义验证
    if (rule.validator) {
      const result = rule.validator(value)
      if (typeof result === 'string') {
        return result
      }
      if (!result) {
        return rule.message || '验证失败'
      }
    }

    return null
  }

  /**
   * 验证所有字段
   * @example const result = validator.validateAll()
   */
  validateAll(): ValidationResult {
    this.errors.clear()
    
    for (const [name] of this.fields) {
      this.validateField(name)
    }

    return {
      valid: this.errors.size === 0,
      errors: Object.fromEntries(this.errors),
    }
  }

  /**
   * 获取字段错误
   * @example validator.getError('email')
   */
  getError(name: string): string | undefined {
    return this.errors.get(name)
  }

  /**
   * 获取所有错误
   * @example validator.getAllErrors()
   */
  getAllErrors(): Record<string, string> {
    return Object.fromEntries(this.errors)
  }

  /**
   * 检查字段是否有效
   * @example validator.isValid('email')
   */
  isValid(name: string): boolean {
    return !this.errors.has(name)
  }

  /**
   * 检查表单是否有效
   * @example validator.isFormValid()
   */
  isFormValid(): boolean {
    return this.errors.size === 0
  }

  /**
   * 重置字段
   * @example validator.reset('email')
   */
  reset(name?: string): void {
    if (name) {
      const field = this.fields.get(name)
      if (field) {
        field.touched = false
        field.dirty = false
        this.errors.delete(name)
      }
    } else {
      for (const [fieldName, field] of this.fields) {
        field.touched = false
        field.dirty = false
        this.errors.delete(fieldName)
      }
    }
  }

  /**
   * 获取字段值
   * @example validator.getValue('email')
   */
  getValue(name: string): any {
    return this.fields.get(name)?.value
  }

  /**
   * 获取所有字段值
   * @example validator.getValues()
   */
  getValues(): Record<string, any> {
    const values: Record<string, any> = {}
    for (const [name, field] of this.fields) {
      values[name] = field.value
    }
    return values
  }
}

/**
 * 常用验证规则预设
 */
const formRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '请输入有效的邮箱地址',
  },
  phone: {
    pattern: /^1[3-9]\d{9}$/,
    message: '请输入有效的手机号码',
  },
  url: {
    pattern: /^https?:\/\/.+/,
    message: '请输入有效的网址',
  },
  password: {
    minLength: 6,
    message: '密码长度至少为 6 位',
  },
  strongPassword: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: '密码必须包含大小写字母、数字和特殊字符，至少 8 位',
  },
  username: {
    pattern: /^[a-zA-Z0-9_]{3,16}$/,
    message: '用户名只能包含字母、数字和下划线，长度 3-16 位',
  },
  idCard: {
    pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    message: '请输入有效的身份证号码',
  },
  number: {
    pattern: /^\d+$/,
    message: '请输入数字',
  },
  integer: {
    pattern: /^-?\d+$/,
    message: '请输入整数',
  },
  decimal: {
    pattern: /^-?\d+(\.\d+)?$/,
    message: '请输入有效的数字',
  },
}

const form = {
  FormValidator,
  formRules,
}

export { FormValidator, formRules }
export default form
