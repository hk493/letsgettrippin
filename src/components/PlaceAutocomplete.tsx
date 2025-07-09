import React, { useState, useRef } from "react";

interface PlaceAutocompleteProps {
  placeholder?: string;
  onSelect: (place: { description: string; place_id: string }) => void;
  language?: string; // 例: 'ja', 'en', 'zh-CN' など
}

const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({
  placeholder = "場所を検索...",
  onSelect,
  language = "ja",
}) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<
    { description: string; place_id: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const fetchSuggestions = async (value: string) => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `/.netlify/functions/places?input=${encodeURIComponent(value)}&language=${language}`
      );
      const data = await res.json();
      if (data.status === "OK") {
        setSuggestions(data.predictions);
      } else {
        console.warn('Google Maps API error:', data.status, data.error_message);
        setSuggestions([]);
      }
    } catch (e) {
      console.error('Google Maps API error:', e);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setShowSuggestions(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSelect = (suggestion: { description: string; place_id: string }) => {
    setInput(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]);
    onSelect(suggestion);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        placeholder={placeholder}
        value={input}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        aria-label={placeholder}
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow max-h-60 overflow-y-auto">
          {suggestions.map((s) => (
            <li
              key={s.place_id}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSelect(s)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSelect(s);
              }}
            >
              {s.description}
            </li>
          ))}
        </ul>
      )}
      {isLoading && (
        <div className="absolute right-3 top-2 text-gray-400 animate-spin">⏳</div>
      )}
    </div>
  );
};

export default PlaceAutocomplete; 