var order = 'asc';
var sortBy = 'title';

var sortFuncs = {
  asc: function (a, b) {
    if (a[sortBy] < b[sortBy]) {
      return 1;
    } else if (a[sortBy] > b[sortBy]) {
      return -1;
    } else {
      return 0;
    }
  },
  desc: function (a, b) {
    if (a[sortBy] > b[sortBy]) {
      return 1;
    } else if (a[sortBy] < b[sortBy]) {
      return -1;
    } else {
      return 0;
    }
  }
};

module.exports = function (posts, pipe, config, filters, callback) {
  sortBy = pipe.by || sortBy;
  order = pipe.order || order;

  return callback(null, posts.sort(sortFuncs[order]));
};
