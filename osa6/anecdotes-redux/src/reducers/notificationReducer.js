const initialState = { message: "" };

export const setNotificationCreator = (message, time = 5) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
        data: {
          message: "",
        },
      });
    }, time * 1000);
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        message,
      },
    });
  };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { ...action.data };
    case "CLEAR_NOTIFICATION":
      return { ...action.data };
    default:
      return state;
  }
};

export default notificationReducer;
