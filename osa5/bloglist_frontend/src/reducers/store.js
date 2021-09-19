import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./notificationReducer";
import thunk from "redux-thunk";
import blogReducer from "./blogReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  blog: blogReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
