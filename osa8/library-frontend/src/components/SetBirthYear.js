import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../services/queries";
import Select from "react-select";

const SetBirthYear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const options = result.data.allAuthors.map((a) => {
    return {
      value: a.name,
      label: a.name,
    };
  });

  const submit = async (event) => {
    event.preventDefault();

    console.log(name, born);

    const bornToInt = Number(born);
    updateAuthor({
      variables: {
        name: name.value,
        setBornTo: bornToInt,
      },
    });

    setName(null);
    setBorn("");
  };

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          <Select defaultValue={name} onChange={setName} options={options} />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetBirthYear;
