import React, {useState} from "react";
import ShowPersons from "./components/ShowPersons";
import PhonebookFilter from "./components/PhonebookFilter";
import PersonForm from "./components/PersonForm";

const App = () => {
    const [persons, setPersons] = useState([
        {name: "Arto Hellas", number: "040-123456"},
        {name: "Ada Lovelace", number: "39-44-5323523"},
        {name: "Dan Abramov", number: "12-43-234345"},
        {name: "Mary Poppendieck", number: "39-23-6423122"},
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    const addPerson = (event) => {
        event.preventDefault();
        if (persons.filter((item) => item.name === newName).length > 0) {
            window.alert(`${newName} is already added to phonebook`);
            setNewName("");
            setNewNumber("");
            return;
        }
        const newPerson = {name: newName, number: newNumber};
        setPersons(persons.concat(newPerson));
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
            <PhonebookFilter name={filter} onNewFilterChange={handleFilterChange}>
                {" "}
            </PhonebookFilter>
            <h2>Add a new</h2>
            <PersonForm onSubmitHandler={addPerson} ={newName}></PersonForm>

            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNewPersonChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNewNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ShowPersons persons={persons} filter={filter}/>
        </div>
    );
};

export default App;
