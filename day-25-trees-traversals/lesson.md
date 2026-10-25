<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MGE1OGRicTNraHhjNGV4NXc0bHN2NXF5OGN5M3J6bzNkcjZ2dXoyZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gxtbqFVv6zzhK/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 25: Trees & Traversals (DFS/BFS)

> *"File directories, DOM trees, AST compilers, and database indexes are all trees. Master tree recursion and traversals."*

---

## 1. Tree Traversal Paradigms
- **DFS (Depth-First Search)**:
  - Pre-order (Node, Left, Right): Serialization, cloning.
  - In-order (Left, Node, Right): Traverses BST in ascending sorted order.
  - Post-order (Left, Right, Node): Deletion, bottom-up metric calculation.
- **BFS (Breadth-First Search / Level-Order)**: Uses a Queue to traverse level by level.

---

## 2. Lowest Common Ancestor (LCA)
```typescript
export function lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left ?? right;
}
```

---

## 3. Further Reading
- [LeetCode Tree Explore Card](https://leetcode.com/explore/learn/card/data-structures-and-algorithms/)
