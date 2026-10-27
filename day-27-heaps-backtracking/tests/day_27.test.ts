import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { subsets, topKFrequent } = mod;

describe('Day 27: Backtracking & Heaps', () => {
  it('generates all subsets with backtracking', () => {
    const res = subsets([1, 2, 3]);
    expect(res).toHaveLength(8);
    expect(res).toContainEqual([]);
    expect(res).toContainEqual([1, 2, 3]);
  });

  it('finds top K frequent elements', () => {
    const top = topKFrequent([1, 1, 1, 2, 2, 3], 2);
    expect(top).toEqual([1, 2]);
  });
});
