import axios from 'axios';
import { formatWeatherData, formatForecastData } from './helpers';

// Your OpenWeatherMap API key
const API_KEY = '44463d054f897d96ac24f1aead11948f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Fetch current weather data
export const fetchWeatherData = async (location) => {
  try {
    // Determine if the location is coordinates or a city name
    const isCoordinates = location.includes(',');
    
    let params = {
      units: 'metric',
      appid: API_KEY
    };
    
    if (isCoordinates) {
      const [lat, lon] = location.split(',');
      params.lat = lat;
      params.lon = lon;
    } else {
      params.q = location;
    }
    
    const response = await axios.get(`${BASE_URL}/weather`, { params });
    return formatWeatherData(response.data);
    
  } catch (error) {
    console.error('Weather API Error:', error);
    
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (error.response.status === 401) {
        throw new Error('API authorization failed. Please check your API key.');
      } else if (error.response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }
    }
    
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
};

// Fetch 5-day forecast data
export const fetchForecastData = async (location) => {
  try {
    // Determine if the location is coordinates or a city name
    const isCoordinates = location.includes(',');
    
    let params = {
      units: 'metric',
      appid: API_KEY
    };
    
    if (isCoordinates) {
      const [lat, lon] = location.split(',');
      params.lat = lat;
      params.lon = lon;
    } else {
      params.q = location;
    }
    
    const response = await axios.get(`${BASE_URL}/forecast`, { params });
    return formatForecastData(response.data);
    
  } catch (error) {
    console.error('Forecast API Error:', error);
    
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('Forecast data not available for this location.');
      } else if (error.response.status === 401) {
        throw new Error('API authorization failed. Please check your API key.');
      } else if (error.response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }
    }
    
    throw new Error('Failed to fetch forecast data. Please try again later.');
  }
};

// Function to switch between real API and mock data (for development/testing)
export const getMockData = (enable = false) => {
  if (enable) {
    return {
      fetchWeatherData: async (city) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
          city: typeof city === 'string' && city.includes(',') ? 'Current Location' : city,
          country: 'Mock Country',
          temperature: 22.5,
          feelsLike: 23.2,
          condition: 'Clear',
          description: 'clear sky',
          humidity: 65,
          windSpeed: 5.2,
          windDirection: 'NE',
          pressure: 1012,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
        };
      },
      
      fetchForecastData: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const conditions = ['Clear', 'Partly Cloudy', 'Cloudy', 'Rain', 'Thunderstorm'];
        
        const today = new Date();
        
        return Array.from({ length: 5 }, (_, index) => {
          const forecastDate = new Date();
          forecastDate.setDate(today.getDate() + index + 1);
          
          return {
            day: days[forecastDate.getDay()],
            date: forecastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            tempMax: Math.round(20 + Math.random() * 10),
            tempMin: Math.round(10 + Math.random() * 5),
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            humidity: Math.round(60 + Math.random() * 20),
            windSpeed: Math.round(5 + Math.random() * 15),
            precipitation: Math.round(Math.random() * 10)
          };
        });
      }
    };
  }
  
  // Return the actual API functions if mock is disabled
  return { fetchWeatherData, fetchForecastData };
};

// To use mock data, uncomment the following line and update your imports
// export default getMockData(true);