var fs = require('fs');
var path = require('path');
var wrench = require('wrench');

var defaultPath = 'pages';

module.exports = function(lastResult, pipe, config, filters, callback){
  try {
    var pagesFilenames = wrench.readdirSyncRecursive(path.join(config.projectDir, defaultPath)).filter(function(filename) {
      return !(/^(_|\.)/.test(filename) || /\/(_|\.)/.test(filename)) && /\.(html|md|markdown)$/.test(filename);
    });
  } catch(e) {
    console.error('Error: Unable to load pages');
    process.exit(1);
  }

  var pages = pagesFilenames.map(function(filename) {
    try {
      var contents = fs.readFileSync(path.join(config.projectDir, defaultPath, filename), 'utf8').split('---');
    } catch (e) {
      console.error('Error: Unable to load the page \'' + filename + '\'');
      process.exit(1);
    }

    try {
      var page = JSON.parse(contents[0].trim());
    } catch (e) {
      console.error('Error: Invalid meta of the page \'' + filename + '\'');
      process.exit(1);
    }

    page['content'] = contents[1].trim();

    page['filePath'] = filename;

    page['path'] = path.dirname(filename);

    page['filename'] = path.basename(filename);

    return page;
  });

  return callback(null, pages);
};