import Watcher from './observer/watcher.js'
import { observe } from "./observer/index.js"

export default function Vue (options) {
  var vm = this
  vm.$options = options
  initDataProxy(vm)
  initWatcher(vm)
}

function initDataProxy (vm) {
  var data = vm.$options.data()
  vm._data = data
  // proxy data on instance
  var keys = Object.keys(data)

  var i = keys.length
  while (i--) {
    proxy(vm, keys[i])
  }
}

function proxy(vm, key) {
  Object.defineProperty(vm, key, {
    configurable: true,
    enumerable: true,
    get: function proxyGetter() {
      return vm._data[key]
    },
    set: function proxySetter(val) {
      vm._data[key] = val
    }
  })
}

function initWatcher(vm) {
  vm._watchers = []
  observe(vm._data)
  Vue.prototype.$watch = function watch (expOrFn, cb, options){
    new Watcher(vm, expOrFn, cb)
  }
}