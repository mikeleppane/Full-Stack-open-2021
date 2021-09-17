import React from "react";
import { useDispatch } from "react-redux";
import { newAnecdoteCreator } from "../reducers/anecdoteReducer";
import {
  newNotificationCreator,
  removeNotificationCreator,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNewAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(newAnecdoteCreator(content));
    dispatch(newNotificationCreator(`you created: ${content}`));
    setTimeout(() => {
      dispatch(removeNotificationCreator());
    }, 5000);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
