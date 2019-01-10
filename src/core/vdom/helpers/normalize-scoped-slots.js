/* @flow */

export function normalizeScopedSlots (
  slots: { [key: string]: Function } | void,
  normalSlots: { [key: string]: Array<VNode> }
): any {
  let res
  if (!slots) {
    res = {}
  } else if (slots._normalized) {
    return slots
  } else {
    res = {}
    for (const key in slots) {
      res[key] = normalizeScopedSlot(slots[key])
    }
  }
  // expose normal slots on scopedSlots
  for (const key in normalSlots) {
    res[key] = () => normalSlots[key]
  }
  res._normalized = true
  return res
}

function normalizeScopedSlot(fn: Function) {
  return scope => {
    const res = fn(scope)
    return Array.isArray(res) ? res : res ? [res] : res
  }
}
