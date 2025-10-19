import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePlaylist } from '../context/PlaylistContext';
import FreezeToggle from './FreezeToggle';
import RevertButton from './RevertButton';
import VersionHistory from './VersionHistory';
import TrackList from './TrackList';

const PlaylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    currentPlaylist, 
    loading, 
    fetchPlaylist, 
    freezePlaylist, 
    revertPlaylist,
    getVersionHistory 
  } = usePlaylist();
  
  const [versionHistory, setVersionHistory] = useState(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  useEffect(() => {
    if (user && id) {
      fetchPlaylist(id, user.id);
    }
  }, [user, id, fetchPlaylist]);

  useEffect(() => {
    if (currentPlaylist && user) {
      loadVersionHistory();
    }
  }, [currentPlaylist, user, loadVersionHistory]);

  const loadVersionHistory = useCallback(async () => {
    try {
      const history = await getVersionHistory(id, user.id);
      setVersionHistory(history);
    } catch (error) {
      console.error('Error loading version history:', error);
    }
  }, [id, user.id, getVersionHistory]);

  const handleFreezeToggle = async (freeze) => {
    try {
      await freezePlaylist(id, user.id, freeze);
      await loadVersionHistory(); // Refresh version history
    } catch (error) {
      console.error('Error toggling freeze:', error);
    }
  };

  const handleRevert = async (targetDate) => {
    try {
      await revertPlaylist(id, user.id, targetDate);
      await loadVersionHistory(); // Refresh version history
    } catch (error) {
      console.error('Error reverting playlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-spotify-dark">
        <div className="text-white text-xl">Loading playlist...</div>
      </div>
    );
  }

  if (!currentPlaylist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-spotify-dark">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Playlist not found</div>
          <button
            onClick={() => navigate('/playlists')}
            className="bg-spotify-green hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Back to Playlists
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/playlists')}
            className="text-spotify-lightgray hover:text-white transition duration-200"
          >
            ← Back to Playlists
          </button>
        </div>

        {/* Playlist Info */}
        <div className="bg-spotify-gray rounded-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">
                {currentPlaylist.name}
              </h1>
              <p className="text-spotify-lightgray mb-4">
                {currentPlaylist.description || 'Auto-generated playlist'}
              </p>
              <div className="flex items-center space-x-4 text-sm text-spotify-lightgray">
                <span>{currentPlaylist.current_version?.tracks?.length || 0} tracks</span>
                <span>•</span>
                <span>
                  Last updated: {new Date(currentPlaylist.current_version?.date).toLocaleDateString()}
                </span>
                <span>•</span>
                <span className={currentPlaylist.frozen ? 'text-blue-400' : 'text-green-400'}>
                  {currentPlaylist.frozen ? 'Frozen' : 'Active'}
                </span>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex flex-col space-y-4">
              <FreezeToggle
                frozen={currentPlaylist.frozen}
                onToggle={handleFreezeToggle}
              />
              
              <RevertButton
                onRevert={handleRevert}
                disabled={currentPlaylist.frozen || !versionHistory?.version_history?.length}
              />
              
              <button
                onClick={() => setShowVersionHistory(!showVersionHistory)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200 text-sm"
              >
                {showVersionHistory ? 'Hide' : 'Show'} Version History
              </button>
            </div>
          </div>

          {/* Version History */}
          {showVersionHistory && versionHistory && (
            <VersionHistory
              versionHistory={versionHistory}
              onRevert={handleRevert}
              currentVersion={currentPlaylist.current_version}
            />
          )}
        </div>

        {/* Track List */}
        <div className="bg-spotify-gray rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Tracks</h2>
          <TrackList tracks={currentPlaylist.current_version?.tracks || []} />
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;

