/*
Given a string s, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.

Example 1:

Input: s = "Let's take LeetCode contest"
Output: "s'teL ekat edoCteeL tsetnoc"

Example 2:

Input: s = "God Ding"
Output: "doG gniD"

Constraints:

1 <= s.length <= 5 * 10^4
s contains printable ASCII characters.
s does not contain any leading or trailing spaces.
There is at least one word in s.
All the words in s are separated by a single space.
*/
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    const len = s.length;
    const arr = new Array(len);
    let spaceIndex = -1;
    for (let i = 0; i < len; i++) {
        if (s.charAt(i) === ' ') {
            reverse(s, arr, spaceIndex + 1, i - 1);
            arr[i] = ' ';
            spaceIndex = i;
        }
    }
    // last word would not meet any spaces, so do the last reverse here.
    reverse(s, arr, spaceIndex + 1, len - 1);

    return arr.join('');
};

/**
 * @param {string} s = source string
 * @param {*} arr = ans array
 * @param {*} start = starting index
 * @param {*} end = ending index
 */
const reverse = (s, arr, start, end) => {
    while (start < end) {
        arr[start] = s.charAt(end);
        arr[end] = s.charAt(start);
        start++;
        end--;
    }
    if (start === end) arr[start] = s.charAt(start);
}

// one-liner using native js api
// var reverseWords = function (s) {
//     return s.split(' ').map(s => s.split('').reverse().join('')).join(' ');
// };