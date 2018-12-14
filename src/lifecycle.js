
import Watcher from "./observer/watcher.js";
import { noop } from './util/index.js'

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate')
    }
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    vm._vnode = vnode
    vm.$el = vnode.elm = vm.__patch__(prevVnode, vnode)
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
  }

  Vue.prototype.$forceUpdate = function () {
    const vm = this
    if (vm._watcher) {
      vm._watcher.update()
    }
  }

  Vue.prototype.$destroy = function () {
    const vm = this
    callHook(vm, 'beforeDestroy')
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown()
    }
    let i = vm._watchers.length
    while (i--) {
      vm._watchers[i].teardown()
    }
    // call the last hook...
    vm._isDestroyed = true
    // fire destroyed hook
    callHook(vm, 'destroyed')
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null
    }
  }
}

export function mountComponent (vm) {
  callHook(vm, 'beforeMount')

  const updateComponent = () => {
    vm._update(vm._render())
  }

  vm._watcher = new Watcher(vm, updateComponent, noop)

  callHook(vm, 'mounted')
  vm._isMounted = true
  return vm
}

function callHook (vm, hook) {
  const handler = vm.$options[hook]
  if (handler) handler.call(vm)
}