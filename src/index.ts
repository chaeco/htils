/**
 * 工具函数模块
 */

import scformat from './snake-camel-format'
import string from './string'
import array from './array'
import object from './object'
import file from './file'
import number from './number'
import validate from './validate'
import format from './format'
import date from './date'
import type from './type'
import url from './url'
import promise from './promise'
import debounceThrottle from './debounceThrottle'
import { Storage, getLocalStorage, getSessionStorage } from './storage'
import { Logger, logger } from './logger'
import { EventBus, eventBus } from './eventBus'
import Cache from './cache'
import crypto from './crypto'
import request from './request'
import sensitive from './sensitive'
import form, { FormValidator, formRules } from './form'
import dom from './dom'
import cookie, { TokenManager } from './cookie'
import performance_, { PerformanceMonitor, FPSMonitor } from './performance'
import fileHandler from './fileHandler'
import device from './device'
import clipboard from './clipboard'
import tree from './tree'
import id, { IncrementalId } from './id'

/**
 * 工具函数集合
 */
const htils = {
  scformat,
  string,
  array,
  object,
  file,
  number,
  validate,
  format,
  date,
  type,
  url,
  promise,
  debounceThrottle,
  Storage,
  getLocalStorage,
  getSessionStorage,
  Logger,
  logger,
  EventBus,
  eventBus,
  Cache,
  crypto,
  request,
  sensitive,
  form,
  FormValidator,
  formRules,
  dom,
  cookie,
  TokenManager,
  performance: performance_,
  PerformanceMonitor,
  FPSMonitor,
  fileHandler,
  device,
  clipboard,
  tree,
  id,
  IncrementalId,
}

export {
  scformat,
  string,
  array,
  object,
  file,
  number,
  validate,
  format,
  date,
  type,
  url,
  promise,
  debounceThrottle,
  Storage,
  getLocalStorage,
  getSessionStorage,
  Logger,
  logger,
  EventBus,
  eventBus,
  Cache,
  crypto,
  request,
  sensitive,
  form,
  FormValidator,
  formRules,
  dom,
  cookie,
  TokenManager,
  performance_,
  PerformanceMonitor,
  FPSMonitor,
  fileHandler,
  device,
  clipboard,
  tree,
  id,
  IncrementalId,
}

export default htils
