module.exports = function (term, type, config) {
  return (config && config.slugs && config.slugs[type] && config.slugs[type][term]) || term.replace(/\s+/g,'-').replace(/[!*'();:@&=+$,\/?#\[\]]/g,'').toLowerCase();
};