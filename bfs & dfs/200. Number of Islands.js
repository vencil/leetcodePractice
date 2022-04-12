/**
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
You may assume all four edges of the grid are all surrounded by water.

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
 */
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let num = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === "1") {
                num++;
                dfs(grid, i, j);
            }
        }
    }
    return num;
};

const dfs = (grid, x, y) => {
    if (!isInArea(grid, x, y)) return;
    if (grid[x][y] !== "1") return;
    grid[x][y] = "2";    // mark this area has been visited.
    dfs(grid, x - 1, y);
    dfs(grid, x + 1, y);
    dfs(grid, x, y + 1);
    dfs(grid, x, y - 1);
};

const isInArea = (grid, x, y) => {
    return x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;
};