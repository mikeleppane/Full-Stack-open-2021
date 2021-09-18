import React from "react";
import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((a) => Number(a.id) === Number(id));
  console.log(id);
  return (
    <div>
      <h2>
        <strong>{anecdote.content}</strong>
      </h2>
      <p>{`has ${anecdote.votes} votes`}</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
