module.exports = function(posts, pipe, config, filters, callback){
  var postsBy = {}, postsByArr = [];
  var type = pipe.type;
  var prop = pipe.prop;

  posts.forEach(function(post) {
    if (!post[prop]) {
      return;
    }
    if (typeof post[prop] == 'object') {
      post[prop].forEach(function(term) {
        if (postsBy[term] == null) {
          postsBy[term] = [];
        }
        postsBy[term].push(post);
      });
    } else {
      if (postsBy[post[prop]] == null) {
        postsBy[post[prop]] = [];
      }
      postsBy[post[prop]].push(post);
    }
    
  });

  var term;
  for(term in postsBy){
    postsByArr.push({
      'type': type,
      'term': term,
      'slug': filters.url_slug(term, type, config),
      'posts': postsBy[term]
    });
  }

  return callback(null, postsByArr);
};