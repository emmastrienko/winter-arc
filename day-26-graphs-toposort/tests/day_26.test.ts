import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { canFinish, numIslands } = mod;

describe('Day 26: Graphs & TopoSort', () => {
  it('detects valid course schedule completion with Kahn algorithm', () => {
    expect(canFinish(2, [[1, 0]])).toBe(true);
    expect(canFinish(2, [[1, 0], [0, 1]])).toBe(false);
  });

  it('counts connected components in number of islands', () => {
    const grid = [
      ['1', '1', '0', '0'],
      ['1', '1', '0', '0'],
      ['0', '0', '1', '0'],
      ['0', '0', '0', '1'],
    ];
    expect(numIslands(grid)).toBe(3);
  });
});
