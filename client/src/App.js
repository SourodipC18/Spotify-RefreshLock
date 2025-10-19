import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PlaylistList from './components/PlaylistList';
import PlaylistDetail from './components/PlaylistDetail';
import { AuthProvider } from './context/AuthContext';
import { PlaylistProvider } from './context/PlaylistContext';

function App() {
  return (
    <AuthProvider>
      <PlaylistProvider>
        <Router>
          <div className="min-h-screen bg-spotify-dark">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/playlists" element={<PlaylistList />} />
              <Route path="/playlist/:id" element={<PlaylistDetail />} />
            </Routes>
          </div>
        </Router>
      </PlaylistProvider>
    </AuthProvider>
  );
}

export default App;
