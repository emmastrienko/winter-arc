import functools
import time

def measure_time(stats_dict: dict):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            start = time.perf_counter()
            try:
                return func(*args, **kwargs)
            finally:
                ms = (time.perf_counter() - start) * 1000.0
                name = func.__name__
                if name not in stats_dict:
                    stats_dict[name] = {"calls": 0, "total_ms": 0.0}
                stats_dict[name]["calls"] += 1
                stats_dict[name]["total_ms"] += ms
        return wrapper
    return decorator

def retry(max_retries: int = 3, exceptions: tuple = (Exception,)):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exc = None
            for _ in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_exc = e
            if last_exc:
                raise last_exc
        return wrapper
    return decorator

def memoize_with_ttl(ttl_seconds: float):
    def decorator(func):
        cache = {}
        @functools.wraps(func)
        def wrapper(*args):
            now = time.time()
            if args in cache:
                val, expires = cache[args]
                if now < expires:
                    return val
            res = func(*args)
            cache[args] = (res, now + ttl_seconds)
            return res
        wrapper.clear_cache = lambda: cache.clear()
        return wrapper
    return decorator
