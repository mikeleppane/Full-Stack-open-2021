import React, { useEffect } from "react";
import ConnectedAnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import ConnectedNotification from "./components/Notification";
import ConnectedFilter from "./components/Filter";
import { useDispatch } from "react-redux";
import { initAnecdotesCreator } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initAnecdotesCreator());
  }, [dispatch]);
  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectedNotification />
      <ConnectedFilter />
      <AnecdoteList />
      <ConnectedAnecdoteForm />
    </div>
  );
};

export default App;
