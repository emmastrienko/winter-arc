import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { isValidParentheses, LRUCache } = mod;

describe('Day 24: Stacks & LRU Cache', () => {
  it('validates bracket nesting', () => {
    expect(isValidParentheses('()[]{}')).toBe(true);
    expect(isValidParentheses('(]')).toBe(false);
    expect(isValidParentheses('([)]')).toBe(false);
    expect(isValidParentheses('{[]}')).toBe(true);
  });

  it('evicts least recently used items in LRUCache', () => {
    const lru = new LRUCache<number, string>(2);
    lru.put(1, 'A');
    lru.put(2, 'B');
    expect(lru.get(1)).toBe('A'); // 1 is now most recent
    lru.put(3, 'C');             // Evicts 2
    expect(lru.get(2)).toBeUndefined();
    expect(lru.get(3)).toBe('C');
    expect(lru.get(1)).toBe('A');
  });
});
