import Watcher from './observer/watcher.js'
import { observe, defineReactive } from "./observer/index.js"
import { createElement } from './vdom/create-element.js'
import { renderMixin } from './render.js'
import { lifecycleMixin, mountComponent } from './lifecycle.js'
import { query, noop, toArray } from './util/index.js'
import Dep from './observer/dep'

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
  initComputed(vm)
  initWatch(vm)
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
  Vue.prototype.$watch = function watch (expOrFn, cb){
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
  Vue.prototype.$emit = function (event) {
    const vm = this
    let cb = vm._events[event]
    const args = toArray(arguments, 1)
    cb.apply(vm, args)
    return vm
  }
}

function initComputed (vm) {
  const computed = vm.$options.computed || {}
  const watchers = vm._computedWatchers = Object.create(null)

  for (const key in computed) {
    const getter = computed[key]

    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop)

    if (!(key in vm)) {
      defineComputed(vm, key)
    }
  }
}

export function defineComputed (target, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: createComputedGetter(key),
    set: noop
  })
}

function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (Dep.target) {
        // computed watcher观察此computed属性依赖的data和props，
        // 这里将computed watcher的deps全部添加到Dep.target，使data和props变化能触发Dep.target的update
        watcher.depend()
      }
      return watcher.value
    }
  }
}

function initWatch (vm) {
  const watch = vm.$options.watch || {}
  for (const key in watch) {
    const handler = watch[key]
    createWatcher(vm, key, handler)
  }
}

function createWatcher (vm, keyOrFn, handler) {
  return vm.$watch(keyOrFn, handler)
}