import Dep from './dep.js'
import { get as _get } from '../util/index.js'

let uid = 0

export default function Watcher(vm, expOrFn, cb, options) {
  options = options ? options : {}
  this.vm = vm
  vm._watchers.push(this)
  this.cb = cb
  this.id = ++uid

  // options
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
  this.deps.push(dep)
  dep.addSub(this)
}

Watcher.prototype.run = function() {
  var value = this.get()
  var oldValue = this.value
  this.value = value
  this.cb.call(this.vm, value, oldValue)
}