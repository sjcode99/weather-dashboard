# Weather Dashboard

A modern weather dashboard built with React.js that provides real-time weather information and forecasts. This project demonstrates proficiency in React fundamentals and advanced concepts including API integration, polling, component structure, hooks, and state management.

## Features

### Core Features

#### Home Page (Weather Dashboard)
- City search functionality with weather details display
- Display key weather metrics:
  - Temperature
  - Humidity
  - Wind speed
  - Weather conditions (sunny, rainy, etc.)
- Integration with weather icons API

#### API Integration
- Utilizes OpenWeatherMap API
- Implements 30-second polling for real-time weather updates

#### Error Handling
- Graceful error handling for:
  - Invalid city names
  - Network failures
  - API service disruptions

#### Local Storage
- Saves last searched city
- Auto-loads weather data for saved city on app revisit

#### Component Architecture
- Modular component structure:
  - Search input component
  - Weather information display component
  - Error display component

#### State Management
- Global state management using React Context API

### Bonus Features

#### Extended Functionality
- 5-day weather forecast implementation
- Temperature unit toggle (Celsius/Fahrenheit)
- Data fetching and caching using React Query
<!-- - User authentication and data persistence with Supabase -->

## Technical Stack

- React.js
- TypeScript
- CSS Modules
- OpenWeatherMap API
- Local Storage API
- React Context API
- React Query
- Poppins Font Family

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   VITE_API_BASE=your_base_url_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── MainContent/
│   │   ├── Sidebar/
│   │   ├── SearchInput/
│   │   └── ErrorDisplay/
│   ├── utils/
│   │   └── api.ts
│   ├── types/
│   │   └── weather.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
└── package.json
```

## Contributing

Feel free to submit issues and enhancement requests!
