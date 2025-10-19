import React from 'react';

const FreezeToggle = ({ frozen, onToggle }) => {
  const handleToggle = () => {
    onToggle(!frozen);
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          frozen ? 'bg-blue-600' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            frozen ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-white text-sm font-medium">
        {frozen ? 'Frozen' : 'Freeze Playlist'}
      </span>
    </div>
  );
};

export default FreezeToggle;

