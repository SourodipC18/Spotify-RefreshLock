# Spotify Refresh Lock - Setup Instructions

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)
3. **Spotify Developer Account**

## Spotify App Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Note down your `Client ID` and `Client Secret`
4. Add `http://localhost:3000/callback` to your redirect URIs

## Installation

1. **Clone and install dependencies:**
```bash
git clone <your-repo-url>
cd spotify-refresh-lock
npm run install-all
```

2. **Set up environment variables:**

**Backend (`server/.env`):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/spotify-refresh-lock
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
JWT_SECRET=your_jwt_secret_key
```

**Frontend (`client/.env`):**
```env
REACT_APP_API_URL=http://localhost:5000
```

3. **Start MongoDB:**
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

4. **Start the application:**
```bash
npm run dev
```

This will start both the backend (port 5000) and frontend (port 3000).

## Usage

1. Open `http://localhost:3000`
2. Click "Connect with Spotify"
3. Authorize the application
4. View your auto-generated playlists
5. Click on any playlist to manage it:
   - **Freeze**: Prevent the playlist from updating
   - **Revert**: Go back to a previous version
   - **Version History**: View all saved versions

## Features

- ✅ **Freeze Playlists**: Stop auto-generated playlists from updating
- ✅ **Revert Functionality**: Go back to previous versions
- ✅ **Version History**: View up to 7 days of playlist history
- ✅ **Auto-Generated Detection**: Automatically detects Daily Mix, Discover Weekly, etc.
- ✅ **Modern UI**: Clean, Spotify-inspired interface
- ✅ **Real-time Updates**: See changes immediately

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/auth/login` - Get Spotify auth URL
- `POST /api/auth/callback` - Handle Spotify callback
- `GET /api/auth/playlists` - Get user's auto-generated playlists
- `GET /api/playlist/:id` - Get specific playlist
- `POST /api/playlist/freeze` - Freeze/unfreeze playlist
- `GET /api/playlist/versions/:id` - Get version history
- `POST /api/playlist/revert` - Revert to previous version
- `POST /api/playlist/update/:id` - Update playlist (create new version)

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your `MONGODB_URI` in `.env`

2. **Spotify Authentication Issues**
   - Verify your Client ID and Secret
   - Check redirect URI matches exactly

3. **CORS Errors**
   - Make sure backend is running on port 5000
   - Check proxy setting in `client/package.json`

### Development Tips

- Use browser dev tools to inspect API calls
- Check server logs for detailed error messages
- Test with different Spotify accounts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

