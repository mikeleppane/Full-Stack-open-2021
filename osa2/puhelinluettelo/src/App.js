import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowPersons from "./components/ShowPersons";
import PhonebookFilter from "./components/PhonebookFilter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const personDBURL = "http://localhost:3001/persons";

  useEffect(() => {
    axios.get(personDBURL).then((response) => {
      console.log(response.data);
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.filter((item) => item.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    const isNameAndNumberFilled = newName && newNumber;

    if (isNameAndNumberFilled) {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
    } else {
      window.alert("Please fill both fields for name and number.");
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNewPersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PhonebookFilter name={filter} onNewFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmitHandler={addPerson}
        name={newName}
        handleNewPersonChange={handleNewPersonChange}
        number={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />
      <h3>Numbers</h3>
      <ShowPersons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
