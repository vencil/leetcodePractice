"""
Given a string s, remove duplicate letters so that every letter appears once and only once. You must make sure your result is 
the smallest in lexicographical order
 among all possible results.


Example 1:
Input: s = "bcabc"
Output: "abc"

Example 2:
Input: s = "cbacdcbc"
Output: "acdb"

Constraints:

1 <= s.length <= 10^4
s consists of lowercase English letters.
"""


from collections import Counter


class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        counter = Counter(s)
        stack = []
        visit = set()
        for ch in s:
            if ch not in visit:
                while stack and ch < stack[-1] and counter[stack[-1]]:
                    visit.discard(stack.pop())
                visit.add(ch)
                stack.append(ch)

            counter[ch] -= 1

        return "".join(stack)
