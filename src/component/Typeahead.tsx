import React, { useState } from 'react';
import Homepage from './HomePage';
import data from '../fakeApi.json';

// Interface for the item in the list
interface ItemType {
  id: number;
  name: string;
  category: string;
  image: string;
  amount: number;
}

const Typeahead: React.FC = () => {
  const [input, setInput] = useState('');
  const items: ItemType[] = data.items;
  const [filteredData, setFilteredData] = useState<ItemType[]>(items);
  const [suggestions, setSuggestions] = useState<ItemType[]>([]);
  const [isFocused, setIsFocused] = useState(false); // State to track input focus

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Filter data based on input value
    const filteredItems = items.filter(item =>
      (item.name.toLowerCase().includes(value.toLowerCase()) || item.category.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filteredItems);

    // Update suggestions based on filtered items
    if (value.length > 0) {
      const matches = filteredItems;
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  // Function to handle suggestion click
  const handleSuggestionClick = (item: ItemType) => {
    setInput(item.name);
    setFilteredData([item]);
    setSuggestions([]);
  };

  // Function to handle input blur
  const handleInputBlur = () => {
    setIsFocused(false);
    // Hide suggestions when input loses focus
    setSuggestions([]);
  };

  // Function to handle input focus
  const handleInputFocus = () => {
    setIsFocused(true);
    // Re-filter suggestions based on current input value
    const filteredItems = items.filter(item =>
      (item.name.toLowerCase().includes(input.toLowerCase()) || item.category.toLowerCase().includes(input.toLowerCase()))
    );
    setSuggestions(filteredItems);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        className='sbox'
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        placeholder="Search with category or item (For eg: Fruits, Electronics, Apple)"
      />
      {isFocused && suggestions.length > 0 && (
        <div className="card suggestions">
          {suggestions.map(item => (
            <div className="slist" key={item.id} onClick={() => handleSuggestionClick(item)}>
              {item.name}
            </div>
          ))}
        </div>
      )}
      <Homepage data={filteredData} />
    </div>
  );
};

export default Typeahead;