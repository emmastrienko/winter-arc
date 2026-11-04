import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { sortAndFilterGrid } = mod;

describe('Day 35: Data Grid Model', () => {
  it('filters and sorts tabular dataset', () => {
    const data = [
      { id: '1', name: 'Zack', role: 'Dev' },
      { id: '2', name: 'Alice', role: 'Dev' },
      { id: '3', name: 'Bob', role: 'Admin' },
    ];

    const devsAsc = sortAndFilterGrid(data, 'Dev', 'name', 'asc');
    expect(devsAsc).toHaveLength(2);
    expect(devsAsc[0].name).toBe('Alice');
    expect(devsAsc[1].name).toBe('Zack');

    const devsDesc = sortAndFilterGrid(data, 'Dev', 'name', 'desc');
    expect(devsDesc[0].name).toBe('Zack');
  });
});
