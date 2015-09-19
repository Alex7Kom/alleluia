module.exports = function (text, length) {
  return text.split(/\s+/).slice(0, length).join(' ') + '...';
};
