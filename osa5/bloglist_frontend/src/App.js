import React, { useEffect, useState } from "react";
import Notification from "./components/Notification";
import Login from "./components/Login";
import loginService from "./services/login";
import blogService from "./services/blogs";
import ShowUserLogin from "./components/ShowUserLogin";
import ShowBlogs from "./components/ShowBlogs";
import CreateNewBlog from "./components/CreateNewBlog";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationCreator } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();
  const notifierSelector = (state) => state.notification;
  const notification = useSelector(notifierSelector);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleUserLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotificationCreator("wrong username or password", "error"));
      setTimeout(() => {
        dispatch(setNotificationCreator(null, null));
      }, 5000);
    }
    console.log("logging in with", username, password);
  };

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const createBlog = async (blog) => {
    if (!blog.title || !blog.author || !blog.url) {
      dispatch(
        setNotificationCreator(
          `blog title, author and url must be set before creation!`,
          "error"
        )
      );
      return;
    }
    const response = await blogService.create(blog);
    blogService.getAll().then((blogs) => setBlogs(blogs));
    if (response) {
      dispatch(
        setNotificationCreator(
          `a new blog ${response.title} by ${response.author} added`,
          "success"
        )
      );
    }
    console.log("Response for blog creation: ", response);
  };

  const handleRemoveButtonClick = async (blog) => {
    if (window.confirm(`Do you want to remove blog ${blog.title}?`)) {
      blogService.remove(blog.id).then((response) => {
        console.log(response);
        blogService.getAll().then((blogs) => setBlogs(blogs));
      });
    }
  };

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      {user === null && (
        <div>
          <h2>Log in to application</h2>
          <Login
            handleLogin={handleUserLogin}
            handleUsernameOnChange={handleUsernameChange}
            handlePasswordOnChange={handlePasswordChange}
            username={username}
            password={password}
          />
        </div>
      )}
      {user !== null && (
        <div>
          <h2>Blogs</h2>
          <ShowUserLogin name={user.name} />
          <Togglable buttonLabel={"create new blog"}>
            <CreateNewBlog createBlog={createBlog} />
          </Togglable>
          <ShowBlogs blogs={blogs} handleBlogRemove={handleRemoveButtonClick} />
        </div>
      )}
    </div>
  );
};
export default App;
