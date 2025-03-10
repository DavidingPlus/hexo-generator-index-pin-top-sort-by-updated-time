'use strict';
var pagination = require('hexo-pagination');
module.exports = function (locals) {
  var config = this.config;
  var posts = locals.posts;
  posts.data = posts.data.sort(function (a, b) {
    if (a.top && b.top) { // 两篇文章top都有定义
      if (a.top == b.top) return b.updated - a.updated; // 若top值一样则按照文章更新日期降序排
      else return a.top - b.top; // 否则按照top值升序排，例如 1 2 3 ，1 在最上面，符合用户习惯
    }
    else if (a.top && !b.top) { // 以下是只有一篇文章top有定义，那么将有top的排在前面（这里用异或操作居然不行233）
      return -1;
    }
    else if (!a.top && b.top) {
      return 1;
    }
    else return b.updated - a.updated; // 都没定义按照文章更新日期降序排
  });
  var paginationDir = config.pagination_dir || 'page';
  return pagination('', posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
