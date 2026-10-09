export function myBind(fn: Function, thisArg: any, ...boundArgs: any[]) {
  return function (...callArgs: any[]) {
    return fn.apply(thisArg, [...boundArgs, ...callArgs]);
  };
}

export function myObjectCreate(proto: object | null): object {
  function F() {}
  F.prototype = proto;
  const obj = new (F as any)();
  if (proto === null) {
    Object.setPrototypeOf(obj, null);
  }
  return obj;
}
