<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWtoMnA4emI5OTdlM2U2OXNveHF1eGs5c2xjdmw4dHEyand4dnZ6NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/V9qcggwxmJmIeVSRP6/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 11: Iterators, Generators & Well-Known Symbols

> *"Symbols provide unique keys and well-known protocol hooks into the engine's built-in behaviors."*

---

## 1. Well-Known Symbols & Protocols
- `Symbol.iterator`: Defines the default iterator for an object used by `for...of` and spread `...`.
- `Symbol.asyncIterator`: Defines async iteration (`for await...of`).
- `Symbol.toPrimitive`: Controls type coercion (`+obj`, `${obj}`).

---

## 2. Further Reading
- [MDN: Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [MDN: Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)
