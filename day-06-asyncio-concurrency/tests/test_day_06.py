import os
import sys
from pathlib import Path
import pytest
import asyncio
import time

TESTS_DIR = Path(__file__).resolve().parent
DAY_DIR = TESTS_DIR.parent

if os.environ.get("WINTER_ARC_TEST_SOLUTION") == "1":
    sys.path.insert(0, str(DAY_DIR / "solution"))
    from solution import bounded_gather, AsyncRateLimiter
else:
    sys.path.insert(0, str(DAY_DIR / "exercises"))
    from exercise import bounded_gather, AsyncRateLimiter

@pytest.mark.asyncio
async def test_bounded_gather():
    active = 0
    max_active = 0

    async def work(x):
        nonlocal active, max_active
        active += 1
        max_active = max(max_active, active)
        await asyncio.sleep(0.01)
        active -= 1
        return x * 10

    factories = [lambda val=x: work(val) for x in range(4)]
    res = await bounded_gather(factories, max_concurrency=2)
    assert res == [0, 10, 20, 30]
    assert max_active <= 2

@pytest.mark.asyncio
async def test_rate_limiter():
    limiter = AsyncRateLimiter(max_calls=2, period_seconds=0.05)
    async with limiter:
        pass
    async with limiter:
        pass
    t0 = time.monotonic()
    async with limiter:
        pass
    assert time.monotonic() - t0 >= 0.03
