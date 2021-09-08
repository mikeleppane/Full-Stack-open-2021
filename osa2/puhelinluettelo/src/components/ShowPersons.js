import React from "react";

const filterPersons = (persons, filter) => {
  return persons
    .filter(
      (person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()) ||
        person.number.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));
};

const ShowPersons = ({ persons, filter }) => {
  return (
    <div>
      {filter ? (
        <div>{filterPersons(persons, filter)}</div>
      ) : (
        <div>
          {persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowPersons;
