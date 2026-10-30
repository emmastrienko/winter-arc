import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { areDepsEqual, MockHookRunner } = mod;

describe('Day 30: Core Hooks Mechanics', () => {
  it('correctly identifies dependency equality with Object.is', () => {
    expect(areDepsEqual([1, 'ok'], [1, 'ok'])).toBe(true);
    expect(areDepsEqual([NaN], [NaN])).toBe(true);
    expect(areDepsEqual([0], [-0])).toBe(false);
  });

  it('preserves hook state between renders with MockHookRunner', () => {
    const runner = new MockHookRunner();
    runner.startRender();
    const [c1, setC1] = runner.useState(0);
    expect(c1).toBe(0);

    setC1(10);
    runner.startRender();
    const [c2] = runner.useState(0);
    expect(c2).toBe(10);
  });
});
