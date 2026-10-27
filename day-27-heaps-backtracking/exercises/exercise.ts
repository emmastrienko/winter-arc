export function subsets(nums: number[]): number[][] {
  // TODO: Implement subsets
  const result: number[][] = [];
  function backtrack(start: number, path: number[]) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result;
}

export function topKFrequent(nums: number[], k: number): number[] {
  // TODO: Find top k frequent elements
  const freq = new Map<number, number>();
  for (const n of nums) {
    freq.set(n, (freq.get(n) ?? 0) + 1);
  }
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}
