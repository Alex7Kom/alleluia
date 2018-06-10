var async = require('async');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

var initFilters = require('./core').initFilters;
var runPipe = require('./core').runPipe;

function main (config) {
  var filters = initFilters(config);

  config.data = {};

  if (process.env.NODE_ENV === 'production') {
    try {
      rimraf.sync(config.outputPath);
    } catch (e) {}

    mkdirp.sync(config.outputPath);
  }

  async.eachSeries(config.pipelines, function (pipeline, callbackPipeline) {
    if (pipeline.skip) {
      return callbackPipeline();
    }
    var lastResult;
    async.eachSeries(pipeline.pipes, function (pipe, callbackPipe) {
      runPipe(lastResult, pipe, config, filters, function (err, result) {
        lastResult = result;
        callbackPipe();
      });
    }, function (err) {
      if (err) {
        throw err;
      }
      if (!pipeline.discardData) {
        config.data[pipeline.name] = lastResult;
      }
      callbackPipeline();
    });
  }, function (err) {
    if (err) {
      throw err;
    }
  });
}

module.exports = main;
