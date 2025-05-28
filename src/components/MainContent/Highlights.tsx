import type { WeatherData } from '../../types/weather';
import styles from './Highlights.module.css';

interface HighlightsProps {
  weatherData: WeatherData | null;
  unit: 'metric' | 'imperial';
}

export const Highlights = ({ weatherData, unit }: HighlightsProps) => {
  if (!weatherData) return null;

  // Format sunrise/sunset
  const formatTime = (timestamp?: number) => {
    if (!timestamp) return '--';
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section className={styles.highlightsSection}>
      <h2 className={styles.title}>Today's Highlights</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.iconLabel}><span role="img" aria-label="uv">🌤️</span> UV Index</div>
          <div className={styles.value} style={{ color: '#fbbf24' }}>5</div>
          <div className={styles.subtext} style={{ color: '#fbbf24' }}>Moderate</div>
        </div>
        <div className={styles.card}>
          <div className={styles.iconLabel}><span role="img" aria-label="wind">💨</span> Wind Status</div>
          <div className={styles.value}>{weatherData.wind.speed} <span className={styles.unit}>{unit === 'metric' ? 'km/h' : 'mph'}</span></div>
          <div className={styles.subtext}>{weatherData.wind.deg ? `${weatherData.wind.deg}°` : 'WSW'}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.iconLabel}><span role="img" aria-label="sunrise">🌅</span> Sunrise & Sunset</div>
          <div className={styles.sunTimes}>
            <span>🌅 {formatTime(weatherData.sys?.sunrise)}</span>
            <span>🌇 {formatTime(weatherData.sys?.sunset)}</span>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.iconLabel}><span role="img" aria-label="humidity">💧</span> Humidity</div>
          <div className={styles.value}>{weatherData.main.humidity}%</div>
          <div className={styles.subtext} style={{ color: '#38bdf8' }}>Normal 👍🏻</div>
        </div>
        <div className={styles.card}>
          <div className={styles.iconLabel}><span role="img" aria-label="visibility">👁️</span> Visibility</div>
          <div className={styles.value}>{weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) : '--'} <span className={styles.unit}>km</span></div>
          <div className={styles.subtext}>Average 😐</div>
        </div>
        <div className={styles.card}>
          <div className={styles.iconLabel}><span role="img" aria-label="air quality">🫁</span> Air Quality</div>
          <div className={styles.value} style={{ color: '#f87171' }}>105</div>
          <div className={styles.subtext} style={{ color: '#f87171' }}>Unhealthy 👎🏻</div>
        </div>
      </div>
    </section>
  );
}; 