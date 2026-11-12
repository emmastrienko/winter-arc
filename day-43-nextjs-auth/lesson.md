<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGdod3h5enUzcDlicmRjbmw1d3JqbjZ0c2N5M2c1d2VnMmVjbHZwciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/UjGydqF9HolDG/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 43: Next.js Authentication with Auth.js (NextAuth v5)

> *"Authentication in the App Router happens server-side. Cookies must be httpOnly, secure, and encrypted with rotating secret keys."*

---

## 1. Auth.js Architecture
- Server-side session verification via `auth()`.
- JWT session tokens (stateless) vs Database session tokens (stateful, revocable).
- Route Protection in Server Components:
```typescript
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect('/login');
  return <h1>Welcome, {session.user.name}</h1>;
}
```

---

## 2. Further Reading
- [Auth.js Official Guide for Next.js](https://authjs.dev/getting-started/installation?framework=Next.js)
