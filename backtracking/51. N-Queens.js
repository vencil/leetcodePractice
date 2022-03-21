/*
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.
Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

Example 1:

Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above

Example 2:

Input: n = 1
Output: [["Q"]]
 

Constraints:

1 <= n <= 9
*/
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  const ans = [];
  const board = new Array(n);
  for (let i = 0; i < n; i++) {
    board[i] = new Array(n).fill('.');
  }
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();

  const helper = (row) => {
    if (row === n) {
      const stringsBoard = board.slice();
      for (let i = 0; i < n; i++) {
        stringsBoard[i] = stringsBoard[i].join('');
      }
      ans.push(stringsBoard);
    } else {
      for (let col = 0; col < n; col++) {
        // 直行橫列正反斜對角都不能有
        if (!cols.has(col) && !diag1.has(row + col) && !diag2.has(row - col)) { 
          board[row][col] = 'Q'; 
          cols.add(col);   
          diag1.add(row + col); 
          diag2.add(row - col);
          helper(row + 1);
          board[row][col] = '.'; 
          cols.delete(col);
          diag1.delete(row + col);
          diag2.delete(row - col);
        }
      }
    }
  }

  helper(0);

  return ans;
};