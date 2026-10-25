import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { isValidBST, levelOrder } = mod;

describe('Day 25: Trees & Traversals', () => {
  it('validates binary search trees', () => {
    const valid = { val: 2, left: { val: 1 }, right: { val: 3 } };
    expect(isValidBST(valid)).toBe(true);

    const invalid = { val: 5, left: { val: 1 }, right: { val: 4, left: { val: 3 }, right: { val: 6 } } };
    expect(isValidBST(invalid)).toBe(false);
  });

  it('performs level-order traversal with BFS', () => {
    const tree = {
      val: 3,
      left: { val: 9 },
      right: { val: 20, left: { val: 15 }, right: { val: 7 } },
    };
    expect(levelOrder(tree)).toEqual([[3], [9, 20], [15, 7]]);
  });
});
