/**
You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.
Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).
The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

Example 1:

Input: grid = [
    [0,1,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [1,1,0,0]
]
Output: 16

Explanation: The perimeter is the 16 yellow stripes in the image above.

Example 2:

Input: grid = [
    [1]
]
Output: 4

Example 3:

Input: grid = [
    [1,0]
]
Output: 4


Constraints:

row == grid.length
col == grid[i].length
1 <= row, col <= 100
grid[i][j] is 0 or 1.
There is exactly one island in grid.
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
    let num = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                num += dfs(grid, i, j);
            }
        }
    }
    return num;
};

const dfs = (grid, x, y) => {
    if (isEdge(grid, x, y)) return 1;
    if (grid[x][y] !== 1) return 0;
    grid[x][y] = 2;    // mark this area has been visited.
    return dfs(grid, x - 1, y) +
        dfs(grid, x + 1, y) +
        dfs(grid, x, y + 1) +
        dfs(grid, x, y - 1);
};

const isEdge = (grid, x, y) => {
    return x < 0 || y < 0 || x === grid.length || y === grid[0].length
        || grid[x][y] === 0;
};