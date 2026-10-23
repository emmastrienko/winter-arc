<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXNpMGY2djF3aWlob2pkdjcyZXVlZThqaTNiMmVzeTcyZTMxZ3lwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Naer8vEzZucIE/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 23: Sliding Window & Substring Algorithms

> *"Nested loops over contiguous sequences are an immediate code smell. Expand and contract a dynamic window in linear time."*

---

## 1. Sliding Window Mechanics
- **Fixed Window**: Window length is constant $K$. Slide one element in from right, drop one from left.
- **Dynamic Window**: Expand right pointer until an invariant is broken; contract left pointer until invariant is restored.

---

## 2. Model Problem: Longest Substring Without Repeating Characters
```typescript
export function lengthOfLongestSubstring(s: string): number {
  const seen = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (seen.has(char) && seen.get(char)! >= left) {
      left = seen.get(char)! + 1;
    }
    seen.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
```

---

## 3. Further Reading
- [LeetCode Sliding Window Patterns](https://leetcode.com/tag/sliding-window/)
