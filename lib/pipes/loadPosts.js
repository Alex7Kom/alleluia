var fs = require('fs');
var path = require('path');

var defaultPath = 'posts';

module.exports = function (lastResult, pipe, config, filters, callback) {
  var postsPath = pipe.path || defaultPath;

  var postsFilenames;
  try {
    postsFilenames = fs
      .readdirSync(path.join(config.projectDir, postsPath))
      .filter(function (filename) {
        return /^[^_\.]/.test(filename);
      });
  } catch(e) {
    console.error('Error: Unable to load posts');
    process.exit(1);
  }

  var posts = postsFilenames.map(function (filename) {
    var contents;
    try {
      contents = fs
        .readFileSync(path.join(config.projectDir, postsPath, filename), 'utf8')
        .split('---');
    } catch (e) {
      console.error('Error: Unable to load the post \'' + filename + '\'');
      process.exit(1);
    }

    var post;
    try {
      post = JSON.parse(contents[0].trim());
    } catch (e) {
      console.error('Error: Invalid meta of the post \'' + filename + '\'');
      process.exit(1);
    }

    post.content = contents[1].trim();

    return post;
  }).filter(function (post) {
    if (!post.status || post.status !== 'publish'){
      return false;
    }
    return true;
  });

  return callback(null, posts);
};
