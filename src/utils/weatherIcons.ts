
import { Sun, Cloud, CloudRain, Wind, Snowflake, LucideIcon } from 'lucide-react';
import { WeatherCondition } from '@/types/weather';

export const getWeatherIcon = (condition: WeatherCondition): LucideIcon => {
  switch (condition) {
    case 'sunny':
      return Sun;
    case 'cloudy':
      return Cloud;
    case 'rainy':
      return CloudRain;
    case 'windy':
      return Wind;
    case 'snowy':
      return Snowflake;
    default:
      return Sun;
  }
};
