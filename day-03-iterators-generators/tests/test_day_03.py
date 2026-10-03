import os
import sys
from pathlib import Path
import pytest

TESTS_DIR = Path(__file__).resolve().parent
DAY_DIR = TESTS_DIR.parent

if os.environ.get("WINTER_ARC_TEST_SOLUTION") == "1":
    sys.path.insert(0, str(DAY_DIR / "solution"))
    from solution import chunked, flatten, window
else:
    sys.path.insert(0, str(DAY_DIR / "exercises"))
    from exercise import chunked, flatten, window

def test_chunked():
    assert list(chunked([1, 2, 3, 4], 2)) == [[1, 2], [3, 4]]
    assert list(chunked([1, 2, 3], 2)) == [[1, 2], [3]]

def test_flatten():
    assert list(flatten([1, [2, (3, [4])]])) == [1, 2, 3, 4]

def test_window():
    assert list(window([1, 2, 3, 4], 2)) == [(1, 2), (2, 3), (3, 4)]
