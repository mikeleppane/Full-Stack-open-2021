import React, { useEffect, useState } from "react";
import Notification from "./components/Notification";
import Login from "./components/Login";
import loginService from "./services/login";
import blogService from "./services/blogs";
import ShowUserLogin from "./components/ShowUserLogin";
import ShowBlogs from "./components/ShowBlogs";
import CreateNewBlog from "./components/CreateNewBlog";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({ type: "", message: "" });
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
      setNotification({ message: "wrong username or password", type: "error" });
      setTimeout(() => {
        setNotification({ message: null, type: null });
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
            <CreateNewBlog setNotification={setNotification} />
          </Togglable>
          <ShowBlogs blogs={blogs} />
        </div>
      )}
    </div>
  );
};
export default App;
