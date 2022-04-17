/*
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
Note that you must do this in-place without making a copy of the array.

Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:

Input: nums = [0]
Output: [0]

Constraints:

1 <= nums.length <= 10^4
-2^31 <= nums[i] <= 2^31 - 1

Follow up: Could you minimize the total number of operations done?
*/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    //Idea:Moving 0 to the end = moving non-zero to the front
    let left = 0, right = 0;
    const len = nums.length;
    while (right < len) {
        if (nums[right] !== 0) {
            // To numbers with leading non-zero numbers, it means swap a number itself = no change
            [[nums[left], nums[right]]] = [[nums[right], nums[left]]];
            left++;
        }
        right++;
    }
};