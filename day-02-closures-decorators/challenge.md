# Day 02 Stretch Challenge: Circuit Breaker Decorator

Implement `@circuit_breaker(failure_threshold=3, recovery_time=1.0)`:
1. When consecutive exceptions hit `failure_threshold`, trip state to `OPEN`.
2. While `OPEN`, fail immediately without invoking the decorated function.
3. After `recovery_time`, enter `HALF_OPEN` and allow a trial call to reset or re-trip.
