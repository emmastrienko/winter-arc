<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.tenor.com/mvqSbou7060AAAAM/mob-psycho-100.gif)
<!-- WINTER ARC BANNER END -->

# Day 32: Server State & TanStack Query Caching

> *"Server state is not client state: you do not own it, it is asynchronous, and it goes stale the moment it touches the browser."*

---

## 1. Stale-While-Revalidate Lifecycle
- **Fresh**: Served from cache immediately; no network request.
- **Stale**: Served from cache immediately to keep UI snappy, but triggers background refetch.
- **Inactive / GC**: Kept in memory for `gcTime` before garbage collection.

---

## 2. Optimistic Updates
1. Cancel outgoing queries for that key.
2. Snapshot current cache data for rollback.
3. Optimistically set new data into cache.
4. On error: rollback to snapshot.
5. On finish: invalidate query to synchronize with server truth.

---

## 3. Further Reading
- [TanStack Query v5 Documentation](https://tanstack.com/query/latest)
