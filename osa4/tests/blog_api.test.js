const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const test_helper = require("./test_helper");
const _ = require("lodash");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(test_helper.initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes should be returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(test_helper.initialBlogs.length);
});

test("the first blog should be from Michael Chan", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].author).toBe("Michael Chan");
});

test("Type wars from Robert C. Martin should be within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);

  expect(contents).toContainEqual("Type wars");
});

test("id field should be defined in returned blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("a valid note can be added", async () => {
  const newBlog = {
    title: "CodeSmell",
    author: "Martin Fowler",
    url: "https://martinfowler.com/bliki/CodeSmell.html",
    likes: "5",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(test_helper.initialBlogs.length + 1);

  const contents = response.body.map((n) => n.title);
  expect(contents).toContainEqual("CodeSmell");
});

test("likes field should be zero if not defined", async () => {
  const newBlog = {
    title: "CodeSmell",
    author: "Martin Fowler",
    url: "https://martinfowler.com/bliki/CodeSmell.html",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAfter = await test_helper.blogsInDb();
  expect(_.last(blogsAfter)["likes"]).toEqual(0);
});

test("400 status code should be responded if title and url is not defined", async () => {
  const newBlog = {
    author: "Martin Fowler",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
