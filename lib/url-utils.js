var normalize = function(url) {
  return url.replace(/\/+/g,'/');
};

var join = function() {
  return normalize(Array.prototype.join.call(arguments, '/'));
};

module.exports = {
  normalize: normalize,
  join: join
};