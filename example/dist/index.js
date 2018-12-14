/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/index.js":
/*!***********************!*\
  !*** ../src/index.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Vue; });\n/* harmony import */ var _observer_watcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observer/watcher.js */ \"../src/observer/watcher.js\");\n/* harmony import */ var _observer_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observer/index.js */ \"../src/observer/index.js\");\n/* harmony import */ var _vdom_create_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vdom/create-element.js */ \"../src/vdom/create-element.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render.js */ \"../src/render.js\");\n/* harmony import */ var _lifecycle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lifecycle.js */ \"../src/lifecycle.js\");\n/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/index.js */ \"../src/util/index.js\");\n\n\n\n\n\n\nfunction Vue(options) {\n  var vm = this;\n  vm.$options = options || {};\n  initOptions(vm);\n  initDataProxy(vm);\n  initProps(vm);\n  initWatcher(vm);\n  initRender(vm);\n  initLifecycle(vm);\n\n  if (vm.$options.el) {\n    vm.$mount(vm.$options.el);\n  }\n}\n\nfunction initOptions(vm) {\n  const options = vm.$options || {};\n  options.components = options.components || {};\n}\n\nfunction initDataProxy(vm) {\n  if (!vm.$options.data) return;\n  var data = vm.$options.data();\n  vm._data = data; // proxy data on instance\n\n  var keys = Object.keys(data);\n  var i = keys.length;\n\n  while (i--) {\n    proxy(vm, '_data', keys[i]);\n  }\n}\n\nfunction initProps(vm) {\n  const propsOptions = vm.$options.props;\n  if (!propsOptions || !propsOptions.length) return;\n  const propsData = vm.$options.propsData;\n  vm._props = {};\n  propsOptions.forEach(key => {\n    const value = propsData[key];\n    vm._props[key] = value;\n    Object(_observer_index_js__WEBPACK_IMPORTED_MODULE_1__[\"defineReactive\"])(vm._props, key, value);\n\n    if (!(key in vm)) {\n      proxy(vm, `_props`, key);\n    }\n  });\n}\n\nfunction proxy(vm, name, key) {\n  Object.defineProperty(vm, key, {\n    configurable: true,\n    enumerable: true,\n    get: function proxyGetter() {\n      return vm[name][key];\n    },\n    set: function proxySetter(val) {\n      vm[name][key] = val;\n    }\n  });\n}\n\nfunction initWatcher(vm) {\n  vm._watchers = [];\n  Object(_observer_index_js__WEBPACK_IMPORTED_MODULE_1__[\"observe\"])(vm._data);\n\n  Vue.prototype.$watch = function watch(expOrFn, cb, options) {\n    new _observer_watcher_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](vm, expOrFn, cb);\n  };\n}\n\nfunction initRender(vm) {\n  vm.$createElement = (...args) => Object(_vdom_create_element_js__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"])(vm, ...args);\n\n  Object(_render_js__WEBPACK_IMPORTED_MODULE_3__[\"renderMixin\"])(Vue);\n}\n\nfunction initLifecycle(vm) {\n  Object(_lifecycle_js__WEBPACK_IMPORTED_MODULE_4__[\"lifecycleMixin\"])(Vue);\n\n  Vue.prototype.$mount = function (el) {\n    this.$el = el ? Object(_util_index_js__WEBPACK_IMPORTED_MODULE_5__[\"query\"])(el) : undefined;\n    return Object(_lifecycle_js__WEBPACK_IMPORTED_MODULE_4__[\"mountComponent\"])(this, el);\n  };\n}\n\n//# sourceURL=webpack:///../src/index.js?");

/***/ }),

/***/ "../src/lifecycle.js":
/*!***************************!*\
  !*** ../src/lifecycle.js ***!
  \***************************/
