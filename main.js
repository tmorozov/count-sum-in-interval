#!/usr/bin/env node

var program = require('commander');
var farr = require('./load_array');
var INPUT_FILE_DEFAULT = "./samples/q1.txt";

function clone(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

function findIndex(arr, val) {
  // var doLog = val === 2147218497;

  if(! arr.length) {
    return -1;
  }

  var start = 0;
  var end = arr.length - 1;

  if(val >= arr[end]) {
    return end;
  }
  if(val <= arr[start]) {
    return start;
  }

  while (start != end ) {
    var mid = ~~((start + end) / 2);
// if (doLog) {
//   console.log('indexes', start, mid, end);
//   console.log('values', arr[start], arr[mid], arr[end]);
// }
    if(arr[mid] > val) {
      end = mid;
      if( end > start ) {
        end--;
      }
    } else if (arr[mid] < val) {
      start = mid;
      if( end > start) {
        start++;
      }
    } else {
      return mid;
    }
  }

  return start;
}

function onArrayLoaded (arr) {
  console.log('loaded');

  var hash = {};
  var arrClear = [];
  arr.forEach(function(item) {
    if(hash[item] === true) {
    } else {
      hash[item] = true;
      arrClear.push(~~item);
    }
  });

  console.log('hashed & cleared');

  arrClear.sort(function(a, b){
    return a-b;
  });

  console.log('sorted');
  console.log(arrClear.length, arrClear[0], arrClear[arrClear.length-1]);

  var hashT = {};

  var percent = 0;
  var total = arrClear.length;
  arrClear.forEach(function(x, i) {
    if( i % 10000 === 0) {
      percent = i * 100 / total;
      console.log(percent, '%');
    }

    var y_min = -10000 - x;
    var y_max = 10000 - x;
// console.log(x, y_min, y_max);

    var y_min_i = findIndex(arrClear, y_min);
// console.log('min yi', y_min_i);
    var y_max_i = findIndex(arrClear, y_max);
// console.log('max yi', y_max_i);

    for(var y_i=y_min_i; y_i<=y_max_i; y_i++) {
      var y = arrClear[y_i];
      if(y != x ) {
        var t = x+y;
        if (t >= -10000 && t <= 10000) {
          hashT[x+y] = true;
        }
      }
    }

    // for(var j=-10000; j<=10000; j++) {
    //   var y = j-x;
    //   if(y != x && hash[y] === true) {
    //     hashT[j] = true;
    //   }
    // }
  });

  console.log('result:', Object.keys(hashT).length);
}

if(require.main == module) {
  program
    .option('-f, --file <file>', 'Path to file with data', clone(farr.assertFileExists), INPUT_FILE_DEFAULT)
    .parse(process.argv);

  console.log(program.file);
  farr.loadArray(program.file, onArrayLoaded);
} else {
//  exports.checkHtmlFile = countInversions;
}
