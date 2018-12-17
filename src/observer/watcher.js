import Dep, { popTarget, pushTarget } from './dep.js'
import { get as _get, remove } from '../util/index.js'
import { queueWatcher } from './scheduler'

let uid = 0
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default function Watcher(vm, expOrFn, cb, options) {
  this.vm = vm
  vm._watchers.push(this)
  // options
  if (options) {
    this.lazy = !!options.lazy
    this.sync = !!options.sync
  } else {
    this.lazy = this.sync = false
  }
  this.cb = cb
  this.id = ++uid
  this.active = true
  this.dirty = this.lazy // for lazy watchers
  this.depIds = new Set()
  this.deps = []
  if (typeof expOrFn === 'string') {
    this.getter = function getter () {
      return _get(vm, expOrFn)
    }
  } else {
    this.getter = expOrFn.bind(vm)
  }
  this.value = this.lazy
    ? undefined
    : this.get()
}

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function() {
  pushTarget(this)
  var value = this.getter()
  popTarget()
  return value
}

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true
  } else if (this.sync) {
    this.run()
  } else {
    queueWatcher(this)
  }
}

Watcher.prototype.addDep = function(dep) {
  if (!this.depIds.has(dep.id)) {
    this.depIds.add(dep.id)
    this.deps.push(dep)
    dep.addSub(this)
  }
},

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function() {
  let i = this.deps.length
  while (i--) {
    this.deps[i].depend()
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

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function() {
  this.value = this.get()
  this.dirty = false
}