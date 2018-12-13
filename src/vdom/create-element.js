import VNode, { createEmptyVNode } from "./vnode";
import { createComponent } from "./create-component";

import {
  isDef,
  isUndef,
  isTrue,
  isPrimitive,
  resolveAsset
} from "../util/index";

export function createElement(
  context,
  tag,
  data,
  children
) {
  let vnode;
  if (typeof tag === "string") {
    let Ctor
    if (isDef((Ctor = resolveAsset(context.$options, "components", tag)))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (!isDef(vnode)) {
    return createEmptyVNode();
  }
  return vnode;
}