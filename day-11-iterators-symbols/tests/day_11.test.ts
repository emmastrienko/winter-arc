import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { Range, takeAsync } = mod;

describe('Day 11: Iterators & Symbols', () => {
  it('iterates through Range using Symbol.iterator', () => {
    const r = new Range(1, 5, 2);
    expect([...r]).toEqual([1, 3, 5]);
  });

  it('streams items with takeAsync', async () => {
    async function* source() {
      yield 10;
      yield 20;
      yield 30;
      yield 40;
    }
    const items: number[] = [];
    for await (const val of takeAsync(source(), 2)) {
      items.push(val);
    }
    expect(items).toEqual([10, 20]);
  });
});
