/**
 * DOM 操作工具 - 浏览器环境常用 DOM 操作
 */

/**
 * 查询单个元素
 * @example querySelector('.class')
 */
function querySelector<T extends Element = Element>(selector: string, parent?: Element | Document): T | null {
  return (parent || document).querySelector<T>(selector)
}

/**
 * 查询多个元素
 * @example querySelectorAll('.item')
 */
function querySelectorAll<T extends Element = Element>(selector: string, parent?: Element | Document): T[] {
  return Array.from((parent || document).querySelectorAll<T>(selector))
}

/**
 * 添加类名
 * @example addClass(el, 'active')
 */
function addClass(element: Element, ...classNames: string[]): void {
  element.classList.add(...classNames)
}

/**
 * 移除类名
 * @example removeClass(el, 'active')
 */
function removeClass(element: Element, ...classNames: string[]): void {
  element.classList.remove(...classNames)
}

/**
 * 切换类名
 * @example toggleClass(el, 'active')
 */
function toggleClass(element: Element, className: string, force?: boolean): boolean {
  return element.classList.toggle(className, force)
}

/**
 * 检查是否包含类名
 * @example hasClass(el, 'active')
 */
function hasClass(element: Element, className: string): boolean {
  return element.classList.contains(className)
}

/**
 * 获取/设置元素属性
 * @example attr(el, 'data-id') // get
 * @example attr(el, 'data-id', '123') // set
 */
function attr(element: Element, name: string, value?: string): string | null | void {
  if (value === undefined) {
    return element.getAttribute(name)
  }
  element.setAttribute(name, value)
}

/**
 * 移除元素属性
 * @example removeAttr(el, 'data-id')
 */
function removeAttr(element: Element, name: string): void {
  element.removeAttribute(name)
}

/**
 * 获取/设置元素样式
 * @example css(el, 'color') // get
 * @example css(el, 'color', 'red') // set
 * @example css(el, { color: 'red', fontSize: '14px' }) // set multiple
 */
function css(element: HTMLElement, prop: string | Record<string, string>, value?: string): string | void {
  if (typeof prop === 'string') {
    if (value === undefined) {
      return window.getComputedStyle(element).getPropertyValue(prop)
    }
    element.style.setProperty(prop, value)
  } else {
    Object.entries(prop).forEach(([key, val]) => {
      element.style.setProperty(key, val)
    })
  }
}

/**
 * 显示元素
 * @example show(el)
 */
function show(element: HTMLElement, display: string = 'block'): void {
  element.style.display = display
}

/**
 * 隐藏元素
 * @example hide(el)
 */
function hide(element: HTMLElement): void {
  element.style.display = 'none'
}

/**
 * 切换显示/隐藏
 * @example toggle(el)
 */
function toggle(element: HTMLElement, display: string = 'block'): void {
  if (element.style.display === 'none') {
    show(element, display)
  } else {
    hide(element)
  }
}

/**
 * 获取元素位置信息
 * @example getOffset(el)
 */
function getOffset(element: Element): { top: number; left: number } {
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
  }
}

/**
 * 获取元素尺寸
 * @example getSize(el)
 */
function getSize(element: Element): { width: number; height: number } {
  const rect = element.getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height,
  }
}

/**
 * 滚动到指定元素
 * @example scrollToElement(el, { behavior: 'smooth' })
 */
function scrollToElement(element: Element, options?: ScrollIntoViewOptions): void {
  element.scrollIntoView(options || { behavior: 'smooth', block: 'start' })
}

/**
 * 滚动到顶部
 * @example scrollToTop()
 */
function scrollToTop(smooth: boolean = true): void {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  })
}

/**
 * 获取滚动位置
 * @example getScrollPosition()
 */
function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  }
}

/**
 * 检查元素是否在视口内
 * @example isInViewport(el)
 */
function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * 创建元素
 * @example createElement('div', { className: 'box', textContent: 'Hello' })
 */
function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  props?: Partial<HTMLElementTagNameMap[K]>
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName)
  if (props) {
    Object.assign(element, props)
  }
  return element
}

