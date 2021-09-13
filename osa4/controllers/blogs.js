const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const updatedBlog = {};

  if (!body.likes) {
    return res.status(400).json({
      error: "likes is missing",
    });
  } else {
    updatedBlog.likes = body.likes;
  }
  if (body.title) {
    updatedBlog.title = body.title;
  }
  if (body.author) {
    updatedBlog.author = body.author;
  }
  if (body.url) {
    updatedBlog.url = body.url;
  }

  const newBlog = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
    new: true,
  });
  res.status(200).json(newBlog);
});

module.exports = blogsRouter;
