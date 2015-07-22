'use strict';

let Rank = require('../bus/Rank');

module.exports = {
  create(matrix) {
    let length = Rank.result(matrix).length;
    let path = Rank.get();

    let half = path[Math.floor((path.length - 1) / 2)];

    let rowStart = half[0] - length;
    if (half[0] - length < 0) {
      rowStart = 0;
    }

    let rowEnd = half[0] + length;
    if (half[0] + length > matrix.length - 1) {
      rowEnd = matrix.length;
    }

    let colStart = half[1] - length;
    if (half[1] - length < 0) {
      colStart = 0;
    }

    let colEnd = half[1] + length;
    if (half[1] + length > matrix.length - 1) {
      colEnd = matrix.length;
    }

    let grid = [];
    let count = 0;
    for (let i = rowStart; i < rowEnd; i++) {
      grid[count] = [];
      for (let j = colStart; j < colEnd; j++) {
        grid[count].push(matrix[i][j]);
      }

      count++;
    }

    return {
      rowStart,
      colStart,
      grid,
      path
    };
  }
};

