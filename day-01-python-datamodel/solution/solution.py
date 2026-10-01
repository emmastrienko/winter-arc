import math

class Vector2D:
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

    def __repr__(self) -> str:
        return f"Vector2D(x={self._x!r}, y={self._y!r})"

    def __str__(self) -> str:
        return f"({self._x}, {self._y})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Vector2D):
            return NotImplemented
        return math.isclose(self._x, other._x) and math.isclose(self._y, other._y)

    def __hash__(self) -> int:
        return hash((self._x, self._y))

    def __abs__(self) -> float:
        return math.hypot(self._x, self._y)

    def __add__(self, other: object) -> "Vector2D":
        if not isinstance(other, Vector2D):
            return NotImplemented
        return Vector2D(self._x + other._x, self._y + other._y)


class BoundedHistory:
    def __init__(self, capacity: int):
        if capacity <= 0:
            raise ValueError("Capacity must be positive")
        self._capacity = capacity
        self._items = []

    def append(self, item: object) -> None:
        if len(self._items) >= self._capacity:
            self._items.pop(0)
        self._items.append(item)

    def __len__(self) -> int:
        return len(self._items)

    def __getitem__(self, index):
        return self._items[index]
