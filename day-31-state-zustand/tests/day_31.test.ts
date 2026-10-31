import { describe, it, expect, vi } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { createSliceStore } = mod;

describe('Day 31: State & Zustand Architecture', () => {
  it('triggers subscriber only when selected slice changes', () => {
    const store = createSliceStore({ user: 'Alice', theme: 'light' });
    const userSpy = vi.fn();
    const themeSpy = vi.fn();

    store.subscribeSelector((s) => s.user, userSpy);
    store.subscribeSelector((s) => s.theme, themeSpy);

    store.setState({ theme: 'dark' });
    expect(themeSpy).toHaveBeenCalledWith('dark');
    expect(userSpy).not.toHaveBeenCalled();

    store.setState({ user: 'Bob' });
    expect(userSpy).toHaveBeenCalledWith('Bob');
    expect(themeSpy).toHaveBeenCalledTimes(1);
  });
});
