export function myBind(fn: Function, thisArg: any, ...boundArgs: any[]) {
  // TODO: Implement myBind
  return function (...callArgs: any[]) {
    return fn.apply(thisArg, [...boundArgs, ...callArgs]);
  }
}

export function myObjectCreate(proto: object | null): object {
  // TODO: Implement Object.create polyfill
  function F() {}
  F.prototype = proto;
  const obj = new (F as any)();
  if (proto === null) {
    Object.setPrototypeOf(obj, null);
  }
  return obj;
}
