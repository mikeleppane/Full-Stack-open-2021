import React, { useState } from "react";

const Header = () => <h3>Anecdote of the day</h3>;

const DisplayAnecdote = ({ text }) => {
  return <p>{text}</p>;
};

const DisplayAnecdoteVotes = ({ value }) => {
  return <p>has {value} votes</p>;
};

const DisplayAnecdoteWithMostVotes = ({ anecdote, votes }) => {
  return (
    <div>
      <h3>Anecdote with most votes</h3>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const Button = ({ text, onClickHandler }) => {
  return (
    <button style={{ margin: "5px" }} onClick={onClickHandler}>
      {text}
    </button>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [allVotes, setAllVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleSelectAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVoting = () => {
    const copyAllVotes = [...allVotes];
    copyAllVotes[selected] += 1;
    setAllVotes(copyAllVotes);
  };

  const getIndexOfAnecdoteWithMostVotes = () => {
    return allVotes.indexOf(Math.max(...allVotes));
  };

  return (
    <div>
      <Header />
      <DisplayAnecdote text={anecdotes[selected]} />
      <DisplayAnecdoteVotes value={allVotes[selected]} />
      <Button text="vote" onClickHandler={handleVoting} />
      <Button text="next anecdote" onClickHandler={handleSelectAnecdote} />
      <DisplayAnecdoteWithMostVotes
        anecdote={anecdotes[getIndexOfAnecdoteWithMostVotes()]}
        votes={allVotes[getIndexOfAnecdoteWithMostVotes()]}
      />
    </div>
  );
};

export default App;
