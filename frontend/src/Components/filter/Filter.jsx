import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (onChange) {
      onChange(searchTerm);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className='FilterMaindiv'>
      <div className="leftfilter"></div>
      <div className="rightfilter">
        <div className="filterdropdown">
          <select>
            <option>All</option>
            <option>Availability</option>
          </select>
        </div>
        <div className="filterSearch">
          <input
            type="text"
            placeholder='Search by name or skill...'
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
