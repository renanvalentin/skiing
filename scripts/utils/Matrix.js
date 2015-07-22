'use strict';

export default {
  getValue(matrix, cell) {
    let position = this.getPosition(cell);

    return matrix[position.row][position.column];
  },

  getPosition(cell) {
    return {
      row: cell[0],
      column: cell[1]
    };
  }
};
