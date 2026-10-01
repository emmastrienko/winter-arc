<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODg3czQ1bDRocDN3OTNlbGpxNXI1YXVmZmUwOWVxeDdza203a3g3OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3Wj1SxyDEznCjXiMtm/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 01: Python Data Model & Dunder Methods

> *"The language is not just syntax; it is an object model of protocols. Master the protocols, and Python bends to your will."*

---

## 1. Motivation & Mental Model
In Python, "everything is an object" is not a cliché—it is the foundational architectural law of the runtime. When you write `len(my_obj)`, Python does not check an internal property table or execute a procedural subroutine; it calls `type(my_obj).__len__(my_obj)`. 

This is the **Python Data Model**: a formalized contract of special methods (dunder methods, surrounded by double underscores) that allow custom objects to integrate seamlessly with the language's native idioms: iteration, slicing, hashing, arithmetic, and attribute access.

Junior developers often write utility functions like `get_length(c)` or `compare_items(a, b)`. Middle-level engineers leverage the data model so their domain entities feel like first-class citizens of the language.

```
┌─────────────────────────────────────────────────────────────┐
│                      PYTHON RUNTIME                         │
│                                                             │
│   User Code:          my_vector[0]      hash(entity)        │
│                            │                 │              │
│                            ▼                 ▼              │
│   Data Model:        __getitem__(0)      __hash__()         │
│                            │                 │              │
│                            ▼                 ▼              │
│   C-Python Engine:  PySequence_GetItem  PyObject_Hash       │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Core Protocols & Annotated Examples

### A. String Representation: `__repr__` vs `__str__`
- `__repr__`: Unambiguous description of the object. Ideally, `eval(repr(obj)) == obj`. Primarily for developers, logs, and debugging.
- `__str__`: Readable, user-friendly presentation for end users (used by `print()` and `str()`).
If `__str__` is not defined, Python falls back to `__repr__`.

```python
class Coordinate:
    def __init__(self, x: float, y: float):
        self.x = float(x)
        self.y = float(y)

    def __repr__(self) -> str:
        # Machine-readable, executable representation
        return f"Coordinate(x={self.x!r}, y={self.y!r})"

    def __str__(self) -> str:
        # Human-readable representation
        return f"({self.x}, {self.y})"
```

### B. Equality and Hashability: `__eq__` and `__hash__`
To use an object as a key in a `dict` or an element in a `set`, the object must be **hashable**:
1. It must have a hash value that never changes during its lifetime (`__hash__`).
2. It must be comparable to other objects (`__eq__`).
3. If two objects are equal (`a == b`), their hash values MUST be equal (`hash(a) == hash(b)`).

> ⚠️ **Critical Rule**: If a class overrides `__eq__` without defining `__hash__`, Python sets `__hash__ = None`, making instances unhashable. If you define both, your object MUST be immutable in those attributes used for hashing.

```python
class FrozenPoint:
    __slots__ = ("_x", "_y")

    def __init__(self, x: float, y: float):
        object.__setattr__(self, "_x", float(x))
        object.__setattr__(self, "_y", float(y))

    @property
    def x(self) -> float:
        return self._x

    @property
    def y(self) -> float:
        return self._y

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, FrozenPoint):
            return NotImplemented
        return (self._x, self._y) == (other._x, other._y)

    def __hash__(self) -> int:
        return hash((self._x, self._y))
```

### C. Sequence Protocol: `__len__` and `__getitem__`
Implementing `__len__` and `__getitem__` transforms your object into a read-only sequence. Python will automatically support:
- Indexing (`obj[0]`)
- Slicing (`obj[1:3]`)
- Iteration (`for item in obj:`)
- Membership testing (`item in obj`) via linear scan fallback

---

## 3. Common Pitfalls & Anti-Patterns
1. **Returning `False` instead of `NotImplemented` in `__eq__`**:
   When comparing against an unknown type, returning `NotImplemented` signals Python to give the other operand a chance to evaluate the comparison via its own reflected method (`__eq__`). Returning `False` prematurely aborts this negotiation.
2. **Mutable objects in `__hash__`**:
   Mutating an object after inserting it into a dictionary causes the object to become lost in the hash table bucket, leading to silent retrieval bugs and data corruption.
3. **Confusing identity (`is`) with equality (`==`)**:
   `is` compares memory addresses (`id(a) == id(b)`). `==` invokes `__eq__` to compare values.

---

## 4. How This Shows Up in Real Projects
- **Custom ORM Record / Identity Map**: Checking if two database entities represent the same record by comparing primary keys in `__eq__` and caching them in sets using `__hash__`.
- **Domain-Driven Design (DDD) Value Objects**: Money, DateRange, and Vector classes implemented as immutable, comparable value objects.
- **Cache Keys**: Creating composite cache keys that can be hashed and stored in Redis or in-memory LRU caches.

---

## 5. What a Middle-Level Dev is Expected to Know Here
- Understand why modifying a mutable attribute of a hashed object breaks dictionary lookups.
- Explain the contract between `__eq__` and `__hash__`.
- Know how Python infers iteration from `__getitem__` even without `__iter__`.
- Use `__slots__` to optimize memory and prevent dynamic attribute creation in high-throughput data pipelines.

---

## 6. Interview Questions & Model Answers

### Q1: What happens if two objects compare equal with `__eq__` but produce different hash values in `__hash__`?
**Model Answer:**
This violates the core Python hashing contract. In Python's hash table implementation (used by `dict` and `set`), an object's hash determines the bucket index. If two equal objects have different hashes, they will be placed in different buckets. Consequently, checking `a in my_set` when `b` is present will return `False` even though `a == b`. This causes duplicate entries in sets and missing keys in dictionaries.

### Q2: Why should `__repr__` be defined before `__str__`?
**Model Answer:**
If `__str__` is not implemented on a class, Python automatically falls back to `__repr__`. However, if only `__str__` is implemented, `repr()` falls back to the default `object.__repr__` (`<ClassName object at 0x...>`). Therefore, defining `__repr__` guarantees that debugging, logging, and container inspections (`[item1, item2]`) always have informative outputs.

### Q3: How does Python support slicing (`obj[1:4]`) through `__getitem__`?
**Model Answer:**
When slicing notation is used, Python instantiates a `slice` object (with `start`, `stop`, and `step` attributes) and passes it as the argument to `__getitem__(self, index)`. To support both single-index lookups and slicing, `__getitem__` should inspect `isinstance(index, slice)` and handle each case accordingly, or delegate to an underlying sequence.

---

## 7. Further Reading
- [Python Data Model Official Documentation](https://docs.python.org/3/reference/datamodel.html)
- [Python `collections.abc` Documentation](https://docs.python.org/3/library/collections.abc.html)
- [PEP 557 – Data Classes](https://peps.python.org/pep-0557/)
