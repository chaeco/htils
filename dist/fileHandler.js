"use strict";
/**
 * 文件处理工具 - 真实项目中的文件操作
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("./crypto"));
/**
 * 获取文件信息
 * @example getFileInfo(file)
 */
function getFileInfo(file) {
    return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        extension: file.name.split('.').pop() || '',
    };
}
/**
 * 验证文件类型
 * @example validateFileType(file, ['image/jpeg', 'image/png'])
 */
function validateFileType(file, allowedTypes) {
    return allowedTypes.includes(file.type);
}
/**
 * 验证文件大小
 * @example validateFileSize(file, 5 * 1024 * 1024) // 5MB
 */
function validateFileSize(file, maxSize) {
    return file.size <= maxSize;
}
/**
 * 格式化文件大小
 * @example formatFileSize(1024) // '1 KB'
 */
function formatFileSize(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
/**
 * 读取文件为文本
 * @example await readFileAsText(file)
 */
function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}
/**
 * 读取文件为 Data URL
 * @example await readFileAsDataURL(file)
 */
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
/**
 * 读取文件为 ArrayBuffer
 * @example await readFileAsArrayBuffer(file)
 */
function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}
/**
 * 下载文件
 * @example downloadFile('data.json', jsonString, 'application/json')
 */
function downloadFile(filename, content, type) {
    const blob = content instanceof Blob ? content : new Blob([content], { type: type || 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
/**
 * 下载 JSON 文件
 * @example downloadJSON('data.json', { key: 'value' })
 */
function downloadJSON(filename, data) {
    const json = JSON.stringify(data, null, 2);
    downloadFile(filename, json, 'application/json');
}
/**
 * 下载文本文件
 * @example downloadText('notes.txt', 'Hello World')
 */
function downloadText(filename, text) {
    downloadFile(filename, text, 'text/plain');
}
/**
 * 下载 CSV 文件
 * @example downloadCSV('data.csv', [['Name', 'Age'], ['John', '30']])
 */
function downloadCSV(filename, data) {
    const csv = data.map(row => row.join(',')).join('\n');
    downloadFile(filename, '\ufeff' + csv, 'text/csv;charset=utf-8');
}
/**
 * 图片压缩
 * @example await compressImage(file, 0.8, 1920, 1080)
 */
function compressImage(file, quality = 0.8, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                let { width, height } = img;
                // 计算新尺寸
                if (maxWidth && width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                if (maxHeight && height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    }
                    else {
                        reject(new Error('压缩失败'));
                    }
                }, file.type, quality);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}
/**
 * 获取图片尺寸
 * @example await getImageDimensions(file)
 */
function getImageDimensions(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result;
            img.onload = () => resolve({ width: img.width, height: img.height });
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}
/**
 * 创建文件选择器
 * @example await selectFile({ accept: 'image/*', multiple: false })
 */
function selectFile(options) {
    return new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        if (options.accept)
            input.accept = options.accept;
        if (options.multiple)
            input.multiple = options.multiple;
        input.onchange = () => resolve(input.files);
        input.click();
    });
}
/**
 * Base64 转 Blob
 * @example base64ToBlob(base64String, 'image/png')
 */
function base64ToBlob(base64, type = 'application/octet-stream') {
    const byteString = atob(base64.split(',')[1] || base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type });
}
/**
 * Base64 转 File
 * @example base64ToFile(base64String, 'image.png', 'image/png')
 */
function base64ToFile(base64, filename, type) {
    const blob = base64ToBlob(base64, type);
    return new File([blob], filename, { type: blob.type });
}
/**
 * 文件切片上传辅助
 * @example sliceFile(file, 1024 * 1024) // 1MB chunks
 */
function sliceFile(file, chunkSize) {
    const chunks = [];
    let start = 0;
    while (start < file.size) {
        const end = Math.min(start + chunkSize, file.size);
        chunks.push(file.slice(start, end));
        start = end;
    }
    return chunks;
}
/**
 * 计算文件 MD5
 * @example await calculateFileMD5(file)
 */
