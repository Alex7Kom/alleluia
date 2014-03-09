module.exports = function (content) {
  return content.replace(/<!--more ?(.+?)?-->/, '<a name="more"></a>');
};