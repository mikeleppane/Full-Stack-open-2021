import React from "react";
import blogService from "../services/blogs";

let title = "";
let author = "";
let url = "";

const handleBlogSubmit = async (event, setNewBlog) => {
  event.preventDefault();
  const newBlog = { title: title, author: author, url: url };
  const response = await blogService.create(newBlog);
  setNewBlog(response);
  console.log(response);
  event.target.title.value = "";
  event.target.author.value = "";
  event.target.url.value = "";
};

const CreateNewBlog = ({ setNewBlog }) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={(event) => handleBlogSubmit(event, setNewBlog)}>
        <div>
          title:
          <input
            type="text"
            name="title"
            onChange={({ target }) => {
              title = target.value;
            }}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            onChange={({ target }) => {
              author = target.value;
            }}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            onChange={({ target }) => {
              url = target.value;
            }}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateNewBlog;
