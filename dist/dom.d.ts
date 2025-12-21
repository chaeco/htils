/**
 * DOM 操作工具 - 浏览器环境常用 DOM 操作
 */
/**
 * 查询单个元素
 * @example querySelector('.class')
 */
declare function querySelector<T extends Element = Element>(selector: string, parent?: Element | Document): T | null;
/**
 * 查询多个元素
 * @example querySelectorAll('.item')
 */
declare function querySelectorAll<T extends Element = Element>(selector: string, parent?: Element | Document): T[];
/**
 * 添加类名
 * @example addClass(el, 'active')
 */
declare function addClass(element: Element, ...classNames: string[]): void;
/**
 * 移除类名
 * @example removeClass(el, 'active')
 */
declare function removeClass(element: Element, ...classNames: string[]): void;
/**
 * 切换类名
 * @example toggleClass(el, 'active')
 */
declare function toggleClass(element: Element, className: string, force?: boolean): boolean;
/**
 * 检查是否包含类名
 * @example hasClass(el, 'active')
 */
declare function hasClass(element: Element, className: string): boolean;
/**
 * 获取/设置元素属性
 * @example attr(el, 'data-id') // get
 * @example attr(el, 'data-id', '123') // set
 */
declare function attr(element: Element, name: string, value?: string): string | null | void;
/**
 * 移除元素属性
 * @example removeAttr(el, 'data-id')
 */
declare function removeAttr(element: Element, name: string): void;
/**
 * 获取/设置元素样式
 * @example css(el, 'color') // get
 * @example css(el, 'color', 'red') // set
 * @example css(el, { color: 'red', fontSize: '14px' }) // set multiple
 */
declare function css(element: HTMLElement, prop: string | Record<string, string>, value?: string): string | void;
/**
 * 显示元素
 * @example show(el)
 */
declare function show(element: HTMLElement, display?: string): void;
/**
 * 隐藏元素
 * @example hide(el)
 */
declare function hide(element: HTMLElement): void;
/**
 * 切换显示/隐藏
 * @example toggle(el)
 */
declare function toggle(element: HTMLElement, display?: string): void;
/**
 * 获取元素位置信息
 * @example getOffset(el)
 */
declare function getOffset(element: Element): {
    top: number;
    left: number;
};
/**
 * 获取元素尺寸
 * @example getSize(el)
 */
declare function getSize(element: Element): {
    width: number;
    height: number;
};
/**
 * 滚动到指定元素
 * @example scrollToElement(el, { behavior: 'smooth' })
 */
declare function scrollToElement(element: Element, options?: ScrollIntoViewOptions): void;
/**
 * 滚动到顶部
 * @example scrollToTop()
 */
declare function scrollToTop(smooth?: boolean): void;
/**
 * 获取滚动位置
 * @example getScrollPosition()
 */
declare function getScrollPosition(): {
    x: number;
    y: number;
};
/**
 * 检查元素是否在视口内
 * @example isInViewport(el)
 */
declare function isInViewport(element: Element): boolean;
/**
 * 创建元素
 * @example createElement('div', { className: 'box', textContent: 'Hello' })
 */
declare function createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: Partial<HTMLElementTagNameMap[K]>): HTMLElementTagNameMap[K];
/**
 * 添加事件监听
 * @example on(el, 'click', handler)
 */
declare function on<K extends keyof HTMLElementEventMap>(element: Element | Window | Document, event: K, handler: (e: HTMLElementEventMap[K]) => void, options?: AddEventListenerOptions): void;
/**
 * 移除事件监听
 * @example off(el, 'click', handler)
 */
declare function off<K extends keyof HTMLElementEventMap>(element: Element | Window | Document, event: K, handler: (e: HTMLElementEventMap[K]) => void, options?: EventListenerOptions): void;
/**
 * 一次性事件监听
 * @example once(el, 'click', handler)
 */
declare function once<K extends keyof HTMLElementEventMap>(element: Element | Window | Document, event: K, handler: (e: HTMLElementEventMap[K]) => void): void;
/**
 * 委托事件监听
 * @example delegate(container, '.button', 'click', handler)
 */
declare function delegate<K extends keyof HTMLElementEventMap>(element: Element, selector: string, event: K, handler: (e: HTMLElementEventMap[K] & {
    delegateTarget: Element;
}) => void): void;
/**
 * 获取元素文本内容
 * @example text(el) // get
 * @example text(el, 'Hello') // set
 */
declare function text(element: Element, content?: string): string | void;
/**
 * 获取元素HTML内容
 * @example html(el) // get
 * @example html(el, '<span>Hello</span>') // set
 */
declare function html(element: Element, content?: string): string | void;
/**
 * 插入元素
 * @example append(parent, child)
 */
declare function append(parent: Element, ...children: (Element | string)[]): void;
/**
 * 前置插入元素
 * @example prepend(parent, child)
 */
declare function prepend(parent: Element, ...children: (Element | string)[]): void;
/**
 * 移除元素
 * @example remove(el)
 */
declare function remove(element: Element): void;
/**
 * 复制元素
 * @example clone(el, true)
 */
declare function clone<T extends Node>(element: T, deep?: boolean): T;
/**
 * 获取父元素
 * @example parent(el)
 */
declare function parent(element: Element): Element | null;
/**
 * 获取子元素
 * @example children(el)
 */
declare function children(element: Element): Element[];
/**
 * 获取兄弟元素
 * @example siblings(el)
 */
declare function siblings(element: Element): Element[];
/**
 * 获取下一个兄弟元素
 * @example next(el)
 */
declare function next(element: Element): Element | null;
/**
 * 获取上一个兄弟元素
 * @example prev(el)
 */
declare function prev(element: Element): Element | null;
/**
 * 检查元素是否匹配选择器
 * @example matches(el, '.active')
 */
declare function matches(element: Element, selector: string): boolean;
/**
 * 查找最近的匹配元素
 * @example closest(el, '.container')
 */
declare function closest(element: Element, selector: string): Element | null;
declare const dom: {
    querySelector: typeof querySelector;
    querySelectorAll: typeof querySelectorAll;
    addClass: typeof addClass;
    removeClass: typeof removeClass;
    toggleClass: typeof toggleClass;
    hasClass: typeof hasClass;
    attr: typeof attr;
    removeAttr: typeof removeAttr;
    css: typeof css;
    show: typeof show;
    hide: typeof hide;
    toggle: typeof toggle;
    getOffset: typeof getOffset;
    getSize: typeof getSize;
    scrollToElement: typeof scrollToElement;
    scrollToTop: typeof scrollToTop;
    getScrollPosition: typeof getScrollPosition;
    isInViewport: typeof isInViewport;
    createElement: typeof createElement;
    on: typeof on;
    off: typeof off;
    once: typeof once;
    delegate: typeof delegate;
    text: typeof text;
    html: typeof html;
    append: typeof append;
    prepend: typeof prepend;
    remove: typeof remove;
    clone: typeof clone;
    parent: typeof parent;
    children: typeof children;
    siblings: typeof siblings;
    next: typeof next;
    prev: typeof prev;
    matches: typeof matches;
    closest: typeof closest;
};
export default dom;
//# sourceMappingURL=dom.d.ts.map