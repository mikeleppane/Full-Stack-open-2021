import React from "react";

const notificationStyle = {
  color: "red",
  backGround: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderWidth: "3px",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div style={notificationStyle}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
