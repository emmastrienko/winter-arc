<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzU1emZjZnBua3JibHA4aXAxc3FzYzAwYzNoYXNyZGhsb3JoZzJmYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xCtx06kFEc8mXJPAhc/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 14: Week 2 Review & Mini-Project: Reactive State Store

> *"You have explored JavaScript down to its engine gears. Today, we forge an observable state store with change streams and middleware."*

---

## 1. Architecture of the Reactive Store
We combine closures, proxies, symbols, and event emitter patterns into a standalone, zero-dependency Reactive Store:
- **Encapsulated State**: Mutations intercepted via Proxy.
- **Subscriptions**: Observable listener pattern with unsubscribe functions.
- **Middleware**: Intercepts actions with `(store) => (next) => (action) => ...`.

---

## 2. Further Reading
- [Redux Middleware Architecture](https://redux.js.org/understanding/history-and-design/middleware)
- [Proxy-based State Management](https://github.com/pmndrs/valtio)