/*! exports provided: lifecycleMixin, mountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lifecycleMixin\", function() { return lifecycleMixin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mountComponent\", function() { return mountComponent; });\n/* harmony import */ var _observer_watcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observer/watcher.js */ \"../src/observer/watcher.js\");\n/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/index.js */ \"../src/util/index.js\");\n\n\nfunction lifecycleMixin(Vue) {\n  Vue.prototype._update = function (vnode) {\n    const vm = this;\n\n    if (vm._isMounted) {\n      callHook(vm, 'beforeUpdate');\n    }\n\n    const prevEl = vm.$el;\n    const prevVnode = vm._vnode;\n    vm._vnode = vnode;\n    vm.$el = vnode.elm = vm.__patch__(prevVnode, vnode); // update __vue__ reference\n\n    if (prevEl) {\n      prevEl.__vue__ = null;\n    }\n\n    if (vm.$el) {\n      vm.$el.__vue__ = vm;\n    }\n  };\n}\nfunction mountComponent(vm) {\n  callHook(vm, 'beforeMount');\n\n  const updateComponent = () => {\n    vm._update(vm._render());\n  };\n\n  vm._watcher = new _observer_watcher_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](vm, updateComponent, _util_index_js__WEBPACK_IMPORTED_MODULE_1__[\"noop\"]);\n  callHook(vm, 'mounted');\n  vm._isMounted = true;\n  return vm;\n}\n\nfunction callHook(vm, hook) {\n  const handler = vm.$options[hook];\n  if (handler) handler.call(vm);\n}\n\n//# sourceURL=webpack:///../src/lifecycle.js?");

/***/ }),

/***/ "../src/observer/array.js":
/*!********************************!*\
  !*** ../src/observer/array.js ***!
  \********************************/
/*! exports provided: arrayMethods, arrayKeys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"arrayMethods\", function() { return arrayMethods; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"arrayKeys\", function() { return arrayKeys; });\n/* harmony import */ var _util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/index */ \"../src/util/index.js\");\n\nconst arrayProto = Array.prototype;\nconst arrayMethods = Object.create(arrayProto);\nconst arrayKeys = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];\n/**\n * Intercept mutating methods and emit events\n */\n\narrayKeys.forEach(function (method) {\n  // cache original method\n  const original = arrayProto[method];\n  Object(_util_index__WEBPACK_IMPORTED_MODULE_0__[\"def\"])(arrayMethods, method, function mutator() {\n    const args = Array.from(arguments);\n    const result = original.apply(this, args);\n    const ob = this.__ob__;\n    let inserted;\n\n    switch (method) {\n      case 'push':\n        inserted = args;\n        break;\n\n      case 'unshift':\n        inserted = args;\n        break;\n\n      case 'splice':\n        inserted = args.slice(2);\n        break;\n    }\n\n    if (inserted) ob.observeArray(inserted); // notify change\n\n    ob.dep.notify();\n    return result;\n  });\n});\n\n//# sourceURL=webpack:///../src/observer/array.js?");

/***/ }),

/***/ "../src/observer/dep.js":
/*!******************************!*\
  !*** ../src/observer/dep.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Dep; });\nvar uid = 0; // Dep contructor\n\nfunction Dep() {\n  this.id = uid++;\n  this.subs = [];\n}\n\nDep.prototype.addSub = function (sub) {\n  this.subs.push(sub);\n};\n\nDep.prototype.removeSub = function (sub) {\n  remove(this.subs, sub);\n};\n\nDep.prototype.depend = function () {\n  if (Dep.target) {\n    Dep.target.addDep(this);\n  }\n};\n\nDep.prototype.notify = function () {\n  var subs = this.subs;\n\n  for (var i = 0, l = subs.length; i < l; i++) {\n    subs[i].update();\n  }\n};\n\nDep.target = null;\n\nfunction remove(arr, item) {\n  arr.splice(arr.findIndex(v => v === item), 1);\n}\n\n//# sourceURL=webpack:///../src/observer/dep.js?");

/***/ }),

/***/ "../src/observer/index.js":
/*!********************************!*\
  !*** ../src/observer/index.js ***!
  \********************************/
