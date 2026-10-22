export function twoSumSorted(nums: number[], target: number): [number, number] | null {
  // TODO: Implement twoSumSorted
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}

export function maxArea(height: number[]): number {
  // TODO: Implement Container With Most Water
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0; 

  while (left < right) {
    const h = Math.min(height[left], height[right]);
    const w = right - left;
    maxWater = Math.max(maxWater, h * w);
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxWater;
}
