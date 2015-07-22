'use strict';

export default {
  getKey(row, column) {
    return '_' + row + '_' + column;
  }
};
