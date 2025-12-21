/**
 * 文件处理工具 - 真实项目中的文件操作
 */
interface FileInfo {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    extension: string;
}
/**
 * 获取文件信息
 * @example getFileInfo(file)
 */
declare function getFileInfo(file: File): FileInfo;
/**
 * 验证文件类型
 * @example validateFileType(file, ['image/jpeg', 'image/png'])
 */
declare function validateFileType(file: File, allowedTypes: string[]): boolean;
/**
 * 验证文件大小
 * @example validateFileSize(file, 5 * 1024 * 1024) // 5MB
 */
declare function validateFileSize(file: File, maxSize: number): boolean;
/**
 * 格式化文件大小
 * @example formatFileSize(1024) // '1 KB'
 */
declare function formatFileSize(bytes: number): string;
/**
 * 读取文件为文本
 * @example await readFileAsText(file)
 */
declare function readFileAsText(file: File): Promise<string>;
/**
 * 读取文件为 Data URL
 * @example await readFileAsDataURL(file)
 */
declare function readFileAsDataURL(file: File): Promise<string>;
/**
 * 读取文件为 ArrayBuffer
 * @example await readFileAsArrayBuffer(file)
 */
declare function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer>;
/**
 * 下载文件
 * @example downloadFile('data.json', jsonString, 'application/json')
 */
declare function downloadFile(filename: string, content: string | Blob, type?: string): void;
/**
 * 下载 JSON 文件
 * @example downloadJSON('data.json', { key: 'value' })
 */
declare function downloadJSON(filename: string, data: any): void;
/**
 * 下载文本文件
 * @example downloadText('notes.txt', 'Hello World')
 */
declare function downloadText(filename: string, text: string): void;
/**
 * 下载 CSV 文件
 * @example downloadCSV('data.csv', [['Name', 'Age'], ['John', '30']])
 */
declare function downloadCSV(filename: string, data: string[][]): void;
/**
 * 图片压缩
 * @example await compressImage(file, 0.8, 1920, 1080)
 */
declare function compressImage(file: File, quality?: number, maxWidth?: number, maxHeight?: number): Promise<Blob>;
/**
 * 获取图片尺寸
 * @example await getImageDimensions(file)
 */
declare function getImageDimensions(file: File): Promise<{
    width: number;
    height: number;
}>;
/**
 * 创建文件选择器
 * @example await selectFile({ accept: 'image/*', multiple: false })
 */
declare function selectFile(options: {
    accept?: string;
    multiple?: boolean;
}): Promise<FileList | null>;
/**
 * Base64 转 Blob
 * @example base64ToBlob(base64String, 'image/png')
 */
declare function base64ToBlob(base64: string, type?: string): Blob;
/**
 * Base64 转 File
 * @example base64ToFile(base64String, 'image.png', 'image/png')
 */
declare function base64ToFile(base64: string, filename: string, type?: string): File;
/**
 * 文件切片上传辅助
 * @example sliceFile(file, 1024 * 1024) // 1MB chunks
 */
declare function sliceFile(file: File, chunkSize: number): Blob[];
/**
 * 计算文件 MD5
 * @example await calculateFileMD5(file)
 */
declare function calculateFileMD5(file: File): Promise<string>;
/**
 * 计算文件 SHA256
 * @example await calculateFileSHA256(file)
 */
declare function calculateFileSHA256(file: File): Promise<string>;
/**
 * 计算文件 SHA512
 * @example await calculateFileSHA512(file)
 */
declare function calculateFileSHA512(file: File): Promise<string>;
/**
 * 计算文件哈希值（支持多种算法）
 * @example await calculateFileHash(file, 'sha256')
 */
declare function calculateFileHash(file: File, algorithm?: 'md5' | 'sha256' | 'sha512'): Promise<string>;
/**
 * 计算文件 ETag（强 ETag，基于 MD5）
 * @example await calculateETag(file) // '"5d41402abc4b2a76b9719d911017c592"'
 */
declare function calculateETag(file: File): Promise<string>;
/**
 * 计算文件弱 ETag（W/ 前缀）
 * @example await calculateWeakETag(file) // 'W/"5d41402abc4b2a76b9719d911017c592"'
 */
declare function calculateWeakETag(file: File): Promise<string>;
/**
 * 计算文件 ETag（基于 SHA256）
 * @example await calculateETagSHA256(file)
 */
declare function calculateETagSHA256(file: File): Promise<string>;
/**
 * 计算文件 ETag（包含文件大小和修改时间）
 * @example await calculateETagWithMetadata(file) // '"1024-1703145600000-5d414..."'
 */
