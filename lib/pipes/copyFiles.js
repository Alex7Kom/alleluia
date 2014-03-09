var fs = require('fs');
var path = require('path');
var wrench = require('wrench');
var mkdirp = require('mkdirp');

module.exports = function (data, pipe, config, filters, callback) {
  var fromDir = path.join(config.projectDir, pipe.from);
  var toDir = path.join(config.outputPath, pipe.to);
  var files = wrench.readdirSyncRecursive(fromDir);

  files = files.filter(function(filename) {
    var filenameParts = filename.split(path.sep);
    for (var i = 0; i < filenameParts.length; i++) {
      if(/^(_|\.)/.test(filenameParts[i])){
        return false;
      }
    };
    return true;
  });

  files.forEach(function(filename) {
    var fromPath = path.join(fromDir, filename);
    var toPath = path.join(toDir, filename);
    var stat = fs.statSync(fromPath)
    if (stat && !stat.isDirectory()) {
      var pathToDir = path.dirname(toPath);
      mkdirp.sync(pathToDir);
      var content = fs.readFileSync(fromPath);
      fs.writeFileSync(toPath, content);
    }
  });

  return callback();
};