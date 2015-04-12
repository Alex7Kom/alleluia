var path = require('path');

var projectDir = process.cwd();

try {
  var config = require(path.join(projectDir, env.config));
} catch (e) {
  throw new Error('Error: No config or invalid config');
}

config.projectDir = projectDir;
config.alleluiaDir = __dirname;

if (!config.destination || config.destination == "") {
  throw new Error('Error: No destination');
}

if (config.absolute) {
  config.outputPath = config.destination;
} else {
  config.outputPath = path.join(projectDir, config.destination);
}

config.time = new Date();

module.exports = config;
