/*
Given a circular integer array nums of length n, return the maximum possible sum of a non-empty subarray of nums.

A circular array means the end of the array connects to the beginning of the array. Formally, the next element of nums[i] is nums[(i + 1) % n] and the previous element of nums[i] is nums[(i - 1 + n) % n].

A subarray may only include each element of the fixed buffer nums at most once. Formally, for a subarray nums[i], nums[i + 1], ..., nums[j], there does not exist i <= k1, k2 <= j with k1 % n == k2 % n.

Example 1:

Input: nums = [1,-2,3,-2]
Output: 3
Explanation: Subarray [3] has maximum sum 3.

Example 2:

Input: nums = [5,-3,5]
Output: 10
Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10.

Example 3:

Input: nums = [-3,-2,-3]
Output: -2
Explanation: Subarray [-2] has maximum sum -2.
 

Constraints:

n == nums.length
1 <= n <= 3 * 10^4
-3 * 10^4 <= nums[i] <= 3 * 10^4
*/

// What a genius solution!
// possible situations:
// 1. 
//    |   |Maximum Array|   |  = 53. Maximum Subarray
// 2.
//    | part of Max |Minimum Array| part of Max |
//
// if those continous numbers cannot sum to a positive number, 
// tnen it would be a negative number = part of continous min array

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function(nums) {
    let sum = 0, max = nums[0], min = nums[0], curMax = 0, curMin = 0;
	for (let num of nums) {
		sum += num;
		curMax = Math.max(curMax + num, num);
		curMin = Math.min(curMin + num, num);
		max = Math.max(max, curMax);
		min = Math.min(min, curMin);
	}
	if (max < 0) return max;
	return Math.max(max, sum - min);
};