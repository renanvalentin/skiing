'use strict';

let Trail = function(list) {
  let _store = [];

  if (list) {
    _store = _store.concat(list);
  }

  return {
    get: function() {
      return _store;
    },

    add: function(row, column) {
      _store.push([row, column]);
    },

    push: function(row, column) {
      _store.unshift([row, column]);
    }
  };
};

module.exports = Trail;
