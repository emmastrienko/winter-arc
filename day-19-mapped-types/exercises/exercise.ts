export function deepFreeze<T extends object>(obj: T): T {
  // TODO: Implement deepFreeze
  Object.freeze(obj);
  for (const key of Object.keys(obj)) {
    const val = (obj as any)[key];
    if (typeof val === "object" && val !== null) {
      deepFreeze(val);
    }
  }
  return obj;
}
