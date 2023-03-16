"""
You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

Example 1:
Input: grid = [[2,1,1],
               [1,1,0],
               [0,1,1]]
Output: 4

Example 2:
Input: grid = [[2,1,1],
               [0,1,1],
               [1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.

Example 3:
Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 10
grid[i][j] is 0, 1, or 2.
"""
from collections import deque
from typing import List


class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        m = len(grid)
        n = len(grid[0])

        queue = deque()
        fresh_count = 0

        for x, row in enumerate(grid):
            for y, val in enumerate(row):
                if val == 2:
                    queue.append((x, y))
                elif val == 1:
                    fresh_count += 1

        moves = [[1, 0], [0, 1], [-1, 0], [0, -1]]

        round = -1
        while queue:
            round += 1
            rotten_in_round = len(queue)
            while rotten_in_round:
                x, y = queue.popleft()
                rotten_in_round -= 1
                for d_x, d_y in moves:
                    new_x = x + d_x
                    new_y = y + d_y
                    if new_x >= 0 and new_x < m and new_y >= 0 and new_y < n and grid[new_x][new_y] == 1:
                        grid[new_x][new_y] = 2
                        queue.append((new_x, new_y))
                        fresh_count -= 1

        if fresh_count:
            return -1
        if round == -1:
            return 0
        return round
