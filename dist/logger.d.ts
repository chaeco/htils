/**
 * 日志记录工具
 */
type LogLevel = 'debug' | 'info' | 'warn' | 'error';
interface LoggerOptions {
    level?: LogLevel;
    prefix?: string;
    timestamp?: boolean;
    colors?: boolean;
    maxLogs?: number;
    callback?: (log: LogEntry) => void;
}
interface LogEntry {
    timestamp: number;
    level: LogLevel;
    message: string;
    data?: any;
    stack?: string;
}
declare class Logger {
    private level;
    private prefix;
    private timestamp;
    private colors;
    private maxLogs;
    private logs;
    private callback?;
    private levelMap;
    private colorMap;
    constructor(options?: LoggerOptions);
    private getTimestamp;
    private formatMessage;
    private colorize;
    private addLog;
    private shouldLog;
    /**
     * 调试日志
     * @example logger.debug('Debug message', { data: 123 })
     */
    debug(message: string, data?: any): void;
    /**
     * 信息日志
     * @example logger.info('User logged in', { userId: 123 })
     */
    info(message: string, data?: any): void;
    /**
     * 警告日志
     * @example logger.warn('Invalid input', { input: 'xxx' })
     */
    warn(message: string, data?: any): void;
    /**
     * 错误日志
     * @example logger.error('Request failed', error)
     */
    error(message: string, error?: Error | any): void;
    /**
     * 设置日志级别
     * @example logger.setLevel('debug')
     */
    setLevel(level: LogLevel): void;
    /**
     * 获取所有日志
     * @example const logs = logger.getLogs()
     */
    getLogs(level?: LogLevel): LogEntry[];
    /**
     * 清空日志
     * @example logger.clear()
     */
    clear(): void;
    /**
     * 导出日志为 JSON
     * @example const json = logger.exportJson()
     */
    exportJson(): string;
    /**
     * 导出日志为 CSV
     * @example const csv = logger.exportCsv()
     */
    exportCsv(): string;
    /**
     * 获取日志统计信息
     * @example const stats = logger.getStats()
     */
    getStats(): Record<LogLevel, number>;
    /**
     * 性能计时
     * @example logger.time('apiCall'); ... logger.timeEnd('apiCall')
     */
    private timers;
    time(label: string): void;
    timeEnd(label: string): number;
    /**
     * 标记位置
     * @example logger.mark('checkpoint1')
     */
    mark(label: string): void;
    /**
     * 表格输出
     * @example logger.table([{name: 'John', age: 30}])
     */
    table(data: any[]): void;
}
declare const logger: Logger;
export { Logger, logger };
export default logger;
//# sourceMappingURL=logger.d.ts.map