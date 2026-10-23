import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { lengthOfLongestSubstring, maxSubArraySum } = mod;

describe('Day 23: Sliding Window', () => {
  it('computes longest substring without repeating characters', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
    expect(lengthOfLongestSubstring('')).toBe(0);
  });

  it('computes max subarray sum of fixed window k', () => {
    expect(maxSubArraySum([2, 1, 5, 1, 3, 2], 3)).toBe(9);
    expect(maxSubArraySum([2, 3, 4, 1, 5], 2)).toBe(7);
  });
});
