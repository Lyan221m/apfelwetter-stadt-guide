
export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'windy' | 'snowy';

export interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: WeatherCondition;
}

export interface WeatherData {
  city: string;
  temperature: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  pressure: number;
  feelsLike: number;
  uvIndex: number;
  visibility: number;
  forecast: ForecastDay[];
}