/**
 * 添加事件监听
 * @example on(el, 'click', handler)
 */
function on<K extends keyof HTMLElementEventMap>(
  element: Element | Window | Document,
  event: K,
  handler: (e: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions
): void {
  element.addEventListener(event as string, handler as EventListener, options)
}

/**
 * 移除事件监听
 * @example off(el, 'click', handler)
 */
function off<K extends keyof HTMLElementEventMap>(
  element: Element | Window | Document,
  event: K,
  handler: (e: HTMLElementEventMap[K]) => void,
  options?: EventListenerOptions
): void {
  element.removeEventListener(event as string, handler as EventListener, options)
}

/**
 * 一次性事件监听
 * @example once(el, 'click', handler)
 */
function once<K extends keyof HTMLElementEventMap>(
  element: Element | Window | Document,
  event: K,
  handler: (e: HTMLElementEventMap[K]) => void
): void {
  const wrappedHandler = (e: Event) => {
    handler(e as HTMLElementEventMap[K])
    element.removeEventListener(event as string, wrappedHandler)
  }
  element.addEventListener(event as string, wrappedHandler)
}

/**
 * 委托事件监听
 * @example delegate(container, '.button', 'click', handler)
 */
function delegate<K extends keyof HTMLElementEventMap>(
  element: Element,
  selector: string,
  event: K,
  handler: (e: HTMLElementEventMap[K] & { delegateTarget: Element }) => void
): void {
  element.addEventListener(event as string, (e) => {
    const target = (e.target as Element).closest(selector)
    if (target && element.contains(target)) {
      const customEvent = e as HTMLElementEventMap[K] & { delegateTarget: Element }
      customEvent.delegateTarget = target
      handler(customEvent)
    }
  })
}

/**
 * 获取元素文本内容
 * @example text(el) // get
 * @example text(el, 'Hello') // set
 */
function text(element: Element, content?: string): string | void {
  if (content === undefined) {
    return element.textContent || ''
  }
  element.textContent = content
}

/**
 * 获取元素HTML内容
 * @example html(el) // get
 * @example html(el, '<span>Hello</span>') // set
 */
function html(element: Element, content?: string): string | void {
  if (content === undefined) {
    return element.innerHTML
  }
  element.innerHTML = content
}

/**
 * 插入元素
 * @example append(parent, child)
 */
function append(parent: Element, ...children: (Element | string)[]): void {
  parent.append(...children)
}

/**
 * 前置插入元素
 * @example prepend(parent, child)
 */
function prepend(parent: Element, ...children: (Element | string)[]): void {
  parent.prepend(...children)
}

/**
 * 移除元素
 * @example remove(el)
 */
function remove(element: Element): void {
  element.remove()
}

/**
 * 复制元素
 * @example clone(el, true)
 */
function clone<T extends Node>(element: T, deep: boolean = true): T {
  return element.cloneNode(deep) as T
}

/**
 * 获取父元素
 * @example parent(el)
 */
function parent(element: Element): Element | null {
  return element.parentElement
}

/**
 * 获取子元素
 * @example children(el)
 */
function children(element: Element): Element[] {
  return Array.from(element.children)
}

/**
 * 获取兄弟元素
 * @example siblings(el)
 */
function siblings(element: Element): Element[] {
  return Array.from(element.parentElement?.children || []).filter(el => el !== element)
}

/**
 * 获取下一个兄弟元素
 * @example next(el)
 */
function next(element: Element): Element | null {
  return element.nextElementSibling
}

/**
 * 获取上一个兄弟元素
 * @example prev(el)
 */
function prev(element: Element): Element | null {
  return element.previousElementSibling
}

/**
 * 检查元素是否匹配选择器
 * @example matches(el, '.active')
 */
function matches(element: Element, selector: string): boolean {
  return element.matches(selector)
}

/**
 * 查找最近的匹配元素
 * @example closest(el, '.container')
 */
function closest(element: Element, selector: string): Element | null {
  return element.closest(selector)
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
}

export default dom
