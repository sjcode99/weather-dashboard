import axios from 'axios';
import type { WeatherData, WeatherError } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city: string, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units,
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const weatherError: WeatherError = {
        message: error.response?.data?.message || 'Failed to fetch weather data',
        cod: error.response?.data?.cod || '500'
      };
      throw weatherError;
    }
    const weatherError: WeatherError = {
      message: 'An unexpected error occurred',
      cod: '500'
    };
    throw weatherError;
  }
};

export const fetchForecastData = async (city: string, units: 'metric' | 'imperial' = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units,
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch forecast data',
        cod: error.response?.data?.cod || '500'
      };
    }
    throw {
      message: 'An unexpected error occurred',
      cod: '500'
    };
  }
}; 