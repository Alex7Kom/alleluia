var gaze = require('gaze');
var exec = require('child_process').exec;

function watch (config) {
  var dirs = ['**/*'];
  if (!config.absolute) {
    dirs.push('!**/' + config.destination + '/**');
  }

  gaze(dirs, function(err, watcher) {
    console.log('Watching...');
    var working = false;
    this.on('all', function(event, filepath) {
      if (working) {
        return;
      }
      console.log(filepath + ' was ' + event + '.');
      console.log('Working...');
      working = true;
      exec('alleluia', function (error, stdout, stderr) {
        if (error) {
          throw error;
        }
        console.log('Done. Continue watching...');
        working = false;
      });
    });
  });
}

module.exports = watch;
