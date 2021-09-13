const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
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
