import VNode from "../src/core/vdom/vnode";
import { Component } from "./component";

declare type VNodeChildren =
  | Array<null | VNode | string | VNodeChildren>
  | string;

declare type VNodeComponentOptions = {
  Ctor: Component;
  propsData?: Object;
  listeners?: Record<string, Function | Function[]>;
  children?: Array<VNode>;
  tag?: string;
};

declare type MountedComponentVNode = VNode & {
  context: Component;
  componentOptions: VNodeComponentOptions;
  componentInstance: Component;
  parent: VNode;
  data: VNodeData;
};

// interface for vnodes in update modules
declare type VNodeWithData = VNode & {
  tag: string;
  data: VNodeData;
  children: Array<VNode>;
  text: void;
  elm: any;
  ns: string | void;
  context: Component;
  key: string | number | undefined;
  parent?: VNodeWithData;
  componentOptions?: VNodeComponentOptions;
  componentInstance?: Component;
  isRootInsert: boolean;
};

// // interface for vnodes in update modules
// declare type VNodeWithData = {
//   tag: string;
//   data: VNodeData;
//   children: Array<VNode>;
//   text: void;
//   elm: any;
//   ns: string | void;
//   context: Component;
//   key: string | number | undefined;
//   parent?: VNodeWithData;
//   componentOptions?: VNodeComponentOptions;
//   componentInstance?: Component;
//   isRootInsert: boolean;
// };

declare interface VNodeData {
  key?: string | number;
  slot?: string;
  ref?: string;
  is?: string;
  pre?: boolean;
  tag?: string;
  staticClass?: string;
  class?: any;
  staticStyle?: { [key: string]: any };
  style?: string | Array<Object> | Object;
  normalizedStyle?: Object;
  props?: { [key: string]: any };
  attrs?: { [key: string]: string };
  domProps?: { [key: string]: any };
  hook?: { [key: string]: Function };
  on?: { [key: string]: Function | Array<Function> };
  nativeOn?: { [key: string]: Function | Array<Function> };
  transition?: Object;
  show?: boolean; // marker for v-show
  inlineTemplate?: {
    render: Function;
    staticRenderFns: Array<Function>;
  };
  directives?: Array<VNodeDirective>;
  keepAlive?: boolean;
  scopedSlots?: { [key: string]: Function };
  model?: {
    value: any;
    callback: Function;
  };

  [key: string]: any;
}

declare type VNodeDirective = {
  name: string;
  rawName: string;
  value?: any;
  oldValue?: any;
  arg?: string;
  oldArg?: string;
  modifiers?: ASTModifiers;
  def?: Object;
};

declare type ScopedSlotsData = Array<
  { key: string; fn: Function } | ScopedSlotsData
>;
