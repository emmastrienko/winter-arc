<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3R4d3FmbDB6OTZoZnQ3ZmR4Z2c0MmI4NzZxd25weGwydHJsMmt3OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qpZ4jZN2cMkgg/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 27: Heaps, Sorting & Backtracking

> *"Backtracking systematically explores the decision tree, pruning dead ends early with state restoration."*

---

## 1. Backtracking Decision Trees
1. **Choose**: Make a decision (add element to path).
2. **Explore**: Recurse down the decision branch.
3. **Un-choose (Backtrack)**: Revert state (`path.pop()`) before exploring sibling branches.

```typescript
export function subsets<T>(nums: T[]): T[][] {
  const result: T[][] = [];
  function backtrack(start: number, current: T[]) {
    result.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop(); // Backtrack
    }
  }
  backtrack(0, []);
  return result;
}
```

---

## 2. Further Reading
- [LeetCode Backtracking Explore](https://leetcode.com/explore/learn/card/recursion-ii/)
