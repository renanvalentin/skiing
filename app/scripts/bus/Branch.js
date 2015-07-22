'use strict';

let Memoization = require('../optimizations/Memoization')
  , Tree = require('../optimizations/Tree')
  , Rank = require('../bus/Rank')
  , trail = require('../bus/Trail.js');

let Branch = {
  getEdge(matrix, row, column) {
    if (matrix[row] === undefined || matrix[row][column] === undefined) {
      return null;
    }

    return {
      row: row,
      column: column,
      value: matrix[row][column]
    };
  },


  getEdgeValues(matrix, row, column) {
    let left = this.getEdge(matrix, row, column - 1)
      , right = this.getEdge(matrix, row, column + 1)
      , bottom = this.getEdge(matrix, row + 1, column)
      , top = this.getEdge(matrix, row - 1, column);

    return {
      left, right, bottom, top
    };
  },

  walk(matrix, row, column, value, tail) {
    let branches = this.getEdgeValues(matrix, row, column);

    let count = 0;
    Object.keys(branches).forEach((key) => {
      let item = branches[key];

      if (item && value > item.value) {
        var memo = Memoization.get(item.row, item.column);
        if (memo) {
          let trace = trail(tail.get());
          trace.add(row, column);

          trace = trace.get().concat(memo);


          Memoization.add(matrix, trace);
          Rank.add(matrix, trace);
          count++;
        } else {
          let trace = trail(tail.get());
          trace.add(row, column);

          Branch.walk(matrix, item.row, item.column, item.value, trace);

          count++;
        }
      }
    });

    if (count === 0) {
      let trace = trail(tail.get());
      trace.add(row, column);

      var history = trace.get();

      Rank.add(matrix, history);

      Memoization.add(matrix, history.slice(1, history.length));
    } else {
      Tree.add(row, column, value);
    }
  }
};

module.exports = Branch;
