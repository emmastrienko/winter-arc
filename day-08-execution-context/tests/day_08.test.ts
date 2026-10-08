import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { createCounter, createMemoizedFn } = mod;

describe('Day 08: Execution Context & Closures', () => {
  it('encapsulates state with createCounter', () => {
    const counter = createCounter(5);
    expect(counter.getValue()).toBe(5);
    expect(counter.increment()).toBe(6);
    expect(counter.decrement()).toBe(5);
    expect((counter as any).count).toBeUndefined();
  });

  it('memoizes pure function results', () => {
    let callCount = 0;
    const square = createMemoizedFn((n: number) => {
      callCount++;
      return n * n;
    });

    expect(square(4)).toBe(16);
    expect(square(4)).toBe(16);
    expect(callCount).toBe(1);
    expect(square(5)).toBe(25);
    expect(callCount).toBe(2);
  });
});
