/*
Given a string s, you can transform every letter individually to be lowercase or uppercase to create another string.
Return a list of all possible strings we could create. Return the output in any order.

Example 1:
Input: s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]

Example 2:
Input: s = "3z4"
Output: ["3z4","3Z4"]

Constraints:

1 <= s.length <= 12
s consists of lowercase English letters, uppercase English letters, and digits.
*/
/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
    const chars = s.split('');
    const ans = [];
    dfs(chars, ans, 0)
    return ans;
};

const dfs = (chars, ans, i) => {
    if (i === chars.length) {
        ans.push(chars.join(''));
    } else {
        if (isLetter(chars[i])) {
            chars[i] = chars[i].toLowerCase();
            dfs(chars, ans, i + 1);
            chars[i] = chars[i].toUpperCase();
            dfs(chars, ans, i + 1);
        } else {
            dfs(chars, ans, i + 1);
        }
    }
}

const isLetter = (char) => {
    return Number.isNaN(parseInt(char));
}