export type MyReturnType<T> = T extends (...args: any[]) => infer U ? U : never; // TODO: Implement

export type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T; // TODO: Implement recursive unwrap of Promises

export function unwrapValue<T>(value: T): T {
  // TODO: Implement
  return value;
}
