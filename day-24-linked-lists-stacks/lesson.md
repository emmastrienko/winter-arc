<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bzlwYml2eHc1bTM1ODdwdDRuNTE2dXd5MjU4Z2FhdXo4cWRpcmMzZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2InKXcWcMZ9Is/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 24: Linked Lists, Stacks & LRU Cache

> *"Pointers and stacks form the bedrock of memory allocators, browser history, and high-speed in-memory caches."*

---

## 1. Stacks & Monotonic Stacks
Stacks operate on LIFO (Last-In-First-Out). A Monotonic Stack preserves sorted order inside the stack to answer "Next Greater Element" queries in $O(n)$ time.

---

## 2. LRU Cache (Least Recently Used)
An LRU Cache delivers $O(1)$ `get` and `put` operations by pairing a Hash Map with a Doubly Linked List:
- **Hash Map**: Maps key -> Doubly Linked Node (instant lookup).
- **Doubly Linked List**: Keeps nodes in usage order. Most recent at head; evicts from tail.

---

## 3. Further Reading
- [LeetCode LRU Cache Problem #146](https://leetcode.com/problems/lru-cache/)
