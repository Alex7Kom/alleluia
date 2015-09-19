var swig = require('swig');
var path = require('path');

module.exports = function (item, pipe, config, filters, callback) {
  var result = swig.render(pipe.template, { locals: item });
  var property = pipe.property || 'url';

  item[property] = path.normalize(result);

  return callback(null, item);
};
