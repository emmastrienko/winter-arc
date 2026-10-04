import os
import sys
from pathlib import Path
import pytest
import time

TESTS_DIR = Path(__file__).resolve().parent
DAY_DIR = TESTS_DIR.parent

if os.environ.get("WINTER_ARC_TEST_SOLUTION") == "1":
    sys.path.insert(0, str(DAY_DIR / "solution"))
    from solution import Stopwatch, suppress_exceptions, MockTransaction
else:
    sys.path.insert(0, str(DAY_DIR / "exercises"))
    from exercise import Stopwatch, suppress_exceptions, MockTransaction

def test_stopwatch():
    with Stopwatch() as sw:
        time.sleep(0.03)
    assert sw.elapsed_seconds >= 0.02

def test_suppress():
    with suppress_exceptions(ValueError):
        raise ValueError("Ignore")

def test_transaction():
    tx = MockTransaction()
    with tx:
        pass
    assert tx.committed is True

    tx2 = MockTransaction()
    with pytest.raises(Exception):
        with tx2:
            raise Exception("Fail")
    assert tx2.rolled_back is True
