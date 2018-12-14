import { patch, createElm } from './vdom/patch'
import Dep from './observer/dep'

export function renderMixin (Vue) {
  Vue.prototype._render = function () {
    const vm = this
    const { render } = vm.$options
    let vnode = render.call(vm, vm.$createElement)
    return vnode
  }
  Vue.prototype.__patch__ = function (prevVnode, vnode) {
    if (!prevVnode) { // 首次渲染
      const elm = createElm(vnode)
      if (this.$el) {
        const parent = this.$el.parentElement
        parent.insertBefore(elm, this.$el)
        parent.removeChild(this.$el)
      }

      return elm
    } else {
      const parent = (this.$el || {}).parentElement
      return patch(parent, prevVnode, vnode)
    }
  }
}
