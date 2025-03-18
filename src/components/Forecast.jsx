import React from 'react';
import ForecastDay from './ForecastDay';
import '../styles/Forecast.css';

const Forecast = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  return (
    <div className="forecast-container">
      <h2 className="forecast-title">5-Day Forecast</h2>
      <div className="forecast-days">
        {data.map((day, index) => (
          <ForecastDay key={index} data={day} />
        ))}
      </div>
    </div>
  );
};

export default Forecast;