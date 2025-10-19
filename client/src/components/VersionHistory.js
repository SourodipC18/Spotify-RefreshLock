import React from 'react';

const VersionHistory = ({ versionHistory, onRevert, currentVersion }) => {
  const { version_history } = versionHistory;

  const handleRevertToVersion = (version) => {
    onRevert(version.date);
  };

  const isCurrentVersion = (version) => {
    return currentVersion && 
           new Date(version.date).toDateString() === new Date(currentVersion.date).toDateString();
  };

  return (
    <div className="mt-6 border-t border-gray-600 pt-6">
      <h3 className="text-xl font-semibold text-white mb-4">Version History</h3>
      
      <div className="space-y-3">
        {version_history.map((version, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg ${
              isCurrentVersion(version) 
                ? 'bg-green-900 border border-green-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            } transition duration-200`}
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <span className="text-white font-medium">
                  Version {version_history.length - index}
                </span>
                {isCurrentVersion(version) && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    Current
                  </span>
                )}
              </div>
              <div className="text-spotify-lightgray text-sm mt-1">
                {new Date(version.date).toLocaleString()}
              </div>
              <div className="text-spotify-lightgray text-sm">
                {version.tracks.length} tracks
              </div>
            </div>
            
            {!isCurrentVersion(version) && (
              <button
                onClick={() => handleRevertToVersion(version)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm transition duration-200"
              >
                Revert
              </button>
            )}
          </div>
        ))}
      </div>
      
      {version_history.length === 0 && (
        <div className="text-center py-8 text-spotify-lightgray">
          No version history available
        </div>
      )}
      
      <div className="mt-4 text-xs text-spotify-lightgray">
        <p>• Versions are automatically saved daily</p>
        <p>• Up to 7 versions are kept</p>
        <p>• Frozen playlists don't create new versions</p>
      </div>
    </div>
  );
};

export default VersionHistory;

