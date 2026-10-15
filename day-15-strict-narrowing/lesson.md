<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzU1emZjZnBua3JibHA4aXAxc3FzYzAwYzNoYXNyZGhsb3JoZzJmYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/p6BziscMZD4WUpRApY/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 15: Strict Mode, Type Inference & Narrowing

> *"TypeScript is not JavaScript with annotations; it is a compile-time set-theoretic proof system. When you narrow a type, you mathematically restrict its domain."*

---

## 1. Motivation & Mental Model
In professional engineering, TypeScript compiler options must always enable `strict: true`. Strict mode turns off unsafe defaults:
- `noImplicitAny`: Prevents unannotated variables from falling back to `any`.
- `strictNullChecks`: Disallows assigning `null` or `undefined` to typed variables unless explicitly unioned (`string | null`).
- `exactOptionalPropertyTypes`: Enforces that optional properties cannot be explicitly set to `undefined` unless declared.

### Type Narrowing (Control Flow Analysis)
TypeScript's compiler tracks control flow paths to narrow broad union types (`string | number | Error`) down to concrete subtypes using:
1. `typeof` guards (`typeof x === "string"`).
2. `instanceof` guards (`err instanceof CustomError`).
3. Property existence (`"key" in obj`).
4. Custom User-Defined Type Predicates (`function isUser(x: any): x is User`).

---

## 2. User-Defined Type Predicates
```typescript
interface Admin {
  role: 'admin';
  permissions: string[];
}
interface Customer {
  role: 'customer';
  loyaltyPoints: number;
}
type User = Admin | Customer;

export function isAdmin(user: User): user is Admin {
  return user.role === 'admin';
}
```

---

## 3. Further Reading
- [TypeScript Handbook: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript tsconfig Reference](https://www.typescriptlang.org/tsconfig)
