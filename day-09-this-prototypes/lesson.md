<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dnduZmh4MnY4Z3dsOXVzenlhNHNzZTI2dDl4bzBldjc0eWcxNmVvNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rLHt17g2AnyULWJF0r/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 09: The this Keyword, Prototypes & Inheritance

> *"JavaScript does not have traditional classical inheritance. It has object delegation linked via prototype pointers."*

---

## 1. The 4 Rules of `this` Binding
1. **Default Binding**: Standalone function invocation -> `globalThis` (or `undefined` in strict mode).
2. **Implicit Binding**: Method call (`obj.method()`) -> `this` is `obj`.
3. **Explicit Binding**: `.call(thisArg, ...args)`, `.apply(thisArg, [args])`, `.bind(thisArg)`.
4. **`new` Binding**: Invoking with `new` constructs a fresh object whose `[[Prototype]]` points to `Constructor.prototype`.

> Arrow functions do NOT have their own `this`; they capture `this` lexically from their enclosing execution context.

---

## 2. Prototypal Inheritance Chain
Every JavaScript object has an internal `[[Prototype]]` link (accessible via `Object.getPrototypeOf()` or `__proto__`). Property lookups traverse this chain until finding the key or hitting `null`.

---

## 3. Further Reading
- [MDN: Object prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
- [MDN: Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
