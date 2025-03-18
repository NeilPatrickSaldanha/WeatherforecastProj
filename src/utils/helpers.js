// Format the raw weather data from the API
export const formatWeatherData = (data) => {
    if (!data) return null;
    
    // Get the local time and date for the location
    const timestamp = data.dt * 1000; // Convert to milliseconds
    const date = new Date(timestamp);
    
    // Calculate sunrise and sunset times
    const sunrise = data.sys?.sunrise ? new Date(data.sys.sunrise * 1000) : null;
    const sunset = data.sys?.sunset ? new Date(data.sys.sunset * 1000) : null;
    
    // Get wind direction as a cardinal point (N, NE, E, etc.)
    const windDirection = getWindDirection(data.wind?.deg);
    
    return {
      city: data.name || 'Unknown',
      country: data.sys?.country || '',
      temperature: data.main?.temp || 0,
      feelsLike: data.main?.feels_like || 0,
      tempMin: data.main?.temp_min || 0,
      tempMax: data.main?.temp_max || 0,
      condition: data.weather?.[0]?.main || 'Unknown',
      description: data.weather?.[0]?.description || '',
      humidity: data.main?.humidity || 0,
      windSpeed: data.wind?.speed || 0,
      windDirection: windDirection,
      pressure: data.main?.pressure || 0,
      visibility: data.visibility ? (data.visibility / 1000) : 0, // Convert to km
      sunrise: sunrise ? sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      sunset: sunset ? sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
    };
  };
  
  // Format the raw forecast data from the API
  export const formatForecastData = (data) => {
    if (!data || !data.list || !Array.isArray(data.list)) return [];
    
    // Group forecast data by day
    const dailyForecasts = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString();
      
      if (!dailyForecasts[day]) {
        dailyForecasts[day] = {
          temperatures: [],
          conditions: [],
          humidity: [],
          windSpeed: [],
          precipitation: [],
          date: date,
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          dateFormatted: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        };
      }
      
      dailyForecasts[day].temperatures.push(item.main.temp);
      dailyForecasts[day].conditions.push(item.weather[0].main);
      dailyForecasts[day].humidity.push(item.main.humidity);
      dailyForecasts[day].windSpeed.push(item.wind.speed);
      dailyForecasts[day].precipitation.push(item.rain?.['3h'] || 0);
    });
    
    // Process each day's data
    const result = Object.values(dailyForecasts).map(day => {
      // Calculate min and max temperatures
      const tempMin = Math.min(...day.temperatures);
      const tempMax = Math.max(...day.temperatures);
      
      // Get the most common condition for the day
      const conditionCounts = day.conditions.reduce((acc, condition) => {
        acc[condition] = (acc[condition] || 0) + 1;
        return acc;
      }, {});
      
      const condition = Object.entries(conditionCounts)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      // Calculate averages
      const avgHumidity = Math.round(
        day.humidity.reduce((sum, val) => sum + val, 0) / day.humidity.length
      );
      
      const avgWindSpeed = Math.round(
        day.windSpeed.reduce((sum, val) => sum + val, 0) / day.windSpeed.length
      );
      
      const totalPrecipitation = Math.round(
        day.precipitation.reduce((sum, val) => sum + val, 0) * 10
      ) / 10; // Round to 1 decimal place
      
      return {
        day: day.day,
        date: day.dateFormatted,
        tempMin,
        tempMax,
        condition,
        humidity: avgHumidity,
        windSpeed: avgWindSpeed,
        precipitation: totalPrecipitation
      };
    });
    
    // Return only the next 5 days (excluding today)
    return result.slice(1, 6);
  };
  
  // Helper to convert wind degree to cardinal direction
  export const getWindDirection = (deg) => {
    if (deg === undefined) return '';
    
    const directions = [
      'N', 'NNE', 'NE', 'ENE', 
      'E', 'ESE', 'SE', 'SSE', 
      'S', 'SSW', 'SW', 'WSW', 
      'W', 'WNW', 'NW', 'NNW'
    ];
    
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };
  
  // Helper to get a weather background class based on condition and time
  export const getWeatherBackground = (condition, isDay) => {
    const conditionLower = condition?.toLowerCase() || '';
    
    if (conditionLower.includes('thunder')) {
      return 'bg-thunderstorm';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'bg-rainy';
    } else if (conditionLower.includes('snow')) {
      return 'bg-snowy';
    } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
      return 'bg-misty';
    } else if (conditionLower.includes('cloud')) {
      return isDay ? 'bg-cloudy-day' : 'bg-cloudy-night';
    } else {
      return isDay ? 'bg-clear-day' : 'bg-clear-night';
    }
  };
  
  // Utility to format temperature for display
  export const formatTemperature = (temp) => {
    return Math.round(temp);
  };