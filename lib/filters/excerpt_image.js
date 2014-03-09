module.exports = function (content) {
  var image = content.match(/<img src="([^"]+)"/);
  var result;
  if (image) {
    result = image[1];
  }
  if (!result) {
    var image2 = content.match(/!\[[^\]]+\]\(([^\)]+)\)/);
    if (image2) {
      result = image2[1]
    }
  }

  if (result) {
    return result;
  }
  return '';
};