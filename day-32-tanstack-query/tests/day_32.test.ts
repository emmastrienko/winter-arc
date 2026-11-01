import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { QueryCache } = mod;

describe('Day 32: TanStack Query Cache State', () => {
  it('manages fresh and stale cache states', () => {
    const cache = new QueryCache();
    cache.setQueryData('posts', [{ id: 1, title: 'First' }]);
    expect(cache.getQueryData('posts')).toHaveLength(1);
    expect(cache.isStale('posts')).toBe(false);

    cache.invalidateQueries('posts');
    expect(cache.isStale('posts')).toBe(true);
    expect(cache.getQueryData('posts')).toHaveLength(1);
  });
});
