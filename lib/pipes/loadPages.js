var fs = require('fs');
var path = require('path');
var wrench = require('wrench');

var defaultPath = 'pages';

module.exports = function (lastResult, pipe, config, filters, callback) {
  var pagesPath = pipe.path || defaultPath;
  var pagesFilenames;

  try {
    pagesFilenames = wrench
      .readdirSyncRecursive(path.join(config.projectDir, pagesPath))
      .filter(function (filename) {
        return !(/^(_|\.)/.test(filename) || /\/(_|\.)/.test(filename)) && /\.(html|md|markdown)$/.test(filename);
      });
  } catch(e) {
    console.error('Error: Unable to load pages');
    process.exit(1);
  }

  var pages = pagesFilenames.map(function (filename) {
    var contents;
    try {
      contents = fs
        .readFileSync(path.join(config.projectDir, pagesPath, filename), 'utf8')
        .split('---');
    } catch (e) {
      console.error('Error: Unable to load the page \'' + filename + '\'');
      process.exit(1);
    }

    var page;
    try {
      page = JSON.parse(contents[0].trim());
    } catch (e) {
      console.error('Error: Invalid meta of the page \'' + filename + '\'');
      process.exit(1);
    }

    page.content = contents[1].trim();

    page.filePath = filename;

    var dirname = path.dirname(filename);

    page.path = (dirname === '.') ? '' : dirname;

    page.filename = path.basename(filename);

    return page;
  }).filter(function (page) {
    if (!page.status || page.status === 'draft'){
      return false;
    }
    return true;
  });

  return callback(null, pages);
};
