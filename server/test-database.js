const mongoose = require('mongoose');
const Playlist = require('./models/Playlist');

// Test database connection and basic operations
async function testDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/spotify-refresh-lock');
    console.log('✅ Connected to MongoDB');

    // Test playlist creation
    const testPlaylist = new Playlist({
      playlist_id: 'test_playlist_123',
      user_id: 'test_user_456',
      name: 'Test Daily Mix',
      description: 'Test playlist for Refresh Lock',
      frozen: false,
      current_version: {
        date: new Date(),
        tracks: [
          {
            id: 'track1',
            name: 'Test Track 1',
            artist: 'Test Artist',
            album: 'Test Album',
            duration_ms: 180000
          }
        ],
        snapshot_id: 'test_snapshot_123'
      },
      version_history: []
    });

    await testPlaylist.save();
    console.log('✅ Test playlist created');

    // Test freeze toggle
    await testPlaylist.toggleFreeze();
    console.log('✅ Freeze toggle works');

    // Test version addition
    await testPlaylist.addVersion([
      {
        id: 'track2',
        name: 'Test Track 2',
        artist: 'Test Artist 2',
        album: 'Test Album 2',
        duration_ms: 200000
      }
    ], 'test_snapshot_456');
    console.log('✅ Version addition works');

    // Clean up test data
    await Playlist.deleteOne({ playlist_id: 'test_playlist_123' });
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All database tests passed!');
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  testDatabase();
}

module.exports = testDatabase;

