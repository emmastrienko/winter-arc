<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODg3czQ1bDRocDN3OTNlbGpxNXI1YXVmZmUwOWVxeDdza203a3g3OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/N0XvAPqgaOMDFcUANE/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 08: Execution Context, Hoisting & Closures

> *"A junior developer reads JavaScript as sequential lines of text. A middle-level engineer sees lexical environments, activation records, and call-stack transitions."*

---

## 1. Motivation & Mental Model
To master JavaScript, you must understand how the V8 engine parses and runs your code. JavaScript is not purely interpreted; it is JIT-compiled (Just-In-Time) in two distinct phases:
1. **Creation Phase**:
   - The Global or Function Execution Context is created.
   - The Lexical Environment and VariableEnvironment are established.
   - Hoisting occurs: `var` declarations are assigned `undefined`, function declarations are fully hoisted into memory, and `let`/`const` identifiers enter the **Temporal Dead Zone (TDZ)** uninitialized.
2. **Execution Phase**:
   - Code executes line-by-line, assigning values and invoking functions.

```
┌────────────────────────────────────────────────────────┐
│               EXECUTION CONTEXT STRUCTURE              │
│                                                        │
│  1. VariableEnvironment: var declarations, parameters  │
│  2. LexicalEnvironment:  let, const, block scope       │
│  3. Outer Reference:     Pointer to Parent Scope       │
│  4. ThisBinding:         Value of `this` keyword       │
└────────────────────────────────────────────────────────┘
```

---

## 2. Core Protocols & Annotated Examples

### A. The Temporal Dead Zone (TDZ)
Unlike `var`, which initializes to `undefined`, `let` and `const` remain uninitialized in the Lexical Environment from scope entry until their declaration statement is evaluated. Accessing them throws a `ReferenceError`.

```javascript
{
  // TDZ for score begins
  // console.log(score); // ReferenceError: Cannot access 'score' before initialization
  let score = 100; // TDZ ends
}
```

### B. Closures & Memory Retention
A closure is the combination of a function bundled together with references to its surrounding lexical environment. Functions maintain an internal `[[Scopes]]` slot pointing to parent environments.

---

## 3. Common Pitfalls & Anti-Patterns
1. **Accidental Memory Retention**: Storing closures holding large outer scope objects when only a single primitive is needed.
2. **`var` loop variable leaking**: Using `for (var i = 0; ...)` sharing a single hoisted `i` across asynchronous callbacks.

---

## 4. Further Reading
- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [MDN: Lexical Scoping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz)
