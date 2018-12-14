import { def, hasOwn, hasProto, isObject } from '../util/index.js'
import Dep from './dep.js'
import { arrayMethods, arrayKeys } from './array.js'

// Observer constructor
export function observe (value){
  if (!isObject(value)) {
    return
  }
  var ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}

// API for observe value
export function Observer(value) {
  this.value = value
  this.dep = new Dep()
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment
    augment(value, arrayMethods, arrayKeys)
    this.observeArray(value)
  } else{
    this.walk(value)
  }
  def(value, '__ob__', this)
}

Observer.prototype.walk = function(obj) {
  var keys = Object.keys(obj)
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]])
  }
}

export function defineReactive (obj, key, val) {
  var dep = new Dep()
  var childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = val
      if (Dep.target) {
        dep.depend()
        // re-collect for childOb
        if (childOb) {
          childOb.dep.depend()
        }
      }

      return value
    },
    set: function reactiveSetter (newVal) {
      var value =  val
      if (newVal === value || (newVal !== newVal && value !== value /* NAN */)) {
        return
      }
      val = newVal
      childOb = observe(newVal)
      dep.notify()
    }
  })
}

export function set (obj, key, val) {
  if (hasOwn(obj, key)) {
    obj[key] = val
    return
  }
  const ob = obj.__ob__
  if (!ob) {
    obj[key] = val
    return
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}

export function del (obj, key) {
  const ob = obj.__ob__
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}

Observer.prototype.observeArray = function(items) {
  for (let i = 0, l = items.length; i < l; i++) {
    observe(items[i])
  }
}

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  target.__proto__ = src
}

/**
 * Augment an target Object or Array by defining
 * properties.
 */
function copyAugment (target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    var key = keys[i]
    def(target, key, src[key])
  }
}