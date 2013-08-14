var fs = require('fs');
var lineReader = require('line-reader');

exports.loadArray = function (fileName, cb) {
  var arr = [];
  lineReader.eachLine(fileName, function(line) {
    if(line.length) {
      arr.push(~~line);
    }
  }).then(function () {
    cb(arr);
  });
}

exports.assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};

