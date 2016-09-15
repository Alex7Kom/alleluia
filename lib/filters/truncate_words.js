module.exports = function (text, length) {
  if (text.length <= length) {
    return text;
  }
  return text.split(/\s+/).slice(0, length).join(' ') + '...';
};
