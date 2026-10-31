export function createSliceStore<T extends object>(initial: T) {
  let state = { ...initial };
  const listeners = new Set<() => void>();

  return {
    getState: (): T => state,
    setState: (partial: Partial<T>): void => {
      state = { ...state, ...partial };
      listeners.forEach((fn) => fn());
    },
    subscribeSelector: <S>(
      selector: (s: T) => S,
      callback: (selected: S) => void
    ): (() => void) => {
      let currentSlice = selector(state);
      const listener = () => {
        const nextSlice = selector(state);
        if (!Object.is(currentSlice, nextSlice)) {
          currentSlice = nextSlice;
          callback(nextSlice);
        }
      };
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
