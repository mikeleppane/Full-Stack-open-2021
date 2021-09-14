import React from "react";
import Button from "./Button";

const ShowUserLogin = ({ name }) => (
  <div>
    <p>
      {name} logged in
      <Button
        text={"logout"}
        onButtonClick={() => {
          window.localStorage.clear();
        }}
      >
        logout
      </Button>
    </p>
  </div>
);

export default ShowUserLogin;
