import React from 'react';

const Search = ({ handleChange, placeholder }) => {
  return (
    <div>
      <input type='search' onChange={handleChange} placeholder={placeholder} />
    </div>
  );
};

export default Search;
