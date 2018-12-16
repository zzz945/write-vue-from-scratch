import VNode, { createTextVNode } from './vnode'
import Vue from '../index'

import {
  isDef,
  isUndef,
  isTrue,
  isPrimitive
} from '../util/index'

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data)
      )
    )
  )
}

function patchVnode(oldVnode, vnode) {
  // 因为 vnode 和 oldVnode 是相同的 vnode，所以我们可以复用 oldVnode.elm。
  const elm = vnode.elm = oldVnode.elm
  let oldCh = oldVnode.children
  let ch = vnode.children

  // 如果 oldVnode 和 vnode 是完全相同，说明无需更新，直接返回。
  if (oldVnode === vnode) return

  // 调用 update hook
  if (vnode.data) {
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
  }

  // 如果 vnode.text 是 undefined
  if (vnode.text === undefined) {
    // 比较 old children 和 new children，并更新
    if (oldCh && ch) {
      if (oldCh !== ch) {
        // 核心逻辑（最复杂的地方）：怎么比较新旧 children 并更新，对应上面
        // 的数组比较
        updateChildren(elm, oldCh, ch, insertedVnodeQueue)
      }
    }
    // 添加新 children
    else if (ch) {
      // 首先删除原来的 text
      if (oldVnode.text) api.setTextContent(elm, '')
      // 然后添加新 dom（对 ch 中每个 vnode 递归创建 dom 并插入到 elm）
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    }
    // 相反地，如果原来有 children 而现在没有，那么我们要删除 children。
    else if (oldCh) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1);
    }
    // 最后，如果 oldVnode 有 text，删除。
    else if (oldVnode.text) {
      api.setTextContent(elm, '');
    }
  }
  // 否则 （vnode 有 text），只要 text 不等，更新 dom 的 text。
  else if (oldVnode.text !== vnode.text) {
    api.setTextContent(elm, vnode.text)
  }
}

// 为实际 dom 创建 vnode
function emptyNodeAt(elm) {
  return new Vnode(
    elm.tagName,
    {
      className: elm.className,
      id: elm.id
    },
    undefined,
    undefined,
    elm,
    undefined,
    undefined,
  )
}

export function patch(parent, oldVnode, vnode) {
  // // 如果 oldVnode 和 vnode 是相同的 vnode，执行 patch。
  // if (sameVnode(oldVnode, vnode)) {
  //   return patchVnode(oldVnode, vnode)
  // }
  // // 否则，直接把 oldVnode 替换为 vnode。
  // else {
    const elm = createElm(vnode)
    if (parent) {
      parent.insertBefore(elm, oldVnode.elm)
      parent.removeChild(oldVnode.elm)
    }
    return elm
  // }
}

export function createElm (vnode) {
  if (vnode.componentOptions/* && !vnode.componentInstance*/) {
    const vm = new Vue(Object.assign({}, vnode.componentOptions.Ctor, { propsData: vnode.componentOptions.propsData })).$mount()
    vm._events = vnode.componentOptions.listeners || {}
    vnode.componentInstance = vm
    return vm.$el
  }

  // create element
  const el = document.createElement(vnode.tag)

  // set attrs
  const attrs = (vnode.data || {}).attrs || {}
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }

  // set dom eventlistener
  const events = (vnode.data || {}).on || {}
  for (let key in events) {
    // forget remove?
    el.addEventListener(key, events[key])
  }

  if (vnode.text) {
    el.textContent = vnode.text
  }

  const children = vnode.children
  if (isDef(children)) {
    if (Array.isArray(children)) {
      vnode.children.forEach(child => {
        if (typeof child === 'object') {
          el.appendChild(createElm(child))
        } else {
          el.textContent = child
        }
      });
    } else {
      el.textContent = children
    }
  }
  return el
}