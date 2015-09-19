module.exports = function (posts, pipe, config, filters, callback) {
  var postsByDate = {};
  var postsByArr = [];

  var type = pipe.type;
  var offset = (0 - new Date().getTimezoneOffset()) / 60;

  posts.forEach(function (post) {
    var year = post.date.getFullYear();
    var month = post.date.getMonth();
    var date = post.date.getDate();
    var key;
    if (type === 'yearly') {
      key = year;
    } else if (type === 'monthly') {
      key = year + '-' + month;
    } else if (type === 'daily') {
      key = year + '-' + month + '-' + date;
    }

    if (!postsByDate[key]) {
      postsByDate[key] = [];
    }

    postsByDate[key].push(post);
  });

  var key, date, slug;
  var rawYear, rawMonth, rawDay;
  var year, month, day;
  for (key in postsByDate) {
    if (!postsByDate.hasOwnProperty(key)) {
      continue;
    }

    var keyParts = key.split('-');
    rawYear = parseInt(keyParts[0], 10);
    rawMonth = parseInt(keyParts[1], 10);
    rawDay = parseInt(keyParts[2], 10);

    year = rawYear.toString();

    month = (rawMonth + 1).toString();
    month = month.length === 1 ? '0' + month : month;

    day = rawDay.toString();
    day = day.length === 1 ? '0' + day : day;

    if (type === 'yearly') {
      slug = key;
      date = new Date(key, 0, 5, offset);
    } else if (type === 'monthly') {
      slug = year + '/' + month;
      date = new Date(rawYear, rawMonth, 5, offset);
    } else if (type === 'daily') {
      slug = year + '/' + month + '/' + day;
      date = new Date(rawYear, rawMonth, rawDay, offset);
    }

    postsByArr.push({
      'type': type,
      'date': date,
      'slug': slug,
      'posts': postsByDate[key]
    });
  }

  return callback(null, postsByArr);
};
