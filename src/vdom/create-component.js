import VNode from "./vnode";
import { extractPropsFromVNodeData } from './helpers/extract-props'

export function createComponent (Ctor, data, context, children, tag) {
  const name = Ctor.name || tag

  // extract props
  const propsData = extractPropsFromVNodeData(data, Ctor)

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  const listeners = data.on
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn

  // merge component management hooks onto the placeholder node
  // mergeHooks(data)

  return new VNode(
    `vue-component-${name}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
  )
}