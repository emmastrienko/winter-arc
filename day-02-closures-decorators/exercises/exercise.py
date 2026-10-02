import time
import functools

def measure_time(stats_dict: dict):
    # TODO: Implement measure_time
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            start = time.perf_counter()
            try: 
                result = func(*args, **kwargs)
            finally:
                ms = (time.perf_counter() - start) * 1000.0
                name = func.__name__
                if name not in stats_dict:
                    stats_dict[name] = {"calls": 0, "total_ms": 0.0}
                stats_dict[name]["calls"] += 1
                stats_dict[name]["total_ms"] += ms
            return result
        return wrapper
    return decorator

def retry(max_retries: int = 3, exceptions: tuple = (Exception,)):
    # TODO: Implement retry
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
    # TODO: Implement memoize_with_ttl
    def decorator(func):
        cache = {}
        @functools.wraps(func)
        def wrapper(*args):
            now = time.time()
            if args in cache:
                val, expires = cache[args]
                if now < expires:
                    return val
            result = func(*args)
            cache[args] = (result, now + ttl_seconds)
            return result
        return wrapper
    return decorator
