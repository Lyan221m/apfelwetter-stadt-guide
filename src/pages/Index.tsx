
import React, { useState } from 'react';
import { WeatherCard } from '@/components/WeatherCard';
import { CitySearch } from '@/components/CitySearch';
import { WeatherData } from '@/types/weather';
import { getWeatherBackground } from '@/utils/weatherBackground';
import { processWeatherData } from '@/services/weatherService';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCitySelect = async (city: string) => {
    setLoading(true);
    try {
      console.log('Lade Wetterdaten für:', city);
      const data = await processWeatherData(city);
      console.log('Erhaltene Wetterdaten:', data);
      setWeatherData(data);
      toast({
        title: "Wetterdaten geladen",
        description: `Aktuelle Daten für ${city} wurden erfolgreich abgerufen.`,
      });
    } catch (error) {
      console.error('Fehler beim Laden der Wetterdaten:', error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Wetterdaten konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const backgroundClass = weatherData 
    ? getWeatherBackground(weatherData.condition)
    : 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500';

  return (
    <div className={`min-h-screen ${backgroundClass} relative overflow-hidden transition-all duration-1000`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-300 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-thin text-white mb-4 tracking-tight">
            Wetter
          </h1>
          <p className="text-xl text-white/80 font-light">
            Präzise Wettervorhersagen weltweit
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <CitySearch onCitySelect={handleCitySelect} loading={loading} />
        </div>

        {weatherData && (
          <div className="max-w-4xl mx-auto">
            <WeatherCard data={weatherData} />
          </div>
        )}

        {!weatherData && !loading && (
          <div className="text-center text-white/60 mt-16">
            <p className="text-lg font-light">
              Wähle eine Stadt aus, um das aktuelle Wetter zu sehen
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
