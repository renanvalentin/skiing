var fs = require('fs');

let Tree = require('./app/scripts/optimizations/Tree')
  , Branch = require('./app/scripts/bus/Branch')
  , trail = require('./app/scripts/bus/Trail')
  , Rank = require('./app/scripts/bus/Rank');

fs.readFile('./app/data/map.txt', 'utf8', function (err, data) {
  console.time('process');
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

  console.timeEnd('process');
  console.log(Rank.result(matrix));
});
