
import React from 'react';
import { WeatherData, WeatherCondition } from '@/types/weather';
import { getWeatherIcon } from '@/utils/weatherIcons';
import { Droplets, Wind, Eye, Gauge, Thermometer, Sun } from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const WeatherIcon = getWeatherIcon(data.condition);

  return (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-2xl">
      {/* Main weather info */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-white mb-2">{data.city}</h2>
        <div className="flex items-center justify-center mb-4">
          <WeatherIcon className="w-24 h-24 text-white mr-4" />
          <div>
            <span className="text-7xl font-thin text-white">{data.temperature}°</span>
            <p className="text-white/80 text-lg">Gefühlt wie {data.feelsLike}°</p>
          </div>
        </div>
      </div>

      {/* Weather details grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Droplets className="w-6 h-6 text-white/80 mx-auto mb-2" />
          <p className="text-white/60 text-sm">Luftfeuchtigkeit</p>
          <p className="text-white text-lg font-medium">{data.humidity}%</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Wind className="w-6 h-6 text-white/80 mx-auto mb-2" />
          <p className="text-white/60 text-sm">Wind</p>
          <p className="text-white text-lg font-medium">{data.windSpeed} km/h</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Gauge className="w-6 h-6 text-white/80 mx-auto mb-2" />
          <p className="text-white/60 text-sm">Luftdruck</p>
          <p className="text-white text-lg font-medium">{data.pressure} hPa</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Eye className="w-6 h-6 text-white/80 mx-auto mb-2" />
          <p className="text-white/60 text-sm">Sichtweite</p>
          <p className="text-white text-lg font-medium">{data.visibility} km</p>
        </div>
      </div>

      {/* 5-day forecast */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
        <h3 className="text-white text-xl font-light mb-4">5-Tage-Vorhersage</h3>
        <div className="grid grid-cols-5 gap-4">
          {data.forecast.map((day, index) => {
            const DayIcon = getWeatherIcon(day.condition);
            return (
              <div key={index} className="text-center">
                <p className="text-white/80 text-sm mb-2">{day.day}</p>
                <DayIcon className="w-8 h-8 text-white/80 mx-auto mb-2" />
                <div className="space-y-1">
                  <p className="text-white text-sm font-medium">{day.high}°</p>
                  <p className="text-white/60 text-sm">{day.low}°</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
