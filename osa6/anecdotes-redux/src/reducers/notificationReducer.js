const initialState = { message: "", timeoutHandle: null };

export const setNotificationCreator = (message, time = 5) => {
  return async (dispatch) => {
    const timeoutHandle = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
        data: {
          message: "",
          timeoutHandle: null,
        },
      });
    }, time * 1000);
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        message: message,
        timeoutHandle: timeoutHandle,
      },
    });
  };
};

const setTimeoutHandler = (state, data) => {
  const isPreviousTimeoutRunning =
    state.timeoutHandle && state.timeoutHandle !== data.timeoutHandle;
  if (isPreviousTimeoutRunning) {
    clearTimeout(state.timeoutHandle);
  }
  return { ...data };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return setTimeoutHandler(state, action.data);
    case "CLEAR_NOTIFICATION":
      return { ...action.data };
    default:
      return state;
  }
};

export default notificationReducer;
