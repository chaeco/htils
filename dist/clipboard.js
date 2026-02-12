"use strict";
/**
 * 剪贴板操作工具 - 复制、粘贴、读取剪贴板
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 复制文本到剪贴板（现代浏览器）
 * @example await copy('Hello World')
 */
async function copy(text) {
    // 优先使用 Clipboard API
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof window !== 'undefined' && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        }
        catch (error) {
            console.error('Clipboard API failed:', error);
        }
    }
    // 降级方案：使用 execCommand
    return copyFallback(text);
}
/**
 * 复制文本的降级方案（兼容老浏览器）
 */
function copyFallback(text) {
    if (typeof document === 'undefined')
        return false;
    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '-9999px';
        textarea.setAttribute('readonly', '');
        document.body.appendChild(textarea);
        // iOS 兼容
        if (typeof navigator !== 'undefined' && navigator.userAgent.match(/ipad|iphone/i)) {
            const range = document.createRange();
            range.selectNodeContents(textarea);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
            textarea.setSelectionRange(0, text.length);
        }
        else {
            textarea.select();
        }
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
    }
    catch (error) {
        console.error('Copy fallback failed:', error);
        return false;
    }
}
/**
 * 从剪贴板读取文本
 * @example const text = await paste()
 */
async function paste() {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof window !== 'undefined' && window.isSecureContext) {
        try {
            return await navigator.clipboard.readText();
        }
        catch (error) {
            console.error('Clipboard read failed:', error);
            throw new Error('无法读取剪贴板内容，可能需要用户授权');
        }
    }
    throw new Error('当前环境不支持读取剪贴板');
}
/**
 * 复制 HTML 到剪贴板
 * @example await copyHTML('<p>Hello <strong>World</strong></p>')
 */
async function copyHTML(html) {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof window !== 'undefined' && window.isSecureContext) {
        try {
            const blob = new Blob([html], { type: 'text/html' });
            const data = [new window.ClipboardItem({ 'text/html': blob })];
            await navigator.clipboard.write(data);
            return true;
        }
        catch (error) {
            console.error('Copy HTML failed:', error);
            return false;
        }
    }
    // 降级：只复制纯文本
    const text = html.replace(/<[^>]*>/g, '');
    return copyFallback(text);
}
/**
 * 复制图片到剪贴板
 * @example await copyImage(blob)
 */
async function copyImage(blob) {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof window !== 'undefined' && window.isSecureContext) {
        try {
            const data = [new window.ClipboardItem({ [blob.type]: blob })];
            await navigator.clipboard.write(data);
            return true;
        }
        catch (error) {
            console.error('Copy image failed:', error);
            return false;
        }
    }
    throw new Error('当前环境不支持复制图片');
}
/**
 * 复制图片 URL 为图片
 * @example await copyImageFromURL('https://example.com/image.png')
 */
async function copyImageFromURL(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return await copyImage(blob);
    }
    catch (error) {
        console.error('Copy image from URL failed:', error);
        return false;
    }
}
/**
 * 从剪贴板读取图片
 * @example const blob = await pasteImage()
 */
async function pasteImage() {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof window !== 'undefined' && window.isSecureContext) {
        try {
            const items = await navigator.clipboard.read();
            for (const item of items) {
                for (const type of item.types) {
                    if (type.startsWith('image/')) {
                        return await item.getType(type);
                    }
                }
            }
            return null;
        }
        catch (error) {
            console.error('Paste image failed:', error);
            return null;
        }
    }
    throw new Error('当前环境不支持读取剪贴板图片');
}
/**
 * 监听剪贴板变化（仅支持文本）
 * @example onPaste((text) => console.log('粘贴:', text))
 */
function onPaste(callback) {
    if (typeof document === 'undefined')
        return () => { };
    const handler = async (e) => {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain');
        if (text) {
            callback(text);
        }
    };
    document.addEventListener('paste', handler);
    // 返回取消监听的函数
    return () => {
        document.removeEventListener('paste', handler);
    };
}
/**
 * 监听复制事件
 * @example onCopy((text) => console.log('复制:', text))
 */
function onCopy(callback) {
    if (typeof document === 'undefined')
        return () => { };
    const handler = (e) => {
        const selection = typeof window !== 'undefined' ? window.getSelection() : null;
        const text = selection?.toString() || '';
        if (text) {
            callback(text);
        }
    };
    document.addEventListener('copy', handler);
    return () => {
        document.removeEventListener('copy', handler);
    };
}
/**
 * 拦截复制事件并修改内容
 * @example interceptCopy((text) => text + '\n来源: example.com')
 */
function interceptCopy(modifier) {
    if (typeof document === 'undefined')
        return () => { };
    const handler = (e) => {
        e.preventDefault();
        const selection = typeof window !== 'undefined' ? window.getSelection() : null;
        const text = selection?.toString() || '';
        if (text && e.clipboardData) {
            const modifiedText = modifier(text);
            e.clipboardData.setData('text/plain', modifiedText);
        }
    };
    document.addEventListener('copy', handler);
    return () => {
        document.removeEventListener('copy', handler);
    };
}
/**
 * 复制 DOM 元素为图片
 * @example await copyElementAsImage(element)
 */
async function copyElementAsImage(element) {
    try {
        // 需要配合 html2canvas 或类似库使用
        // 这里提供接口定义
        throw new Error('需要引入 html2canvas 库来实现此功能');
    }
    catch (error) {
        console.error('Copy element as image failed:', error);
        return false;
    }
}
/**
 * 检查是否支持剪贴板 API
 * @example supportsClipboard() // true/false
 */
function supportsClipboard() {
    return !!(typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        typeof window !== 'undefined' &&
        window.isSecureContext);
}
/**
 * 请求剪贴板权限
 * @example await requestPermission()
 */
async function requestPermission() {
    if (typeof navigator === 'undefined' || !navigator.permissions)
        return false;
    try {
        const result = await navigator.permissions.query({ name: 'clipboard-read' });
        return result.state === 'granted';
    }
    catch (error) {
        console.error('Request clipboard permission failed:', error);
        return false;
    }
}
/**
 * 复制多种格式到剪贴板
 * @example await copyMultiple({ text: 'Hello', html: '<p>Hello</p>' })
 */
async function copyMultiple(data) {
    if (typeof navigator === 'undefined' ||
        !navigator.clipboard ||
        typeof window === 'undefined' ||
        !window.isSecureContext) {
        // 降级：只复制文本
        if (data.text) {
            return copyFallback(data.text);
        }
        return false;
    }
    try {
        const items = {};
        if (data.text) {
            items['text/plain'] = new Blob([data.text], { type: 'text/plain' });
        }
        if (data.html) {
            items['text/html'] = new Blob([data.html], { type: 'text/html' });
        }
        if (data.rtf) {
            items['text/rtf'] = new Blob([data.rtf], { type: 'text/rtf' });
        }
        const clipboardItem = new window.ClipboardItem(items);
        await navigator.clipboard.write([clipboardItem]);
        return true;
    }
    catch (error) {
        console.error('Copy multiple formats failed:', error);
        return false;
    }
}
const clipboard = {
    copy,
    copyFallback,
    paste,
    copyHTML,
    copyImage,
    copyImageFromURL,
    pasteImage,
    copyElementAsImage,
    copyMultiple,
    onPaste,
    onCopy,
    interceptCopy,
    supportsClipboard,
    requestPermission,
};
exports.default = clipboard;
//# sourceMappingURL=clipboard.js.map