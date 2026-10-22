<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXNpMGY2djF3aWlob2pkdjcyZXVlZThqaTNiMmVzeTcyZTMxZ3lwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0Iy6cMi1aPIBzP32/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 22: Complexity Analysis, Arrays & Two Pointers

> *"Technical interviews do not test whether you know code; they test whether you can optimize space and time constraints under pressure."*

---

## 1. Two Pointers Technique
Two pointers optimize array transformations from $O(n^2)$ down to $O(n)$ by leveraging sorted invariants:
- **Opposite-Direction Pointers**: Left pointer moves right, right pointer moves left (e.g. Two Sum on sorted array, Container With Most Water).
- **Same-Direction Pointers (Fast/Slow)**: Detecting cycles or in-place array compaction (e.g. Remove Duplicates).

---

## 2. Model Problem: Two Sum II (Sorted)
```typescript
export function twoSumSorted(numbers: number[], target: number): [number, number] | null {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}
```

---

## 3. Further Reading
- [LeetCode Two Pointers Explore Card](https://leetcode.com/explore/learn/card/array-and-string/)
