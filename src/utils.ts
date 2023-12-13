export function assert(condition: boolean, message: string): asserts condition {
  if (!condition)
    raise(message, Error)
}

export function raise(message: string, ErrorConstructor = Error): never {
  throw new ErrorConstructor(message)
}

export function isHTMLElement<T extends HTMLElement>(value: unknown): value is T {
  return value instanceof HTMLElement
}

export function isOdd(value: number): boolean {
  return (value & 1) === 1
}
