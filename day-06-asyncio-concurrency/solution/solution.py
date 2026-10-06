import asyncio
import time

async def bounded_gather(coro_factories: list, max_concurrency: int) -> list:
    sem = asyncio.Semaphore(max_concurrency)

    async def run_guarded(factory):
        async with sem:
            return await factory()

    tasks = [run_guarded(f) for f in coro_factories]
    return await asyncio.gather(*tasks)

class AsyncRateLimiter:
    def __init__(self, max_calls: int, period_seconds: float):
        self.max_calls = max_calls
        self.period = period_seconds
        self.call_timestamps = []
        self._lock = asyncio.Lock()

    async def __aenter__(self):
        async with self._lock:
            now = time.monotonic()
            self.call_timestamps = [ts for ts in self.call_timestamps if now - ts < self.period]
            if len(self.call_timestamps) >= self.max_calls:
                sleep_time = self.period - (now - self.call_timestamps[0])
                if sleep_time > 0:
                    await asyncio.sleep(sleep_time)
            self.call_timestamps.append(time.monotonic())
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        return None
