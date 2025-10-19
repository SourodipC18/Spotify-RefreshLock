import React from 'react';

const TrackList = ({ tracks }) => {
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!tracks || tracks.length === 0) {
    return (
      <div className="text-center py-8 text-spotify-lightgray">
        No tracks available
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tracks.map((track, index) => (
        <div
          key={track.id || index}
          className="flex items-center space-x-4 p-3 hover:bg-gray-700 rounded-lg transition duration-200"
        >
          <div className="flex-shrink-0 w-8 text-center text-spotify-lightgray text-sm">
            {index + 1}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-white font-medium truncate">
              {track.name}
            </div>
            <div className="text-spotify-lightgray text-sm truncate">
              {track.artist}
            </div>
          </div>
          
          <div className="flex-shrink-0 text-spotify-lightgray text-sm">
            {track.album}
          </div>
          
          <div className="flex-shrink-0 text-spotify-lightgray text-sm">
            {formatDuration(track.duration_ms)}
          </div>
          
          {track.external_urls?.spotify && (
            <div className="flex-shrink-0">
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-spotify-green hover:text-green-400 transition duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TrackList;

