import { SearchInput } from '../SearchInput/SearchInput';
import { ErrorDisplay } from '../ErrorDisplay/ErrorDisplay';
import type { WeatherData, WeatherError } from '../../types/weather';
import styles from './Sidebar.module.css';

interface SidebarProps {
  weatherData: WeatherData | null;
  error: WeatherError | null;
  onSearch: (city: string) => void;
}

export const Sidebar = ({ weatherData, error, onSearch }: SidebarProps) => {
  // Format date and time in IST
  const getDateTime = () => {
    if (!weatherData) return '';
    const date = new Date((weatherData.dt + (weatherData.timezone || 0)) * 1000);
    return date.toLocaleString('en-IN', {
      weekday: 'long',
      // hour: '2-digit',
      // minute: '2-digit',
      // hour12: true,
      timeZone: 'Asia/Kolkata'
    });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchForm}>
          <div className={styles.searchInputWithIcon}>
            <span className={styles.searchIcon} role="img" aria-label="search">🔍</span>
            <SearchInput onSearch={onSearch} />
          </div>
        </div>
      </div>
      {error && (
        <div className={styles.sidebarError}>
          <ErrorDisplay error={error} />
        </div>
      )}
      {weatherData && !error && (
        <>
          <div className={styles.weatherIconWrapper}>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              alt={weatherData.weather[0].description}
              className={styles.weatherIcon}
            />
          </div>
          <div className={styles.temp}>{Math.round(weatherData.main.temp)}°C</div>
          <div className={styles.dateTime}>{getDateTime()}</div>
          <div className={styles.description}>{weatherData.weather[0].main} - {weatherData.weather[0].description}</div>
          <div className={styles.cityInfo}>
            <span>{weatherData.name}, {weatherData.sys?.country}</span>
          </div>
        </>
      )}
      {weatherData && !error && (<div className={styles.cityImageWrapper}>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
          alt="City"
          className={styles.cityImage}
        />
      </div>)}
    </aside>
  );
}; 