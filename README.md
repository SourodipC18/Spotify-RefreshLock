# 🎵 Spotify Refresh Lock

**Freeze & Revert Auto-Generated Playlists**

A powerful feature that gives you complete control over Spotify's auto-generated playlists like Daily Mix, Discover Weekly, and Release Radar. Never lose your favorite playlist versions again!

## ✨ Features

- 🧊 **Freeze Playlists**: Stop auto-generated playlists from updating
- ⏪ **Revert to Previous**: Go back to any previous version
- 📚 **Version History**: View up to 7 days of playlist history
- 🎯 **Auto-Detection**: Automatically identifies auto-generated playlists
- 🎨 **Modern UI**: Clean, Spotify-inspired interface
- ⚡ **Real-time Updates**: See changes immediately

## 🛠️ Tech Stack

- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Authentication**: Spotify OAuth 2.0
- **API**: Spotify Web API
- **Testing**: Jest + Supertest

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- MongoDB (local or Atlas)
- Spotify Developer Account

### Installation

1. **Clone and install:**
```bash
git clone <your-repo-url>
cd spotify-refresh-lock
npm run install-all
```

2. **Set up Spotify App:**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Add `http://localhost:3000/callback` to redirect URIs

3. **Configure environment:**
```bash
# Backend
cp server/env.example server/.env
# Add your Spotify credentials to server/.env

# Frontend  
cp client/env.example client/.env
```

4. **Start the application:**
```bash
npm run dev
```

Visit `http://localhost:3000` and start managing your playlists!

## 📖 Usage

1. **Connect**: Authorize with Spotify
2. **Browse**: View your auto-generated playlists
3. **Manage**: Click any playlist to:
   - Toggle freeze on/off
   - Revert to previous versions
   - View version history
   - See track details

## 🔧 API Documentation

See [API.md](./API.md) for complete API documentation.

### Key Endpoints

- `POST /api/playlist/freeze` - Freeze/unfreeze playlist
- `GET /api/playlist/versions/:id` - Get version history  
- `POST /api/playlist/revert` - Revert to previous version
- `GET /api/auth/playlists` - Get user's auto-generated playlists

## 🧪 Testing

```bash
# Run backend tests
cd server && npm test

# Test database connection
cd server && npm run test:db

# Run frontend tests
cd client && npm test
```

## 📁 Project Structure

```
spotify-refresh-lock/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Context providers
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                 # Express backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── services/          # Spotify API service
│   ├── tests/             # Test files
│   └── index.js           # Server entry point
├── .github/workflows/     # CI/CD pipeline
├── package.json           # Root package.json
└── README.md              # This file
```

## 🔒 Supported Playlists

- Daily Mix (1-6)
- Discover Weekly
- Release Radar
- Made For You
- Your Time Capsule
- On Repeat
- Repeat Rewind

## 🚀 Deployment

The app is ready for deployment on platforms like:
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean
- **Database**: MongoDB Atlas

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spotify for the amazing Web API
- React and Node.js communities
- MongoDB for excellent database support

---

**Made with ❤️ for Spotify users who want control over their playlists**
