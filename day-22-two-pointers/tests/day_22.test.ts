import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { twoSumSorted, maxArea } = mod;

describe('Day 22: Two Pointers', () => {
  it('finds two sum indices in sorted array', () => {
    expect(twoSumSorted([2, 7, 11, 15], 9)).toEqual([0, 1]);
    expect(twoSumSorted([1, 2, 3, 4, 6], 10)).toEqual([3, 4]);
    expect(twoSumSorted([1, 2], 5)).toBeNull();
  });

  it('calculates maximum water container area', () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
    expect(maxArea([1, 1])).toBe(1);
  });
});
