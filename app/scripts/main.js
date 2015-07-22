'use strict';

import Ajax from './utils/Ajax';

import Tree from './optimizations/Tree';

import Branch from './bus/Branch';
import trail from './bus/Trail';
import Rank from './bus/Rank';

import Grid from './utils/Grid';

import Terrain from './ui/Terrain';


Ajax.get('../data/map2.txt').then(init);

function init(data) {
  console.time('process');
  let list = data.split(' ');

  let matrix = [];
  let count = 0;

  for (var i = 0; i < 4; i++) {
    matrix[i] = [];
    for (var j = 0; j < 4; j++) {
      matrix[i].push(parseInt(list[count]));
      count++;
    }
  }

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix.length; j++) {
      if (!Tree.get(i, j)) {
        Branch.walk(matrix, i, j, matrix[i][j], trail());
      }
    }
  }

  let grid = Grid.create(matrix);

  /*
   * TODO: need to improve this method and the terrain generation
   * Pass true to fix the grid size.
   */
  var terrain = new Terrain(grid.grid, grid.path, grid.rowStart, grid.colStart, true);

  console.timeEnd('process');
  console.log(Rank.result(matrix));
}
