<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzU1emZjZnBua3JibHA4aXAxc3FzYzAwYzNoYXNyZGhsb3JoZzJmYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/RJNZr2JzGrxaMcJ4tg/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 16: Discriminated Unions & Exhaustiveness

> *"Make illegal states unrepresentable. If a state cannot exist at the type level, you will never write a bug to handle it."*

---

## 1. Discriminated (Tagged) Unions
A Discriminated Union is a union of object types that all share a single literal property (the discriminant/tag). 
TypeScript uses this tag to narrow the entire object variant inside `switch` or `if` statements.

```typescript
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

---

## 2. Exhaustive Pattern Matching with `never`
Assigning the unhandled case to `never` triggers a compile-time type error if a new variant is added to the union without updating all call sites!

```typescript
function handleState<T>(state: AsyncState<T>): string {
  switch (state.status) {
    case 'idle': return 'Waiting...';
    case 'loading': return 'Fetching...';
    case 'success': return `Received ${state.data}`;
    case 'error': return `Failed: ${state.error.message}`;
    default: {
      const _exhaustive: never = state;
      throw new Error(`Unhandled state: ${_exhaustive}`);
    }
  }
}
```

---

## 3. Further Reading
- [TypeScript Handbook: Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
