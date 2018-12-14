import Dep from './dep.js'
import { get as _get, remove } from '../util/index.js'

let uid = 0

export default function Watcher(vm, expOrFn, cb, options) {
  options = options ? options : {}
  this.vm = vm
  vm._watchers.push(this)
  this.cb = cb
  this.id = ++uid
  this.active = true
  this.depIds = new Set()
  this.deps = []
  if (typeof expOrFn === 'string') {
    this.getter = function getter () {
      return _get(vm, expOrFn)
    }
  } else {
    this.getter = expOrFn.bind(vm)
  }
  this.value = this.get()
}

Watcher.prototype.get = function() {
  Dep.target = this
  var value = this.getter()
  Dep.target = null
  return value
}

Watcher.prototype.update = function() {
  console.log("update!!")
  this.run()
}

Watcher.prototype.addDep = function(dep) {
  if (!this.depIds.has(dep.id)) {
    this.depIds.add(dep.id)
    this.deps.push(dep)
    dep.addSub(this)
  }
}

Watcher.prototype.run = function() {
  var value = this.get()
  var oldValue = this.value
  this.value = value
  this.cb.call(this.vm, value, oldValue)
}

  /**
   * Remove self from all dependencies' subscriber list.
   */
Watcher.prototype.teardown = function() {
  console('teardown')
  if (this.active) {
    // remove self from vm's watcher list
    remove(this.vm._watchers, this)
    let i = this.deps.length
    while (i--) {
      this.deps[i].removeSub(this)
    }
    this.active = false
  }
}