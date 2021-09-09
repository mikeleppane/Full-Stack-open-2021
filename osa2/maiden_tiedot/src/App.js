import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowResults from "./components/ShowResults";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const baseAPIURL = "https://restcountries.eu/rest/v2/";
    const allCountriesURL = `${baseAPIURL}all`;
    axios
      .get(allCountriesURL)
      .then((response) => {
        console.log(response.data);
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFindCountriesChange = (event) => {
    setFilter(event.target.value);
  };

  const handleShowCountryClick = (name) => setFilter(name);

  return (
    <div>
      <form>
        <div>
          find countries:{" "}
          <input value={filter} onChange={handleFindCountriesChange} />
          <ShowResults
            filter={filter}
            countries={countries}
            onButtonClickHandler={handleShowCountryClick}
          />
        </div>
      </form>
    </div>
  );
};

export default App;
