import { Component } from 'typescript/component'

export let currentInstance: Component | null = null

/**
 * This is exposed for compatibility with v3 (e.g. some functions in VueUse
 * relies on it). Do not use this internally, just use `currentInstance`.
 *
 * @private this function needs manual type declaration because it relies
 * on previously manually authored types from Vue 2
 */
export function getCurrentInstance(): { proxy: Component } | null {
  return currentInstance && { proxy: currentInstance }
}

/**
 * @private
 */
export function setCurrentInstance(vm: Component | null) {
  currentInstance = vm
}
