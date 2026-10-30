<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Y2YzdG4wcjVsMHZjaWR1cnE5c2xtMmU2bmNqM2xzaG1wYWpicHpzeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/UwS3x5PeklFwLQJLHR/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 30: Core Hooks Deep Dive & Custom Hooks

> *"Hooks are linked-list nodes attached to a Fiber instance. If the order changes, the entire state machine collapses."*

---

## 1. Hook Rules Under the Hood
Each Fiber stores a `memoizedState` pointer to a singly-linked list of hook records:
`Hook 1 (useState) -> Hook 2 (useEffect) -> Hook 3 (useRef)`.
This is why hooks must NEVER be called inside conditional statements or loops.

---

## 2. Dependency Array Shallow Comparison
`useEffect`, `useMemo`, and `useCallback` evaluate dependencies using `Object.is()`. Passing fresh inline object references (`{ id: 1 }`) breaks memoization and triggers infinite re-render loops.

---

## 3. Further Reading
- [React Docs: Hooks API Reference](https://react.dev/reference/react)
