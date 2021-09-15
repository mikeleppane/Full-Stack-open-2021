import React from "react";
import PropTypes from "prop-types";

const Login = ({
  handleLogin,
  handleUsernameOnChange,
  handlePasswordOnChange,
  username,
  password,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameOnChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordOnChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameOnChange: PropTypes.func.isRequired,
  handlePasswordOnChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Login;