/*! exports provided: observe, Observer, defineReactive, set, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"observe\", function() { return observe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Observer\", function() { return Observer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defineReactive\", function() { return defineReactive; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"set\", function() { return set; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"del\", function() { return del; });\n/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/index.js */ \"../src/util/index.js\");\n/* harmony import */ var _dep_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dep.js */ \"../src/observer/dep.js\");\n/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array.js */ \"../src/observer/array.js\");\n\n\n // Observer constructor\n\nfunction observe(value) {\n  if (!Object(_util_index_js__WEBPACK_IMPORTED_MODULE_0__[\"isObject\"])(value)) {\n    return;\n  }\n\n  var ob;\n\n  if (Object(_util_index_js__WEBPACK_IMPORTED_MODULE_0__[\"hasOwn\"])(value, '__ob__') && value.__ob__ instanceof Observer) {\n    ob = value.__ob__;\n  } else {\n    ob = new Observer(value);\n  }\n\n  return ob;\n} // API for observe value\n\nfunction Observer(value) {\n  this.value = value;\n  this.dep = new _dep_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\n  if (Array.isArray(value)) {\n    var augment = _util_index_js__WEBPACK_IMPORTED_MODULE_0__[\"hasProto\"] ? protoAugment : copyAugment;\n    augment(value, _array_js__WEBPACK_IMPORTED_MODULE_2__[\"arrayMethods\"], _array_js__WEBPACK_IMPORTED_MODULE_2__[\"arrayKeys\"]);\n    this.observeArray(value);\n  } else {\n    this.walk(value);\n  }\n\n  Object(_util_index_js__WEBPACK_IMPORTED_MODULE_0__[\"def\"])(value, '__ob__', this);\n}\n\nObserver.prototype.walk = function (obj) {\n  var keys = Object.keys(obj);\n\n  for (var i = 0; i < keys.length; i++) {\n    defineReactive(obj, keys[i], obj[keys[i]]);\n  }\n};\n\nfunction defineReactive(obj, key, val) {\n  var dep = new _dep_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  var childOb = observe(val);\n  Object.defineProperty(obj, key, {\n    enumerable: true,\n    configurable: true,\n    get: function reactiveGetter() {\n      var value = val;\n\n      if (_dep_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].target) {\n        dep.depend(); // re-collect for childOb\n\n        if (childOb) {\n          childOb.dep.depend();\n        }\n      }\n\n      return value;\n    },\n    set: function reactiveSetter(newVal) {\n      var value = val;\n\n      if (newVal === value || newVal !== newVal && value !== value\n      /* NAN */\n      ) {\n        return;\n      }\n\n      val = newVal;\n      childOb = observe(newVal);\n      dep.notify();\n    }\n  });\n}\nfunction set(obj, key, val) {\n  if (Object(_util_index_js__WEBPACK_IMPORTED_MODULE_0__[\"hasOwn\"])(obj, key)) {\n    obj[key] = val;\n    return;\n  }\n\n  const ob = obj.__ob__;\n\n  if (!ob) {\n    obj[key] = val;\n    return;\n  }\n\n  defineReactive(ob.value, key, val);\n  ob.dep.notify();\n  return val;\n}\nfunction del(obj, key) {\n  const ob = obj.__ob__;\n\n  if (!Object(_util_index_js__WEBPACK_IMPORTED_MODULE_0__[\"hasOwn\"])(obj, key)) {\n    return;\n  }\n\n  delete obj[key];\n\n  if (!ob) {\n    return;\n  }\n\n  ob.dep.notify();\n}\n\nObserver.prototype.observeArray = function (items) {\n  for (let i = 0, l = items.length; i < l; i++) {\n    observe(items[i]);\n  }\n};\n/**\n * Augment an target Object or Array by intercepting\n * the prototype chain using __proto__\n */\n\n\nfunction protoAugment(target, src) {\n  target.__proto__ = src;\n}\n/**\n * Augment an target Object or Array by defining\n * properties.\n */\n\n\nfunction copyAugment(target, src, keys) {\n  for (let i = 0, l = keys.length; i < l; i++) {\n    var key = keys[i];\n    Object(_util_index_js__WEBPACK_IMPORTED_MODULE_0__[\"def\"])(target, key, src[key]);\n  }\n}\n\n//# sourceURL=webpack:///../src/observer/index.js?");

/***/ }),

