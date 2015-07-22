'use strict';

let Drop = require('../utils/Drop');

let _store = [];

let Rank = {
  add(matrix, trail) {
    if (_store.length === 0 || Drop.isHigher(matrix, trail, _store)) {
      _store = trail;
    }
  },

  get() {
    return _store;
  },

  result(matrix) {
    return {
      length: _store.length,
      drop: Drop.dropCalculation(matrix, _store)
    };
  }
};

module.exports = Rank;

