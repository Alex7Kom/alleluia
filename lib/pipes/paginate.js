function cloneDataObject (obj) {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = function (posts, pipe, config, filters, callback) {
  var postsList, paginatorSample;
  if (
    Object.prototype.toString.call(posts) == '[object Object]'
    && posts.posts
  ) {
    postsList = posts.posts;

    paginatorSample = {};
    for (var key in posts) {
      if (
        key !== 'posts'
        && posts.hasOwnProperty(key)
      ) {
        paginatorSample[key] = posts[key];
      }
    }
  } else {
    postsList = posts;
    paginatorSample = {};
  }

  var pages = [];
  var maxNum = pipe.limit || 10;

  var num = 1;
  var page = 0;
  
  postsList.forEach(function (post) {
    if (!pages[page]) {
      pages[page] = [];
    }
    pages[page].push(post);
    num++;
    if (num > maxNum) {
      page++;
      num = 1;
    }
  });

  var totalPages = pages.length;

  pages = pages.map(function (page, index) {
    var currentPage = index + 1;

    var paginator = cloneDataObject(paginatorSample);
    paginator.posts = page;
    paginator.currentPage = currentPage;
    paginator.totalPages = totalPages;
    
    if (currentPage > 1) {
      paginator.previousPage = currentPage - 1;
    }
    if (currentPage < totalPages) {
      paginator.nextPage = currentPage + 1;
    }
    
    return paginator;
  });

  return callback(null, pages);
};
