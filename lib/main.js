var async = require('async');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

var initFilters = require('./core').initFilters;
var loadFilter = require('./core').loadFilter;
var loadPipe = require('./core').loadPipe;
var runPipe = require('./core').runPipe;

function main (config) {
  var filters = initFilters(config);

  config.data = {};

  if (config.clearOutputPath != false) {

    try {
      rimraf.sync(config.outputPath);
    } catch(e){}

    mkdirp.sync(config.outputPath);
  }

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

module.exports = main;
