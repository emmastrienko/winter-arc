import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { myPromiseAll, myPromiseAllSettled } = mod;

describe('Day 10: Event Loop & Promises', () => {
  it('resolves all values in order with myPromiseAll', async () => {
    const p1 = new Promise((res) => setTimeout(() => res('slow'), 30));
    const p2 = Promise.resolve('fast');
    const results = await myPromiseAll([p1, p2, 'sync']);
    expect(results).toEqual(['slow', 'fast', 'sync']);
  });

  it('rejects immediately on first error with myPromiseAll', async () => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.reject(new Error('Boom'));
    await expect(myPromiseAll([p1, p2])).rejects.toThrow('Boom');
  });

  it('settles all promises regardless of rejection with myPromiseAllSettled', async () => {
    const p1 = Promise.resolve(10);
    const p2 = Promise.reject('error');
    const results = await myPromiseAllSettled([p1, p2]);
    expect(results).toEqual([
      { status: 'fulfilled', value: 10 },
      { status: 'rejected', reason: 'error' },
    ]);
  });
});
