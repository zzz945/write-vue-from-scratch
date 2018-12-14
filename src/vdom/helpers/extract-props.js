import {
  hasOwn,
  isDef,
  isUndef,
} from '../../util/index'

export function extractPropsFromVNodeData (data, componentOptions) {
  const propOptions = componentOptions.props
  if (isUndef(propOptions)) {
    return
  }

  const res = {}
  const { attrs, props } = data
  if (isDef(attrs) || isDef(props)) {
    propOptions.forEach(propName => {
      checkProp(res, props, propName, true) ||
      checkProp(res, attrs, propName, false)
    })
  }
  return res
}

function checkProp (res, hash, key, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key]
      if (!preserve) {
        delete hash[key]
      }
      return true
    }
  }
  return false
}
