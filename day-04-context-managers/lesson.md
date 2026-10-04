<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODg3czQ1bDRocDN3OTNlbGpxNXI1YXVmZmUwOWVxeDdza203a3g3OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/9RWzeGhUg04nH2fk4Z/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 04: Context Managers & Resource Safety

> *"Resource safety is non-negotiable. Connections, transactions, and file handles must close cleanly in victory and in failure."*

---

## 1. Motivation & Mental Model
Context managers wrap code blocks in deterministic setup and teardown logic (`__enter__` and `__exit__`).
Even if an unhandled exception or early `return` occurs, `__exit__` executes reliably.

---

## 2. Exception Handling in `__exit__`
`__exit__(self, exc_type, exc_val, exc_tb)` receives exception details:
- If no error: `(None, None, None)`.
- If error: Returning `True` suppresses the error. Returning `False` (or `None`) lets it propagate.

```python
class SuppressErrors:
    def __init__(self, *exceptions):
        self.exceptions = exceptions
    def __enter__(self):
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        return exc_type is not None and issubclass(exc_type, self.exceptions)
```

---

## 3. Common Pitfalls
1. Returning `True` unconditionally, masking bugs.
2. Acquiring resources inside `__enter__` without cleanup on partial failure.
3. Ignoring reentrancy bugs in multi-threaded contexts.

---

## 4. Further Reading
- [Python contextlib](https://docs.python.org/3/library/contextlib.html)
- [PEP 343 – The "with" Statement](https://peps.python.org/pep-0343/)
