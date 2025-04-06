// OAuth Configuration and Utilities

// Spotify OAuth Configuration
const SPOTIFY_CONFIG = {
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  redirectUri: `${window.location.origin}/auth/callback/spotify`,
  scope: [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-library-read'
  ].join(' '),
  authEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token'
}

// YouTube OAuth Configuration
const YOUTUBE_CONFIG = {
  clientId: import.meta.env.VITE_YOUTUBE_CLIENT_ID,
  redirectUri: `${window.location.origin}/auth/callback/youtube`,
  scope: [
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtube.force-ssl'
  ].join(' '),
  authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token'
}

// Generate OAuth URL for platform authentication
export const generateOAuthUrl = (platform) => {
  const config = platform === 'spotify' ? SPOTIFY_CONFIG : YOUTUBE_CONFIG
  const state = generateRandomString(16)
  
  const params = new URLSearchParams({
    client_id: config.clientId,
    response_type: 'code',
    redirect_uri: config.redirectUri,
    scope: config.scope,
    state: state
  })

  // Store state in localStorage for verification
  localStorage.setItem(`${platform}_auth_state`, state)
  
  return `${config.authEndpoint}?${params.toString()}`
}

// Handle OAuth callback and token exchange
export const handleOAuthCallback = async (platform, code) => {
  const config = platform === 'spotify' ? SPOTIFY_CONFIG : YOUTUBE_CONFIG
  
  try {
    const response = await fetch(config.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: config.redirectUri,
        client_id: config.clientId,
        client_secret: platform === 'spotify' 
          ? import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
          : import.meta.env.VITE_YOUTUBE_CLIENT_SECRET
      })
    })

    if (!response.ok) {
      throw new Error('Token exchange failed')
    }

    const data = await response.json()
    
    // Store tokens securely
    localStorage.setItem(`${platform}_access_token`, data.access_token)
    if (data.refresh_token) {
      localStorage.setItem(`${platform}_refresh_token`, data.refresh_token)
    }
    
    return data
  } catch (error) {
    console.error('OAuth callback error:', error)
    throw error
  }
}

// Utility function to generate random string for state parameter
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const values = crypto.getRandomValues(new Uint8Array(length))
  return values.reduce((acc, x) => acc + possible[x % possible.length], '')
}

// Get user profile from platform
export const getUserProfile = async (platform) => {
  const accessToken = localStorage.getItem(`${platform}_access_token`)
  if (!accessToken) throw new Error('No access token found')

  const endpoints = {
    spotify: 'https://api.spotify.com/v1/me',
    youtube: 'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true'
  }

  try {
    const response = await fetch(endpoints[platform], {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user profile')
    }

    return await response.json()
  } catch (error) {
    console.error('Get user profile error:', error)
    throw error
  }
}

// Get user playlists from platform
export const getUserPlaylists = async (platform) => {
  const accessToken = localStorage.getItem(`${platform}_access_token`)
  if (!accessToken) throw new Error('No access token found')

  const endpoints = {
    spotify: 'https://api.spotify.com/v1/me/playlists',
    youtube: 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true'
  }

  try {
    const response = await fetch(endpoints[platform], {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch playlists')
    }

    return await response.json()
  } catch (error) {
    console.error('Get playlists error:', error)
    throw error
  }
}