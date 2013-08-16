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
    var mid = +((start + end) / 2);
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
  arr.forEach(function(item) {
    hash[item] = true;
  });

  console.log('hashed & cleared');

  // arr.sort(function(a, b){
  //   return a-b;
  // });

  // console.log('sorted');
  // console.log(arr.length, arr[0], arr[arr.length-1]);

  // shuold work!
  var countT = 0;
  var len = arr.length;
  var tMax = 10000;
  var tMin = -10000;
  var divider = +((tMax - tMin) / 100);
  console.log('div', divider);
  for(var t = tMin; t <= tMax; t++) {
    if(t % divider === 0) {
      console.log(+( (t-tMin) / divider), '%');
    }

    for(var i=0; i<len; i++) {
      var x = arr[i];
      var y = t-x;
      if(x === y) {
        continue;
      }
      if( hash[y] === true ) {
        console.log('x, y, t', x, y, t);
        countT++;
        break;
      }
    }
  }
  console.log('result:', countT);

// error!
  // var hashT = {};

  // var percent = 0;
  // var total = arr.length;
  // arr.forEach(function(x, i) {
  //   if( i % 10000 === 0) {
  //     percent = i * 100 / total;
  //     console.log(percent, '%');
  //   }

  //   var y_min = -10000 - x;
  //   var y_max = 10000 - x;

  //   var y_min_i = findIndex(arr, y_min);
  //   var y_max_i = findIndex(arr, y_max);

  //   for(var y_i=y_min_i; y_i<=y_max_i; y_i++) {
  //     var y = arr[y_i];
  //     if(y !== x ) {
  //       var t = x+y;
  //       if (t >= -10000 && t <= 10000) {
  //         hashT[t] = true;
  //       }
  //     }
  //   }

  //   // for(var j=-10000; j<=10000; j++) {
  //   //   var y = j-x;
  //   //   if(y != x && hash[y] === true) {
  //   //     hashT[j] = true;
  //   //   }
  //   // }
  // });

  // console.log('result:', Object.keys(hashT).length);
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
