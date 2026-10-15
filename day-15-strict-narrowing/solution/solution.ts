export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

export function isRecord(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

export function assertNever(val: never, msg = 'Unexpected value in exhaustive check'): never {
  throw new Error(`${msg}: ${JSON.stringify(val)}`);
}
