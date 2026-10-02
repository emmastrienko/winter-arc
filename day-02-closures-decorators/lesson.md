<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODg3czQ1bDRocDN3OTNlbGpxNXI1YXVmZmUwOWVxeDdza203a3g3OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gAzr22rxCZUzhA2Yn0/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 02: Closures, Scopes & Custom Decorators

> *"Decorators are not magical annotations; they are higher-order functions exploiting lexical closures to weave cross-cutting concerns into pure business logic."*

---

## 1. Motivation & Mental Model
In backend engineering, decoupling core domain logic from infrastructural concerns (logging, authentication, rate limiting, retries, metrics) is paramount. If retry loops or caching logic are manually embedded inside every database query or API client call, maintainability collapses.

Decorators solve this using **lexical closures**. A closure occurs when an inner function retains access to variables from its enclosing scope, even after that enclosing scope has finished executing.

```
┌────────────────────────────────────────────────────────┐
│  def retry(max_attempts=3):                            │
│      attempts_left = max_attempts  <── Enclosed State │
│                                                        │
│      def decorator(func):                              │
│          def wrapper(*args, **kwargs):                 │
│              # retains access to attempts_left         │
│              return func(*args, **kwargs)              │
│          return wrapper                                │
│      return decorator                                  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Core Protocols & Annotated Examples

### A. The LEGB Scope Resolution Rule
Python resolves variable names in this strict order:
1. **Local**: Inside the current function.
2. **Enclosing**: In enclosing function closures.
3. **Global**: At the module top level.
4. **Built-in**: Python built-in namespace (`len`, `range`).

Use `nonlocal` to rebind enclosing variables and `global` for module-level variables.

### B. Preserving Metadata with `functools.wraps`
When wrapping a function, the wrapper takes its place. Without `@functools.wraps(func)`, metadata (`__name__`, `__doc__`, `__annotations__`) is replaced by the wrapper's metadata, confounding APM tools (Datadog, Sentry) and debuggers.

```python
import functools
import time
from typing import Callable, Any

def audit_log(func: Callable[..., Any]) -> Callable[..., Any]:
    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        start_ns = time.perf_counter_ns()
        try:
            result = func(*args, **kwargs)
            duration_ms = (time.perf_counter_ns() - start_ns) / 1_000_000
            print(f"[AUDIT] {func.__name__} executed in {duration_ms:.2f}ms")
            return result
        except Exception as e:
            print(f"[AUDIT] {func.__name__} failed: {e}")
            raise
    return wrapper
```

---

## 3. Common Pitfalls & Anti-Patterns
1. **Missing `functools.wraps`**: All decorated endpoints appear as `"wrapper"` in logs.
2. **Late Binding in Closures**: In loops, closures capture variable names, not values (`lambda: i`). Fix: `lambda i=i: i`.
3. **Mutable State Across Requests**: Storing request state in decorator globals causes concurrency leaks.

---

## 4. How This Shows Up in Real Projects
- **FastAPI / Flask Routing**: `@app.get("/users")` registers endpoints in route registries.
- **Database Transactions**: `@transactional` opens, commits, or rolls back DB transactions.
- **Resilience**: `@retry` and `@rate_limit` decorators for external API clients.

---

## 5. What a Middle-Level Dev is Expected to Know Here
- Author parameter-accepting decorators (3-tier nested functions).
- Explain Python cell objects and the `__closure__` tuple.
- Preserve signatures and annotations for IDE type checkers.
- Implement class-based decorators for complex stateful decorators.

---

## 6. Interview Questions & Model Answers

### Q1: How does Python retain free variables in a closure after the outer function returns?
**Model Answer:**
When Python compiles a nested function referencing an outer scope variable, it marks it as a free variable and stores it in a heap-allocated **cell object**. The returned inner function retains a reference to this cell in its `__closure__` attribute. Even when the outer activation record leaves the call stack, the cell remains alive in memory until the closure itself is garbage collected.

### Q2: What is the execution order when multiple decorators are stacked on a function?
**Model Answer:**
Decorators execute bottom-up at definition time, and wrap top-down at runtime.
```python
@dec_a
@dec_b
def func(): pass
# Evaluates as: func = dec_a(dec_b(func))
```
When invoked, `dec_a` runs first, delegating to `dec_b`, which invokes `func`.

### Q3: Why does `[lambda: x for x in range(3)]` output `[2, 2, 2]` when called?
**Model Answer:**
Python closures bind to variable names via cell references, not copies of values. When the loop finishes, `x` is `2`. When the lambdas are subsequently called, they look up `x` in the enclosing scope, resolving `2`. To freeze values at iteration time, use default arguments: `lambda x=x: x`.

---

## 7. Further Reading
- [Python functools Documentation](https://docs.python.org/3/library/functools.html)
- [PEP 318 – Decorators for Functions and Methods](https://peps.python.org/pep-0318/)
- [Real Python: Primer on Python Decorators](https://realpython.com/primer-on-python-decorators/)
