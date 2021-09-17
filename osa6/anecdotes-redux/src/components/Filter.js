import React from "react";
import { connect } from "react-redux";
import { filterCreator } from "../reducers/filterAnecdoteReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    props.filterCreator(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  filterCreator,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
