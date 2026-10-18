<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWhib2QwOXl6cno2c2xib2ltM2wwb3R3anM2bmRoMWdvZW1sYnUzMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PFkgOFloYgGqc/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 18: Conditional Types & infer Keyword

> *"Conditional types bring ternary branching to the type system. The `infer` keyword allows pattern matching and extracting types from within types."*

---

## 1. Conditional Types: `T extends U ? X : Y`
Conditional types evaluate type relationships at compile time:
```typescript
type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">; // true
type B = IsString<42>;       // false
```

---

## 2. Type Extraction with `infer`
`infer` introduces a type variable inside the `extends` clause to deduce internal structures:
```typescript
// Unpack Promise return type:
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;

// Extract array element type:
type ElementOf<T> = T extends (infer E)[] ? E : T;
```

---

## 3. Further Reading
- [TypeScript Handbook: Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
