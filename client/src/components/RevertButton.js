import React, { useState } from 'react';

const RevertButton = ({ onRevert, disabled }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRevert = () => {
    if (showConfirm) {
      // Get yesterday's date for revert
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      onRevert(yesterday.toISOString());
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (disabled) {
    return (
      <button
        disabled
        className="bg-gray-500 text-gray-300 px-4 py-2 rounded-lg cursor-not-allowed text-sm"
      >
        Revert to Previous
      </button>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      {showConfirm ? (
        <div className="flex space-x-2">
          <button
            onClick={handleRevert}
            className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg transition duration-200 text-sm"
          >
            Confirm Revert
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition duration-200 text-sm"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleRevert}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition duration-200 text-sm"
        >
          Revert to Previous
        </button>
      )}
      {showConfirm && (
        <p className="text-xs text-orange-300">
          This will revert to yesterday's version
        </p>
      )}
    </div>
  );
};

export default RevertButton;