async function calculateFileMD5(file) {
    const buffer = await readFileAsArrayBuffer(file);
    return crypto_1.default.md5FromArrayBuffer(buffer);
}
/**
 * 计算文件 SHA256
 * @example await calculateFileSHA256(file)
 */
async function calculateFileSHA256(file) {
    const buffer = await readFileAsArrayBuffer(file);
    return crypto_1.default.sha256FromArrayBuffer(buffer);
}
/**
 * 计算文件 SHA512
 * @example await calculateFileSHA512(file)
 */
async function calculateFileSHA512(file) {
    const buffer = await readFileAsArrayBuffer(file);
    return crypto_1.default.sha512FromArrayBuffer(buffer);
}
/**
 * 计算文件哈希值（支持多种算法）
 * @example await calculateFileHash(file, 'sha256')
 */
async function calculateFileHash(file, algorithm = 'sha256') {
    const buffer = await readFileAsArrayBuffer(file);
    switch (algorithm) {
        case 'md5':
            return crypto_1.default.md5FromArrayBuffer(buffer);
        case 'sha256':
            return crypto_1.default.sha256FromArrayBuffer(buffer);
        case 'sha512':
            return crypto_1.default.sha512FromArrayBuffer(buffer);
        default:
            return crypto_1.default.sha256FromArrayBuffer(buffer);
    }
}
/**
 * 计算文件 ETag（强 ETag，基于 MD5）
 * @example await calculateETag(file) // '"5d41402abc4b2a76b9719d911017c592"'
 */
async function calculateETag(file) {
    const hash = await calculateFileMD5(file);
    return `"${hash}"`;
}
/**
 * 计算文件弱 ETag（W/ 前缀）
 * @example await calculateWeakETag(file) // 'W/"5d41402abc4b2a76b9719d911017c592"'
 */
async function calculateWeakETag(file) {
    const hash = await calculateFileMD5(file);
    return `W/"${hash}"`;
}
/**
 * 计算文件 ETag（基于 SHA256）
 * @example await calculateETagSHA256(file)
 */
async function calculateETagSHA256(file) {
    const hash = await calculateFileSHA256(file);
    return `"${hash}"`;
}
/**
 * 计算文件 ETag（包含文件大小和修改时间）
 * @example await calculateETagWithMetadata(file) // '"1024-1703145600000-5d414..."'
 */
async function calculateETagWithMetadata(file) {
    const hash = await calculateFileMD5(file);
    return `"${file.size}-${file.lastModified}-${hash.substring(0, 8)}"`;
}
/**
 * 验证文件 ETag 是否匹配
 * @example await validateETag(file, '"5d41402abc4b2a76b9719d911017c592"')
 */
async function validateETag(file, etag) {
    const calculatedETag = await calculateETag(file);
    return calculatedETag === etag;
}
/**
 * 比较两个文件是否相同（基于内容哈希）
 * @example await compareFiles(file1, file2)
 */
