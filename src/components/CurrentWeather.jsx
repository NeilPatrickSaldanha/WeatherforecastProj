import React from 'react';
import WeatherIcon from './WeatherIcon';
import '../styles/CurrentWeather.css';

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const {
    city,
    country,
    temperature,
    feelsLike,
    condition,
    description,
    humidity,
    windSpeed,
    windDirection,
    pressure,
    time,
    date
  } = data;

  // Helper function to determine gradient background based on temperature
  const getTemperatureClass = (temp) => {
    if (temp > 30) return 'bg-hot';
    if (temp > 20) return 'bg-warm';
    if (temp > 10) return 'bg-mild';
    if (temp > 0) return 'bg-cool';
    return 'bg-cold';
  };

  return (
    <div className={`current-weather ${getTemperatureClass(temperature)}`}>
      <div className="current-weather-header">
        <div className="current-weather-location">
          <h2>{city}</h2>
          <p>{country}</p>
          <p className="current-time">{time}, {date}</p>
        </div>
        <div className="current-weather-icon">
          <WeatherIcon condition={condition} size="large" />
        </div>
      </div>

      <div className="current-weather-info">
        <div className="temperature-container">
          <div className="current-temperature">
            <span className="temperature-value">{Math.round(temperature)}</span>
            <span className="temperature-unit">°C</span>
          </div>
          <div className="temperature-feels-like">
            Feels like {Math.round(feelsLike)}°C
          </div>
          <div className="weather-condition">
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </div>
        </div>

        <div className="weather-details">
          <div className="weather-detail-item">
            <svg viewBox="0 0 24 24" className="detail-icon">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <span>Humidity: {humidity}%</span>
          </div>
          <div className="weather-detail-item">
            <svg viewBox="0 0 24 24" className="detail-icon">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
            </svg>
            <span>Wind: {windSpeed} km/h {windDirection}</span>
          </div>
          <div className="weather-detail-item">
            <svg viewBox="0 0 24 24" className="detail-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
            <span>Pressure: {pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;