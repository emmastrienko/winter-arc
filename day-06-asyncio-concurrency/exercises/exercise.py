import asyncio
import time

async def bounded_gather(coro_factories: list, max_concurrency: int) -> list:
    # TODO: Implement bounded_gather
    if max_concurrency <= 0:
        raise ValueError("max_concurrency must be greater than 0")

    sem = asyncio.Semaphore(max_concurrency)

    async def run_one(factory):
        async with sem:
            return await factory()

    return await asyncio.gather(*(run_one(factory) for factory in coro_factories))

class AsyncRateLimiter:
    def __init__(self, max_calls: int, period_seconds: float):
        # TODO: Implement AsyncRateLimiter
        if max_calls <= 0:
            raise ValueError("max_calls must be greater than 0")
        if period_seconds <= 0:
            raise ValueError("period_seconds must be greater than 0")   

        self.max_calls = max_calls
        self.period = period_seconds    
        self.calls_timestamps = []
        self.lock = asyncio.Lock()

    async def __aenter__(self):
        while True:
            async with self.lock:
                now = time.monotonic()
                
                self.calls_timestamps = [t for t in self.calls_timestamps if now - t < self.period]

                if len(self.calls_timestamps) < self.max_calls:
                    self.calls_timestamps.append(now)
                    return

                oldest_call = self.calls_timestamps[0]
                wait_time = self.period - (now - oldest_call)

                if wait_time <= 0:
                    wait_time = 0.001
                
            await asyncio.sleep(wait_time)

           

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        return None

