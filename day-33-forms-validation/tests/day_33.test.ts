import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { createFormManager } = mod;

describe('Day 33: Form Validation & Architecture', () => {
  it('tracks values and validates fields', () => {
    const fm = createFormManager(
      { username: '' },
      (v) => (v.username.length >= 3 ? {} : { username: 'Too short' })
    );

    expect(fm.isValid()).toBe(false);
    expect(fm.getErrors().username).toBe('Too short');

    fm.setValue('username', 'al');
    expect(fm.isValid()).toBe(false);

    fm.setValue('username', 'alice');
    expect(fm.isValid()).toBe(true);
    expect(fm.getErrors().username).toBeUndefined();
  });
});
