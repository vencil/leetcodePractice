/*
Given a string s, find the length of the longest substring without repeating characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.

Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:

0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.
*/
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const len = s.length;
    if (len < 2) return len;
    let set = new Set();
    let longest = 0;
    let right = 0;
    for (let i = 0; i < len; i++) {
        if (i != 0) {
            set.delete(s.charAt(i - 1));
        }
        while (right < len && !set.has(s.charAt(right))) {
            set.add(s.charAt(right));
            longest = Math.max(longest, set.size);
            right++;
        }
    }
    return longest;
};