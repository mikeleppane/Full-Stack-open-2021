import React, { useState } from "react";
import Button from "./Button";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

let currentLikes = 0;

const ShowBlogInfo = ({ blog, handleBlogRemove }) => {
  currentLikes = blog.likes;
  const [buttonText, setButtonText] = useState("view");
  const [showAll, setShowAll] = useState(false);
  const [likes, setLikes] = useState(currentLikes);

  const handleButtonClick = () => {
    setShowAll(!showAll);

    setButtonText(showAll ? "view" : "hide");
  };

  const handleLikeButtonClick = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
      user: blog.user.id,
    };
    const response = await blogService.update(blog.id, updatedBlog);
    setLikes(likes + 1);
    console.log(response);
  };

  const isLoggedInUserBlogOwner = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const isValidUser = user.username === blog.user.username;
      if (isValidUser) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <p id="blog-title">
        {blog.title}
        <Button
          id={"show-blog-button"}
          text={buttonText}
          onButtonClick={handleButtonClick}
        />
      </p>
      {showAll && (
        <div>
          <p>{blog.url}</p>
          <p id="likes">
            likes {likes}
            <Button
              id={"like-button"}
              text={"like"}
              onButtonClick={handleLikeButtonClick}
            />
          </p>
          <p>{blog.user.name}</p>
          {isLoggedInUserBlogOwner() && (
            <div>
              <Button
                id={"remove-button"}
                text={"remove"}
                onButtonClick={() => handleBlogRemove(blog)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Blog = ({ blog, handleBlogRemove }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        <ShowBlogInfo blog={blog} handleBlogRemove={handleBlogRemove} />
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
export default Blog;
