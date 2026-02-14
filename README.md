# htils - 真实项目工具库

[![NPM Version](https://img.shields.io/badge/version-0.0.4-blue.svg)](https://github.com/chaeco/htils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Environment](https://img.shields.io/badge/Environment-Isomorphic-brightgreen.svg)](https://github.com/chaeco/htils)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

> 一个轻量级的 TypeScript 工具库。

## ✨ 核心特性

- 🎯 **实用为先** - 所有工具都来自真实项目需求
- 🪶 **轻量依赖** - 仅依赖 crypto-js 用于加密功能，其他功能零依赖
- 📦 **模块化** - 按功能分模块，按需导入
- 🔒 **类型安全** - 完整的 TypeScript 类型支持
- 🌍 **全能环境** - 完美支持浏览器和 Node.js/SSR 环境，自动处理环境兼容
- 🚀 **生产就绪** - 经过完整类型检查和测试验证
- 🔄 **递归处理** - 支持复杂嵌套数据结构的递归转换

## 📦 安装

```bash
# 从 GitHub 安装（推荐）
npm install github:chaeco/htils

# 或使用 SSH
npm install git+ssh://git@github.com:chaeco/htils.git
```

## 🚀 快速开始

### 模块导入

```typescript
// 单个模块导入
import { string, array, object } from '@chaeco/htils'

// 或使用完整导入
import htils from '@chaeco/htils'
```

### 命名转换

```typescript
import { scformat } from '@chaeco/htils'

// 蛇形转驼峰
scformat.snakeToCamel('user_name') // 'userName'
scformat.snakeDataToCamel({ user_name: 'tom', user_age: 20 })
// { userName: 'tom', userAge: 20 }

// 驼峰转蛇形
scformat.camelToSnake('userName') // 'user_name'
scformat.camelDataToSnake({ userName: 'tom', userAge: 20 })
// { user_name: 'tom', user_age: 20 }
```

### 字符串处理

```typescript
import { string } from '@chaeco/htils'

const { capitalize, kebabCase, truncate, isBlank } = string

capitalize('hello') // 'Hello'
kebabCase('helloWorld') // 'hello-world'
truncate('hello world', 5) // 'he...'
isBlank('  ') // true
```

### 数组处理

```typescript
import { array } from '@chaeco/htils'

const { unique, flatten, chunk, groupBy } = array

unique([1, 2, 2, 3]) // [1, 2, 3]
flatten([[1, 2], [3, [4, 5]]]) // [1, 2, 3, 4, 5]
chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
groupBy([{type: 'a', val: 1}, {type: 'b', val: 2}], 'type')
// { a: [...], b: [...] }
```

### 对象处理

```typescript
import { object } from '@chaeco/htils'

const { deepClone, merge, pick, omit } = object

deepClone({ a: { b: 1 } }) // { a: { b: 1 } }
merge({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
pick({ a: 1, b: 2, c: 3 }, ['a', 'b']) // { a: 1, b: 2 }
omit({ a: 1, b: 2, c: 3 }, ['c']) // { a: 1, b: 2 }
```

### 加密/哈希

```typescript
import { crypto } from '@chaeco/htils'

// MD5
crypto.md5('hello') // '5d41402abc4b2a76b9719d911017c592'

// SHA256
crypto.sha256('hello') // '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'

// Base64
crypto.base64Encode('hello') // 'aGVsbG8='
crypto.base64Decode('aGVsbG8=') // 'hello'

// AES 加密
const encrypted = crypto.aesEncrypt('secret', 'password')
const decrypted = crypto.aesDecrypt(encrypted, 'password') // 'secret'
```

### 文件处理

```typescript
import { fileHandler } from '@chaeco/htils'

// 文件信息
const info = fileHandler.getFileInfo(file)

// 文件验证
fileHandler.validateFileType(file, ['image/jpeg', 'image/png'])

// 读取文件
const text = await fileHandler.readFileAsText(file)

// 图片压缩
const compressed = await fileHandler.compressImage(file, 0.8, 1920, 1080)

// OSS ETag 计算
const etag = await fileHandler.calculateOSSETag(file)
// 带进度回调
const etagWithProgress = await fileHandler.calculateOSSETag(
  file,
  5 * 1024 * 1024, // 5MB 分块
  (progress, current, total) => {
    console.log(`${progress.toFixed(2)}% (${current}/${total})`)
  }
)

// 文件下载
fileHandler.downloadJSON('data.json', { key: 'value' })
fileHandler.downloadText('notes.txt', 'Hello World')
```

### 表单验证

```typescript
import { FormValidator, formRules } from '@chaeco/htils'

const validator = new FormValidator()

validator.register('email', {
  value: '',
  rules: [
    { required: true, message: '邮箱为必填项' },
    formRules.email
  ]
})

validator.setValue('email', 'user@example.com')
const result = validator.validateAll()
```

### DOM 操作

```typescript
import { dom } from '@chaeco/htils'

const el = dom.querySelector('.button')
dom.addClass(el, 'active')
dom.css(el, { color: 'red' })
dom.on(el, 'click', () => console.log('clicked'))
```

### 性能监控

```typescript
import { PerformanceMonitor } from '@chaeco/htils'

const monitor = new PerformanceMonitor()
const metrics = monitor.getMetrics()
console.log('FCP:', metrics.fcp) // First Contentful Paint
console.log('LCP:', metrics.lcp) // Largest Contentful Paint
```

## 📊 完整工具列表

### 数据处理

- ✅ **string** - 字符串处理（9 个函数）
  - capitalize, kebabCase, isEmpty, isBlank,
    truncate, replaceOnce, includes, toUpper, toLower,
    toTitleCase, repeat

- ✅ **array** - 数组操作（17 个函数）
  - unique, flatten, chunk, groupBy, find, findIndex,
    includes, indexOf, first, last, compact, remove,
    difference, concat, reverse, sample, isEmpty

- ✅ **object** - 对象处理（14 个函数）
  - deepClone, merge, pick, omit, isEmpty, keys, values,
    entries, assign, extend, get, set, delete, has

- ✅ **number** - 数字工具（15 个函数）
  - round, ceil, floor, clamp, inRange, percentage, average,
    sum, randomBetween, random, formatWithCommas, byteToKB,
    byteToMB, byteToGB, abs

- ✅ **date** - 日期处理（12 个函数）
  - format, parse, add, subtract, diff, getStartOf, getEndOf,
    isToday, isYesterday, isTomorrow, daysInMonth, isLeapYear

- ✅ **validate** - 数据验证（12 个函数）
  - isEmail, isMobilePhone, isIdCard, isUrl, isIPAddress,
    isPostalCode, isCreditCard, isStrongPassword, isUsername,
    isHexColor, isChinese, isEnglish

- ✅ **format** - 数据格式化（8 个函数）
  - currency, percentage, fileSize, phone, idCard, creditCard,
    json, xml

### 异步处理

- ✅ **promise** - Promise 工具（9 个函数）
  - sleep, timeout, retry, series, parallel, concurrency, poll,
    cancellable, promisify

- ✅ **debounceThrottle** - 防抖节流（3 个函数）
  - debounce, throttle, cooldown

### 浏览器相关

- ✅ **dom** - DOM 操作（20+ 个函数）
  - querySelector, addClass, removeClass, toggleClass, css,
    getOffset, getSize, scrollToTop, isInViewport, on, off,
    delegate, ready, trigger

- ✅ **cookie** - Cookie 管理（4 个函数 + TokenManager 类）
  - setCookie, getCookie, removeCookie, getAllCookies,
    TokenManager

- ✅ **storage** - 存储封装（6 个函数）
  - localStorage_, sessionStorage_ 对象，
    自动序列化/反序列化

- ✅ **form** - 表单验证（FormValidator 类 + formRules）
  - register, setValue, validate, validateAll, getValues,
    setValues, reset

- ✅ **fileHandler** - 文件处理（20+ 个函数）
  - getFileInfo, validateFileType, validateFileSize,
    readFileAsText, readFileAsDataURL, compressImage,
    getImageDimensions, downloadJSON, downloadText,
    downloadCSV, selectFile, uploadFiles, base64ToBlob,
    base64ToFile, sliceFile, calculateOSSETag, calculateETag,
    validateETag

### 网络请求

- ✅ **request** - HTTP 请求（5 个函数）
  - fetch, fetchWithRetry, post, get, withInterceptor

- ✅ **crypto** - 加密哈希（40+ 个函数）
  - md5, sha1, sha256, sha512, hmac, aesEncrypt, aesDecrypt,
    desEncrypt, desDecrypt, base64Encode, base64Decode,
    md5FromArrayBuffer, sha256FromArrayBuffer,
    sha512FromArrayBuffer, encryptObject, decryptObject,
    pbkdf2

### 监控调试

- ✅ **performance** - 性能监控（PerformanceMonitor 类 +
  工具函数）
  - getMetrics, getPageLoadTime, mark, measure, getMemoryInfo,
    measureTime, FPSMonitor, getNetworkInfo

- ✅ **logger** - 日志记录（Logger 类 + logger 对象）
  - info, debug, warn, error, 日志分级、时间戳、回调

### 数据管理

- ✅ **cache** - 缓存管理（Cache 类）
  - set, get, has, delete, clear, 支持 TTL 和 LRU

- ✅ **eventBus** - 事件总线（eventBus 对象）
  - on, once, off, emit, clear

- ✅ **sensitive** - 敏感信息脱敏（10 个函数）
  - maskMobilePhone, maskEmail, maskIdCard, maskCreditCard,
    maskName, maskAddress, maskBankCard, maskPassword,
    maskSocialSecurityNumber, maskCustom

### 其他工具

- ✅ **url** - URL 处理（8 个函数）
  - parse, stringify, getParams, setParams, removeParams,
    isAbsoluteUrl, resolveUrl, getBaseUrl

- ✅ **type** - 类型判断（20+ 个函数）
  - isString, isNumber, isBoolean, isArray, isObject,
    isFunction, isDate, isRegExp, isNull, isUndefined,
    isNaN, isFinite, isInteger, isEmpty, isPromise

- ✅ **file** - 文件路径工具（6 个函数）
  - getExtension, removeExtension, getFileName, getFilePath,
    joinPath, normalizePath

### 设备相关 (新增)

- ✅ **device** - 设备检测（40+ 个函数）
  - isMobile, isTablet, isDesktop, isIOS, isAndroid, isWeChat,
    isQQ, isMiniProgram, getBrowserName, getOSName,
    getScreenInfo, isTouchDevice, isRetina, isOnline,
    getBrowserVersion, getOSVersion

- ✅ **clipboard** - 剪贴板操作（14 个函数）
  - copy, paste, copyHTML, copyImage, pasteImage, onPaste,
    onCopy, interceptCopy

- ✅ **tree** - 树数据处理（15 个函数）
  - listToTree, treeToList, findNode, findPath, filterTree,
    mapTree, getTreeDepth, getLeafNodes

- ✅ **id** - ID 生成器（21 个函数）
  - uuid, nanoid, snowflake, objectId, ulid, randomString,
    hashId, IncrementalId, isUuid, isObjectId

## 🎯 使用场景

### 前端应用

- 表单验证和提交
- 用户认证和 Token 管理
- 文件上传和图片压缩
- DOM 操作和事件处理
- 性能监控和优化
- 设备检测和兼容性处理

### API 和数据处理

- API 数据转换和格式化
- 复杂数据结构处理（树形、扁平化转换）
- 数据验证和清洗
- 敏感信息脱敏

### HTTP 请求

- API 请求封装
- 请求重试和超时控制
- 错误处理
- 请求拦截和响应处理

### 性能优化

- 防抖节流
- 缓存管理
- 懒加载
- 性能监控
- FPS 监控

## 💡 设计理念

### 精简原则

本工具库遵循以下精简原则：

✅ **保留条件**：

- 在真实项目中常用
- 没有完美的原生替代方案
- 确实增加了开发效率
- 避免过度设计

❌ **移除条件**：

- JavaScript 原生已支持
- 使用频率很低
- 可轻松用其他函数替代
- 属于"为了创建而创建"的函数

### 版本说明

精简前函数总数：78 个（4个核心模块）
精简后函数总数：52 个（精简 33%）

| 模块   | 原函数数 | 精简后 | 精简比例 |
| ------ | -------- | ------ | -------- |
| string | 18       | 11     | 39%      |
| array  | 25       | 17     | 32%      |
| number | 20       | 15     | 25%      |
| promise| 15       | 9      | 40%      |

## 🔧 高级用法

### 防抖和节流

```typescript
import { debounceThrottle } from '@chaeco/htils'

const { debounce, throttle } = debounceThrottle

// 防抖 - 延迟执行
const debouncedSearch = debounce((query) => {
  console.log('搜索:', query)
}, 500)

input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value)
})

// 节流 - 定时执行
const throttledScroll = throttle(() => {
  console.log('滚动')
}, 1000)

window.addEventListener('scroll', throttledScroll)
```

### Promise 并发控制

```typescript
import { promise } from '@chaeco/htils'

const { concurrency } = promise

const urls = ['url1', 'url2', 'url3', 'url4', 'url5']
const results = await concurrency(
  urls.map(url => () => fetch(url)),
  2 // 同时最多 2 个请求
)
```

### 带重试的网络请求

```typescript
import { request } from '@chaeco/htils'

const response = await request.fetchWithRetry(
  'https://api.example.com/data',
  {
    method: 'POST',
    body: JSON.stringify({ key: 'value' }),
    maxRetries: 3,
    delay: 1000,
    backoff: true,
    timeout: 30000
  }
)
```

### LRU 缓存

```typescript
import { Cache } from '@chaeco/htils'

const cache = new Cache({
  ttl: 5 * 60 * 1000, // 5分钟过期
  maxSize: 100, // 最多 100 条记录
  onEvict: (key, value) => {
    console.log(`缓存被驱逐: ${key}`)
  }
})

cache.set('user:1', userData, 10 * 60 * 1000)
const data = cache.get('user:1')
```

### 事件总线

```typescript
import { eventBus } from '@chaeco/htils'

// 订阅
eventBus.on('user:login', (data) => {
  console.log('用户登录:', data)
})

// 发布
eventBus.emit('user:login', { userId: 123, name: 'John' })

// 一次性监听
eventBus.once('app:init', () => {
  console.log('应用初始化完成')
})
```

### 树形数据转换

```typescript
import { tree } from '@chaeco/htils'

// 列表转树
const flatList = [
  { id: 1, parentId: null, name: 'root' },
  { id: 2, parentId: 1, name: 'child1' },
  { id: 3, parentId: 1, name: 'child2' }
]

const treeData = tree.listToTree(flatList)

// 树转列表
const flatAgain = tree.treeToList(treeData)

// 查找节点
const node = tree.findNode(treeData, n => n.id === 2)

// 获取节点路径
const path = tree.findPath(treeData, n => n.id === 3)

// 树深度
const depth = tree.getTreeDepth(treeData)
```

### 设备检测

```typescript
import { device } from '@chaeco/htils'

if (device.isMobile()) {
  console.log('在移动设备上')
}

if (device.isWeChat()) {
  console.log('在微信中打开')
}

console.log('浏览器:', device.getBrowserName())
console.log('操作系统:', device.getOSName())
console.log('屏幕信息:', device.getScreenInfo())
```

### ID 生成

```typescript
import { id, Snowflake, createSnowflake } from '@chaeco/htils'

// UUID
const uuid = id.uuid()

// 纳秒 ID
const nanoid = id.nanoid()

// 标准雪花 ID (64位 BigInt 实现)
const snowflakeId = id.snowflake() // 默认使用 workerId 0

// 创建自定义 workerId 的雪花 ID 生成器
const generator = createSnowflake(1)
const sid = generator.nextId()

// 使用 Snowflake 类
const snowflake = new Snowflake(2)
const sid2 = snowflake.nextId()

// 增量 ID
const incrementalId = new id.IncrementalId()
console.log(incrementalId.next()) // 00001
console.log(incrementalId.next()) // 00002
```

## 📝 许可证

MIT

---

**真实项目，真实需求，真实工具！** 🚀
