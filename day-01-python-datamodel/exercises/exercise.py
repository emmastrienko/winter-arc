import math

class Vector2D:
    def __init__(self, x: float, y: float):
        # TODO: Implement Vector2D
        self.x = float(x)
        self.y = float(y)

    def __repr__(self) -> str:
        return f"Vector2D(x={self.x}, y={self.y})"

    def __str__(self) -> str:
        return f"({self.x}, {self.y})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Vector2D):
            return NotImplemented
        return self.x == other.x and self.y == other.y

    def __hash__(self) -> int:
        return hash((self.x, self.y))

    def __abs__(self) -> float:
        return math.hypot(self.x, self.y)

    def __add__(self, other: "Vector2D") -> "Vector2D":
        if not isinstance(other, Vector2D):
            return NotImplemented
        return Vector2D(self.x + other.x, self.y + other.y)


class BoundedHistory:
    def __init__(self, capacity: int):
        # TODO: Implement BoundedHistory
        if capacity <= 0:
            raise ValueError("Capacity must be a positive integer.")
        self.capacity = capacity
        self.history = []

    def append(self, item: object) -> None:
        self.history.append(item)
        if len(self.history) > self.capacity:
            self.history.pop(0)

    def __len__(self) -> int:
        return len(self.history)

    def __getitem__(self, index: int) -> object:
        return self.history[index]
