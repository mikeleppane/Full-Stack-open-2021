import React from "react";
import { connect } from "react-redux";
import { newAnecdoteCreator } from "../reducers/anecdoteReducer";
import { setNotificationCreator } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addNewAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.newAnecdoteCreator(content);
    props.setNotificationCreator(`you created: ${content}`);
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

const mapDispatchToProps = {
  newAnecdoteCreator,
  setNotificationCreator,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
