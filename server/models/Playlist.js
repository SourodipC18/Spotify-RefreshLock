const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  duration_ms: { type: Number, required: true },
  preview_url: String,
  external_urls: {
    spotify: String
  }
});

const playlistVersionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  tracks: [trackSchema],
  snapshot_id: String
});

const playlistSchema = new mongoose.Schema({
  playlist_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  frozen: { type: Boolean, default: false },
  current_version: playlistVersionSchema,
  version_history: [playlistVersionSchema],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Index for efficient queries
playlistSchema.index({ playlist_id: 1, user_id: 1 });

// Method to add a new version
playlistSchema.methods.addVersion = function(tracks, snapshotId) {
  if (this.version_history.length >= 7) {
    // Remove oldest version if we have more than 7
    this.version_history.shift();
  }
  
  const newVersion = {
    date: new Date(),
    tracks: tracks,
    snapshot_id: snapshotId
  };
  
  this.version_history.push(newVersion);
  this.current_version = newVersion;
  this.updated_at = new Date();
  
  return this.save();
};

// Method to freeze/unfreeze playlist
playlistSchema.methods.toggleFreeze = function() {
  this.frozen = !this.frozen;
  this.updated_at = new Date();
  return this.save();
};

// Method to revert to a specific version
playlistSchema.methods.revertToVersion = function(versionIndex) {
  if (versionIndex >= 0 && versionIndex < this.version_history.length) {
    this.current_version = this.version_history[versionIndex];
    this.updated_at = new Date();
    return this.save();
  }
  throw new Error('Invalid version index');
};

module.exports = mongoose.model('Playlist', playlistSchema);