async function compareFiles(file1, file2) {
    if (file1.size !== file2.size)
        return false;
    const hash1 = await calculateFileMD5(file1);
    const hash2 = await calculateFileMD5(file2);
    return hash1 === hash2;
}
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
async function calculateOSSETag(file, chunkSize, onProgress) {
    // 单文件情况：直接返回 MD5
    if (!chunkSize || file.size <= chunkSize) {
        const buffer = await readFileAsArrayBuffer(file);
        onProgress?.(100, 1, 1);
        return crypto_1.default.md5FromArrayBuffer(buffer);
    }
    // 分片上传情况：OSS 算法
    const chunks = sliceFile(file, chunkSize);
    const totalChunks = chunks.length;
    // 计算每个分片的 MD5
    const partMD5s = [];
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const buffer = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(chunk);
        });
        partMD5s.push(crypto_1.default.md5FromArrayBuffer(buffer));
        // 报告进度
        const progress = ((i + 1) / totalChunks) * 100;
        onProgress?.(progress, i + 1, totalChunks);
    }
    // 将所有 MD5（十六进制）转为二进制并拼接
    const concatenated = new Uint8Array(partMD5s.length * 16);
    let offset = 0;
    for (const md5 of partMD5s) {
        for (let i = 0; i < 16; i++) {
            concatenated[offset++] = parseInt(md5.substring(i * 2, i * 2 + 2), 16);
        }
    }
    // 对拼接后的数据计算 MD5
    const finalMD5 = crypto_1.default.md5FromArrayBuffer(concatenated.buffer);
    return `${finalMD5}-${chunks.length}`;
}
/**
 * 验证 OSS 分片 ETag 格式
 * @example isOSSMultipartETag('5d41402abc4b2a76b9719d911017c592-10') // true
 * @example isOSSMultipartETag('5d41402abc4b2a76b9719d911017c592') // false
 */
function isOSSMultipartETag(etag) {
    return /^[a-f0-9]{32}-\d+$/i.test(etag);
}
/**
 * 解析 OSS 分片 ETag
 * @example parseOSSMultipartETag('5d41402abc4b2a76b9719d911017c592-10')
 * // 返回: { md5: '5d41402abc4b2a76b9719d911017c592', partCount: 10 }
 */
function parseOSSMultipartETag(etag) {
    const match = etag.match(/^([a-f0-9]{32})-(\d+)$/i);
    if (!match)
        return null;
    return {
        md5: match[1],
        partCount: parseInt(match[2], 10),
    };
}
/**
 * 计算文件分片信息（用于 OSS 分片上传）
 * @example getOSSChunkInfo(file, 5 * 1024 * 1024)
 * // 返回: { chunkSize: 5242880, chunkCount: 10, lastChunkSize: 1024000 }
 */
function getOSSChunkInfo(file, chunkSize = 5 * 1024 * 1024) {
    const chunkCount = Math.ceil(file.size / chunkSize);
    const lastChunkSize = file.size % chunkSize || chunkSize;
    return {
        chunkSize,
        chunkCount,
        lastChunkSize,
        totalSize: file.size,
    };
}
/**
 * 批量上传文件
 * @example await uploadFiles(files, '/api/upload', (progress) => console.log(progress))
 */
async function uploadFiles(files, url, onProgress) {
    const uploads = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const progress = (e.loaded / e.total) * 100;
                    onProgress?.(progress, file);
                }
            });
            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                }
                else {
                    reject(new Error(`上传失败: ${xhr.statusText}`));
                }
            });
            xhr.addEventListener('error', () => reject(new Error('网络错误')));
            xhr.addEventListener('abort', () => reject(new Error('上传取消')));
            xhr.open('POST', url);
            xhr.send(formData);
        });
    });
    return Promise.all(uploads);
}
const fileHandler = {
    getFileInfo,
    validateFileType,
    validateFileSize,
    formatFileSize,
    readFileAsText,
    readFileAsDataURL,
    readFileAsArrayBuffer,
    downloadFile,
    downloadJSON,
    downloadText,
    downloadCSV,
    compressImage,
    getImageDimensions,
    selectFile,
    base64ToBlob,
    base64ToFile,
    sliceFile,
    calculateFileMD5,
    calculateFileSHA256,
    calculateFileSHA512,
    calculateFileHash,
    calculateETag,
    calculateWeakETag,
    calculateETagSHA256,
    calculateETagWithMetadata,
    validateETag,
    compareFiles,
    calculateOSSETag,
    isOSSMultipartETag,
    parseOSSMultipartETag,
    getOSSChunkInfo,
    uploadFiles,
};
exports.default = fileHandler;
//# sourceMappingURL=fileHandler.js.map