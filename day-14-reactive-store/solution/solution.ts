export function createStore<T extends object>(initialState: T) {
  let state = { ...initialState };
  const listeners = new Set<(state: T) => void>();

  return {
    getState: (): T => ({ ...state }),
    setState: (update: Partial<T>): void => {
      state = { ...state, ...update };
      listeners.forEach((fn) => fn({ ...state }));
    },
    subscribe: (fn: (state: T) => void): (() => void) => {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
  };
}
