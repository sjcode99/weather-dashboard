import type { WeatherError } from '../../types/weather';
import styles from './ErrorDisplay.module.css';

interface ErrorDisplayProps {
  error: WeatherError;
}

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <h3 className={styles.errorTitle}>Error</h3>
      <p className={styles.errorMessage}>{error.message}</p>
    </div>
  );
}; 