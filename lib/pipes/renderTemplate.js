var swig = require('swig');
var path = require('path');

var defaultPath = 'templates';

var loadedFilters;

module.exports = function(item, pipe, config, filters, callback){
  
  var templatesPath = pipe.templatesPath || config.templatesPath || defaultPath;

  if (!loadedFilters) {
    var x, filter;
    for (x in filters){
      filter = filters[x];
      filter.safe = true;
      swig.setFilter(x, filter);
    }
    loadedFilters = true;
  }

  var templates = {};

  var template = item.template || pipe.template;

  if (templates[template] == null) {
    try {
      templates[template] = swig.compileFile(path.join(config.projectDir, templatesPath, template));
    } catch (e){
      templates[template] = swig.compileFile(path.join(config.projectDir, templatesPath, template + '.html'));
    }
  }

  item.renderedContent = templates[template]({
    page: item,
    site: config
  });
  return callback(null, item);
};