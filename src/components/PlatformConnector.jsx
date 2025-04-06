import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LoadingSpinner from './LoadingSpinner'
import { generateOAuthUrl, handleOAuthCallback, getUserProfile, getUserPlaylists } from '../utils/oauth'

const PlatformConnector = ({ platform, onConnect, isConnected = false }) => {
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [playlists, setPlaylists] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)

  useEffect(() => {
    // Check if we're handling an OAuth callback
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const state = urlParams.get('state')
    const storedState = localStorage.getItem(`${platform}_auth_state`)

    if (code && state === storedState) {
      handleOAuthCallback(platform, code)
        .then(() => loadUserData())
        .catch(err => setError('Authentication failed. Please try again.'))
    }
  }, [])

  const loadUserData = async () => {
    try {
      const profile = await getUserProfile(platform)
      setUserProfile(profile)
      const userPlaylists = await getUserPlaylists(platform)
      setPlaylists(userPlaylists.items || [])
      onConnect(platform)
    } catch (err) {
      setError('Failed to load user data')
      console.error(err)
    }
  }

  const handleConnect = async () => {
    if (isConnected) return
    
    setConnecting(true)
    setError(null)
    
    try {
      const authUrl = generateOAuthUrl(platform)
      window.location.href = authUrl
    } catch (err) {
      setConnecting(false)
      setError('Failed to initialize authentication. Please try again.')
      console.error(err)
    }
  }

  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist)
    onConnect(platform, { 
      profile: userProfile,
      playlist: playlist
    })
  }

  const getPlatformDetails = () => {
    switch (platform.toLowerCase()) {
      case 'spotify':
        return {
          name: 'Spotify',
          icon: '🎵',
          color: '#1DB954',
          connectText: 'Connect your Spotify account',
          connectedText: userProfile ? `Connected as ${userProfile.display_name || userProfile.id}` : 'Connected to Spotify',
        }
      case 'youtube':
        return {
          name: 'YouTube',
          icon: '📺',
          color: '#FF0000',
          connectText: 'Connect your YouTube account',
          connectedText: userProfile ? `Connected as ${userProfile.snippet?.title || 'YouTube User'}` : 'Connected to YouTube',
        }
      default:
        return {
          name: platform,
          icon: '🔗',
          color: '#0071e3',
          connectText: `Connect to ${platform}`,
          connectedText: `Connected to ${platform}`,
        }
    }
  }

  const platformDetails = getPlatformDetails()

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className={`p-4 ${isConnected ? 'bg-green-50' : 'bg-white'}`}>
        <div className="flex items-center">
        <div 
          className="flex items-center justify-center w-12 h-12 rounded-full mr-4"
          style={{ backgroundColor: `${platformDetails.color}20` }}
        >
          <span className="text-2xl">{platformDetails.icon}</span>
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium">{platformDetails.name}</h3>
          <p className="text-sm text-gray-500">
            {isConnected ? platformDetails.connectedText : platformDetails.connectText}
          </p>
        </div>

        {connecting ? (
          <LoadingSpinner size={24} />
        ) : isConnected ? (
          <div className="bg-green-500 text-white rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <button
            onClick={handleConnect}
            className="px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Connect
          </button>
        )}
      </div>

        {error && (
        <div className="mt-2 text-sm text-red-500">
          {error}
        </div>
      )}

        {isConnected && playlists.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Select a Playlist</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {playlists.map(playlist => (
                <button
                  key={playlist.id}
                  onClick={() => handlePlaylistSelect(playlist)}
                  className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${selectedPlaylist?.id === playlist.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                >
                  {playlist.name || playlist.snippet?.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Connection animation */}
      {connecting && (
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-apple-blue"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2 }}
        />
      )}
    </motion.div>
  )
}

export default PlatformConnector