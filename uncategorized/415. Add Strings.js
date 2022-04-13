/**
Given two non-negative integers, num1 and num2 represented as string, return the sum of num1 and num2 as a string.
You must solve the problem without using any built-in library for handling large integers (such as BigInteger).
You must also not convert the inputs to integers directly.

Example 1:

Input: num1 = "11", num2 = "123"
Output: "134"

Example 2:

Input: num1 = "456", num2 = "77"
Output: "533"

Example 3:

Input: num1 = "0", num2 = "0"
Output: "0"

Constraints:

1 <= num1.length, num2.length <= 10^4
num1 and num2 consist of only digits.
num1 and num2 don't have any leading zeros except for the zero itself.
 */
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
    let len1 = num1.length - 1, len2 = num2.length - 1, add = 0;
    const ans = [];
    while (len1 >= 0 || len2 >= 0 || add > 0) {
        let temp = 0 + add;
        add = 0;
        if (len1 >= 0) {
            temp += parseInt(num1.charAt(len1));
        }
        if (len2 >= 0) {
            temp += parseInt(num2.charAt(len2));
        }
        if (temp >= 10) {
            add++;
            temp -= 10;
        }
        ans.push(temp);
        len1--;
        len2--;
    }
    return ans.reverse().join("");
};