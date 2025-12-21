/**
 * 文件处理工具函数
 */
declare const file: {
    /**
     * 获取文件扩展名
     * @example getExtension('index.ts') // 'ts'
     */
    getExtension(filename: string): string;
    /**
     * 获取文件名（不含扩展名）
     * @example getBasename('index.ts') // 'index'
     */
    getBasename(filename: string): string;
    /**
     * 获取完整文件名
     * @example getFilename('path/to/index.ts') // 'index.ts'
     */
    getFilename(filepath: string): string;
    /**
     * 获取文件目录路径
     * @example getDirectory('path/to/index.ts') // 'path/to'
     */
    getDirectory(filepath: string): string;
    /**
     * 判断文件是否具有指定扩展名
     * @example hasExtension('index.ts', 'ts') // true
     */
    hasExtension(filename: string, ext: string): boolean;
    /**
     * 改变文件扩展名
     * @example changeExtension('index.ts', 'js') // 'index.js'
     */
    changeExtension(filename: string, newExt: string): string;
    /**
     * 判断是否为文件路径格式
     * @example isFilePath('index.ts') // true
     * @example isFilePath('path/to/file.ts') // true
     */
    isFilePath(str: string): boolean;
    /**
     * 判断是否为目录路径格式
     * @example isDirectoryPath('src/') // true
     * @example isDirectoryPath('src') // true
     */
    isDirectoryPath(str: string): boolean;
    /**
     * 规范化路径分隔符（转换为前斜杠）
     * @example normalizePath('src\\utils\\index.ts') // 'src/utils/index.ts'
     */
    normalizePath(filepath: string): string;
    /**
     * 获取文件的 MIME 类型（基于扩展名）
     * @example getMimeType('index.html') // 'text/html'
     */
    getMimeType(filename: string): string;
    /**
     * 判断是否为文本文件
     * @example isTextFile('index.ts') // true
     */
    isTextFile(filename: string): boolean;
    /**
     * 判断是否为图片文件
     * @example isImageFile('image.png') // true
     */
    isImageFile(filename: string): boolean;
    /**
     * 判断是否为视频文件
     * @example isVideoFile('video.mp4') // true
     */
    isVideoFile(filename: string): boolean;
    /**
     * 判断是否为音频文件
     * @example isAudioFile('song.mp3') // true
     */
    isAudioFile(filename: string): boolean;
    /**
     * 生成唯一的文件名（添加时间戳或随机数）
     * @example generateUniqueFilename('image.png') // 'image_1703072000000.png'
     */
    generateUniqueFilename(filename: string, useTimestamp?: boolean): string;
};
export default file;
//# sourceMappingURL=file.d.ts.map