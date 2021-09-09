import React from "react";
import Button from "./Button";
import ShowCountryInfo from "./ShowCountryInfo";

const ShowResults = ({ filter, countries, onButtonClickHandler }) => {
  const current_filter = filter.toLowerCase();
  const matchedCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(current_filter)
  );
  if (!filter) {
    return null;
  }
  if (matchedCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (1 < matchedCountries.length && matchedCountries.length <= 10) {
    return (
      <div>
        {matchedCountries.map((country) => (
          <div key={country.name}>
            <p>{country.name}</p>
            <Button
              text={"show"}
              country={country.name}
              onButtonClick={onButtonClickHandler}
            />
          </div>
        ))}
      </div>
    );
  } else if (matchedCountries.length === 1) {
    return (
      <div>
        <ShowCountryInfo country={matchedCountries[0]} />
      </div>
    );
  } else {
    return (
      <div>
        <p>No matches found, specify another filter</p>
      </div>
    );
  }
};

export default ShowResults;
