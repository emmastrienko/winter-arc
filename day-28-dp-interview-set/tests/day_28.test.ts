import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { coinChange, rob } = mod;

describe('Day 28: Dynamic Programming Benchmark', () => {
  it('computes minimum coins for change', () => {
    expect(coinChange([1, 2, 5], 11)).toBe(3);
    expect(coinChange([2], 3)).toBe(-1);
    expect(coinChange([1], 0)).toBe(0);
  });

  it('computes max money robbed from houses in O(1) space', () => {
    expect(rob([1, 2, 3, 1])).toBe(4);
    expect(rob([2, 7, 9, 3, 1])).toBe(12);
  });
});
