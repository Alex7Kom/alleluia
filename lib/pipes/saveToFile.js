var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = function (page, pipe, config, filters, callback) {
  
  var filePath = path.join(config.outputPath, page.filePath);
  var dirPath = path.dirname(filePath);

  return mkdirp(dirPath, function (err) {
    if (err) {
      return callback(err);
    }
    fs.writeFile(filePath, page.renderedContent, function(err) {
      callback(err);
    });
  });

};
