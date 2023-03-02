"""
There is a long table with a line of plates and candles arranged on top of it.
You are given a 0-indexed string s consisting of characters '*' and '|' only, where a '*' represents a plate and a '|' represents a candle.

You are also given a 0-indexed 2D integer array queries where queries[i] = [lefti, righti] denotes the substring s[lefti...righti] (inclusive).
For each query, you need to find the number of plates between candles that are in the substring.
A plate is considered between candles if there is at least one candle to its left and at least one candle to its right in the substring.

For example, s = "||**||**|*", and a query [3, 8] denotes the substring "*||**|".
The number of plates between candles in this substring is 2, as each of the two plates has at least one candle in the substring to its left and right.
Return an integer array answer where answer[i] is the answer to the ith query.

Example 1:

ex-1
Input: s = "**|**|***|", queries = [[2,5],[5,9]]
Output: [2,3]
Explanation:
- queries[0] has two plates between candles.
- queries[1] has three plates between candles.
Example 2:

ex-2
Input: s = "***|**|*****|**||**|*", queries = [[1,17],[4,5],[14,17],[5,11],[15,16]]
Output: [9,0,0,0,0]
Explanation:
- queries[0] has nine plates between candles.
- The other queries have zero plates between candles.

Constraints:

3 <= s.length <= 10^5
s consists of '*' and '|' characters.
1 <= queries.length <= 10^5
queries[i].length == 2
0 <= lefti <= righti < s.length
"""


from typing import List


class Solution:
    def platesBetweenCandles(self, s: str, queries: List[List[int]]) -> List[int]:
        s_len = len(s)
        if s[0] == "|":
            plates = [0] * s_len
            left_candle = [0] * s_len
        else:
            plates = [1] * s_len
            left_candle = [-1] * s_len

        if s[-1] == "|":
            right_candle = [s_len - 1] * s_len
        else:
            right_candle = [-1] * s_len

        for index, char in enumerate(s[1:], 1):
            if char == "|":
                plates[index] = plates[index - 1]
                left_candle[index] = index
            else:
                plates[index] = plates[index - 1] + 1
                left_candle[index] = left_candle[index - 1]

        for index, char in reversed(list(enumerate(s[:-1]))):
            if char == "|":
                right_candle[index] = index
            else:
                right_candle[index] = right_candle[index + 1]

        result = []
        for q in queries:
            l = right_candle[q[0]]
            r = left_candle[q[1]]
            if l >= r or l == -1 or r == -1:
                result.append(0)
            else:
                result.append(plates[r] - plates[l])

        return result
