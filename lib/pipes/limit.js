module.exports = function (arr, pipe, config, filters, callback) {
  var limit = pipe.limit || 10;

  return callback(null, arr.slice(0, limit));
};