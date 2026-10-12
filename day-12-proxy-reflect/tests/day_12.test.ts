import { describe, it, expect, vi } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { createObservable, createValidatedProxy } = mod;

describe('Day 12: Proxy & Reflect', () => {
  it('triggers change callback on state mutation', () => {
    const spy = vi.fn();
    const state = createObservable({ count: 0 }, spy);
    state.count = 1;
    expect(spy).toHaveBeenCalledWith('count', 1, 0);
  });

  it('enforces runtime validation schema', () => {
    const user = createValidatedProxy(
      { age: 20 },
      { age: (val) => typeof val === 'number' && val >= 18 }
    );
    user.age = 25;
    expect(user.age).toBe(25);
    expect(() => {
      (user as any).age = 15;
    }).toThrow(TypeError);
  });
});
