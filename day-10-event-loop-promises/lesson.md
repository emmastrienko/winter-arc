<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWtoMnA4emI5OTdlM2U2OXNveHF1eGs5c2xjdmw4dHEyand4dnZ6NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2vi7YMqmZLrg1pk1FC/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 10: Event Loop, Microtasks & Promises

> *"JavaScript is single-threaded, but the event loop makes it concurrently performant. Master microtasks and you master execution timing."*

---

## 1. Event Loop Architecture
In JavaScript engines (V8, JavaScriptCore):
- **Call Stack**: Executes synchronous code frames.
- **Microtask Queue**: High-priority tasks (`Promise.then`, `queueMicrotask`, `process.nextTick`). Drained **completely** after every macrotask before UI renders.
- **Macrotask (Task) Queue**: Timers (`setTimeout`, `setInterval`), I/O, UI events. One macrotask is processed per turn of the loop.

```
┌────────────────────────────────────────────────────────┐
│                   EVENT LOOP CYCLE                     │
│                                                        │
│  1. Run 1 Task from Macrotask Queue (or initial script)│
│  2. Drain ENTIRE Microtask Queue until empty           │
│  3. Perform UI Render / Repaint (Browser only)         │
│  4. Repeat                                             │
└────────────────────────────────────────────────────────┘
```

---

## 2. Further Reading
- [MDN: Using microtasks and the event loop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)
- [Promises/A+ Specification](https://promisesaplus.com/)
