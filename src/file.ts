/**
 * 文件处理工具函数
 */

const file = {
  /**
   * 获取文件扩展名
   * @example getExtension('index.ts') // 'ts'
   */
  getExtension(filename: string): string {
    const index = filename.lastIndexOf('.')
    return index > 0 ? filename.slice(index + 1) : ''
  },

  /**
   * 获取文件名（不含扩展名）
   * @example getBasename('index.ts') // 'index'
   */
  getBasename(filename: string): string {
    const index = filename.lastIndexOf('.')
    return index > 0 ? filename.slice(0, index) : filename
  },

  /**
   * 获取完整文件名
   * @example getFilename('path/to/index.ts') // 'index.ts'
   */
  getFilename(filepath: string): string {
    return filepath.split('/').pop() || filepath
  },

  /**
   * 获取文件目录路径
   * @example getDirectory('path/to/index.ts') // 'path/to'
   */
  getDirectory(filepath: string): string {
    const parts = filepath.split('/')
    return parts.slice(0, -1).join('/') || '.'
  },

  /**
   * 判断文件是否具有指定扩展名
   * @example hasExtension('index.ts', 'ts') // true
   */
  hasExtension(filename: string, ext: string): boolean {
    const extension = this.getExtension(filename)
    return extension.toLowerCase() === ext.toLowerCase()
  },

  /**
   * 改变文件扩展名
   * @example changeExtension('index.ts', 'js') // 'index.js'
   */
  changeExtension(filename: string, newExt: string): string {
    const basename = this.getBasename(filename)
    return `${basename}.${newExt}`
  },

  /**
   * 判断是否为文件路径格式
   * @example isFilePath('index.ts') // true
   * @example isFilePath('path/to/file.ts') // true
   */
  isFilePath(str: string): boolean {
    return /\.[a-zA-Z0-9]+$/.test(str)
  },

  /**
   * 判断是否为目录路径格式
   * @example isDirectoryPath('src/') // true
   * @example isDirectoryPath('src') // true
   */
  isDirectoryPath(str: string): boolean {
    return !this.isFilePath(str)
  },

  /**
   * 规范化路径分隔符（转换为前斜杠）
   * @example normalizePath('src\\utils\\index.ts') // 'src/utils/index.ts'
   */
  normalizePath(filepath: string): string {
    return filepath.replace(/\\/g, '/')
  },

  /**
   * 获取文件的 MIME 类型（基于扩展名）
   * @example getMimeType('index.html') // 'text/html'
   */
  getMimeType(filename: string): string {
    const ext = this.getExtension(filename).toLowerCase()
    const mimeMap: Record<string, string> = {
      'html': 'text/html',
      'htm': 'text/html',
      'css': 'text/css',
      'js': 'text/javascript',
      'json': 'application/json',
      'xml': 'application/xml',
      'pdf': 'application/pdf',
      'zip': 'application/zip',
      'txt': 'text/plain',
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'svg': 'image/svg+xml',
      'webp': 'image/webp',
      'mp4': 'video/mp4',
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
      'ts': 'text/typescript',
      'tsx': 'text/typescript',
      'jsx': 'text/javascript',
    }
    return mimeMap[ext] || 'application/octet-stream'
  },

  /**
   * 判断是否为文本文件
   * @example isTextFile('index.ts') // true
   */
  isTextFile(filename: string): boolean {
    const ext = this.getExtension(filename).toLowerCase()
    const textExtensions = ['txt', 'js', 'ts', 'jsx', 'tsx', 'html', 'css', 'json', 'md', 'yml', 'yaml', 'xml', 'svg', 'py', 'java', 'cpp', 'c', 'java']
    return textExtensions.includes(ext)
  },

  /**
   * 判断是否为图片文件
   * @example isImageFile('image.png') // true
   */
  isImageFile(filename: string): boolean {
    const ext = this.getExtension(filename).toLowerCase()
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp', 'tiff']
    return imageExtensions.includes(ext)
  },

  /**
   * 判断是否为视频文件
   * @example isVideoFile('video.mp4') // true
   */
  isVideoFile(filename: string): boolean {
    const ext = this.getExtension(filename).toLowerCase()
    const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'flv', 'wmv', 'webm']
    return videoExtensions.includes(ext)
  },

  /**
   * 判断是否为音频文件
   * @example isAudioFile('song.mp3') // true
   */
  isAudioFile(filename: string): boolean {
    const ext = this.getExtension(filename).toLowerCase()
    const audioExtensions = ['mp3', 'wav', 'flac', 'aac', 'wma', 'ogg']
    return audioExtensions.includes(ext)
  },

  /**
   * 生成唯一的文件名（添加时间戳或随机数）
   * @example generateUniqueFilename('image.png') // 'image_1703072000000.png'
   */
  generateUniqueFilename(filename: string, useTimestamp: boolean = true): string {
    const basename = this.getBasename(filename)
    const ext = this.getExtension(filename)
    const suffix = useTimestamp ? `_${Date.now()}` : `_${Math.random().toString(36).slice(2, 9)}`
    return ext ? `${basename}${suffix}.${ext}` : `${basename}${suffix}`
  },
}

export default file
