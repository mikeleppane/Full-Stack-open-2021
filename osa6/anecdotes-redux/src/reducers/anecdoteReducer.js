import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const handleVoteAction = (state, data) => {
  const anecdote_id = data.id;
  const anecdoteToChange = state.find((a) => a.id === anecdote_id);
  const changedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1,
  };
  const anecdotes = state.map((a) =>
    a.id !== anecdote_id ? a : changedAnecdote
  );
  return anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });
};

const handleNewAnecdoteAction = (state, data) => {
  const anecdotes = [...state, data];
  return anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });
};

export const voteCreator = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    const anecdoteToBeUpdated = anecdotes.find((a) => a.id === id);
    let updatedAnecdote = {};
    if (anecdoteToBeUpdated) {
      updatedAnecdote = {
        ...anecdoteToBeUpdated,
        votes: anecdoteToBeUpdated.votes + 1,
      };
      await anecdoteService.update(id, updatedAnecdote);
    }
    dispatch({
      type: "VOTE",
      data: { id },
    });
  };
};

export const newAnecdoteCreator = (content) => {
  return async (dispatch) => {
    const newAnecdote = {
      content,
      id: getId(),
      votes: 0,
    };
    await anecdoteService.createNew(newAnecdote);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const initAnecdotesCreator = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      return handleVoteAction(state, action.data);
    case "NEW_ANECDOTE":
      return handleNewAnecdoteAction(state, action.data);
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
