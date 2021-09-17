const initialState = { message: "" };

export const newNotificationCreator = (message) => {
  return {
    type: "NEW_NOTIFICATION",
    data: {
      message,
    },
  };
};

export const removeNotificationCreator = () => {
  return {
    type: "REMOVE_NOTIFICATION",
    data: {
      message: "",
    },
  };
};

const handleNotificationRemoval = () => {
  return { message: "" };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return { ...action.data };
    case "REMOVE_NOTIFICATION":
      return handleNotificationRemoval();
    default:
      return state;
  }
};

export default notificationReducer;
