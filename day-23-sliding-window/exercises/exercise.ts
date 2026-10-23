export function lengthOfLongestSubstring(s: string): number {
  // TODO: Implement lengthOfLongestSubstring
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

export function maxSubArraySum(nums: number[], k: number): number {
  // TODO: Implement fixed sliding window of size k
  let maxSum = -Infinity;
  let currentSum = 0;
  for (let i = 0; i < k; i++) {
    currentSum += nums[i];
  }
  maxSum = Math.max(maxSum, currentSum);
  for (let i = k; i < nums.length; i++) {
    currentSum = currentSum - nums[i - k] + nums[i];
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}
