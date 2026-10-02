import os
import sys
from pathlib import Path
import pytest
import time

TESTS_DIR = Path(__file__).resolve().parent
DAY_DIR = TESTS_DIR.parent

if os.environ.get("WINTER_ARC_TEST_SOLUTION") == "1":
    sys.path.insert(0, str(DAY_DIR / "solution"))
    from solution import measure_time, retry, memoize_with_ttl
else:
    sys.path.insert(0, str(DAY_DIR / "exercises"))
    from exercise import measure_time, retry, memoize_with_ttl

def test_measure_time():
    stats = {}
    @measure_time(stats)
    def task():
        return 42

    assert task() == 42
    assert stats["task"]["calls"] == 1
    assert stats["task"]["total_ms"] >= 0.0

def test_retry_eventual_success():
    count = 0
    @retry(max_retries=3, exceptions=(ValueError,))
    def flaky():
        nonlocal count
        count += 1
        if count < 2:
            raise ValueError("fail")
        return "ok"

    assert flaky() == "ok"
    assert count == 2

def test_memoize_ttl():
    runs = 0
    @memoize_with_ttl(ttl_seconds=0.1)
    def compute(x):
        nonlocal runs
        runs += 1
        return x * 2

    assert compute(4) == 8
    assert compute(4) == 8
    assert runs == 1
    time.sleep(0.12)
    assert compute(4) == 8
    assert runs == 2
