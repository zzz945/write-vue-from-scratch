import Watcher from './observer/watcher.js'
import { observe, defineReactive } from "./observer/index.js"
import { createElement } from './vdom/create-element.js'
import { renderMixin } from './render.js'
import { lifecycleMixin, mountComponent } from './lifecycle.js'
import { query } from './util/index.js'

export default function Vue (options) {
  var vm = this
  vm.$options = options || {}
  initOptions(vm)
  initDataProxy(vm)
  initProps(vm)
  initWatcher(vm)
  initRender(vm)
  initLifecycle(vm)
  initMethods(vm)
  initEvents(vm)
  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}

function initOptions (vm) {
  const options = vm.$options || {}
  options.components = options.components || {}
}

function initDataProxy (vm) {
  if (!vm.$options.data) return

  var data = vm.$options.data()
  vm._data = data
  // proxy data on instance
  var keys = Object.keys(data)

  var i = keys.length
  while (i--) {
    proxy(vm, '_data', keys[i])
  }
}

function initProps (vm) {
  const propsOptions = vm.$options.props
  if (!propsOptions || !propsOptions.length) return

  const propsData = vm.$options.propsData
  vm._props = {}
  propsOptions.forEach(key => {
    const value = propsData[key]
    vm._props[key] = value
    defineReactive(vm._props, key, value)
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  })
}

function proxy(vm, name, key) {
  Object.defineProperty(vm, key, {
    configurable: true,
    enumerable: true,
    get: function proxyGetter() {
      return vm[name][key]
    },
    set: function proxySetter(val) {
      vm[name][key] = val
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

function initRender(vm) {
  vm.$createElement = (...args) => createElement(vm, ...args)
  renderMixin(Vue)
}

function initLifecycle(vm) {
  lifecycleMixin(Vue)
  Vue.prototype.$mount = function (el) {
    this.$el = el ? query(el) : undefined
    return mountComponent(this, el)
  }
}

function initMethods (vm) {
  const methods = vm.$options.methods || {}
  for (const key in methods) {
    vm[key] = methods[key].bind(vm)
  }
}

function initEvents (vm) {
  vm._events = []
}