import { applyMiddleware, combineReducers, createStore } from "redux";
import anecdoteReducer from "./anecdoteReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./notificationReducer";
import filterAnecdoteReducer from "./filterAnecdoteReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterAnecdoteReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
