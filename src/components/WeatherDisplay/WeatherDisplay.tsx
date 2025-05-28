import type { WeatherData } from '../../types/weather';
import styles from './WeatherDisplay.module.css';

interface WeatherDisplayProps {
  data: WeatherData;
}

export const WeatherDisplay = ({ data }: WeatherDisplayProps) => {
  console.log(data)
  const { main, weather, wind, name } = data;
  const weatherIcon = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return (
    <div className={styles.weatherCard}>
      <h2 className={styles.cityName}>{name}</h2>
      <div className={styles.weatherInfo}>
        <img src={iconUrl} alt={weather[0].description} className={styles.weatherIcon} />
        <div className={styles.temperature}>{Math.round(main.temp)}°C</div>
      </div>
      <div className={styles.weatherDetails}>
        <div className={styles.detail}>
          <span className={styles.label}>Feels like:</span>
          <span className={styles.value}>{Math.round(main.feels_like)}°C</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.label}>Humidity:</span>
          <span className={styles.value}>{main.humidity}%</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.label}>Wind:</span>
          <span className={styles.value}>{Math.round(wind.speed)} m/s</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.label}>Conditions:</span>
          <span className={styles.value}>{weather[0].description}</span>
        </div>
      </div>
    </div>
  );
}; 