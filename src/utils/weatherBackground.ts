
import { WeatherCondition } from '@/types/weather';

export const getWeatherBackground = (condition: WeatherCondition): string => {
  switch (condition) {
    case 'sunny':
      return 'bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500';
    case 'cloudy':
      return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600';
    case 'rainy':
      return 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800';
    case 'windy':
      return 'bg-gradient-to-br from-green-400 via-teal-500 to-blue-500';
    case 'snowy':
      return 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400';
    default:
      return 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500';
  }
};
