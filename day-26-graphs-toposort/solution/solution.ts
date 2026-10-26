export function canFinish(numCourses: number, prerequisites: [number, number][]): boolean {
  const inDegree = new Array(numCourses).fill(0);
  const adj = new Map<number, number[]>();

  for (const [course, pre] of prerequisites) {
    inDegree[course]++;
    if (!adj.has(pre)) adj.set(pre, []);
    adj.get(pre)!.push(course);
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let count = 0;
  while (queue.length > 0) {
    const curr = queue.shift()!;
    count++;
    for (const neighbor of adj.get(curr) ?? []) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  return count === numCourses;
}

export function numIslands(grid: string[][]): number {
  if (grid.length === 0) return 0;
  let islands = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r: number, c: number) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // Mark visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        islands++;
        dfs(r, c);
      }
    }
  }
  return islands;
}
