export interface TreeNode {
  val: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
}

export function isValidBST(root: TreeNode | null, min: number = -Infinity, max: number = Infinity): boolean {
  // TODO: Implement isValidBST
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return (
    isValidBST(root.left ?? null, min, root.val) &&
    isValidBST(root.right ?? null, root.val, max)
  );
}

export function levelOrder(root: TreeNode | null): number[][] {
  // TODO: Implement BFS level-order traversal
  if (!root) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}
