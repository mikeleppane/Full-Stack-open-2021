const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const test_helper = require("./test_helper");
const _ = require("lodash");

describe("GET request tests for /api/blogs", () => {
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

  test("should fail with statuscode 400 if id is invalid", async () => {
    const invalidId = "555555aaafffff66634";

    await api.get(`/api/notes/${invalidId}`).expect(400);
  });
});

describe("POST request tests for /api/blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(test_helper.initialBlogs);
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
});

describe("DELETE request tests for /api/blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(test_helper.initialBlogs);
  });

  test("status code 204 should be returned after blog is deleted", async () => {
    const blogs = await test_helper.blogsInDb();
    const blogToBeDeleted = blogs[0];
    await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(204);

    const blogsAfter = await test_helper.blogsInDb();
    expect(blogsAfter).toHaveLength(test_helper.initialBlogs.length - 1);

    const titles = blogsAfter.map((blog) => blog.title);

    expect(titles).not.toContainEqual(blogToBeDeleted.title);
  });
});

describe("PUT request tests for /api/blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(test_helper.initialBlogs);
  });

  test("existing blog should be updated", async () => {
    const blogs = await test_helper.blogsInDb();
    const blogToBeUpdated = blogs[0];
    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send({ likes: 11 })
      .expect(200);

    const blogsAfter = await test_helper.blogsInDb();
    expect(blogsAfter).toHaveLength(test_helper.initialBlogs.length);

    expect(blogsAfter[0].likes).toEqual(11);
  });
  test("status code 400 should be raised if likes field is not defined", async () => {
    const blogs = await test_helper.blogsInDb();
    const blogToBeUpdated = blogs[0];
    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send({ author: "Rob Pike" })
      .expect(400);
  });
});

describe("Tests for user control", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("passwdsecret", 10);
    const user = new User({ username: "admin", passwordHash });

    await user.save();
  });

  test("new username should be created", async () => {
    const usersAtStart = await test_helper.usersInDb();

    const newUser = {
      username: "mleppane",
      name: "Mikko Leppänen",
      password: "oma_salasana",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await test_helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("400 status code should be raised if username is already taken", async () => {
    const usersAtStart = await test_helper.usersInDb();

    const newUser = {
      username: "admin",
      name: "Main user",
      password: "user_password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await test_helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("400 status code should be raised if username is not valid", async () => {
    const usersAtStart = await test_helper.usersInDb();

    const newUser = {
      username: "ad",
      name: "Main user",
      password: "user_password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await test_helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("400 status code should be raised if password is not valid", async () => {
    const usersAtStart = await test_helper.usersInDb();

    const newUser = {
      username: "new_user",
      name: "Main user",
      password: "12",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("Given password is not valid");

    const usersAtEnd = await test_helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
