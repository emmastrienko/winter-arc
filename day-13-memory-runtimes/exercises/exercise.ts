export class MetadataRegistry<K extends object, V> {
  map = new WeakMap<K, V>();
  set(key: K, value: V): void {
    this.map.set(key, value);
  }
  get(key: K): V | undefined {
    return this.map.get(key);
  }
  has(key: K): boolean {
    return this.map.has(key);
  }
}

export function detectRuntime(): "node" | "browser" | "unknown" {
  // TODO: Implement runtime detector
  const runtime = globalThis as typeof globalThis & {
    process?: { versions?: { node?: string } };
  };
  if (runtime.process?.versions?.node) {
    return "node";
  }
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    return "browser";
  }
  return "unknown";
}
