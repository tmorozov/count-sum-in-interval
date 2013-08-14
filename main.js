#!/usr/bin/env node

var program = require('commander');
var farr = require('./load_array');
var INPUT_FILE_DEFAULT = "./samples/q1.txt";

function clone(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

function onArrayLoaded (arr) {
  console.log('loaded');

  // arr.sort(function(a, b){
  //   return a-b;
  // });

  // console.log('sorted');
  // console.log(arr[0], arr[arr.length-1]);

  var hash = {};
  var arrClear = [];
  arr.forEach(function(item) {
    if(hash[item] === true) {
    } else {
      hash[item] = true;
      arrClear.push(item);
    }
  });

  console.log('hashed & cleared');

  arrClear.sort(function(a, b){
    return a-b;
  });

  console.log('sorted');
  console.log(arrClear.length, arrClear[0], arrClear[arrClear.length-1]);

  var hashT = {};

  arrClear.forEach(function(x, i) {
    if( i % 10000 === 0) {
      console.log('.');
    }
    // var y_min = -10000 - x;
    // var y_max = 10000 - x;

    // var y_min_i = findBiggerIndex(arrClear, y_min);
    // var y_max_i = findSmallerIndex(arrClear, y_max);


    for(var j=-10000; j<=10000; j++) {
      var y = j-x;
      if(y != x && hash[y] === true) {
        hashT[j] = true;
      }
    }
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
