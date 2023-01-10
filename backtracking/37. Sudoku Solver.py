# Write a program to solve a Sudoku puzzle by filling the empty cells.

# A sudoku solution must satisfy all of the following rules:

# Each of the digits 1-9 must occur exactly once in each row.
# Each of the digits 1-9 must occur exactly once in each column.
# Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
# The '.' character indicates empty cells.

# Example 1:

# Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],
#                 ["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],
#                 [".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
# Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],
#          ["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],
#          ["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
# Explanation: The input board is shown above and the only valid solution is shown below:

# Constraints:

# board.length == 9
# board[i].length == 9
# board[i][j] is a digit or '.'.
# It is guaranteed that the input board has only one solution.

from typing import List


class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        numbers = frozenset(["1", "2", "3", "4", "5", "6", "7", "8", "9"])
        x_cache = [set() for _ in range(9)]
        y_cache = [set() for _ in range(9)]
        d_cache = [set() for _ in range(9)]
        blanks = []

        for i in range(9):
            for j in range(9):
                if board[i][j] != ".":
                    x_cache[i].add(board[i][j])
                    y_cache[j].add(board[i][j])
                    d_cache[i//3*3 + j//3].add(board[i][j])
                else:
                    blanks.append((i, j))

        def helper(index: int) -> bool:
            if index == len(blanks):
                return True
            x, y = blanks[index]
            rest_numbers = numbers - x_cache[x] - \
                y_cache[y] - d_cache[x//3*3+y//3]
            if not rest_numbers:
                return False
            for rest_num in rest_numbers:
                board[x][y] = rest_num
                x_cache[x].add(rest_num)
                y_cache[y].add(rest_num)
                d_cache[x//3*3+y//3].add(rest_num)
                if helper(index + 1):
                    return True
                else:
                    x_cache[x].remove(rest_num)
                    y_cache[y].remove(rest_num)
                    d_cache[x//3*3+y//3].remove(rest_num)

        helper(0)
