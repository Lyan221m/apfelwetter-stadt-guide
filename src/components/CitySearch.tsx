
import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';

interface CitySearchProps {
  onCitySelect: (city: string) => void;
  loading: boolean;
}

const germanCities = [
  'Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt am Main',
  'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund', 'Essen',
  'Bremen', 'Dresden', 'Hannover', 'Nürnberg', 'Duisburg',
  'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster',
  'Mannheim', 'Augsburg', 'Wiesbaden', 'Gelsenkirchen', 'Mönchengladbach',
  'Braunschweig', 'Chemnitz', 'Kiel', 'Aachen', 'Halle',
  'Magdeburg', 'Freiburg', 'Krefeld', 'Lübeck', 'Oberhausen',
  'Erfurt', 'Mainz', 'Rostock', 'Kassel', 'Hagen'
];

export const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect, loading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = germanCities.filter(city =>
        city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleCitySelect = (city: string) => {
    setQuery(city);
    setShowSuggestions(false);
    onCitySelect(city);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onCitySelect(query.trim());
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Stadt suchen..."
            className="w-full pl-12 pr-4 py-4 text-lg bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
            disabled={loading}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          {loading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden z-50">
          {suggestions.map((city, index) => (
            <button
              key={index}
              onClick={() => handleCitySelect(city)}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-colors duration-200 flex items-center space-x-3 border-b border-white/10 last:border-b-0"
            >
              <MapPin className="w-4 h-4 text-white/60" />
              <span>{city}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
