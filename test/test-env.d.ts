interface Chainer {
  then(next: Function): this
  thenWaitFor(n: number | Function): this
  end(endFn: Function): void
}

declare function waitForUpdate(cb: Function): Chainer

declare function createTextVNode(arg?: string): any

declare function triggerEvent(
  target: Element,
  event: string,
  process?: (e: any) => void
): void

// vitest extends jest namespace so we can just extend jest.Matchers
declare namespace jest {
  interface Matchers<R, T> {
    toHaveBeenWarned(): R
    toHaveBeenWarnedLast(): R
    toHaveBeenWarnedTimes(n: number): R
    toHaveBeenTipped(): R
    toHaveClass(cls: string): R
  }
}
