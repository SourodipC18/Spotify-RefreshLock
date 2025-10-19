import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const { user, login, handleCallback, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code && !user) {
      handleCallback(code).then(success => {
        if (success) {
          navigate('/playlists');
        }
      });
    } else if (user) {
      navigate('/playlists');
    }
  }, [user, handleCallback, navigate, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-spotify-dark">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-spotify-dark">
      <div className="max-w-md w-full bg-spotify-gray rounded-lg p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Spotify Refresh Lock
          </h1>
          <p className="text-spotify-lightgray mb-8">
            Freeze and revert your auto-generated playlists
          </p>
          
          <button
            onClick={login}
            className="w-full bg-spotify-green hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Connect with Spotify
          </button>
          
          <div className="mt-6 text-sm text-spotify-lightgray">
            <p>Features:</p>
            <ul className="mt-2 space-y-1">
              <li>• Freeze Daily Mix playlists</li>
              <li>• Revert to previous versions</li>
              <li>• View version history</li>
              <li>• Works with Discover Weekly & Release Radar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
