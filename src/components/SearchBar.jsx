import React, { useState, useEffect, useRef } from 'react';
import '../styles/SearchBar.css';

const popularCities = [
    // Major Cities in North America
    { name: 'New York', country: 'USA' },
    { name: 'Los Angeles', country: 'USA' },
    { name: 'Chicago', country: 'USA' },
    { name: 'Houston', country: 'USA' },
    { name: 'Phoenix', country: 'USA' },
    { name: 'Philadelphia', country: 'USA' },
    { name: 'San Antonio', country: 'USA' },
    { name: 'San Diego', country: 'USA' },
    { name: 'Dallas', country: 'USA' },
    { name: 'San Jose', country: 'USA' },
    { name: 'Austin', country: 'USA' },
    { name: 'Jacksonville', country: 'USA' },
    { name: 'Fort Worth', country: 'USA' },
    { name: 'Columbus', country: 'USA' },
    { name: 'Indianapolis', country: 'USA' },
    { name: 'Charlotte', country: 'USA' },
    { name: 'San Francisco', country: 'USA' },
    { name: 'Seattle', country: 'USA' },
    { name: 'Denver', country: 'USA' },
    { name: 'Washington DC', country: 'USA' },
    { name: 'Boston', country: 'USA' },
    { name: 'Las Vegas', country: 'USA' },
    { name: 'Portland', country: 'USA' },
    { name: 'Miami', country: 'USA' },
    { name: 'Atlanta', country: 'USA' },
    { name: 'Toronto', country: 'Canada' },
    { name: 'Montreal', country: 'Canada' },
    { name: 'Vancouver', country: 'Canada' },
    { name: 'Calgary', country: 'Canada' },
    { name: 'Edmonton', country: 'Canada' },
    { name: 'Ottawa', country: 'Canada' },
    { name: 'Quebec City', country: 'Canada' },
    { name: 'Winnipeg', country: 'Canada' },
    { name: 'Mexico City', country: 'Mexico' },
    { name: 'Guadalajara', country: 'Mexico' },
    { name: 'Monterrey', country: 'Mexico' },
    { name: 'Puebla', country: 'Mexico' },
    { name: 'Tijuana', country: 'Mexico' },
    
    // Major Cities in Europe
    { name: 'London', country: 'UK' },
    { name: 'Birmingham', country: 'UK' },
    { name: 'Manchester', country: 'UK' },
    { name: 'Glasgow', country: 'UK' },
    { name: 'Liverpool', country: 'UK' },
    { name: 'Edinburgh', country: 'UK' },
    { name: 'Paris', country: 'France' },
    { name: 'Marseille', country: 'France' },
    { name: 'Lyon', country: 'France' },
    { name: 'Toulouse', country: 'France' },
    { name: 'Nice', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
    { name: 'Hamburg', country: 'Germany' },
    { name: 'Munich', country: 'Germany' },
    { name: 'Cologne', country: 'Germany' },
    { name: 'Frankfurt', country: 'Germany' },
    { name: 'Stuttgart', country: 'Germany' },
    { name: 'Rome', country: 'Italy' },
    { name: 'Milan', country: 'Italy' },
    { name: 'Naples', country: 'Italy' },
    { name: 'Turin', country: 'Italy' },
    { name: 'Palermo', country: 'Italy' },
    { name: 'Florence', country: 'Italy' },
    { name: 'Venice', country: 'Italy' },
    { name: 'Madrid', country: 'Spain' },
    { name: 'Barcelona', country: 'Spain' },
    { name: 'Valencia', country: 'Spain' },
    { name: 'Seville', country: 'Spain' },
    { name: 'Zaragoza', country: 'Spain' },
    { name: 'Málaga', country: 'Spain' },
    { name: 'Amsterdam', country: 'Netherlands' },
    { name: 'Rotterdam', country: 'Netherlands' },
    { name: 'The Hague', country: 'Netherlands' },
    { name: 'Brussels', country: 'Belgium' },
    { name: 'Antwerp', country: 'Belgium' },
    { name: 'Vienna', country: 'Austria' },
    { name: 'Graz', country: 'Austria' },
    { name: 'Zurich', country: 'Switzerland' },
    { name: 'Geneva', country: 'Switzerland' },
    { name: 'Lisbon', country: 'Portugal' },
    { name: 'Porto', country: 'Portugal' },
    { name: 'Dublin', country: 'Ireland' },
    { name: 'Cork', country: 'Ireland' },
    { name: 'Oslo', country: 'Norway' },
    { name: 'Bergen', country: 'Norway' },
    { name: 'Stockholm', country: 'Sweden' },
    { name: 'Gothenburg', country: 'Sweden' },
    { name: 'Copenhagen', country: 'Denmark' },
    { name: 'Athens', country: 'Greece' },
    { name: 'Thessaloniki', country: 'Greece' },
    { name: 'Helsinki', country: 'Finland' },
    { name: 'Moscow', country: 'Russia' },
    { name: 'Saint Petersburg', country: 'Russia' },
    { name: 'Warsaw', country: 'Poland' },
    { name: 'Kraków', country: 'Poland' },
    { name: 'Budapest', country: 'Hungary' },
    { name: 'Prague', country: 'Czech Republic' },
    { name: 'Bucharest', country: 'Romania' },
    { name: 'Sofia', country: 'Bulgaria' },
    { name: 'Belgrade', country: 'Serbia' },
    { name: 'Zagreb', country: 'Croatia' },
    { name: 'Istanbul', country: 'Turkey' },
    { name: 'Ankara', country: 'Turkey' },
    { name: 'Izmir', country: 'Turkey' },
    
    // Major Cities in Asia
    { name: 'Tokyo', country: 'Japan' },
    { name: 'Yokohama', country: 'Japan' },
    { name: 'Osaka', country: 'Japan' },
    { name: 'Nagoya', country: 'Japan' },
    { name: 'Sapporo', country: 'Japan' },
    { name: 'Fukuoka', country: 'Japan' },
    { name: 'Kyoto', country: 'Japan' },
    { name: 'Seoul', country: 'South Korea' },
    { name: 'Busan', country: 'South Korea' },
    { name: 'Incheon', country: 'South Korea' },
    { name: 'Daegu', country: 'South Korea' },
    { name: 'Shanghai', country: 'China' },
    { name: 'Beijing', country: 'China' },
    { name: 'Guangzhou', country: 'China' },
    { name: 'Shenzhen', country: 'China' },
    { name: 'Chengdu', country: 'China' },
    { name: 'Tianjin', country: 'China' },
    { name: 'Wuhan', country: 'China' },
    { name: 'Hong Kong', country: 'China' },
    { name: 'Chongqing', country: 'China' },
    { name: 'Nanjing', country: 'China' },
    { name: "Xi'an", country: 'China' },
    { name: 'Hangzhou', country: 'China' },
    { name: 'Taipei', country: 'Taiwan' },
    { name: 'Delhi', country: 'India' },
    { name: 'Mumbai', country: 'India' },
    { name: 'Bangalore', country: 'India' },
    { name: 'Hyderabad', country: 'India' },
    { name: 'Chennai', country: 'India' },
    { name: 'Kolkata', country: 'India' },
    { name: 'Ahmedabad', country: 'India' },
    { name: 'Pune', country: 'India' },
    { name: 'Jaipur', country: 'India' },
    { name: 'Surat', country: 'India' },
    { name: 'Bangkok', country: 'Thailand' },
    { name: 'Chiang Mai', country: 'Thailand' },
    { name: 'Phuket', country: 'Thailand' },
    { name: 'Jakarta', country: 'Indonesia' },
    { name: 'Surabaya', country: 'Indonesia' },
    { name: 'Bandung', country: 'Indonesia' },
    { name: 'Bali', country: 'Indonesia' },
    { name: 'Manila', country: 'Philippines' },
    { name: 'Quezon City', country: 'Philippines' },
    { name: 'Kuala Lumpur', country: 'Malaysia' },
    { name: 'Singapore', country: 'Singapore' },
    { name: 'Ho Chi Minh City', country: 'Vietnam' },
    { name: 'Hanoi', country: 'Vietnam' },
    { name: 'Yangon', country: 'Myanmar' },
    { name: 'Dhaka', country: 'Bangladesh' },
    { name: 'Karachi', country: 'Pakistan' },
    { name: 'Lahore', country: 'Pakistan' },
    { name: 'Islamabad', country: 'Pakistan' },
    { name: 'Tehran', country: 'Iran' },
    { name: 'Dubai', country: 'UAE' },
    { name: 'Abu Dhabi', country: 'UAE' },
    { name: 'Doha', country: 'Qatar' },
    { name: 'Riyadh', country: 'Saudi Arabia' },
    { name: 'Jeddah', country: 'Saudi Arabia' },
    { name: 'Jerusalem', country: 'Israel' },
    { name: 'Tel Aviv', country: 'Israel' },
    
    // Major Cities in Africa
    { name: 'Cairo', country: 'Egypt' },
    { name: 'Alexandria', country: 'Egypt' },
    { name: 'Lagos', country: 'Nigeria' },
    { name: 'Abuja', country: 'Nigeria' },
    { name: 'Kano', country: 'Nigeria' },
    { name: 'Kinshasa', country: 'DR Congo' },
    { name: 'Johannesburg', country: 'South Africa' },
    { name: 'Cape Town', country: 'South Africa' },
    { name: 'Durban', country: 'South Africa' },
    { name: 'Pretoria', country: 'South Africa' },
    { name: 'Casablanca', country: 'Morocco' },
    { name: 'Marrakesh', country: 'Morocco' },
    { name: 'Rabat', country: 'Morocco' },
    { name: 'Algiers', country: 'Algeria' },
    { name: 'Tunis', country: 'Tunisia' },
    { name: 'Accra', country: 'Ghana' },
    { name: 'Addis Ababa', country: 'Ethiopia' },
    { name: 'Nairobi', country: 'Kenya' },
    { name: 'Dakar', country: 'Senegal' },
    { name: 'Luanda', country: 'Angola' },
    { name: 'Khartoum', country: 'Sudan' },
    { name: 'Dar es Salaam', country: 'Tanzania' },
    
    // Major Cities in Oceania
    { name: 'Sydney', country: 'Australia' },
    { name: 'Melbourne', country: 'Australia' },
    { name: 'Brisbane', country: 'Australia' },
    { name: 'Perth', country: 'Australia' },
    { name: 'Adelaide', country: 'Australia' },
    { name: 'Gold Coast', country: 'Australia' },
    { name: 'Canberra', country: 'Australia' },
    { name: 'Auckland', country: 'New Zealand' },
    { name: 'Wellington', country: 'New Zealand' },
    { name: 'Christchurch', country: 'New Zealand' },
    
    // Major Cities in South America
    { name: 'São Paulo', country: 'Brazil' },
    { name: 'Rio de Janeiro', country: 'Brazil' },
    { name: 'Brasília', country: 'Brazil' },
    { name: 'Salvador', country: 'Brazil' },
    { name: 'Fortaleza', country: 'Brazil' },
    { name: 'Belo Horizonte', country: 'Brazil' },
    { name: 'Buenos Aires', country: 'Argentina' },
    { name: 'Córdoba', country: 'Argentina' },
    { name: 'Rosario', country: 'Argentina' },
    { name: 'Lima', country: 'Peru' },
    { name: 'Bogotá', country: 'Colombia' },
    { name: 'Medellín', country: 'Colombia' },
    { name: 'Cali', country: 'Colombia' },
    { name: 'Santiago', country: 'Chile' },
    { name: 'Caracas', country: 'Venezuela' },
    { name: 'Quito', country: 'Ecuador' },
    { name: 'Guayaquil', country: 'Ecuador' },
    { name: 'Montevideo', country: 'Uruguay' },
    { name: 'Asunción', country: 'Paraguay' },
    { name: 'La Paz', country: 'Bolivia' },
    { name: 'Tokyo', country: 'Japan' },
    { name: 'Delhi', country: 'India' },
    { name: 'Shanghai', country: 'China' },
    { name: 'São Paulo', country: 'Brazil' },
    { name: 'Mexico City', country: 'Mexico' },
    { name: 'Cairo', country: 'Egypt' },
    { name: 'Mumbai', country: 'India' },
    { name: 'Beijing', country: 'China' },
    { name: 'Dhaka', country: 'Bangladesh' },
    { name: 'Osaka', country: 'Japan' },
    { name: 'New York', country: 'USA' },
    { name: 'Karachi', country: 'Pakistan' },
    { name: 'Buenos Aires', country: 'Argentina' },
    { name: 'Chongqing', country: 'China' },
    { name: 'Istanbul', country: 'Turkey' },
    { name: 'Kolkata', country: 'India' },
    { name: 'Manila', country: 'Philippines' },
    { name: 'Lagos', country: 'Nigeria' },
    { name: 'Rio de Janeiro', country: 'Brazil' },
    { name: 'Tianjin', country: 'China' },
    { name: 'Kinshasa', country: 'DR Congo' },
    { name: 'Guangzhou', country: 'China' },
    { name: 'Los Angeles', country: 'USA' },
    { name: 'Moscow', country: 'Russia' },
    { name: 'Shenzhen', country: 'China' },
    { name: 'Lahore', country: 'Pakistan' },
    { name: 'Bangalore', country: 'India' },
    { name: 'Paris', country: 'France' },
    { name: 'Bogotá', country: 'Colombia' },
    { name: 'Jakarta', country: 'Indonesia' },
    { name: 'Chennai', country: 'India' },
    { name: 'Lima', country: 'Peru' },
    { name: 'Bangkok', country: 'Thailand' },
    { name: 'Seoul', country: 'South Korea' },
    { name: 'Nagoya', country: 'Japan' },
    { name: 'Hyderabad', country: 'India' },
    { name: 'London', country: 'UK' },
    { name: 'Tehran', country: 'Iran' },
    { name: 'Chicago', country: 'USA' },
    { name: 'Chengdu', country: 'China' },
    { name: 'Nanjing', country: 'China' },
    { name: 'Wuhan', country: 'China' },
    { name: 'Ho Chi Minh City', country: 'Vietnam' },
    { name: 'Luanda', country: 'Angola' },
    { name: 'Ahmedabad', country: 'India' },
    { name: 'Kuala Lumpur', country: 'Malaysia' },
    { name: "Xi'an", country: 'China' },
    { name: 'Hong Kong', country: 'China' },
    { name: 'Dongguan', country: 'China' },
    { name: 'Hangzhou', country: 'China' }
  ];
  
  const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const suggestionsRef = useRef(null);
    const inputRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
            event.target !== inputRef.current) {
          setShowSuggestions(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (city.trim()) {
        onSearch(city.trim());
        setShowSuggestions(false);
      }
    };
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setCity(value);
      
      if (value.length > 0) {
        // Filter cities that match the input
        const filteredSuggestions = popularCities.filter(
          city => city.name.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 8); // Increased to 8 suggestions
        
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setActiveSuggestion(-1);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };
  
    const handleSuggestionClick = (suggestion) => {
      setCity(suggestion.name);
      setShowSuggestions(false);
      onSearch(suggestion.name);
    };
  
    const handleKeyDown = (e) => {
      // Handle keyboard navigation of suggestions
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter' && activeSuggestion >= 0) {
        e.preventDefault();
        handleSuggestionClick(suggestions[activeSuggestion]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    };
  
    return (
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <div className="search-input-group">
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Enter city name (e.g., London, Tokyo, New York)"
              value={city}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => city.length > 0 && setSuggestions.length > 0 && setShowSuggestions(true)}
            />
            <button type="submit" className="search-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </form>
  
        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions" ref={suggestionsRef}>
            {suggestions.map((suggestion, index) => (
              <div 
                key={suggestion.name}
                className={`suggestion-item ${index === activeSuggestion ? 'active' : ''}`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <svg 
                  className="suggestion-icon" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div className="suggestion-text">
                  <span className="suggestion-name">{suggestion.name}</span>
                  <span className="suggestion-country">{suggestion.country}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default SearchBar;