/*
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
*/
/**
 * @param {number[][]} grid
 * @return {number}
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    const w = grid.length;
    const h = grid[0].length;
    let freshCount = 0;
    const rotten = [];
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            if (grid[i][j] === 2) {
                rotten.push([i, j]);
            } else if (grid[i][j] === 1) {
                freshCount++;
            }
        }
    }

    const moves = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    let round = -1;
    while (rotten.length > 0) {
        round++;
        let roundStored = rotten.length;
        for (let i = 0; i < roundStored; i++) {
            let pos = rotten.shift();
            for (const move of moves) {
                let x = pos[0] + move[0], y = pos[1] + move[1];
                if (x < 0 || x === w || y < 0 || y === h) continue;
                if (grid[x][y] === 1) {
                    rotten.push([x, y]);
                    grid[x][y] = 2;
                    freshCount--;
                }
            }
        }
    }
    if (freshCount > 0) return -1;
    if (round < 0) round = 0;
    return round;
};