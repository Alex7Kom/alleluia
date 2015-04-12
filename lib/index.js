var async = require('async');
var path = require('path');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

var initFilters = require('./core').initFilters;
var loadFilter = require('./core').loadFilter;
var loadPipe = require('./core').loadPipe;
var runPipe = require('./core').runPipe;

var projectDir = process.cwd();

function run() {
  try {
    var config = require(path.join(projectDir, env.config));
  } catch (e) {
    throw new Error('Error: No config or invalid config');
  }

  config.projectDir = projectDir;
  config.alleluiaDir = __dirname;

  config.time = new Date();

  var filters = initFilters(config);

  config.data = {};

  if (config.clearOutputPath != false) {
    if (!config.destination || config.destination == "") {
      throw new Error('Error: No destination');
    }

    if (config.absolute) {
      config.outputPath = config.destination;
    } else {
      config.outputPath = path.join(projectDir, config.destination);
    }

    try {
      rimraf.sync(config.outputPath);
    } catch(e){}

    mkdirp.sync(config.outputPath);
  };

  async.eachSeries(config.pipelines, function (pipeline, callbackPipeline){
    if (pipeline.skip) {
      return callbackPipeline();
    }
    var lastResult;
    async.eachSeries(pipeline.pipes, function (pipe, callbackPipe) {
      runPipe(lastResult, pipe, config, filters, function (err, result) {
        lastResult = result;
        callbackPipe();
      });
    }, function () {
      if (!pipeline.discardData) {
        config.data[pipeline.name] = lastResult;
      }
      callbackPipeline();
    });
  }, function(err) {});
}

module.exports = run;
