var swig = require('swig');
var urlUtils = require('../url-utils.js');

module.exports = function(item, pipe, config, filters, callback){
  var result = swig.render(pipe.template, { locals: item });
  var property = pipe.property || 'url';

  item[property] = urlUtils.normalize(result);
  
  return callback(null, item);
};