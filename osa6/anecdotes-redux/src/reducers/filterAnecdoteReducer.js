const initialState = { filter: "" };

export const filterCreator = (filter) => {
  return {
    type: "FILTER",
    data: {
      filter,
    },
  };
};

const filterAnecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER":
      return { ...action.data };
    default:
      return state;
  }
};

export default filterAnecdoteReducer;
