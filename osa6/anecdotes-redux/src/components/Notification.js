import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div>
      {notification.message ? (
        <div style={style}>{notification.message}</div>
      ) : null}
    </div>
  );
};

export default Notification;
