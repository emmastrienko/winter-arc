export type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

export type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;

export function unwrapValue<T>(value: T): T {
  return value;
}
