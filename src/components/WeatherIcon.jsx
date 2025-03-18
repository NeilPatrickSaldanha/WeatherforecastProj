import React from 'react';
import '../styles/WeatherIcon.css';

const WeatherIcon = ({ condition, size = 'medium' }) => {
  // Map weather conditions to icons with animations
  const getIcon = () => {
    const iconCode = condition?.toLowerCase() || '';
    
    if (iconCode.includes('clear') || iconCode.includes('sun')) {
      return (
        <svg className="weather-icon sun" viewBox="0 0 24 24">
          <circle className="sun-circle" cx="12" cy="12" r="5"></circle>
          <g className="sun-rays">
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </g>
        </svg>
      );
    } else if (iconCode.includes('cloud') && (iconCode.includes('sun') || iconCode.includes('clear'))) {
      return (
        <svg className="weather-icon partly-cloudy" viewBox="0 0 24 24">
          <circle className="partly-cloudy-sun" cx="9" cy="7" r="3"></circle>
          <path className="partly-cloudy-cloud" d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>
      );
    } else if (iconCode.includes('cloud')) {
      return (
        <svg className="weather-icon cloudy" viewBox="0 0 24 24">
          <path className="cloud" d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>
      );
    } else if (iconCode.includes('rain') || iconCode.includes('drizzle')) {
      return (
        <svg className="weather-icon rain" viewBox="0 0 24 24">
          <path className="rain-cloud" d="M20 16.2A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
          <line className="rain-drop rain-drop-1" x1="8" y1="16" x2="8" y2="18"></line>
          <line className="rain-drop rain-drop-2" x1="12" y1="17" x2="12" y2="19"></line>
          <line className="rain-drop rain-drop-3" x1="16" y1="16" x2="16" y2="18"></line>
          <line className="rain-drop rain-drop-4" x1="10" y1="20" x2="10" y2="22"></line>
          <line className="rain-drop rain-drop-5" x1="14" y1="20" x2="14" y2="22"></line>
        </svg>
      );
    } else if (iconCode.includes('thunder')) {
      return (
        <svg className="weather-icon thunder" viewBox="0 0 24 24">
          <path className="thunder-cloud" d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
          <polyline className="thunder-bolt" points="13 11 9 17 15 17 11 23"></polyline>
        </svg>
      );
    } else if (iconCode.includes('snow')) {
      return (
        <svg className="weather-icon snow" viewBox="0 0 24 24">
          <path className="snow-cloud" d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
          <circle className="snowflake snowflake-1" cx="8" cy="16" r="1"></circle>
          <circle className="snowflake snowflake-2" cx="8" cy="20" r="1"></circle>
          <circle className="snowflake snowflake-3" cx="12" cy="18" r="1"></circle>
          <circle className="snowflake snowflake-4" cx="12" cy="22" r="1"></circle>
          <circle className="snowflake snowflake-5" cx="16" cy="16" r="1"></circle>
          <circle className="snowflake snowflake-6" cx="16" cy="20" r="1"></circle>
        </svg>
      );
    } else if (iconCode.includes('fog') || iconCode.includes('mist') || iconCode.includes('haze')) {
      return (
        <svg className="weather-icon fog" viewBox="0 0 24 24">
          <path className="fog-line fog-line-1" d="M5 5h14"></path>
          <path className="fog-line fog-line-2" d="M5 8h12"></path>
          <path className="fog-line fog-line-3" d="M7 11h8"></path>
          <path className="fog-line fog-line-4" d="M9 14h4"></path>
          <path className="fog-line fog-line-5" d="M9 17h4"></path>
        </svg>
      );
    } else {
      // Default if condition doesn't match
      return (
        <svg className="weather-icon default" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      );
    }
  };

  return <div className={`weather-icon-container ${size}`}>{getIcon()}</div>;
};

export default WeatherIcon;