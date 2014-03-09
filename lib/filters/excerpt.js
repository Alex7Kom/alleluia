module.exports = function (content) {
  if (content.match(/<!--short-->/)) {
    return content.split('<!--short-->')[1];
  }
  return content;
};