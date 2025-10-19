import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePlaylist } from '../context/PlaylistContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaylistList = () => {
  const { user, accessToken, logout } = useAuth();
  const { playlists, loading, fetchPlaylists } = usePlaylist();
  const navigate = useNavigate();
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);

  const fetchSpotifyPlaylists = useCallback(async () => {
    try {
      const response = await axios.get('/api/auth/playlists', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setSpotifyPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching Spotify playlists:', error);
    }
  }, [accessToken]);

  useEffect(() => {
    if (user && accessToken) {
      fetchSpotifyPlaylists();
      fetchPlaylists(user.id);
    }
  }, [user, accessToken, fetchSpotifyPlaylists, fetchPlaylists]);

  const handlePlaylistClick = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-spotify-dark">
        <div className="text-white text-xl">Loading playlists...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Your Auto-Generated Playlists
            </h1>
            <p className="text-spotify-lightgray">
              Freeze and manage your Spotify playlists
            </p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spotifyPlaylists.map((playlist) => {
            const savedPlaylist = playlists.find(p => p.playlist_id === playlist.id);
            const isFrozen = savedPlaylist?.frozen || false;
            
            return (
              <div
                key={playlist.id}
                className="bg-spotify-gray rounded-lg p-6 hover:bg-gray-700 transition duration-200 cursor-pointer"
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white truncate">
                    {playlist.name}
                  </h3>
                  {isFrozen && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Frozen
                    </span>
                  )}
                </div>
                
                <p className="text-spotify-lightgray text-sm mb-4 line-clamp-2">
                  {playlist.description || 'Auto-generated playlist'}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-spotify-lightgray text-sm">
                    {playlist.tracks.total} tracks
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-spotify-green text-sm">
                      {isFrozen ? '❄️' : '🔄'}
                    </span>
                    <span className="text-spotify-lightgray text-sm">
                      {isFrozen ? 'Frozen' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {spotifyPlaylists.length === 0 && (
          <div className="text-center py-12">
            <div className="text-spotify-lightgray text-lg">
              No auto-generated playlists found
            </div>
            <p className="text-spotify-lightgray text-sm mt-2">
              Make sure you have Daily Mix, Discover Weekly, or Release Radar playlists
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistList;
