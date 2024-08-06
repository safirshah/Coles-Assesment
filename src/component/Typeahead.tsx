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
  const [suggestions, setSuggestions] = useState<{ category: string; items: ItemType[] }[]>([]);
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

    // Group filtered items by category for suggestions
    const groupedItems: { [key: string]: ItemType[] } = filteredItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as {[key: string]: ItemType[]});

    // Convert groupedItems object to array format for suggestions
    const groupedSuggestions = Object.keys(groupedItems).map(category => ({
      category,
      items: groupedItems[category]
    }));

    // Update suggestions based on filtered items
    if (value.length > 0) {
      setSuggestions(groupedSuggestions);
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
    
    // Group filtered items by category for suggestions
    const groupedItems: { [key: string]: ItemType[] } = filteredItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as {[key: string]: ItemType[]});

    // Convert groupedItems object to array format for suggestions
    const groupedSuggestions = Object.keys(groupedItems).map(category => ({
      category,
      items: groupedItems[category]
    }));

    setSuggestions(groupedSuggestions);
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
          {suggestions.map(categoryGroup => (
            <div key={categoryGroup.category} className='category'>
              <h5 className='title'>{categoryGroup.category}</h5>
              <div className="slist-container">
                {categoryGroup.items.map(item => (
                  <div className="slist" key={item.id} onClick={() => handleSuggestionClick(item)}>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <Homepage data={filteredData} />
    </div>
  );
};

export default Typeahead;
