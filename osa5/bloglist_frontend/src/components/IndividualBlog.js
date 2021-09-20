import React from "react";
import { useParams } from "react-router-dom";
import Button from "./Button";
import { likeBlogCreator } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

const IndividualBlog = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogSelector = (state) => state.blog;
  const blogs = useSelector(blogSelector);
  const blog = blogs.find((b) => b.id === id);

  const handleLikeButtonClick = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    dispatch(likeBlogCreator(blog.id, updatedBlog))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {blog && (
        <div>
          <h2>{blog.title}</h2>
          <a href={blog.url}>{blog.url}</a>
          <p>
            {blog.likes} likes{" "}
            <Button text={"like"} onButtonClick={handleLikeButtonClick} />
          </p>
          <p>added by {blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default IndividualBlog;