/***/ "../src/observer/watcher.js":
/*!**********************************!*\
  !*** ../src/observer/watcher.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Watcher; });\n/* harmony import */ var _dep_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep.js */ \"../src/observer/dep.js\");\n/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/index.js */ \"../src/util/index.js\");\n\n\nlet uid = 0;\nfunction Watcher(vm, expOrFn, cb, options) {\n  options = options ? options : {};\n  this.vm = vm;\n\n  vm._watchers.push(this);\n\n  this.cb = cb;\n  this.id = ++uid; // options\n\n  this.deps = [];\n\n  if (typeof expOrFn === 'string') {\n    this.getter = function getter() {\n      return Object(_util_index_js__WEBPACK_IMPORTED_MODULE_1__[\"get\"])(vm, expOrFn);\n    };\n  } else {\n    this.getter = expOrFn.bind(vm);\n  }\n\n  this.value = this.get();\n}\n\nWatcher.prototype.get = function () {\n  _dep_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target = this;\n  var value = this.getter();\n  _dep_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target = null;\n  return value;\n};\n\nWatcher.prototype.update = function () {\n  console.log(\"update!!\");\n  this.run();\n};\n\nWatcher.prototype.addDep = function (dep) {\n  this.deps.push(dep);\n  dep.addSub(this);\n};\n\nWatcher.prototype.run = function () {\n  var value = this.get();\n  var oldValue = this.value;\n  this.value = value;\n  this.cb.call(this.vm, value, oldValue);\n};\n\n//# sourceURL=webpack:///../src/observer/watcher.js?");

/***/ }),

/***/ "../src/render.js":
/*!************************!*\
  !*** ../src/render.js ***!
  \************************/
/*! exports provided: renderMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderMixin\", function() { return renderMixin; });\n/* harmony import */ var _vdom_patch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vdom/patch */ \"../src/vdom/patch.js\");\n\nfunction renderMixin(Vue) {\n  Vue.prototype._render = function () {\n    const vm = this;\n    const {\n      render\n    } = vm.$options;\n    let vnode = render.call(vm, vm.$createElement);\n    return vnode;\n  };\n\n  Vue.prototype.__patch__ = function (prevVnode, vnode) {\n    if (!prevVnode) {\n      // 首次渲染\n      const elm = Object(_vdom_patch__WEBPACK_IMPORTED_MODULE_0__[\"createElm\"])(vnode);\n\n      if (this.$el) {\n        const parent = this.$el.parentElement;\n        parent.insertBefore(elm, this.$el);\n        parent.removeChild(this.$el);\n      }\n\n      return elm;\n    } else {\n      const parent = (this.$el || {}).parentElement;\n      return Object(_vdom_patch__WEBPACK_IMPORTED_MODULE_0__[\"patch\"])(parent, prevVnode, vnode);\n    }\n  };\n}\n\n//# sourceURL=webpack:///../src/render.js?");

/***/ }),

/***/ "../src/util/index.js":
/*!****************************!*\
  !*** ../src/util/index.js ***!
  \****************************/
/*! exports provided: hasOwn, isObject, def, get, hasProto, isUndef, isDef, isTrue, isFalse, isPrimitive, cached, camelize, capitalize, resolveAsset, query, noop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasOwn\", function() { return hasOwn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isObject\", function() { return isObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"def\", function() { return def; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get\", function() { return get; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasProto\", function() { return hasProto; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isUndef\", function() { return isUndef; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isDef\", function() { return isDef; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isTrue\", function() { return isTrue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isFalse\", function() { return isFalse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isPrimitive\", function() { return isPrimitive; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cached\", function() { return cached; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"camelize\", function() { return camelize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"capitalize\", function() { return capitalize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resolveAsset\", function() { return resolveAsset; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"query\", function() { return query; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"noop\", function() { return noop; });\n// These helpers produce better VM code in JS engines due to their\n// explicitness and function inlining.\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nfunction hasOwn(obj, key) {\n  return hasOwnProperty.call(obj, key);\n}\nfunction isObject(obj) {\n  return obj !== null && typeof obj === 'object';\n}\nfunction def(obj, key, val, enumerable) {\n  Object.defineProperty(obj, key, {\n    value: val,\n    enumerable: !!enumerable,\n    writable: true,\n    configurable: true\n  });\n}\nfunction get(obj, path) {\n  if (!path) return obj;\n  const paths = path.split('.');\n  return paths.reduce((sub, item) => {\n    return sub[item];\n  }, obj);\n}\nvar hasProto = '__proto__' in {};\nfunction isUndef(v) {\n  return v === undefined || v === null;\n}\nfunction isDef(v) {\n  return v !== undefined && v !== null;\n}\nfunction isTrue(v) {\n  return v === true;\n}\nfunction isFalse(v) {\n  return v === false;\n}\n/**\n * Check if value is primitive.\n */\n\nfunction isPrimitive(value) {\n  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line\n  typeof value === 'symbol' || typeof value === 'boolean';\n}\n/**\n * Create a cached version of a pure function.\n */\n\nfunction cached(fn) {\n  const cache = Object.create(null);\n  return function cachedFn(str) {\n    const hit = cache[str];\n    return hit || (cache[str] = fn(str));\n  };\n}\n/**\n * Camelize a hyphen-delimited string.\n */\n\nconst camelizeRE = /-(\\w)/g;\nconst camelize = cached(str => {\n  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');\n});\n/**\n * Capitalize a string.\n */\n\nconst capitalize = cached(str => {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n});\n/**\n * Resolve an asset.\n * This function is used because child instances need access\n * to assets defined in its ancestor chain.\n */\n\nfunction resolveAsset(options, type, id, warnMissing) {\n  if (typeof id !== 'string') {\n    return;\n  }\n\n  const assets = options[type]; // check local registration variations first\n\n  if (hasOwn(assets, id)) return assets[id];\n  const camelizedId = camelize(id);\n  if (hasOwn(assets, camelizedId)) return assets[camelizedId];\n  const PascalCaseId = capitalize(camelizedId);\n  if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId]; // fallback to prototype chain\n\n  const res = assets[id] || assets[camelizedId] || assets[PascalCaseId];\n\n  if (\"development\" !== 'production' && warnMissing && !res) {\n    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);\n  }\n\n  return res;\n}\n/**\n * Query an element selector if it's not an element already.\n */\n\nfunction query(el) {\n  if (typeof el === 'string') {\n    const selected = document.querySelector(el);\n\n    if (!selected) {\n      return document.createElement('div');\n    }\n\n    return selected;\n  } else {\n    return el;\n  }\n}\nfunction noop(a, b, c) {}\n\n//# sourceURL=webpack:///../src/util/index.js?");

/***/ }),

