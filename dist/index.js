"use strict";
/**
 * 工具函数模块
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snowflake = exports.IncrementalId = exports.id = exports.tree = exports.clipboard = exports.device = exports.fileHandler = exports.FPSMonitor = exports.PerformanceMonitor = exports.performance_ = exports.TokenManager = exports.cookie = exports.dom = exports.formRules = exports.FormValidator = exports.form = exports.sensitive = exports.request = exports.crypto = exports.Cache = exports.eventBus = exports.EventBus = exports.logger = exports.Logger = exports.getSessionStorage = exports.getLocalStorage = exports.Storage = exports.debounceThrottle = exports.promise = exports.url = exports.type = exports.date = exports.format = exports.validate = exports.number = exports.file = exports.object = exports.array = exports.string = exports.scformat = void 0;
const snake_camel_format_1 = __importDefault(require("./snake-camel-format"));
exports.scformat = snake_camel_format_1.default;
const string_1 = __importDefault(require("./string"));
exports.string = string_1.default;
const array_1 = __importDefault(require("./array"));
exports.array = array_1.default;
const object_1 = __importDefault(require("./object"));
exports.object = object_1.default;
const file_1 = __importDefault(require("./file"));
exports.file = file_1.default;
const number_1 = __importDefault(require("./number"));
exports.number = number_1.default;
const validate_1 = __importDefault(require("./validate"));
exports.validate = validate_1.default;
const format_1 = __importDefault(require("./format"));
exports.format = format_1.default;
const date_1 = __importDefault(require("./date"));
exports.date = date_1.default;
const type_1 = __importDefault(require("./type"));
exports.type = type_1.default;
const url_1 = __importDefault(require("./url"));
exports.url = url_1.default;
const promise_1 = __importDefault(require("./promise"));
exports.promise = promise_1.default;
const debounceThrottle_1 = __importDefault(require("./debounceThrottle"));
exports.debounceThrottle = debounceThrottle_1.default;
const storage_1 = require("./storage");
Object.defineProperty(exports, "Storage", { enumerable: true, get: function () { return storage_1.Storage; } });
Object.defineProperty(exports, "getLocalStorage", { enumerable: true, get: function () { return storage_1.getLocalStorage; } });
Object.defineProperty(exports, "getSessionStorage", { enumerable: true, get: function () { return storage_1.getSessionStorage; } });
const logger_1 = require("./logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return logger_1.Logger; } });
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return logger_1.logger; } });
const eventBus_1 = require("./eventBus");
Object.defineProperty(exports, "EventBus", { enumerable: true, get: function () { return eventBus_1.EventBus; } });
Object.defineProperty(exports, "eventBus", { enumerable: true, get: function () { return eventBus_1.eventBus; } });
const cache_1 = __importDefault(require("./cache"));
exports.Cache = cache_1.default;
const crypto_1 = __importDefault(require("./crypto"));
exports.crypto = crypto_1.default;
const request_1 = __importDefault(require("./request"));
exports.request = request_1.default;
const sensitive_1 = __importDefault(require("./sensitive"));
exports.sensitive = sensitive_1.default;
const form_1 = __importStar(require("./form"));
exports.form = form_1.default;
Object.defineProperty(exports, "FormValidator", { enumerable: true, get: function () { return form_1.FormValidator; } });
Object.defineProperty(exports, "formRules", { enumerable: true, get: function () { return form_1.formRules; } });
const dom_1 = __importDefault(require("./dom"));
exports.dom = dom_1.default;
const cookie_1 = __importStar(require("./cookie"));
exports.cookie = cookie_1.default;
Object.defineProperty(exports, "TokenManager", { enumerable: true, get: function () { return cookie_1.TokenManager; } });
const performance_1 = __importStar(require("./performance"));
exports.performance_ = performance_1.default;
Object.defineProperty(exports, "PerformanceMonitor", { enumerable: true, get: function () { return performance_1.PerformanceMonitor; } });
Object.defineProperty(exports, "FPSMonitor", { enumerable: true, get: function () { return performance_1.FPSMonitor; } });
const fileHandler_1 = __importDefault(require("./fileHandler"));
exports.fileHandler = fileHandler_1.default;
const device_1 = __importDefault(require("./device"));
exports.device = device_1.default;
const clipboard_1 = __importDefault(require("./clipboard"));
exports.clipboard = clipboard_1.default;
const tree_1 = __importDefault(require("./tree"));
exports.tree = tree_1.default;
const id_1 = __importStar(require("./id"));
exports.id = id_1.default;
Object.defineProperty(exports, "IncrementalId", { enumerable: true, get: function () { return id_1.IncrementalId; } });
Object.defineProperty(exports, "Snowflake", { enumerable: true, get: function () { return id_1.Snowflake; } });
/**
 * 工具函数集合
 */
const htils = {
    scformat: snake_camel_format_1.default,
    string: string_1.default,
    array: array_1.default,
    object: object_1.default,
    file: file_1.default,
    number: number_1.default,
    validate: validate_1.default,
    format: format_1.default,
    date: date_1.default,
    type: type_1.default,
    url: url_1.default,
    promise: promise_1.default,
    debounceThrottle: debounceThrottle_1.default,
    Storage: storage_1.Storage,
    getLocalStorage: storage_1.getLocalStorage,
    getSessionStorage: storage_1.getSessionStorage,
    Logger: logger_1.Logger,
    logger: logger_1.logger,
    EventBus: eventBus_1.EventBus,
    eventBus: eventBus_1.eventBus,
    Cache: cache_1.default,
    crypto: crypto_1.default,
    request: request_1.default,
    sensitive: sensitive_1.default,
    form: form_1.default,
    FormValidator: form_1.FormValidator,
    formRules: form_1.formRules,
    dom: dom_1.default,
    cookie: cookie_1.default,
    TokenManager: cookie_1.TokenManager,
    performance: performance_1.default,
    PerformanceMonitor: performance_1.PerformanceMonitor,
    FPSMonitor: performance_1.FPSMonitor,
    fileHandler: fileHandler_1.default,
    device: device_1.default,
    clipboard: clipboard_1.default,
    tree: tree_1.default,
    id: id_1.default,
    IncrementalId: id_1.IncrementalId,
};
exports.default = htils;
//# sourceMappingURL=index.js.map