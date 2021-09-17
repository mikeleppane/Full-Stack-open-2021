import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteCreator } from "../reducers/anecdoteReducer";
import { setNotificationCreator } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  let anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  if (filter.filter) {
    anecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.filter.toLowerCase())
    );
  }

  const vote = (anecdote) => {
    dispatch(voteCreator(anecdote.id));
    dispatch(setNotificationCreator(`you voted: ${anecdote.content}`));
    console.log("vote", anecdote.id);
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
