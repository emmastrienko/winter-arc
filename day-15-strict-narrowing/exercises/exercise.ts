export function isString(val: unknown): val is string {
  // TODO: Implement isString
  return typeof val === "string";
}

export function isRecord(val: unknown): val is Record<string, unknown> {
  // TODO: Implement isRecord
  return typeof val === "object" && val !== null && !Array.isArray(val);
}


export function assertNever(val: never, msg?: string): never {
  // TODO: Implement assertNever
  throw new Error(`${msg ?? "Unexpected value in exhaustive check"}: ${JSON.stringify(val)}`)
}
