export function createCounter(initialValue: number = 0) {
  // TODO: Implement createCounter
  let count = initialValue;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

export function createMemoizedFn<T, R>(fn: (arg: T) => R): (arg: T) => R {
  // TODO: Implement memoization closure
  const cache: Map<T, R> = new Map();
  return (arg: T) => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}
