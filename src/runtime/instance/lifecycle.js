import Watcher from '../observer/watcher'
import { query, toArray } from '../util/index'

export function callHook (vm, hook) {
  vm.$emit('pre-hook:' + hook)
  var handlers = vm.$options[hook]
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      handlers[i].call(vm)
    }
  }
  vm.$emit('hook:' + hook)
}

export function initLifecycle (vm) {
  const options = vm.$options
  vm.$parent = options.parent
  vm.$root = vm.$parent ? vm.$parent.$root : vm
  if (vm.$parent) {
    vm.$parent.$children.push(vm)
    // TODO: handle ref
  }
  vm.$children = []
  vm.$refs = {}
  vm.$els = {}
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}

export function lifecycleMixin (Vue) {
  Vue.prototype.$mount = function (el) {
    callHook(this, 'beforeMount')
    el = this.$el = el && query(el)
    if (el) {
      // clean element
      el.innerHTML = ''
      if (el.hasAttributes()) {
        const attrs = toArray(el.attributes)
        for (let i = 0; i < attrs.length; i++) {
          el.removeAttribute(attrs[i].name)
        }
      }
    }
    this._watcher = new Watcher(this, this._render, this._update)
    this._update(this._watcher.value)
    callHook(this, 'mounted')
    this._mounted = true
    return this
  }

  Vue.prototype.$destroy = function () {
    if (this._isDestroyed) {
      return
    }
    callHook(this, 'beforeDestroy')
    this._isBeingDestroyed = true
    // remove self from parent
    const parent = this.$parent
    if (parent && !parent._isBeingDestroyed) {
      parent.$children.$remove(this)
      // TODO: handle ref
    }
    // teardown watchers
    let i = this._watchers.length
    while (i--) {
      this._watchers[i].teardown()
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (this._data.__ob__) {
      this._data.__ob__.removeVm(this)
    }
    // call the last hook...
    this._isDestroyed = true
    callHook(this, 'destroyed')
    // turn off all instance listeners.
    this.$off()
  }
}
