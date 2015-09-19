var path = require('path');

module.exports = function (item, pipe, config, filters, callback) {
  var filename = pipe.filename || 'index.html';
  var property = pipe.property || 'filePath';
  var filePath = pipe.path || item[pipe.source] || item.url || '';

  item[property] = path.join(filePath, filename);

  return callback(null, item);
};
