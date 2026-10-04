import time

class Stopwatch:
    def __init__(self):
        self.elapsed_seconds = 0.0
        self._start = None

    def __enter__(self):
        self._start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed_seconds = time.perf_counter() - self._start
        return False

class suppress_exceptions:
    def __init__(self, *exceptions):
        self.exceptions = exceptions

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None and issubclass(exc_type, self.exceptions):
            return True
        return False

class MockTransaction:
    def __init__(self):
        self.committed = False
        self.rolled_back = False

    def __enter__(self):
        self.committed = False
        self.rolled_back = False
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            self.rolled_back = True
            return False
        self.committed = True
        return None
