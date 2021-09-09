import React from "react";
import axios from "axios";

const ShowCapitalCurrentWeather = ({ capital }) => {
  let currentWeather = {};
  const baseAPIURL = "https://api.weatherstack.com/";
  const params = {
    access_key: `${process.env.REACT_APP_API_KEY}`,
    query: capital,
    units: "m",
  };

  axios
    .get(`${baseAPIURL}current`, { params })
    .then((response) => {
      console.log(response.data);
      currentWeather = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  if (!currentWeather) {
    return null;
  }
  return (
    <div>
      <p>
        <strong>temperature: </strong>
        {currentWeather.current.temperature} Celcius
      </p>
      <img
        src={currentWeather.current.weather_icons[0]}
        alt={""}
        width="50"
        height="50"
      />
      <p>
        <strong>wind: </strong>
        {currentWeather.current.wind_speed} km/h, direction{" "}
        {currentWeather.current.wind_dir}
      </p>
    </div>
  );
};

export default ShowCapitalCurrentWeather;
