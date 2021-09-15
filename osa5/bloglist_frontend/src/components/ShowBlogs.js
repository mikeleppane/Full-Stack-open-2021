import React from "react";
import Blog from "./Blog";

const sortedBlogs = (blogs) => {
  blogs.sort((a, b) => {
    return a.likes < b.likes;
  });
  return blogs;
};

const ShowBlogs = ({ blogs }) => (
  <div>
    {sortedBlogs(blogs).map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

export default ShowBlogs;