/***/ "../src/vdom/create-component.js":
/*!***************************************!*\
  !*** ../src/vdom/create-component.js ***!
  \***************************************/
/*! exports provided: createComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createComponent\", function() { return createComponent; });\n/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ \"../src/vdom/vnode.js\");\n/* harmony import */ var _helpers_extract_props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/extract-props */ \"../src/vdom/helpers/extract-props.js\");\n\n\nfunction createComponent(Ctor, data, context, children, tag) {\n  const name = Ctor.name || tag; // extract props\n\n  const propsData = Object(_helpers_extract_props__WEBPACK_IMPORTED_MODULE_1__[\"extractPropsFromVNodeData\"])(data, Ctor); // extract listeners, since these needs to be treated as\n  // child component listeners instead of DOM listeners\n\n  const listeners = data.on; // replace with listeners with .native modifier\n  // so it gets processed during parent component patch.\n\n  data.on = data.nativeOn; // merge component management hooks onto the placeholder node\n  // mergeHooks(data)\n\n  return new _vnode__WEBPACK_IMPORTED_MODULE_0__[\"default\"](`vue-component-${name}`, data, undefined, undefined, undefined, context, {\n    Ctor,\n    propsData,\n    listeners,\n    tag,\n    children\n  });\n}\n\n//# sourceURL=webpack:///../src/vdom/create-component.js?");

/***/ }),

/***/ "../src/vdom/create-element.js":
/*!*************************************!*\
  !*** ../src/vdom/create-element.js ***!
  \*************************************/
/*! exports provided: createElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ \"../src/vdom/vnode.js\");\n/* harmony import */ var _create_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-component */ \"../src/vdom/create-component.js\");\n/* harmony import */ var _util_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/index */ \"../src/util/index.js\");\n\n\n\nfunction createElement(context, tag, data, children) {\n  let vnode;\n  let Ctor = Object(_util_index__WEBPACK_IMPORTED_MODULE_2__[\"resolveAsset\"])(context.$options, \"components\", tag);\n\n  if (Object(_util_index__WEBPACK_IMPORTED_MODULE_2__[\"isDef\"])(Ctor)) {\n    vnode = Object(_create_component__WEBPACK_IMPORTED_MODULE_1__[\"createComponent\"])(Ctor, data, context, children, tag);\n  } else {\n    vnode = new _vnode__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tag, data, children, undefined, undefined, context);\n  }\n\n  if (!Object(_util_index__WEBPACK_IMPORTED_MODULE_2__[\"isDef\"])(vnode)) {\n    return Object(_vnode__WEBPACK_IMPORTED_MODULE_0__[\"createEmptyVNode\"])();\n  }\n\n  return vnode;\n}\n\n//# sourceURL=webpack:///../src/vdom/create-element.js?");

