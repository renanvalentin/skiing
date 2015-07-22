import Ajax from './utils/Ajax';

import Tree from './optimizations/Tree';

import Branch from './bus/Branch';
import trail from './bus/Trail';
import Rank from './bus/Rank';


$.get('../data/map.txt').then(init);

function init(data) {
  let start = Date.now();
  let list = data.split(' ');

  let matrix = [];
  let count = 0;

  for (var i = 0; i < 1000; i++) {
    matrix[i] = [];
    for (var j = 0; j < 1000; j++) {
      matrix[i].push(parseInt(list[count]));
      count++;
    }
  }

 // console.log(matrix);

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix.length; j++) {
      if (!Tree.get(i, j)) {
        Branch.walk(matrix, i, j, matrix[i][j], trail());
      }
    }
  }

  console.log('process', Date.now() - start);
  console.log(Rank.result(matrix));

}
