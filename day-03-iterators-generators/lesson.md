<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODg3czQ1bDRocDN3OTNlbGpxNXI1YXVmZmUwOWVxeDdza203a3g3OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sb08e2jEdp3J2xMgus/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 03: Iterables, Iterators & Generators

> *"Memory is finite; streams are infinite. A senior engineer designs pipelines that process gigabytes with megabytes of RAM."*

---

## 1. Motivation & Mental Model
In backend systems, processing large payloads in memory (`list(cursor.fetchall())`) causes out-of-memory crashes.
The **Iteration Protocol** enables lazy evaluation:
- **Iterable**: Has `__iter__()` returning an iterator.
- **Iterator**: Has `__next__()` producing the next element or raising `StopIteration`.
- **Generator**: Uses `yield` to pause execution, saving stack frame state on the heap.

---

## 2. Core Protocols & Delegation
```python
def chunked(iterable, size):
    batch = []
    for item in iterable:
        batch.append(item)
        if len(batch) == size:
            yield batch
            batch = []
    if batch:
        yield batch
```

`yield from` delegates iteration transparently to a subgenerator.

---

## 3. Common Pitfalls
1. **Generator Exhaustion**: Iterators cannot be rewound.
2. **Premature Materialization**: Calling `list()` defeats the purpose of streaming.
3. **Hidden Side Effects**: Side effects happen lazily when elements are consumed, not when the generator function is called.

---

## 4. Real-World Applications
- CSV/Parquet bulk ingestion pipelines.
- FastAPI streaming chunk responses.
- Database streaming cursors.

---

## 5. What a Middle-Level Dev is Expected to Know Here
- Understand `yield from` return values and channel routing.
- Construct memory-bounded data pipelines.
- Implement custom sequence iterators.

---

## 6. Interview Questions & Model Answers

### Q1: What is the difference between an Iterable and an Iterator?
**Model Answer:** An Iterable defines `__iter__()` returning an Iterator. An Iterator defines `__next__()` producing elements until `StopIteration`, and returns `self` from `__iter__()`.

### Q2: How does `yield from` handle subgenerator return values?
**Model Answer:** `yield from subgen()` evaluates directly to the `return` value of `subgen`, which is embedded in the `StopIteration.value`.

### Q3: What is the time and space complexity of a generator pipeline?
**Model Answer:** Space complexity is $O(1)$ auxiliary memory since only one item is processed per pipeline stage at any given moment. Time complexity remains $O(n)$ for total items processed.

---

## 7. Further Reading
- [Python Generator Expressions](https://docs.python.org/3/howto/functional.html#generators)
- [PEP 380 – Syntax for Delegating to a Subgenerator](https://peps.python.org/pep-0380/)
