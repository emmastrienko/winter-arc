# Day 01 Stretch Challenge: N-Dimensional Sparse Vector

## Objective
Implement an immutable `SparseVector` class that supports arbitrary dimensions using a dictionary for non-zero coordinates.

### Acceptance Criteria:
1. `__init__(self, coordinates: dict[int, float], dimension: int)`: Validates that all keys are non-negative integers strictly less than `dimension`.
2. Memory efficiency: Stores only non-zero coordinates internally.
3. Implements `__getitem__`: Returns `0.0` for valid unspecified indices, and raises `IndexError` for out-of-bounds indices.
4. Implements dot product multiplication via `__mul__(self, other: "SparseVector") -> float`. Raises `ValueError` if dimensions mismatch.
5. Implements `__eq__` and `__hash__` correctly so two sparse vectors with the same non-zero values compare equal and have equal hash values.
