import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { deepFreeze } = mod;

describe('Day 19: Mapped Types & Deep Freeze', () => {
  it('recursively freezes nested objects', () => {
    const data = { user: { profile: { theme: 'dark' } } };
    const frozen = deepFreeze(data);
    expect(Object.isFrozen(frozen)).toBe(true);
    expect(Object.isFrozen(frozen.user)).toBe(true);
    expect(Object.isFrozen(frozen.user.profile)).toBe(true);
  });
});
