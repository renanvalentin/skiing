'use strict';

module.exports = {
  getKey(row, column) {
    return '_' + row + '_' + column;
  }
};
