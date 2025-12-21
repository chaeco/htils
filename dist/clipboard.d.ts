/**
 * 剪贴板操作工具 - 复制、粘贴、读取剪贴板
 */
/**
 * 复制文本到剪贴板（现代浏览器）
 * @example await copy('Hello World')
 */
declare function copy(text: string): Promise<boolean>;
/**
 * 复制文本的降级方案（兼容老浏览器）
 */
declare function copyFallback(text: string): boolean;
/**
 * 从剪贴板读取文本
 * @example const text = await paste()
 */
declare function paste(): Promise<string>;
/**
 * 复制 HTML 到剪贴板
 * @example await copyHTML('<p>Hello <strong>World</strong></p>')
 */
declare function copyHTML(html: string): Promise<boolean>;
/**
 * 复制图片到剪贴板
 * @example await copyImage(blob)
 */
declare function copyImage(blob: Blob): Promise<boolean>;
/**
 * 复制图片 URL 为图片
 * @example await copyImageFromURL('https://example.com/image.png')
 */
declare function copyImageFromURL(url: string): Promise<boolean>;
/**
 * 从剪贴板读取图片
 * @example const blob = await pasteImage()
 */
declare function pasteImage(): Promise<Blob | null>;
/**
 * 监听剪贴板变化（仅支持文本）
 * @example onPaste((text) => console.log('粘贴:', text))
 */
declare function onPaste(callback: (text: string) => void): () => void;
/**
 * 监听复制事件
 * @example onCopy((text) => console.log('复制:', text))
 */
declare function onCopy(callback: (text: string) => void): () => void;
/**
 * 拦截复制事件并修改内容
 * @example interceptCopy((text) => text + '\n来源: example.com')
 */
declare function interceptCopy(modifier: (text: string) => string): () => void;
/**
 * 复制 DOM 元素为图片
 * @example await copyElementAsImage(element)
 */
declare function copyElementAsImage(element: HTMLElement): Promise<boolean>;
/**
 * 检查是否支持剪贴板 API
 * @example supportsClipboard() // true/false
 */
declare function supportsClipboard(): boolean;
/**
 * 请求剪贴板权限
 * @example await requestPermission()
 */
declare function requestPermission(): Promise<boolean>;
/**
 * 复制多种格式到剪贴板
 * @example await copyMultiple({ text: 'Hello', html: '<p>Hello</p>' })
 */
declare function copyMultiple(data: {
    text?: string;
    html?: string;
    rtf?: string;
}): Promise<boolean>;
declare const clipboard: {
    copy: typeof copy;
    copyFallback: typeof copyFallback;
    paste: typeof paste;
    copyHTML: typeof copyHTML;
    copyImage: typeof copyImage;
    copyImageFromURL: typeof copyImageFromURL;
    pasteImage: typeof pasteImage;
    copyElementAsImage: typeof copyElementAsImage;
    copyMultiple: typeof copyMultiple;
    onPaste: typeof onPaste;
    onCopy: typeof onCopy;
    interceptCopy: typeof interceptCopy;
    supportsClipboard: typeof supportsClipboard;
    requestPermission: typeof requestPermission;
};
export default clipboard;
//# sourceMappingURL=clipboard.d.ts.map