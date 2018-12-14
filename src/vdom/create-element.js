import VNode, { createEmptyVNode } from "./vnode";
import { createComponent } from "./create-component";

import {
  isDef,
  resolveAsset
} from "../util/index";

export function createElement(
  context,
  tag,
  data,
  children
) {
  let vnode;
  let Ctor = resolveAsset(context.$options, "components", tag)
  if (isDef(Ctor)) {
    vnode = createComponent(Ctor, data, context, children, tag);
  } else {
    vnode = new VNode(tag, data, children, undefined, undefined, context);
  }
  if (!isDef(vnode)) {
    return createEmptyVNode();
  }
  return vnode;
}