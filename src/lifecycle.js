
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