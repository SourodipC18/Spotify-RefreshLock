import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const PlaylistContext = createContext();

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPlaylists = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/playlist/user/${userId}`);
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaylist = async (playlistId, userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/playlist/${playlistId}?userId=${userId}`);
      setCurrentPlaylist(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching playlist:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const freezePlaylist = async (playlistId, userId, freeze) => {
    try {
      const response = await axios.post('/api/playlist/freeze', {
        playlistId,
        userId,
        freeze
      });
      
      // Update local state
      if (currentPlaylist && currentPlaylist.playlist_id === playlistId) {
        setCurrentPlaylist(prev => ({ ...prev, frozen: freeze }));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error freezing playlist:', error);
      throw error;
    }
  };

  const revertPlaylist = async (playlistId, userId, targetDate) => {
    try {
      const response = await axios.post('/api/playlist/revert', {
        playlistId,
        userId,
        targetDate
      });
      
      // Update local state
      if (currentPlaylist && currentPlaylist.playlist_id === playlistId) {
        setCurrentPlaylist(prev => ({ 
          ...prev, 
          current_version: response.data.current_version 
        }));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error reverting playlist:', error);
      throw error;
    }
  };

  const getVersionHistory = async (playlistId, userId) => {
    try {
      const response = await axios.get(`/api/playlist/versions/${playlistId}?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching version history:', error);
      throw error;
    }
  };

  const updatePlaylist = async (playlistId, userId) => {
    try {
      const response = await axios.post(`/api/playlist/update/${playlistId}`, {
        userId
      });
      
      // Update local state
      if (currentPlaylist && currentPlaylist.playlist_id === playlistId) {
        setCurrentPlaylist(prev => ({ 
          ...prev, 
          current_version: response.data.current_version 
        }));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error updating playlist:', error);
      throw error;
    }
  };

  const value = {
    playlists,
    currentPlaylist,
    loading,
    fetchPlaylists,
    fetchPlaylist,
    freezePlaylist,
    revertPlaylist,
    getVersionHistory,
    updatePlaylist
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};
