export interface VNode {
  key: string;
  tag: string;
  props: Record<string, any>;
}

export function diffVNodes(
  oldChildren: VNode[],
  newChildren: VNode[]
): Array<{ type: 'INSERT' | 'UPDATE' | 'DELETE'; key: string }> {
  const patches: Array<{ type: 'INSERT' | 'UPDATE' | 'DELETE'; key: string }> = [];
  const oldMap = new Map(oldChildren.map((c) => [c.key, c]));
  const newMap = new Map(newChildren.map((c) => [c.key, c]));

  for (const [key] of oldMap) {
    if (!newMap.has(key)) {
      patches.push({ type: 'DELETE', key });
    }
  }

  for (const [key, newNode] of newMap) {
    if (!oldMap.has(key)) {
      patches.push({ type: 'INSERT', key });
    } else {
      const oldNode = oldMap.get(key)!;
      if (JSON.stringify(oldNode.props) !== JSON.stringify(newNode.props)) {
        patches.push({ type: 'UPDATE', key });
      }
    }
  }

  return patches;
}
