import { useState } from 'react'
import { motion } from 'framer-motion'
import LoadingSpinner from './LoadingSpinner'

const PlatformConnector = ({ platform, onConnect, isConnected = false }) => {
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState(null)

  const handleConnect = async () => {
    if (isConnected) return
    
    setConnecting(true)
    setError(null)
    
    // Simulate API connection
    // In a real app, this would be replaced with actual OAuth flow
    setTimeout(() => {
      setConnecting(false)
      // Simulate successful connection
      onConnect(platform)
    }, 2000)
  }

  const getPlatformDetails = () => {
    switch (platform.toLowerCase()) {
      case 'spotify':
        return {
          name: 'Spotify',
          icon: '🎵',
          color: '#1DB954',
          connectText: 'Connect to Spotify',
          connectedText: 'Connected to Spotify',
        }
      case 'youtube':
        return {
          name: 'YouTube',
          icon: '📺',
          color: '#FF0000',
          connectText: 'Connect to YouTube',
          connectedText: 'Connected to YouTube',
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
      className={`relative overflow-hidden rounded-xl border ${isConnected ? 'border-green-500 bg-green-50' : 'border-gray-300'} p-4`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
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