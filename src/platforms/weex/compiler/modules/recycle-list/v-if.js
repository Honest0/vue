/* @flow */

import { getAndRemoveAttr } from 'compiler/helpers'

function hasConditionDirective (el: ASTElement): boolean {
  for (const attr in el.attrsMap) {
    if (/^v\-if|v\-else|v\-else\-if$/.test(attr)) {
      return true
    }
  }
  return false
}

function getPrevMatch (el: ASTElement): any {
  if (el.parent && el.parent.children) {
    const prev: Object = el.parent.children[el.parent.children.length - 1]
    return prev.attrsMap['[[match]]']
  }
}

export function transformVIf (el: ASTElement, options: CompilerOptions) {
  if (hasConditionDirective(el)) {
    let exp
    const ifExp = getAndRemoveAttr(el, 'v-if')
    const elseifExp = getAndRemoveAttr(el, 'v-else-if')
    if (ifExp) {
      exp = ifExp
    } else {
      const prevMatch = getPrevMatch(el)
      if (prevMatch) {
        exp = elseifExp
          ? `!(${prevMatch}) && (${elseifExp})` // v-else-if
          : `!(${prevMatch})` // v-else
      } else if (process.env.NODE_ENV !== 'production' && options.warn) {
        options.warn(
          `v-${elseifExp ? ('else-if="' + elseifExp + '"') : 'else'} ` +
          `used on element <${el.tag}> without corresponding v-if.`
        )
        return
      }
    }
    el.attrsMap['[[match]]'] = exp
    el.attrsList.push({ name: '[[match]]', value: exp })
    delete el.attrsMap['v-if']
    delete el.attrsMap['v-else-if']
    delete el.attrsMap['v-else']
  }
}
