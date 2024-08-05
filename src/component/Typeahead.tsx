import React, { useState } from 'react';
import Homepage from './HomePage'
import data from '../fakeApi.json';
;
// Interface for the item in the list
interface ItemType {
  id: number;
  name: string;
  category: string;
  image: string;
}

const Typeahead: React.FC = () => {
  const [input, setInput] = useState('');
  const items: ItemType[] = data.items;
  const [filteredData, setFilteredData] = useState<ItemType[]>(items);
  
  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Filter data based on input value
    const filteredItems = items.filter(item =>
      (item.name.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filteredItems);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search with category or item"
      />
      <Homepage data={filteredData} />
    </div>
  );
};

export default Typeahead;