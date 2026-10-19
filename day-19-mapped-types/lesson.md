<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWhib2QwOXl6cno2c2xib2ltM2wwb3R3anM2bmRoMWdvZW1sYnUzMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/udK21RQeWtaGQ/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 19: Mapped Types & Custom Utility Types

> *"Mapped types iterate over property keys, transforming types with surgical precision."*

---

## 1. Syntax of Mapped Types
```typescript
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

### Key Remapping with `as`
```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
```

---

## 2. Further Reading
- [TypeScript Handbook: Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
