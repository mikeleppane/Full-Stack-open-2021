import React from "react";
import ShowCapitalCurrentWeather from "./ShowCapitalWeather";

const ShowCountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={""} width="100" height="100" />
      <h3>Weather in {country.capital}</h3>
      <ShowCapitalCurrentWeather capital={country.capital} />
    </div>
  );
};

export default ShowCountryInfo;
