import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherAnimations from './components/WeatherAnimations';
import { fetchWeatherData, fetchForecastData } from './utils/api';
import './styles/App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [backgroundCondition, setBackgroundCondition] = useState('');

  useEffect(() => {
    // Optional: Get user's location for initial weather display
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleLocationSearch(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to a major city if geolocation fails
          handleSearch("London");
        }
      );
    } else {
      // Default to a major city if geolocation is not supported
      handleSearch("London");
    }
  }, []);

  const handleLocationSearch = async (lat, lon) => {
    setLoading(true);
    setError('');
    
    try {
      // You'd need to modify your API to handle coordinates
      // This is a placeholder assuming your API can handle it
      const weatherResponse = await fetchWeatherData(`${lat},${lon}`);
      setWeatherData(weatherResponse);
      setBackgroundCondition(weatherResponse.condition);
      
      const forecastResponse = await fetchForecastData(`${lat},${lon}`);
      setForecastData(forecastResponse);
      
      setLoading(false);
    } catch (err) {
      setError("Couldn't get weather for your location. Please search for a city instead.");
      setLoading(false);
    }
  };

  const handleSearch = async (city) => {
    setLoading(true);
    setError('');
    
    try {
      const weatherResponse = await fetchWeatherData(city);
      setWeatherData(weatherResponse);
      setBackgroundCondition(weatherResponse.condition);
      
      const forecastResponse = await fetchForecastData(city);
      setForecastData(forecastResponse);
      
      setLoading(false);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      setLoading(false);
      setWeatherData(null);
      setForecastData(null);
    }
  };

  // Render dynamic weather-based background elements
  const renderWeatherBackground = () => {
    if (!backgroundCondition) return null;
    
    const conditionLower = backgroundCondition.toLowerCase();
    
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
      return (
        <div className="weather-background">
          <div className="sun-animation"></div>
        </div>
      );
    } else if (conditionLower.includes('cloud') && !conditionLower.includes('rain')) {
      return (
        <div className="weather-background">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="app-container">
      {renderWeatherBackground()}
      {backgroundCondition && <WeatherAnimations condition={backgroundCondition} />}
      
      <h1 className="app-title">Weather Forecast</h1>
      <SearchBar onSearch={handleSearch} />
      
      {loading && <div className="loading-spinner">Loading weather data...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {weatherData && <CurrentWeather data={weatherData} />}
      
      {forecastData && <Forecast data={forecastData} />}
      
      {(weatherData || forecastData) && (
        <div className="app-footer">
          <p>Data provided by OpenWeatherMap</p>
          <div className="creator-info">
            <span>Created by Neil Patrick</span>
            <a href="https://github.com/NeilPatrickSaldanha" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;