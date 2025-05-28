import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  onSearch: (city: string) => void;
}

export const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
}; 