export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    sea_level?: number;
    grnd_level?: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
    id?: number;
  }>;
  wind: {
    speed: number;
    deg?: number;
    gust?: number;
  };
  name: string;
  dt: number;
  timezone?: number;
  sys?: {
    country?: string;
    sunrise?: number;
    sunset?: number;
    id?: number;
    type?: number;
  };
  visibility?: number;
  clouds?: {
    all: number;
  };
}

export interface ForecastListItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

export interface ForecastData {
  list: ForecastListItem[];
  city: {
    name: string;
    country: string;
    timezone: number;
  };
}

export interface WeatherError {
  message: string;
  cod?: string;
} 