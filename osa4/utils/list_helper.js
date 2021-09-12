const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  return blogs.map((blog) => blog.likes).reduce((a, b) => a + b);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const likes = blogs.map((blog) => blog.likes);
  const blog = blogs[likes.indexOf(Math.max(...likes))];
  return { title: blog.title, author: blog.author, likes: blog.likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  let mostBlogs = _(blogs)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      blogs: objs.length,
    }))
    .value();
  mostBlogs = _.orderBy(mostBlogs, "blogs", "desc");
  return _.head(mostBlogs);
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  let mostLikes = _(blogs)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, "likes"),
    }))
    .value();
  mostLikes = _.orderBy(mostLikes, "likes", "desc");
  return _.head(mostLikes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs,
};
