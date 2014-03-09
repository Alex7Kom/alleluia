module.exports = function (content, url, default_text) {
  var more = content.match(/<!--more ?(.+?)?-->/);
  if (more) {
    var slices = content.split(more[0]);
    return slices[0] + '<a href="' + url + '#more" class="more-link">' + (more[1] || default_text) + ' &rarr;</a>';
  }
  return content;
};