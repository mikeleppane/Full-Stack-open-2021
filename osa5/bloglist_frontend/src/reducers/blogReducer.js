import blogService from "../services/blogs";

const handleRemoveBlogAction = (state, data) => {
  return [...state].filter((blog) => blog.id !== data);
};

const handleNewBlogAction = (state, data) => {
  return [...state, data];
};

export const newBlogCreator = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(blog);
      console.log("Response to blog creation", response);
      dispatch({
        type: "NEW_BLOG",
        data: response,
      });
    } catch (error) {
      console.log("Something went wrong while creating a blog\n", error);
    }
  };
};

export const removeBlogCreator = (id) => {
  return async (dispatch) => {
    try {
      const response = await blogService.remove(id);
      console.log("Response to blog removal", response);
      dispatch({
        type: "REMOVE_BLOG",
        data: id,
      });
    } catch (error) {
      console.log("Something went wrong while creating a blog\n", error);
    }
  };
};

export const initBlogsCreator = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return handleNewBlogAction(state, action.data);
    case "REMOVE_BLOG":
      return handleRemoveBlogAction(state, action.data);
    case "INIT_BLOGS":
      return action.data;
    default:
      return state;
  }
};

export default blogReducer;