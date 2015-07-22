'use strict';

let Matrix = require('./Matrix');

let Drop = {
  dropCalculation(matrix, trail) {
    return Matrix.getValue(matrix, trail[0]) - Matrix.getValue(matrix, trail[trail.length - 1]);
  },

  isHigher(matrix, newTrail, currentTrail) {
    let currentDrop = this.dropCalculation(matrix, currentTrail)
      , trailDrop = this.dropCalculation(matrix, newTrail);

    if (newTrail.length === currentTrail.length && trailDrop > currentDrop) {
      return true;
    } else if (newTrail.length > currentTrail.length) {
      return true;
    }

    return false;
  }
};

module.exports = Drop;
