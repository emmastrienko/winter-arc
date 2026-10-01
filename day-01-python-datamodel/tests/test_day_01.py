import os
import sys
from pathlib import Path
import pytest

TESTS_DIR = Path(__file__).resolve().parent
DAY_DIR = TESTS_DIR.parent

if os.environ.get("WINTER_ARC_TEST_SOLUTION") == "1":
    sys.path.insert(0, str(DAY_DIR / "solution"))
    from solution import Vector2D, BoundedHistory
else:
    sys.path.insert(0, str(DAY_DIR / "exercises"))
    from exercise import Vector2D, BoundedHistory

def test_vector_creation_and_repr():
    v = Vector2D(3, 4)
    assert repr(v) == "Vector2D(x=3.0, y=4.0)"
    assert str(v) == "(3.0, 4.0)"
    assert v.x == 3.0
    assert v.y == 4.0

def test_vector_equality_and_hash():
    v1 = Vector2D(1.5, 2.5)
    v2 = Vector2D(1.5, 2.5)
    v3 = Vector2D(2.0, 3.0)
    assert v1 == v2
    assert v1 != v3
    assert hash(v1) == hash(v2)
    s = {v1}
    assert v2 in s
    assert v3 not in s

def test_vector_math():
    v1 = Vector2D(3, 4)
    v2 = Vector2D(1, 2)
    assert abs(v1) == 5.0
    res = v1 + v2
    assert res == Vector2D(4, 6)

def test_bounded_history_capacity():
    h = BoundedHistory(3)
    h.append("a")
    h.append("b")
    h.append("c")
    assert len(h) == 3
    assert list(h) == ["a", "b", "c"]
    h.append("d")
    assert len(h) == 3
    assert list(h) == ["b", "c", "d"]
    assert h[0] == "b"
    assert h[-1] == "d"
    assert "a" not in h
    assert "d" in h
