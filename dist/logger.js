"use strict";
/**
 * 日志记录工具
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
class Logger {
    constructor(options = {}) {
        this.level = 'info';
        this.prefix = '[LOG]';
        this.timestamp = true;
        this.colors = true;
        this.maxLogs = 1000;
        this.logs = [];
        this.levelMap = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3,
        };
        this.colorMap = {
            default: '\x1b[0m',
            success: '\x1b[32m',
            warning: '\x1b[33m',
            error: '\x1b[31m',
            info: '\x1b[36m',
        };
        /**
         * 性能计时
         * @example logger.time('apiCall'); ... logger.timeEnd('apiCall')
         */
        this.timers = {};
        this.level = options.level || 'info';
        this.prefix = options.prefix || '[LOG]';
        this.timestamp = options.timestamp !== false;
        this.colors = options.colors !== false;
        this.maxLogs = options.maxLogs || 1000;
        this.callback = options.callback;
    }
    getTimestamp() {
        const now = new Date();
        return now.toISOString();
    }
    formatMessage(level, message) {
        const timeStr = this.timestamp ? `[${this.getTimestamp()}]` : '';
        const prefixStr = this.prefix ? `${this.prefix}` : '';
        return `${timeStr} ${prefixStr} [${level.toUpperCase()}] ${message}`;
    }
    colorize(text, color) {
        if (!this.colors || typeof window !== 'undefined')
            return text;
        return `${this.colorMap[color]}${text}${this.colorMap.default}`;
    }
    addLog(entry) {
        this.logs.push(entry);
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
        this.callback?.(entry);
    }
    shouldLog(level) {
        return this.levelMap[level] >= this.levelMap[this.level];
    }
    /**
     * 调试日志
     * @example logger.debug('Debug message', { data: 123 })
     */
    debug(message, data) {
        if (!this.shouldLog('debug'))
            return;
        const entry = {
            timestamp: Date.now(),
            level: 'debug',
            message,
            data,
        };
        this.addLog(entry);
        console.log(this.colorize(this.formatMessage('debug', message), 'default'), data || '');
    }
    /**
     * 信息日志
     * @example logger.info('User logged in', { userId: 123 })
     */
    info(message, data) {
        if (!this.shouldLog('info'))
            return;
        const entry = {
            timestamp: Date.now(),
            level: 'info',
            message,
            data,
        };
        this.addLog(entry);
        console.log(this.colorize(this.formatMessage('info', message), 'info'), data || '');
    }
    /**
     * 警告日志
     * @example logger.warn('Invalid input', { input: 'xxx' })
     */
    warn(message, data) {
        if (!this.shouldLog('warn'))
            return;
        const entry = {
            timestamp: Date.now(),
            level: 'warn',
            message,
            data,
        };
        this.addLog(entry);
        console.warn(this.colorize(this.formatMessage('warn', message), 'warning'), data || '');
    }
    /**
     * 错误日志
     * @example logger.error('Request failed', error)
     */
    error(message, error) {
        if (!this.shouldLog('error'))
            return;
        const entry = {
            timestamp: Date.now(),
            level: 'error',
            message,
            data: error,
            stack: error?.stack,
        };
        this.addLog(entry);
        console.error(this.colorize(this.formatMessage('error', message), 'error'), error || '');
    }
    /**
     * 设置日志级别
     * @example logger.setLevel('debug')
     */
    setLevel(level) {
        this.level = level;
    }
    /**
     * 获取所有日志
     * @example const logs = logger.getLogs()
     */
    getLogs(level) {
        return level ? this.logs.filter(log => log.level === level) : [...this.logs];
    }
    /**
     * 清空日志
     * @example logger.clear()
     */
    clear() {
        this.logs = [];
    }
    /**
     * 导出日志为 JSON
     * @example const json = logger.exportJson()
     */
    exportJson() {
        return JSON.stringify(this.logs, null, 2);
    }
    /**
     * 导出日志为 CSV
     * @example const csv = logger.exportCsv()
     */
    exportCsv() {
        if (this.logs.length === 0)
            return '';
        const headers = ['timestamp', 'level', 'message', 'data', 'stack'];
        const rows = this.logs.map(log => [
            new Date(log.timestamp).toISOString(),
            log.level,
            log.message,
            JSON.stringify(log.data || ''),
            log.stack || '',
        ]);
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
        ].join('\n');
        return csvContent;
    }
    /**
     * 获取日志统计信息
     * @example const stats = logger.getStats()
     */
    getStats() {
        return {
            debug: this.logs.filter(log => log.level === 'debug').length,
            info: this.logs.filter(log => log.level === 'info').length,
            warn: this.logs.filter(log => log.level === 'warn').length,
            error: this.logs.filter(log => log.level === 'error').length,
        };
    }
    time(label) {
        this.timers[label] = Date.now();
    }
    timeEnd(label) {
        const startTime = this.timers[label];
        if (!startTime) {
            this.warn(`Timer "${label}" not found`);
            return 0;
        }
        const duration = Date.now() - startTime;
        this.info(`${label}: ${duration}ms`);
        delete this.timers[label];
        return duration;
    }
    /**
     * 标记位置
     * @example logger.mark('checkpoint1')
     */
    mark(label) {
        this.info(`✓ ${label}`);
    }
    /**
     * 表格输出
     * @example logger.table([{name: 'John', age: 30}])
     */
    table(data) {
        console.table(data);
        this.info(`Table output: ${data.length} items`);
    }
}
exports.Logger = Logger;
const logger = new Logger();
exports.logger = logger;
exports.default = logger;
//# sourceMappingURL=logger.js.map