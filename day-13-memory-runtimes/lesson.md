<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjUxeGc2a2xqanFxbWFpOTk3aWgyeGExcHZ5Nm03eWplZXppc28zZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/obB72YqgMf0oe7ZXCb/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 13: Memory Management, GC & Runtimes

> *"Memory leaks in long-running Node.js services don't crash immediately; they slowly elevate GC pressure until CPU hits 100% and latency spikes to infinity."*

---

## 1. V8 Garbage Collection Pipeline
- **New Space (Scavenge / Minor GC)**: Fast, Cheney copying algorithm for short-lived allocations.
- **Old Space (Major GC / Mark-Sweep-Compact)**: Incremental marking, concurrent sweeping, and memory compaction for long-lived objects.

### WeakMap & WeakSet
Keys in `WeakMap` are held weakly. If no other active references exist to an object key, the entry is eligible for garbage collection, preventing memory leaks in caches and listener registries.

---

## 2. Further Reading
- [V8: A tour of V8: Garbage Collection](https://v8.dev/blog/trash-talk)
- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
