export function createStore<T extends object>(initialState: T) {
  // TODO: Implement createStore with getState, setState, subscribe
  let state = { ...initialState };

  const listeners = new Set<(state: T) => void>();

  return {
    getState: (): T => ({ ...state }),
    setState: (update: Partial<T>): void => {
      state = { ...state, ...update };  
      listeners.forEach((listener) => listener({ ...state }));
    },
    subscribe: (listener: (state: T) => void): () => void => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }
  };
}
