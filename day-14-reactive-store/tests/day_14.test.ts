import { describe, it, expect, vi } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { createStore } = mod;

describe('Day 14: Reactive State Store', () => {
  it('manages state updates and notifies subscribers', () => {
    const store = createStore({ count: 0, user: 'guest' });
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    store.setState({ count: 1 });
    expect(listener).toHaveBeenCalledWith({ count: 1, user: 'guest' });
    expect(store.getState().count).toBe(1);

    unsubscribe();
    store.setState({ count: 2 });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
