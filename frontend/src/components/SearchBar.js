import React from 'react';

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="mb-4">
      <input 
        type="text" 
        className="form-control" 
        placeholder="Search notes by title, subject, or keywords..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;