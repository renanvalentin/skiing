'use strict';

let Identity = require('../utils/Identity');

let _store = new Map();

let Tree = {
  add(row, column, value) {
    const key = Identity.getKey(row, column);

    _store.set(key, value);
  },

  get(row, column) {
    const key = Identity.getKey(row, column);

    return _store.get(key);
  }
};

module.exports = Tree;

