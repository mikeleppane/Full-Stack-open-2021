import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const CreateNewBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const handleBlogSubmit = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <div>
      <h2>Create new</h2>
      <form id="createBlogForm" onSubmit={handleBlogSubmit}>
        <div>
          title:
          <input
            id="title_input"
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
            id="author_input"
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
            id="url_input"
            type="text"
            name="url"
            value={newBlog.url}
            onChange={({ target }) => {
              setNewBlog({ ...newBlog, url: target.value });
            }}
          />
        </div>
        <Button variant="contained" id="submit-new-blog-button" type="submit">
          create
        </Button>
      </form>
    </div>
  );
};

CreateNewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default CreateNewBlog;
