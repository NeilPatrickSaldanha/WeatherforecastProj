import React from 'react';
import WeatherIcon from './WeatherIcon';
import '../styles/ForecastDay.css';

const ForecastDay = ({ data }) => {
  if (!data) return null;

  const {
    day,
    date,
    tempMax,
    tempMin,
    condition,
    humidity,
    windSpeed,
    precipitation
  } = data;

  return (
    <div className="forecast-day">
      <div className="forecast-day-header">
        <h3 className="forecast-day-name">{day}</h3>
        <p className="forecast-date">{date}</p>
      </div>
      
      <div className="forecast-day-icon">
        <WeatherIcon condition={condition} size="medium" />
      </div>
      
      <div className="forecast-temperatures">
        <span className="temp-max">{Math.round(tempMax)}°</span>
        <span className="temp-divider">/</span>
        <span className="temp-min">{Math.round(tempMin)}°</span>
      </div>
      
      <div className="forecast-condition">{condition}</div>
      
      <div className="forecast-details">
        <div className="forecast-detail-item">
          <svg viewBox="0 0 24 24" className="forecast-detail-icon">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          </svg>
          <span>{humidity}%</span>
        </div>
        
        <div className="forecast-detail-item">
          <svg viewBox="0 0 24 24" className="forecast-detail-icon">
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
          </svg>
          <span>{windSpeed} km/h</span>
        </div>
        
        <div className="forecast-detail-item">
          <svg viewBox="0 0 24 24" className="forecast-detail-icon">
            <line x1="12" y1="2" x2="12" y2="19"></line>
            <polyline points="9 15 12 18 15 15"></polyline>
            <path d="M8 9v.01"></path>
            <path d="M8 13v.01"></path>
            <path d="M16 9v.01"></path>
            <path d="M16 13v.01"></path>
          </svg>
          <span>{precipitation} mm</span>
        </div>
      </div>
    </div>
  );
};

export default ForecastDay;