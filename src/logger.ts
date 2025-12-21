/**
 * 日志记录工具
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'
type LogColor = 'default' | 'success' | 'warning' | 'error' | 'info'

interface LoggerOptions {
  level?: LogLevel
  prefix?: string
  timestamp?: boolean
  colors?: boolean
  maxLogs?: number
  callback?: (log: LogEntry) => void
}

interface LogEntry {
  timestamp: number
  level: LogLevel
  message: string
  data?: any
  stack?: string
}

class Logger {
  private level: LogLevel = 'info'
  private prefix: string = '[LOG]'
  private timestamp: boolean = true
  private colors: boolean = true
  private maxLogs: number = 1000
  private logs: LogEntry[] = []
  private callback?: (log: LogEntry) => void

  private levelMap: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  }

  private colorMap: Record<LogColor, string> = {
    default: '\x1b[0m',
    success: '\x1b[32m',
    warning: '\x1b[33m',
    error: '\x1b[31m',
    info: '\x1b[36m',
  }

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || 'info'
    this.prefix = options.prefix || '[LOG]'
    this.timestamp = options.timestamp !== false
    this.colors = options.colors !== false
    this.maxLogs = options.maxLogs || 1000
    this.callback = options.callback
  }

  private getTimestamp(): string {
    const now = new Date()
    return now.toISOString()
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timeStr = this.timestamp ? `[${this.getTimestamp()}]` : ''
    const prefixStr = this.prefix ? `${this.prefix}` : ''
    return `${timeStr} ${prefixStr} [${level.toUpperCase()}] ${message}`
  }

  private colorize(text: string, color: LogColor): string {
    if (!this.colors || typeof window !== 'undefined') return text
    return `${this.colorMap[color]}${text}${this.colorMap.default}`
  }

  private addLog(entry: LogEntry): void {
    this.logs.push(entry)
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }
    this.callback?.(entry)
  }

  private shouldLog(level: LogLevel): boolean {
    return this.levelMap[level] >= this.levelMap[this.level]
  }

  /**
   * 调试日志
   * @example logger.debug('Debug message', { data: 123 })
   */
  debug(message: string, data?: any): void {
    if (!this.shouldLog('debug')) return
    const entry: LogEntry = {
      timestamp: Date.now(),
      level: 'debug',
      message,
      data,
    }
    this.addLog(entry)
    console.log(this.colorize(this.formatMessage('debug', message), 'default'), data || '')
  }

  /**
   * 信息日志
   * @example logger.info('User logged in', { userId: 123 })
   */
  info(message: string, data?: any): void {
    if (!this.shouldLog('info')) return
    const entry: LogEntry = {
      timestamp: Date.now(),
      level: 'info',
      message,
      data,
    }
    this.addLog(entry)
    console.log(this.colorize(this.formatMessage('info', message), 'info'), data || '')
  }

  /**
   * 警告日志
   * @example logger.warn('Invalid input', { input: 'xxx' })
   */
  warn(message: string, data?: any): void {
    if (!this.shouldLog('warn')) return
    const entry: LogEntry = {
      timestamp: Date.now(),
      level: 'warn',
      message,
      data,
    }
    this.addLog(entry)
    console.warn(this.colorize(this.formatMessage('warn', message), 'warning'), data || '')
  }

  /**
   * 错误日志
   * @example logger.error('Request failed', error)
   */
  error(message: string, error?: Error | any): void {
    if (!this.shouldLog('error')) return
    const entry: LogEntry = {
      timestamp: Date.now(),
      level: 'error',
      message,
      data: error,
      stack: error?.stack,
    }
    this.addLog(entry)
    console.error(this.colorize(this.formatMessage('error', message), 'error'), error || '')
  }

  /**
   * 设置日志级别
   * @example logger.setLevel('debug')
   */
  setLevel(level: LogLevel): void {
    this.level = level
  }

  /**
   * 获取所有日志
   * @example const logs = logger.getLogs()
   */
  getLogs(level?: LogLevel): LogEntry[] {
    return level ? this.logs.filter(log => log.level === level) : [...this.logs]
  }

  /**
   * 清空日志
   * @example logger.clear()
   */
  clear(): void {
    this.logs = []
  }

  /**
   * 导出日志为 JSON
   * @example const json = logger.exportJson()
   */
  exportJson(): string {
    return JSON.stringify(this.logs, null, 2)
  }

  /**
   * 导出日志为 CSV
   * @example const csv = logger.exportCsv()
   */
  exportCsv(): string {
    if (this.logs.length === 0) return ''

    const headers = ['timestamp', 'level', 'message', 'data', 'stack']
    const rows = this.logs.map(log => [
      new Date(log.timestamp).toISOString(),
      log.level,
      log.message,
      JSON.stringify(log.data || ''),
      log.stack || '',
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n')

    return csvContent
  }

  /**
   * 获取日志统计信息
   * @example const stats = logger.getStats()
   */
  getStats(): Record<LogLevel, number> {
    return {
      debug: this.logs.filter(log => log.level === 'debug').length,
      info: this.logs.filter(log => log.level === 'info').length,
      warn: this.logs.filter(log => log.level === 'warn').length,
      error: this.logs.filter(log => log.level === 'error').length,
    }
  }

  /**
   * 性能计时
   * @example logger.time('apiCall'); ... logger.timeEnd('apiCall')
   */
  private timers: Record<string, number> = {}

  time(label: string): void {
    this.timers[label] = Date.now()
  }

  timeEnd(label: string): number {
    const startTime = this.timers[label]
    if (!startTime) {
      this.warn(`Timer "${label}" not found`)
      return 0
    }
    const duration = Date.now() - startTime
    this.info(`${label}: ${duration}ms`)
    delete this.timers[label]
    return duration
  }

  /**
   * 标记位置
   * @example logger.mark('checkpoint1')
   */
  mark(label: string): void {
    this.info(`✓ ${label}`)
  }

  /**
   * 表格输出
   * @example logger.table([{name: 'John', age: 30}])
   */
  table(data: any[]): void {
    console.table(data)
    this.info(`Table output: ${data.length} items`)
  }
}

const logger = new Logger()

export { Logger, logger }
export default logger
