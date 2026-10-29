<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/edGzBC6GDOhutW32ps/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 29: React Rendering Model & Fiber Engine

> *"React is not reactive; it is scheduled. A state update does not immediately mutate the DOM; it schedules a Fiber reconciliation pass."*

---

## 1. The Two Phases of React
1. **Render Phase**:
   - Pure, asynchronous, and interruptible by the scheduler.
   - React calls component functions, builds the **Work-in-Progress (WIP) Fiber tree**, and diffs it against the current Fiber tree.
   - Computes side-effects (DOM insertions, updates, deletions) and marks Fibers with effect tags.
2. **Commit Phase**:
   - Synchronous and uninterruptible.
   - React applies the computed DOM mutations in a single batch.
   - Fires `useLayoutEffect` synchronously, then paints the screen, then asynchronously fires `useEffect`.

```
State Update Scheduled
         │
         ▼
┌──────────────────────────────────────┐
│        RENDER PHASE (Interruptible)  │
│   ├── Component Functions Executed   │
│   ├── Work-in-Progress Fiber Tree    │
│   └── Diffing & Effect Tagging       │
└──────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│        COMMIT PHASE (Synchronous)    │
│   ├── DOM Mutations Applied          │
│   ├── useLayoutEffect Executed       │
│   ├── Browser Paints UI              │
│   └── useEffect Executed             │
└──────────────────────────────────────┘
```

---

## 2. Further Reading
- [React Docs: Render and Commit](https://react.dev/learn/render-and-commit)
- [Lin Clark: A Cartoon Guide to Fiber](https://www.youtube.com/watch?v=ZCuYPiUIONs)