/***/ }),

/***/ "../src/vdom/helpers/extract-props.js":
/*!********************************************!*\
  !*** ../src/vdom/helpers/extract-props.js ***!
  \********************************************/
/*! exports provided: extractPropsFromVNodeData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"extractPropsFromVNodeData\", function() { return extractPropsFromVNodeData; });\n/* harmony import */ var _util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/index */ \"../src/util/index.js\");\n\nfunction extractPropsFromVNodeData(data, componentOptions) {\n  const propOptions = componentOptions.props;\n\n  if (Object(_util_index__WEBPACK_IMPORTED_MODULE_0__[\"isUndef\"])(propOptions)) {\n    return;\n  }\n\n  const res = {};\n  const {\n    attrs,\n    props\n  } = data;\n\n  if (Object(_util_index__WEBPACK_IMPORTED_MODULE_0__[\"isDef\"])(attrs) || Object(_util_index__WEBPACK_IMPORTED_MODULE_0__[\"isDef\"])(props)) {\n    propOptions.forEach(propName => {\n      checkProp(res, props, propName, true) || checkProp(res, attrs, propName, false);\n    });\n  }\n\n  return res;\n}\n\nfunction checkProp(res, hash, key, preserve) {\n  if (Object(_util_index__WEBPACK_IMPORTED_MODULE_0__[\"isDef\"])(hash)) {\n    if (Object(_util_index__WEBPACK_IMPORTED_MODULE_0__[\"hasOwn\"])(hash, key)) {\n      res[key] = hash[key];\n\n      if (!preserve) {\n        delete hash[key];\n      }\n\n      return true;\n    }\n  }\n\n  return false;\n}\n\n//# sourceURL=webpack:///../src/vdom/helpers/extract-props.js?");

/***/ }),

/***/ "../src/vdom/patch.js":
/*!****************************!*\
  !*** ../src/vdom/patch.js ***!
  \****************************/
