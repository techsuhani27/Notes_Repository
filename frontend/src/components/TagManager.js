import React from 'react';

function TagManager({ tags, onTagClick }) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="tag-manager mt-4 mb-4">
      <h5 className="mb-2">Filter by Tags:</h5>
      {tags.map((tag, index) => (
        <button
          key={index}
          className="btn btn-outline-secondary btn-sm me-2 mb-2"
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </button>
      ))}
      <button
        className="btn btn-outline-secondary btn-sm mb-2"
        onClick={() => onTagClick(null)} // Clear filter
      >
        Show All
      </button>
    </div>
  );
}

export default TagManager;