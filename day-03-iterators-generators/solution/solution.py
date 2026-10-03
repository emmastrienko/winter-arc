from collections import deque

def chunked(iterable, size: int):
    if size <= 0:
        raise ValueError("size must be positive")
    batch = []
    for item in iterable:
        batch.append(item)
        if len(batch) == size:
            yield batch
            batch = []
    if batch:
        yield batch

def flatten(nested):
    for item in nested:
        if isinstance(item, (list, tuple)):
            yield from flatten(item)
        else:
            yield item

def window(iterable, n: int = 2):
    if n <= 0:
        raise ValueError("n must be positive")
    it = iter(iterable)
    win = deque(maxlen=n)
    for _ in range(n):
        try:
            win.append(next(it))
        except StopIteration:
            return
    if len(win) == n:
        yield tuple(win)
    for item in it:
        win.append(item)
        yield tuple(win)
