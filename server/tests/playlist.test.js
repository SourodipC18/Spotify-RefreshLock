const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Playlist = require('../models/Playlist');

// Create test app
const app = express();
app.use(express.json());
app.use('/api/playlist', require('../routes/playlist'));

describe('Playlist API', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
  });

  afterAll(async () => {
    // Clean up and disconnect
    await Playlist.deleteMany({});
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clean up before each test
    await Playlist.deleteMany({});
  });

  describe('POST /api/playlist/freeze', () => {
    it('should freeze a playlist', async () => {
      // Create test playlist
      const playlist = new Playlist({
        playlist_id: 'test_playlist',
        user_id: 'test_user',
        name: 'Test Playlist',
        frozen: false,
        current_version: {
          date: new Date(),
          tracks: [],
          snapshot_id: 'test_snapshot'
        },
        version_history: []
      });
      await playlist.save();

      const response = await request(app)
        .post('/api/playlist/freeze')
        .send({
          playlistId: 'test_playlist',
          userId: 'test_user',
          freeze: true
        });

      expect(response.status).toBe(200);
      expect(response.body.frozen).toBe(true);
    });

    it('should return 404 for non-existent playlist', async () => {
      const response = await request(app)
        .post('/api/playlist/freeze')
        .send({
          playlistId: 'non_existent',
          userId: 'test_user',
          freeze: true
        });

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/playlist/versions/:playlistId', () => {
    it('should return version history', async () => {
      // Create test playlist with version history
      const playlist = new Playlist({
        playlist_id: 'test_playlist',
        user_id: 'test_user',
        name: 'Test Playlist',
        frozen: false,
        current_version: {
          date: new Date(),
          tracks: [],
          snapshot_id: 'current_snapshot'
        },
        version_history: [
          {
            date: new Date(Date.now() - 86400000), // Yesterday
            tracks: [],
            snapshot_id: 'yesterday_snapshot'
          }
        ]
      });
      await playlist.save();

      const response = await request(app)
        .get('/api/playlist/versions/test_playlist')
        .query({ userId: 'test_user' });

      expect(response.status).toBe(200);
      expect(response.body.version_history).toHaveLength(1);
      expect(response.body.current_version).toBeDefined();
    });
  });

  describe('POST /api/playlist/revert', () => {
    it('should revert to previous version', async () => {
      const yesterday = new Date(Date.now() - 86400000);
      
      const playlist = new Playlist({
        playlist_id: 'test_playlist',
        user_id: 'test_user',
        name: 'Test Playlist',
        frozen: false,
        current_version: {
          date: new Date(),
          tracks: [{ id: 'current_track', name: 'Current Track' }],
          snapshot_id: 'current_snapshot'
        },
        version_history: [
          {
            date: yesterday,
            tracks: [{ id: 'yesterday_track', name: 'Yesterday Track' }],
            snapshot_id: 'yesterday_snapshot'
          }
        ]
      });
      await playlist.save();

      const response = await request(app)
        .post('/api/playlist/revert')
        .send({
          playlistId: 'test_playlist',
          userId: 'test_user',
          targetDate: yesterday.toISOString()
        });

      expect(response.status).toBe(200);
      expect(response.body.current_version.tracks[0].name).toBe('Yesterday Track');
    });
  });
});

