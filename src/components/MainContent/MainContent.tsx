import type { WeatherData, ForecastData } from '../../types/weather';
import styles from './MainContent.module.css';
import { useState } from 'react';
import { Highlights } from './Highlights';

interface MainContentProps {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  unit: 'metric' | 'imperial';
  onUnitChange: (unit: 'metric' | 'imperial') => void;
  isLoading?: boolean;
}

const getDayName = (dt: number, timezone: number) => {
  const date = new Date((dt + timezone) * 1000);
  return date.toLocaleDateString(undefined, { weekday: 'short' });
};

const ForecastCard = ({ dt, icon, min, max, main, timezone, unit }: any) => (
  <div className={styles.grid}>
  <div className={styles.forecastCard}>
    <div className={styles.day}>{getDayName(dt, timezone)}</div>
    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={main} className={styles.icon} />
    <div className={styles.temps}>
      <span className={styles.max}>{Math.round(max)}°{unit === 'metric' ? 'C' : 'F'}</span>
    </div>
    <div className={styles.main}>{main}</div>
  </div>
  </div>
);

export const MainContent = ({ weatherData, forecastData, unit, onUnitChange, isLoading }: MainContentProps) => {
  const [tab, setTab] = useState<'today' | 'week'>('week');

  // Group forecast by day (get one forecast per day, e.g., 12:00)
  let dailyForecast: any[] = [];
  if (forecastData && forecastData.list.length > 0) {
    const timezone = forecastData.city.timezone || 0;
    const seenDays = new Set();
    dailyForecast = forecastData.list.filter((item) => {
      const date = new Date((item.dt + timezone) * 1000);
      const day = date.getUTCDate();
      if (seenDays.has(day)) return false;
      seenDays.add(day);
      return date.getUTCHours() === 12; // Pick 12:00 for each day
    });
    // If not enough days, fill with first of each day
    if (dailyForecast.length < 5) {
      seenDays.clear();
      dailyForecast = forecastData.list.filter((item) => {
        const date = new Date((item.dt + timezone) * 1000);
        const day = date.getUTCDate();
        if (seenDays.has(day)) return false;
        seenDays.add(day);
        return true;
      }).slice(0, 5);
    }
  }

  // Get today's date in the forecast city's timezone
  let todayDay: number | null = null;
  if (forecastData) {
    const now = new Date(Date.now() + (forecastData.city.timezone || 0) * 1000);
    todayDay = now.getUTCDate();
  }

  // Filter out today from dailyForecast
  const filteredForecast = dailyForecast.filter(item => {
    const date = new Date((item.dt + (forecastData?.city.timezone || 0)) * 1000);
    return date.getUTCDate() !== todayDay;
  });

  return (
    <section className={styles.mainContent}>
      <div className={styles.topBar}>
        <div className={styles.tabs}>
          <button
            className={`${tab === 'today' ? styles.active : ''} ${styles.tabButton}`}
            onClick={() => setTab('today')}
          >
            Today
          </button>
          <button
            className={`${tab === 'week' ? styles.active : ''} ${styles.tabButton}`}
            onClick={() => setTab('week')}
          >
            Week
          </button>
        </div>
        <div className={styles.unitToggle}>
          <button
            className={unit === 'metric' ? styles.activeUnit : ''}
            onClick={() => onUnitChange('metric')}
            disabled={isLoading}
          >
            °C
          </button>
          <button
            className={unit === 'imperial' ? styles.activeUnit : ''}
            onClick={() => onUnitChange('imperial')}
            disabled={isLoading}
          >
            °F
          </button>
        </div>
      </div>
      <div className={styles.forecastPlaceholder}>
        {tab === 'week' && forecastData && (
          <div className={styles.forecastCards}>
            {filteredForecast.map((item, idx) => (
              <ForecastCard
                key={item.dt}
                dt={item.dt}
                icon={item.weather[0].icon}
                min={item.main.temp_min}
                max={item.main.temp_max}
                main={item.weather[0].main}
                timezone={forecastData.city.timezone}
                unit={unit}
              />
            ))}
          </div>
        )}
        {tab === 'week' && !forecastData && <div className={styles.forecastCards}>No forecast data</div>}
      </div>
      <Highlights weatherData={weatherData} unit={unit} />
    </section>
  );
}; 