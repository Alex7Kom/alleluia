var async = require('async');
var path = require('path');
var fs = require('fs');

function loadPipe (name, config) {
  if (!config || !config.alleluiaDir || !config.projectDir) {
    throw new Error('No config');
  }

  try {
    return require(path.join(config.projectDir, 'plugins', 'pipes', name));
  } catch (x) {
    try {
      return require(path.join(config.alleluiaDir, 'pipes', name));
    } catch (y) {
      console.log(x);
      console.log(y);
      throw new Error('Pipe \'' + name + '\' not found');
    }
  }
}

function initFilters (config) {
  if (!config || !config.alleluiaDir || !config.projectDir) {
    throw new Error('No config');
  }

  var filters = {};
  var pluginFilenames;

  try {
    pluginFilenames = fs
      .readdirSync(path.join(config.alleluiaDir, 'filters'))
      .filter(function (filename) {
        return /^.+\.js$/.test(filename);
      });

    pluginFilenames.forEach(function (pluginFilename) {
      try {
        var plugin = require(path.join(config.alleluiaDir, 'filters', pluginFilename));
        var name = /^(.+)\.js$/.exec(pluginFilename);
        filters[name[1]] = plugin;
      } catch (e) {}
    });
  } catch (e) {}

  try {
    pluginFilenames = fs
      .readdirSync(path.join(config.projectDir, 'plugins', 'filters'))
      .filter(function (filename) {
        return /^.+\.js$/.test(filename);
      });

    pluginFilenames.forEach(function (pluginFilename) {
      try {
        var plugin = require(path.join(config.projectDir, 'plugins' ,'filters' , pluginFilename));
        var name = /^(.+)\.js$/.exec(pluginFilename);
        filters[name[1]] = plugin;
      } catch (e) {}
    });
  } catch (e) {}

  return filters;
}

function loadFilter (name, filters) {
  if (!filters || !filters[name]) {
    throw new Error('Filter \'' + name + '\' not found');
  }
  return filters[name];
}

function runPipe (data, pipe, config, filters, callback) {
  
  if (pipe.pipe) {

    return loadPipe(pipe.pipe, config)(data, pipe, config, filters, callback);

  } else if (pipe.filter) {

    var filter = loadFilter(pipe.filter, filters);
    var output = filter(data[pipe.input]);
    if (pipe.output) {
      data[pipe.output] = output;
    } else {
      data[pipe.input] = output;
    }

  } else if (pipe.data) {

    data = data || [];
    data = data.concat(config.data[pipe.data]);

  } else if (pipe.tee) {

    return async.eachSeries(pipe.tee, function (teeItem, callbackTee) {
      async.mapSeries(data, function (item, callbackMap) {
        runPipe(item, teeItem, config, filters, callbackMap);
      }, function (err, results) {
        var arr = [];
        results.forEach(function (dataItem) {
          arr = arr.concat(dataItem);
        });

        data = arr;
        callbackTee();
      });
    }, function (err) {
      return callback(null, data);
    });

  } else if (pipe.if) {
    if (eval(pipe.if)) {
      return async.eachSeries(pipe.pipes, function (subPipe, callbackSub) {
        return runPipe(data, subPipe, config, filters, function (err, results) {
          data = results;
          callbackSub();
        });
      }, function (err) {
        return callback(null, data);
      });
    } else {
      return callback(null, data);
    }
  }

  return callback(null, data);
}

module.exports = {
  initFilters: initFilters,
  loadFilter: loadFilter,
  runPipe: runPipe
};
