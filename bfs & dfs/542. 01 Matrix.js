/*
Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.

Example 1:
Input: mat = [[0,0,0],
              [0,1,0],
              [0,0,0]]
Output: [[0,0,0],
         [0,1,0],
         [0,0,0]]

Example 2:
Input: mat = [[0,0,0],
              [0,1,0],
              [1,1,1]]
Output: [[0,0,0],
         [0,1,0],
         [1,2,1]]

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 10^4
1 <= m * n <= 10^4
mat[i][j] is either 0 or 1.
There is at least one 0 in mat.
*/
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
    const m = mat.length, n = mat[0].length;
    const queue = [];
    const result = new Array(m);
    for (let i = 0; i < m; i++) {
        result[i] = new Array(n).fill(-1);  // -1 = unvisited
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) {
                result[i][j] = 0;
                queue.push([i, j]);
            }
        }
    }

    const moves = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    while (queue.length) {
        let pos = queue.shift();
        let newValue = result[pos[0]][pos[1]] + 1;
        for (let move of moves) {
            let x = pos[0] + move[0], y = pos[1] + move[1];
            if (x < 0 || x === m || y < 0 || y === n) continue;
            if (result[x][y] !== -1) continue;
            result[x][y] = newValue;
            queue.push([x, y]);
        }
    }

    return result;
};