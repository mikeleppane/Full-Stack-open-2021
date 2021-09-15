import React, { useState } from "react";
import blogService from "../services/blogs";

const handleBlogSubmit = async (
  event,
  newBlog,
  setNewBlog,
  setNotification
) => {
  event.preventDefault();
  const response = await blogService.create(newBlog);
  if (newBlog) {
    setNotification({
      message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      type: "success",
    });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  }
  console.log(response);
  setNewBlog({ title: "", author: "", url: "" });
};

const CreateNewBlog = ({ setNotification }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  return (
    <div>
      <h2>Create new</h2>
      <form
        onSubmit={(event) =>
          handleBlogSubmit(event, newBlog, setNewBlog, setNotification)
        }
      >
        <div>
          title:
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={({ target }) => {
              setNewBlog({ ...newBlog, title: target.value });
            }}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={newBlog.author}
            onChange={({ target }) => {
              setNewBlog({ ...newBlog, author: target.value });
            }}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={newBlog.url}
            onChange={({ target }) => {
              setNewBlog({ ...newBlog, url: target.value });
            }}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateNewBlog;
