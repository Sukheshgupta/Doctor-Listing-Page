'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Doctor } from '../types/doctor';

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (search: string) => void;
}

const SearchBar = ({ doctors, onSearch }: SearchBarProps) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearch(value);
    
    if (value.trim()) {
      const matches = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          data-testid="autocomplete-input"
          className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search doctors..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      {suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg z-10">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              data-testid="suggestion-item"
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSearch(doctor.name);
                onSearch(doctor.name);
                setSuggestions([]);
              }}
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
