import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState('Bangalore');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 'f79792d8b8d18513c255a3e8fe9f36b8';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      setWeather(response.data);
      setLoading(false);
    };
    fetchData();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(city);
  };

  return (
    <div className="weather-container">
       <form onSubmit={handleSubmit}>
        <input className="city-input" type="text" placeholder="Enter a city name" value={city} onChange={handleCityChange} />
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="weather-info">
          <h2>Current Weather in {city}</h2>
          <p className="temp">Temperature: {weather.main.temp} °C</p>
          <p className="feels-like">Feels Like: {weather.main.feels_like} °C</p>
          <p className="condition">Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;