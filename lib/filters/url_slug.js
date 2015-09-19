module.exports = function (term, type, config) {
  if (
    config
    && config.slugs
    && config.slugs[type]
    && config.slugs[type][term]
  ) {
    return config.slugs[type][term];
  }
  return term
    .replace(/\s+/g,'-')
    .replace(/[!*'();:@&=+$,\/?#\[\]]/g,'')
    .toLowerCase();
};
