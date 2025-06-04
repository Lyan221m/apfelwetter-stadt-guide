const API_KEY = 'HIER_IHREN_NEUEN_WEATHER_API_SCHLÜSSEL_EINFÜGEN';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface OpenWeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
  sys: {
    country: string;
  };
}

export interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp_max: number;
      temp_min: number;
    };
    weather: Array<{
      main: string;
    }>;
  }>;
}

const mapWeatherCondition = (condition: string): 'sunny' | 'cloudy' | 'rainy' | 'windy' | 'snowy' => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes('clear') || lowerCondition.includes('sun')) return 'sunny';
  if (lowerCondition.includes('cloud')) return 'cloudy';
  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle') || lowerCondition.includes('thunderstorm')) return 'rainy';
  if (lowerCondition.includes('snow')) return 'snowy';
  if (lowerCondition.includes('wind')) return 'windy';
  return 'cloudy';
};

export const getCurrentWeather = async (city: string) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=de`
  );
  
  if (!response.ok) {
    throw new Error('Stadt nicht gefunden');
  }
  
  return response.json() as Promise<OpenWeatherResponse>;
};

export const getForecast = async (city: string) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=de`
  );
  
  if (!response.ok) {
    throw new Error('Vorhersage nicht verfügbar');
  }
  
  return response.json() as Promise<OpenWeatherForecastResponse>;
};

export const processWeatherData = async (city: string) => {
  const [currentWeather, forecast] = await Promise.all([
    getCurrentWeather(city),
    getForecast(city)
  ]);

  // Process forecast data to get daily forecasts
  const dailyForecasts = forecast.list
    .filter((_, index) => index % 8 === 0) // Take every 8th item (24 hours apart)
    .slice(0, 5)
    .map((item, index) => {
      const date = new Date(item.dt * 1000);
      const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
      return {
        day: index === 0 ? 'Heute' : days[date.getDay()],
        high: Math.round(item.main.temp_max),
        low: Math.round(item.main.temp_min),
        condition: mapWeatherCondition(item.weather[0].main)
      };
    });

  return {
    city: currentWeather.name,
    temperature: Math.round(currentWeather.main.temp),
    condition: mapWeatherCondition(currentWeather.weather[0].main),
    humidity: currentWeather.main.humidity,
    windSpeed: Math.round(currentWeather.wind.speed * 3.6), // Convert m/s to km/h
    pressure: currentWeather.main.pressure,
    feelsLike: Math.round(currentWeather.main.feels_like),
    uvIndex: 5, // OpenWeatherMap doesn't provide UV index in free tier
    visibility: Math.round(currentWeather.visibility / 1000), // Convert meters to km
    forecast: dailyForecasts
  };
};