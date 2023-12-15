export function fetchCount(amount = 1, ms = 500) {
  return new Promise<{ data: number }>(resolve => setTimeout(() => resolve({ data: amount }), ms))
}
