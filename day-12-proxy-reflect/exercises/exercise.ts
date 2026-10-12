export function createObservable<T extends object>(
  target: T,
  onChange: (prop: string, newVal: any, oldVal: any) => void,
): T {
  // TODO: Implement createObservable
  return new Proxy(target, {
    set(tgt, prop, value, receiver) {
      const oldVal = Reflect.get(tgt, prop, receiver);
      const success = Reflect.set(tgt, prop, value, receiver);
      if (success && oldVal !== value) {
        onChange(String(prop), value, oldVal);
      }
      return success;
    },
  });
}

export function createValidatedProxy<T extends object>(
  target: T,
  validators: Record<keyof T, (val: any) => boolean>,
): T {
  // TODO: Implement createValidatedProxy
  return new Proxy(target, {
    set(tgt, prop, value, receiver) {
      const validator = validators[prop as keyof T];
      if (validator && !validator(value)) {
        throw new TypeError(`Validation failed for property ${String(prop)}`);
      }
      return Reflect.set(tgt, prop, value, receiver);
    }
  });
}
