export function isValidParentheses(s: string): boolean {
  // TODO: Implement isValidParentheses
  const stack: string[] = [];
  const map: Record<string, string> = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  for (const char of s) {
    if (map[char]) {
      stack.push(char);
    } else {
      const last = stack.pop();
      if (map[last!] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

export class LRUCache<K, V> {
  private cache = new Map<K, V>();

  constructor(public capacity: number) {
    // TODO: Implement LRU Cache with capacity
    if (capacity <= 0) {
      throw new Error("Capacity must be positive");
    }
  }
  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }
  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(key, value);
  }
}