declare function calculateETagWithMetadata(file: File): Promise<string>;
/**
 * 验证文件 ETag 是否匹配
 * @example await validateETag(file, '"5d41402abc4b2a76b9719d911017c592"')
 */
declare function validateETag(file: File, etag: string): Promise<boolean>;
/**
 * 比较两个文件是否相同（基于内容哈希）
 * @example await compareFiles(file1, file2)
 */
declare function compareFiles(file1: File, file2: File): Promise<boolean>;
/**
 * 计算阿里云 OSS/AWS S3 ETag
 * @param file 文件对象
 * @param chunkSize 分片大小（不传或文件小于此值则返回单文件 MD5）
 * @param onProgress 进度回调 (当前进度 0-100, 当前分片索引, 总分片数)
 * @example
 * // 单文件: calculateOSSETag(file)
 * // 返回: '5d41402abc4b2a76b9719d911017c592'
 *
 * // 分片上传带进度:
 * calculateOSSETag(file, 5 * 1024 * 1024, (progress, current, total) => {
 *   console.log(`计算中: ${progress.toFixed(2)}% (${current}/${total})`)
 * })
 * // 返回: '5d41402abc4b2a76b9719d911017c592-10'
 */
declare function calculateOSSETag(file: File, chunkSize?: number, onProgress?: (progress: number, current: number, total: number) => void): Promise<string>;
/**
 * 验证 OSS 分片 ETag 格式
 * @example isOSSMultipartETag('5d41402abc4b2a76b9719d911017c592-10') // true
 * @example isOSSMultipartETag('5d41402abc4b2a76b9719d911017c592') // false
 */
declare function isOSSMultipartETag(etag: string): boolean;
/**
 * 解析 OSS 分片 ETag
 * @example parseOSSMultipartETag('5d41402abc4b2a76b9719d911017c592-10')
 * // 返回: { md5: '5d41402abc4b2a76b9719d911017c592', partCount: 10 }
 */
declare function parseOSSMultipartETag(etag: string): {
    md5: string;
    partCount: number;
} | null;
/**
 * 计算文件分片信息（用于 OSS 分片上传）
 * @example getOSSChunkInfo(file, 5 * 1024 * 1024)
 * // 返回: { chunkSize: 5242880, chunkCount: 10, lastChunkSize: 1024000 }
 */
declare function getOSSChunkInfo(file: File, chunkSize?: number): {
    chunkSize: number;
    chunkCount: number;
    lastChunkSize: number;
    totalSize: number;
};
/**
 * 批量上传文件
 * @example await uploadFiles(files, '/api/upload', (progress) => console.log(progress))
 */
declare function uploadFiles(files: File[], url: string, onProgress?: (progress: number, file: File) => void): Promise<any[]>;
declare const fileHandler: {
    getFileInfo: typeof getFileInfo;
    validateFileType: typeof validateFileType;
    validateFileSize: typeof validateFileSize;
    formatFileSize: typeof formatFileSize;
    readFileAsText: typeof readFileAsText;
    readFileAsDataURL: typeof readFileAsDataURL;
    readFileAsArrayBuffer: typeof readFileAsArrayBuffer;
    downloadFile: typeof downloadFile;
    downloadJSON: typeof downloadJSON;
    downloadText: typeof downloadText;
    downloadCSV: typeof downloadCSV;
    compressImage: typeof compressImage;
    getImageDimensions: typeof getImageDimensions;
    selectFile: typeof selectFile;
    base64ToBlob: typeof base64ToBlob;
    base64ToFile: typeof base64ToFile;
    sliceFile: typeof sliceFile;
    calculateFileMD5: typeof calculateFileMD5;
    calculateFileSHA256: typeof calculateFileSHA256;
    calculateFileSHA512: typeof calculateFileSHA512;
    calculateFileHash: typeof calculateFileHash;
    calculateETag: typeof calculateETag;
    calculateWeakETag: typeof calculateWeakETag;
    calculateETagSHA256: typeof calculateETagSHA256;
    calculateETagWithMetadata: typeof calculateETagWithMetadata;
    validateETag: typeof validateETag;
    compareFiles: typeof compareFiles;
    calculateOSSETag: typeof calculateOSSETag;
    isOSSMultipartETag: typeof isOSSMultipartETag;
    parseOSSMultipartETag: typeof parseOSSMultipartETag;
    getOSSChunkInfo: typeof getOSSChunkInfo;
    uploadFiles: typeof uploadFiles;
};
export type { FileInfo };
export default fileHandler;
//# sourceMappingURL=fileHandler.d.ts.map