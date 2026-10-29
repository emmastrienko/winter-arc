import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { diffVNodes } = mod;

describe('Day 29: React Rendering & Fiber Reconciliation', () => {
  it('identifies inserts, updates, and deletes by key', () => {
    const oldV = [
      { key: '1', tag: 'li', props: { text: 'Item 1' } },
      { key: '2', tag: 'li', props: { text: 'Item 2' } },
    ];
    const newV = [
      { key: '2', tag: 'li', props: { text: 'Item 2 Updated' } },
      { key: '3', tag: 'li', props: { text: 'Item 3 New' } },
    ];

    const patches = diffVNodes(oldV, newV);
    expect(patches).toContainEqual({ type: 'DELETE', key: '1' });
    expect(patches).toContainEqual({ type: 'UPDATE', key: '2' });
    expect(patches).toContainEqual({ type: 'INSERT', key: '3' });
  });
});
