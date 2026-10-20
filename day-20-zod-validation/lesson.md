<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXpuanF4YndteXI1YTlkbDU5MjRxcDVmdDh1OWlxZ3V4ajc1Y2lldSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NkwjY0o4vgkvZx29Tz/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 20: Runtime Validation with Zod

> *"TypeScript types disappear at compile time. Zod bridges compile-time static types with runtime boundary validation."*

---

## 1. Schema Definition & Inferred Types
```typescript
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().min(18),
});

export type User = z.infer<typeof UserSchema>;
```

### Safe Parsing
Never let untrusted input crash your service with unhandled exceptions. Use `.safeParse()`:
```typescript
const result = UserSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ errors: result.error.flatten() });
}
const user = result.data; // Fully typed
```

---

## 2. Further Reading
- [Zod Official Documentation](https://zod.dev/)
