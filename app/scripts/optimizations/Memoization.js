'use strict';

let Identity = require('../utils/Identity')
  , Matrix = require('../utils/Matrix')
  , Drop = require('../utils/Drop');

let _store = new Map();

let Memoization = {
  add(matrix, trail) {
    if (!trail[0]) {
      return;
    }

    const trailPos = Matrix.getPosition(trail[0])
      , key = Identity.getKey(trailPos.row, trailPos.column);

    let memo = _store.get(key);
    if (memo) {
      if (Drop.isHigher(matrix, trail, memo)) {
        _store.set(key, trail);
      }

    } else {
      _store.set(key, trail);
    }
  },

  get(row, column) {
    const key = Identity.getKey(row, column);

    return _store.get(key);
  }
};

module.exports = Memoization;

