module.exports = function(posts, pipe, config, filters, callback){
  var postsByDate = {}, postsByArr = [];
  var type = pipe.type;
  var offset = (0-new Date().getTimezoneOffset())/60;
  
  posts.forEach(function(post) {
    var year = post.date.getFullYear();
    var month = post.date.getMonth();
    var date = post.date.getDate();
    var key;
    if (type == 'yearly') {
      key = year;
    } else if (type == 'monthly') {
      key = year + '-' + month;
    } else if (type == 'daily'){
      key = year + '-' + month + '-' + date;
    }

    if (postsByDate[key] == null) {
      postsByDate[key] = [];
    };
    postsByDate[key].push(post);

  });

  var date;

  var key, date, slug;
  for(key in postsByDate){
    if (type == 'yearly') {

      date = new Date(key, 0, 5, offset);
      slug = key;

    } else if (type == 'monthly') {

      rawYear = parseInt(key.split('-')[0], 10);
      rawMonth = parseInt(key.split('-')[1], 10);

      year = rawYear;
      month = (rawMonth + 1).toString();
      month = month.length == 1 ? '0' + month : month;

      slug = year + '/' + month;
      date = new Date(rawYear, rawMonth, 5, offset);

    } else if (type == 'daily'){

      rawYear = parseInt(key.split('-')[0], 10);
      rawMonth = parseInt(key.split('-')[1], 10);
      rawDay = parseInt(key.split('-')[2], 10);
      year = rawYear;
      month = (rawMonth + 1).toString();
      month = month.length == 1 ? '0' + month : month;
      day = key.split('-')[2];
      day = day.length == 1 ? '0' + day : day;
      
      date = new Date(rawYear, rawMonth, rawDay, offset);
      slug = year + '/' + month + '/' + day;
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