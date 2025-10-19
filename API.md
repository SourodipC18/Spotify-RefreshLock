# Spotify Refresh Lock - API Documentation

## Authentication

The API uses Spotify's OAuth 2.0 flow for authentication. Users must authorize the application to access their Spotify data.

### Authorization Flow

1. **Get Authorization URL**
   ```
   GET /api/auth/login
   ```
   Returns:
   ```json
   {
     "authUrl": "https://accounts.spotify.com/authorize?...",
     "state": "random_string"
   }
   ```

2. **Handle Callback**
   ```
   POST /api/auth/callback
   Body: { "code": "authorization_code" }
   ```
   Returns:
   ```json
   {
     "access_token": "spotify_access_token",
     "refresh_token": "spotify_refresh_token",
     "expires_in": 3600
   }
   ```

## Playlist Management

### Get User's Auto-Generated Playlists

```
GET /api/auth/playlists
Headers: { "Authorization": "Bearer spotify_access_token" }
```

Returns an array of auto-generated playlists (Daily Mix, Discover Weekly, etc.)

### Get Specific Playlist

```
GET /api/playlist/:playlistId?userId=user_id
```

Returns playlist data with current version and metadata.

### Freeze/Unfreeze Playlist

```
POST /api/playlist/freeze
Body: {
  "playlistId": "playlist_id",
  "userId": "user_id",
  "freeze": true/false
}
```

### Get Version History

```
GET /api/playlist/versions/:playlistId?userId=user_id
```

Returns:
```json
{
  "current_version": { ... },
  "version_history": [
    {
      "date": "2025-01-12T00:00:00Z",
      "tracks": [ ... ],
      "snapshot_id": "spotify_snapshot_id"
    }
  ]
}
```

### Revert to Previous Version

```
POST /api/playlist/revert
Body: {
  "playlistId": "playlist_id",
  "userId": "user_id",
  "targetDate": "2025-01-11T00:00:00Z"
}
```

### Update Playlist (Create New Version)

```
POST /api/playlist/update/:playlistId
Body: { "userId": "user_id" }
```

## Data Models

### Playlist Schema

```json
{
  "playlist_id": "string",
  "user_id": "string",
  "name": "string",
  "description": "string",
  "frozen": boolean,
  "current_version": {
    "date": "ISO_date_string",
    "tracks": [Track],
    "snapshot_id": "string"
  },
  "version_history": [PlaylistVersion],
  "created_at": "ISO_date_string",
  "updated_at": "ISO_date_string"
}
```

### Track Schema

```json
{
  "id": "string",
  "name": "string",
  "artist": "string",
  "album": "string",
  "duration_ms": number,
  "preview_url": "string",
  "external_urls": {
    "spotify": "string"
  }
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found (playlist doesn't exist)
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Error message description"
}
```

## Rate Limiting

API endpoints are rate-limited to 100 requests per 15 minutes per IP address.

## Auto-Generated Playlist Detection

The system automatically detects these playlist types:
- Daily Mix (1-6)
- Discover Weekly
- Release Radar
- Made For You
- Your Time Capsule
- On Repeat
- Repeat Rewind

## Version Management

- Versions are automatically created daily for unfrozen playlists
- Up to 7 versions are kept per playlist
- Frozen playlists don't create new versions
- Each version includes a snapshot ID from Spotify for consistency

