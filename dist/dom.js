"use strict";
/**
 * DOM 操作工具 - 浏览器环境常用 DOM 操作
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 查询单个元素
 * @example querySelector('.class')
 */
function querySelector(selector, parent) {
    return (parent || document).querySelector(selector);
}
/**
 * 查询多个元素
 * @example querySelectorAll('.item')
 */
function querySelectorAll(selector, parent) {
    return Array.from((parent || document).querySelectorAll(selector));
}
/**
 * 添加类名
 * @example addClass(el, 'active')
 */
function addClass(element, ...classNames) {
    element.classList.add(...classNames);
}
/**
 * 移除类名
 * @example removeClass(el, 'active')
 */
function removeClass(element, ...classNames) {
    element.classList.remove(...classNames);
}
/**
 * 切换类名
 * @example toggleClass(el, 'active')
 */
function toggleClass(element, className, force) {
    return element.classList.toggle(className, force);
}
/**
 * 检查是否包含类名
 * @example hasClass(el, 'active')
 */
function hasClass(element, className) {
    return element.classList.contains(className);
}
/**
 * 获取/设置元素属性
 * @example attr(el, 'data-id') // get
 * @example attr(el, 'data-id', '123') // set
 */
function attr(element, name, value) {
    if (value === undefined) {
        return element.getAttribute(name);
    }
    element.setAttribute(name, value);
}
/**
 * 移除元素属性
 * @example removeAttr(el, 'data-id')
 */
function removeAttr(element, name) {
    element.removeAttribute(name);
}
/**
 * 获取/设置元素样式
 * @example css(el, 'color') // get
 * @example css(el, 'color', 'red') // set
 * @example css(el, { color: 'red', fontSize: '14px' }) // set multiple
 */
function css(element, prop, value) {
    if (typeof prop === 'string') {
        if (value === undefined) {
            return window.getComputedStyle(element).getPropertyValue(prop);
        }
        element.style.setProperty(prop, value);
    }
    else {
        Object.entries(prop).forEach(([key, val]) => {
            element.style.setProperty(key, val);
        });
    }
}
/**
 * 显示元素
 * @example show(el)
 */
function show(element, display = 'block') {
    element.style.display = display;
}
/**
 * 隐藏元素
 * @example hide(el)
 */
function hide(element) {
    element.style.display = 'none';
}
/**
 * 切换显示/隐藏
 * @example toggle(el)
 */
function toggle(element, display = 'block') {
    if (element.style.display === 'none') {
        show(element, display);
    }
    else {
        hide(element);
    }
}
/**
 * 获取元素位置信息
 * @example getOffset(el)
 */
function getOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset,
    };
}
/**
 * 获取元素尺寸
 * @example getSize(el)
 */
function getSize(element) {
    const rect = element.getBoundingClientRect();
    return {
        width: rect.width,
        height: rect.height,
    };
}
/**
 * 滚动到指定元素
 * @example scrollToElement(el, { behavior: 'smooth' })
 */
function scrollToElement(element, options) {
    element.scrollIntoView(options || { behavior: 'smooth', block: 'start' });
}
/**
 * 滚动到顶部
 * @example scrollToTop()
 */
function scrollToTop(smooth = true) {
    window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto',
    });
}
/**
 * 获取滚动位置
 * @example getScrollPosition()
 */
function getScrollPosition() {
    return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop,
    };
}
/**
 * 检查元素是否在视口内
 * @example isInViewport(el)
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth));
}
/**
 * 创建元素
 * @example createElement('div', { className: 'box', textContent: 'Hello' })
 */
function createElement(tagName, props) {
    const element = document.createElement(tagName);
    if (props) {
        Object.assign(element, props);
    }
    return element;
}
/**
 * 添加事件监听
 * @example on(el, 'click', handler)
 */
function on(element, event, handler, options) {
    element.addEventListener(event, handler, options);
}
/**
 * 移除事件监听
 * @example off(el, 'click', handler)
 */
function off(element, event, handler, options) {
    element.removeEventListener(event, handler, options);
}
/**
 * 一次性事件监听
 * @example once(el, 'click', handler)
 */
function once(element, event, handler) {
    const wrappedHandler = (e) => {
        handler(e);
        element.removeEventListener(event, wrappedHandler);
    };
    element.addEventListener(event, wrappedHandler);
}
/**
 * 委托事件监听
 * @example delegate(container, '.button', 'click', handler)
 */
function delegate(element, selector, event, handler) {
    element.addEventListener(event, (e) => {
        const target = e.target.closest(selector);
        if (target && element.contains(target)) {
            const customEvent = e;
            customEvent.delegateTarget = target;
            handler(customEvent);
        }
    });
}
/**
 * 获取元素文本内容
 * @example text(el) // get
 * @example text(el, 'Hello') // set
 */
function text(element, content) {
    if (content === undefined) {
        return element.textContent || '';
    }
    element.textContent = content;
}
/**
 * 获取元素HTML内容
 * @example html(el) // get
 * @example html(el, '<span>Hello</span>') // set
 */
function html(element, content) {
    if (content === undefined) {
        return element.innerHTML;
    }
    element.innerHTML = content;
}
/**
 * 插入元素
 * @example append(parent, child)
 */
function append(parent, ...children) {
    parent.append(...children);
}
/**
 * 前置插入元素
 * @example prepend(parent, child)
 */
function prepend(parent, ...children) {
    parent.prepend(...children);
}
/**
 * 移除元素
 * @example remove(el)
 */
function remove(element) {
    element.remove();
}
/**
 * 复制元素
 * @example clone(el, true)
 */
function clone(element, deep = true) {
    return element.cloneNode(deep);
}
/**
 * 获取父元素
 * @example parent(el)
 */
function parent(element) {
    return element.parentElement;
}
/**
 * 获取子元素
 * @example children(el)
 */
function children(element) {
    return Array.from(element.children);
}
/**
 * 获取兄弟元素
 * @example siblings(el)
 */
function siblings(element) {
    return Array.from(element.parentElement?.children || []).filter(el => el !== element);
}
/**
 * 获取下一个兄弟元素
 * @example next(el)
 */
function next(element) {
    return element.nextElementSibling;
}
/**
 * 获取上一个兄弟元素
 * @example prev(el)
 */
function prev(element) {
    return element.previousElementSibling;
}
/**
 * 检查元素是否匹配选择器
 * @example matches(el, '.active')
 */
function matches(element, selector) {
    return element.matches(selector);
}
/**
 * 查找最近的匹配元素
 * @example closest(el, '.container')
 */
function closest(element, selector) {
    return element.closest(selector);
}
const dom = {
    querySelector,
    querySelectorAll,
    addClass,
    removeClass,
    toggleClass,
    hasClass,
    attr,
    removeAttr,
    css,
    show,
    hide,
    toggle,
    getOffset,
    getSize,
    scrollToElement,
    scrollToTop,
    getScrollPosition,
    isInViewport,
    createElement,
    on,
    off,
    once,
    delegate,
    text,
    html,
    append,
    prepend,
    remove,
    clone,
    parent,
    children,
    siblings,
    next,
    prev,
    matches,
    closest,
};
exports.default = dom;
//# sourceMappingURL=dom.js.map