/*! exports provided: patch, createElm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"patch\", function() { return patch; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElm\", function() { return createElm; });\n/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ \"../src/vdom/vnode.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ \"../src/index.js\");\n/* harmony import */ var _util_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/index */ \"../src/util/index.js\");\n\n\n\n\nfunction sameVnode(a, b) {\n  return a.key === b.key && a.tag === b.tag && a.isComment === b.isComment && Object(_util_index__WEBPACK_IMPORTED_MODULE_2__[\"isDef\"])(a.data) === Object(_util_index__WEBPACK_IMPORTED_MODULE_2__[\"isDef\"])(b.data);\n}\n\nfunction patchVnode(oldVnode, vnode) {\n  // 因为 vnode 和 oldVnode 是相同的 vnode，所以我们可以复用 oldVnode.elm。\n  const elm = vnode.elm = oldVnode.elm;\n  let oldCh = oldVnode.children;\n  let ch = vnode.children; // 如果 oldVnode 和 vnode 是完全相同，说明无需更新，直接返回。\n\n  if (oldVnode === vnode) return; // 调用 update hook\n\n  if (vnode.data) {\n    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);\n  } // 如果 vnode.text 是 undefined\n\n\n  if (vnode.text === undefined) {\n    // 比较 old children 和 new children，并更新\n    if (oldCh && ch) {\n      if (oldCh !== ch) {\n        // 核心逻辑（最复杂的地方）：怎么比较新旧 children 并更新，对应上面\n        // 的数组比较\n        updateChildren(elm, oldCh, ch, insertedVnodeQueue);\n      }\n    } // 添加新 children\n    else if (ch) {\n        // 首先删除原来的 text\n        if (oldVnode.text) api.setTextContent(elm, ''); // 然后添加新 dom（对 ch 中每个 vnode 递归创建 dom 并插入到 elm）\n\n        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);\n      } // 相反地，如果原来有 children 而现在没有，那么我们要删除 children。\n      else if (oldCh) {\n          removeVnodes(elm, oldCh, 0, oldCh.length - 1);\n        } // 最后，如果 oldVnode 有 text，删除。\n        else if (oldVnode.text) {\n            api.setTextContent(elm, '');\n          }\n  } // 否则 （vnode 有 text），只要 text 不等，更新 dom 的 text。\n  else if (oldVnode.text !== vnode.text) {\n      api.setTextContent(elm, vnode.text);\n    }\n} // 为实际 dom 创建 vnode\n\n\nfunction emptyNodeAt(elm) {\n  return new Vnode(elm.tagName, {\n    className: elm.className,\n    id: elm.id\n  }, undefined, undefined, elm, undefined, undefined);\n}\n\nfunction patch(parent, oldVnode, vnode) {\n  // // 如果 oldVnode 和 vnode 是相同的 vnode，执行 patch。\n  // if (sameVnode(oldVnode, vnode)) {\n  //   return patchVnode(oldVnode, vnode)\n  // }\n  // // 否则，直接把 oldVnode 替换为 vnode。\n  // else {\n  const elm = createElm(vnode);\n\n  if (parent) {\n    parent.insertBefore(elm, oldVnode.elm);\n    parent.removeChild(oldVnode.elm);\n  }\n\n  return elm; // }\n}\nfunction createElm(vnode) {\n  if (vnode.componentOptions\n  /* && !vnode.componentInstance*/\n  ) {\n      const componentInstance = new _index__WEBPACK_IMPORTED_MODULE_1__[\"default\"](Object.assign({}, vnode.componentOptions.Ctor, {\n        propsData: vnode.componentOptions.propsData\n      })).$mount();\n      vnode.componentInstance = componentInstance;\n      return componentInstance.$el;\n    }\n\n  const el = document.createElement(vnode.tag);\n\n  for (let key in vnode.data) {\n    el.setAttribute(key, vnode.data[key]);\n  }\n\n  if (vnode.text) {\n    el.textContent = vnode.text;\n  }\n\n  const children = vnode.children;\n\n  if (Object(_util_index__WEBPACK_IMPORTED_MODULE_2__[\"isDef\"])(children)) {\n    if (Array.isArray(children)) {\n      vnode.children.forEach(child => {\n        if (typeof child === 'object') {\n          el.appendChild(createElm(child));\n        } else {\n          el.textContent = child;\n        }\n      });\n    } else {\n      el.textContent = children;\n    }\n  }\n\n  return el;\n}\n\n//# sourceURL=webpack:///../src/vdom/patch.js?");

/***/ }),

/***/ "../src/vdom/vnode.js":
/*!****************************!*\
  !*** ../src/vdom/vnode.js ***!
  \****************************/
/*! exports provided: default, createEmptyVNode, createTextVNode, cloneVNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return VNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createEmptyVNode\", function() { return createEmptyVNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createTextVNode\", function() { return createTextVNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cloneVNode\", function() { return cloneVNode; });\nfunction VNode(tag, data, children, text, elm, context, componentOptions) {\n  this.tag = tag;\n  this.data = data;\n  this.children = children;\n  this.text = text;\n  this.elm = elm;\n  this.context = context;\n  this.key = data && data.key;\n  this.componentOptions = componentOptions;\n  this.componentInstance = undefined;\n  this.parent = undefined;\n}\nconst createEmptyVNode = text => {\n  const node = new VNode();\n  return node;\n};\nfunction createTextVNode(val) {\n  return new VNode(undefined, undefined, undefined, String(val));\n} // optimized shallow clone\n// used for static nodes and slot nodes because they may be reused across\n// multiple renders, cloning them avoids errors when DOM manipulations rely\n// on their elm reference.\n\nfunction cloneVNode(vnode) {\n  const cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, vnode.componentOptions);\n  cloned.key = vnode.key;\n  cloned.isCloned = true;\n  return cloned;\n}\n\n//# sourceURL=webpack:///../src/vdom/vnode.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/index.js */ \"../src/index.js\");\n\nnew _src_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#root',\n  components: {\n    number: {\n      props: ['value'],\n\n      render(h) {\n        return h('span', {}, this.value);\n      }\n\n    }\n  },\n\n  data() {\n    return {\n      count: 0\n    };\n  },\n\n  render(h) {\n    return h('div', {}, [h('number', {\n      props: {\n        value: this.count\n      }\n    })]);\n  }\n\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });