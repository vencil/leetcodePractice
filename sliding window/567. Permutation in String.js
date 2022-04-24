/*
Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.
In other words, return true if one of s1's permutations is the substring of s2.

Example 1:
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").

Example 2:
Input: s1 = "ab", s2 = "eidboaoo"
Output: false

Constraints:

1 <= s1.length, s2.length <= 10^4
s1 and s2 consist of lowercase English letters.
*/
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
    const s1Len = s1.length;
    const s2Len = s2.length;
    if (s2Len < s1Len) return false;
    const s1Array = new Array(26).fill(0);
    const s2Array = new Array(26).fill(0);
    for (let i = 0; i < s1Len; i++) {
        let code = s1.charCodeAt(i);
        s1Array[code - 97]++;         // 97 = character code of 'a'
    }
    let matchRequire = 0;
    for (let i = 0; i < 26; i++) {
        if (s1Array[i] > 0) matchRequire++;
    }
    let left = 0, right = 0;
    let curMatch = 0;
    while (right < s2Len) {
        let rightCodeIndex = s2.charCodeAt(right) - 97;
        if (s1Array[rightCodeIndex] > 0) {
            s2Array[rightCodeIndex]++;
            if (s2Array[rightCodeIndex] === s1Array[rightCodeIndex]) {
                curMatch++;
            }
        }
        right++;

        while (curMatch === matchRequire) {
            if (right - left === s1Len) return true;
            let leftCodeIndex = s2.charCodeAt(left) - 97;
            if (s1Array[leftCodeIndex] > 0) {
                s2Array[leftCodeIndex]--;
                if (s2Array[leftCodeIndex] < s1Array[leftCodeIndex]) {
                    curMatch--;
                }
            }
            left++;
        }
    }
    return false;
};