/**
Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Example 1:

Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.

Example 2:

Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.

Example 3:

Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.

Constraints:

1 <= intervals.length <= 10^5
intervals[i].length == 2
-5 * 10^4 <= starti < endi <= 5 * 10^4
*/
// thinking is difficult. Pay close attention to the intention of each step.
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
    if (intervals.length === 0) return 0;
    // sort by the right side. Leave more room for the next interval, thus trying to avoid overlap
    intervals.sort((a, b) => a[1] - b[1]);
    let num = 1;
    let edge = intervals[0][1];
    for (let i = 1, len = intervals.length; i < len; i++) {
        if (intervals[i][0] >= edge) {
            num++;
            edge = intervals[i][1];
        }
    }
    return intervals.length - num;
};