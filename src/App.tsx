import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Sidebar } from './components/Sidebar/Sidebar';
import { MainContent } from './components/MainContent/MainContent';
import { ErrorDisplay } from './components/ErrorDisplay/ErrorDisplay';
import { fetchWeatherData, fetchForecastData } from './utils/api';
import type { WeatherError, ForecastData } from './types/weather';
import styles from './App.module.css';

const STORAGE_KEY = 'lastSearchedCity';
const queryClient = new QueryClient();

type Unit = 'metric' | 'imperial';

function WeatherApp() {
  const [city, setCity] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [unit, setUnit] = useState<Unit>('metric');

  const { data: weatherData, error, isLoading } = useQuery({
    queryKey: ['weather', city, unit],
    queryFn: () => fetchWeatherData(city, unit),
    enabled: !!city,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: forecastData } = useQuery<ForecastData>({
    queryKey: ['forecast', city, unit],
    queryFn: () => fetchForecastData(city, unit),
    enabled: !!city,
    refetchInterval: 30000,
  });

  const handleSearch = (newCity: string) => {
    setCity(newCity);
    localStorage.setItem(STORAGE_KEY, newCity);
  };

  const handleUnitChange = (newUnit: Unit) => {
    setUnit(newUnit);
  };

  console.log(error);
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar 
        weatherData={weatherData ?? null} 
        error={error as WeatherError | null}
        onSearch={handleSearch} 
      />
      <div className={styles.mainArea}>
        {/* {!error && <div className={styles.unitToggle}>
          <button
            className={unit === 'metric' ? styles.activeUnit : ''}
            onClick={() => handleUnitChange('metric')}
            disabled={isLoading}
          >
            °C
          </button>
          <button
            className={unit === 'imperial' ? styles.activeUnit : ''}
            onClick={() => handleUnitChange('imperial')}
            disabled={isLoading}
          >
            °F
          </button>
        </div>} */}
        {isLoading && <div className={styles.loading}>Loading...</div>}
        {error && (
          <div className={styles.mainError}>
            <ErrorDisplay error={error as WeatherError} />
          </div>
        )}
        {!error && (
          <MainContent 
            weatherData={weatherData ?? null} 
            forecastData={forecastData ?? null} 
            unit={unit}
            onUnitChange={handleUnitChange}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherApp />
    </QueryClientProvider>
  );
}

export default App;
