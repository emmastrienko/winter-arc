<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXo1eWlwM2x6bXRmZmFvcXBqejZvYXpoenJiOXp2Zjlyemo3Z2hiZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YXY9KkgyfqoAMzWh2o/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 31: Advanced State: Context & Zustand Architecture

> *"Context is for dependency injection, not high-frequency global state. When a Context value changes, every consuming component re-renders unconditionally."*

---

## 1. Why Context Causes Re-render Cascades
React Context notifies consumers by reference equality. If a context provider provides an object `{ user, cart, theme }`, updating `cart` forces components subscribed only to `theme` to re-render.

---

## 2. Zustand Architecture
Zustand solves this via:
1. External store outside React Fiber.
2. `useSyncExternalStore` integration for tearing prevention.
3. Selector-based subscriptions: components re-render ONLY when their selected slice (`state => state.theme`) changes.

---

## 3. Further Reading
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [useSyncExternalStore React API](https://react.dev/reference/react/useSyncExternalStore)
