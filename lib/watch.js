var gaze = require('gaze');
var exec = require('child_process').exec;

function watch (config) {
  var dirs = ['**/*'];
  if (!config.absolute) {
    dirs.push('!**/' + config.destination + '/**');
  }

  if (config.watchExclude) {
    config.watchExclude.forEach(function (path) {
      dirs.push('!' + path);
    });
  }

  gaze(dirs, { interval: 1000 }, function(err, watcher) {
    console.log('Watching...');
    var working = false;
    this.on('all', function(event, filepath) {
      if (working) {
        return;
      }
      working = true;
      console.log(filepath + ' was ' + event + '.');
      console.log('Working...');
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
