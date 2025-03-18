Weather App with Beautiful Visualizations
A beautiful, responsive weather application built with React that provides current weather and 5-day forecast with stunning visualizations.
Features

City Search: Look up weather data for any city around the world
Current Weather Display: View temperature, "feels like" temperature, weather condition, humidity, wind speed and direction, and pressure
5-Day Forecast: Plan ahead with a 5-day forecast showing high/low temperatures and weather conditions
Responsive Design: Works beautifully on desktop, tablet, and mobile devices
Visual Weather Indicators: Icons and background colors change based on weather conditions and temperature
Error Handling: User-friendly error messages if a city cannot be found or there are API issues

Setup Instructions
Prerequisites

Node.js and npm installed on your system
An API key from OpenWeatherMap (free tier works fine)

Installation

Clone this repository or download the files
Navigate to the project directory in your terminal
Install dependencies:

bashCopynpm install

Open src/utils/api.js and replace YOUR_API_KEY_HERE with your OpenWeatherMap API key:

javascriptCopyconst API_KEY = 'your_actual_api_key_here';

Start the development server:

bashCopynpm start
The app should now be running at http://localhost:3000
Building for Production
To create a production build:
bashCopynpm run build
This will create a build directory with optimized production files that you can deploy to any static website hosting service.
Project Structure
Copyweather-app/
│
├── public/                 # Static files
│   ├── index.html          # HTML template
│   └── favicon.ico         # App icon
│
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── CurrentWeather.jsx
│   │   ├── ForecastDay.jsx
│   │   ├── Forecast.jsx
│   │   ├── SearchBar.jsx
│   │   └── WeatherIcon.jsx
│   │
│   ├── utils/              # Utility functions
│   │   ├── api.js          # API functions
│   │   └── helpers.js      # Helper functions
│   │
│   ├── styles/             # Component styles
│   │   ├── CurrentWeather.css
│   │   ├── ForecastDay.css
│   │   ├── Forecast.css
│   │   ├── SearchBar.css
│   │   ├── WeatherIcon.css
│   │   └── App.css
│   │
│   ├── App.jsx             # Main App component
│   ├── index.jsx           # Application entry point
│   └── index.css           # Global styles
│
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
Customization
Using Mock Data
If you want to develop without making actual API calls, you can use the mock data functionality:

Open src/utils/api.js
Uncomment the last line:

javascriptCopy// const { fetchWeatherData, fetchForecastData } = useMockData(true);
Styling
The app uses CSS files for styling. You can customize the look and feel by modifying the CSS files in the src/styles/ directory.
Credits

Weather data provided by OpenWeatherMap
Icons based on Feather Icons

License
This project is open source and available under the MIT License.