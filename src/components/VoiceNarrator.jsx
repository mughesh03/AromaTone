import { useEffect, useState, useRef } from 'react'
import { textToSpeech } from '../utils/novitaAI'

const VoiceNarrator = ({ text, onComplete, options = {}, mood = 'Relaxed' }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const [error, setError] = useState(null)
  const [isNarrating, setIsNarrating] = useState(false)
  const audioRef = useRef(null)
  const backgroundMusicRef = useRef(null)

  // Mock function for Novita's text-to-speech API integration
  const generateSpeech = async (text, mood) => {
    try {
      // TODO: Integrate with Novita's text-to-speech API
      // This would be replaced with actual API call
      console.log('Generating speech for:', text, 'with mood:', mood)
      
      // Mock response - in production, this would be the audio URL from the API
      return 'https://example.com/generated-speech.mp3'
    } catch (error) {
      console.error('Failed to generate speech:', error)
      return null
    }
  }

  // Get background music based on mood
  const getBackgroundMusic = (mood) => {
    const musicMap = {
      'Relaxed': 'https://example.com/relaxing-jazz.mp3',
      'Energetic': 'https://example.com/upbeat-funk.mp3',
      'Focused': 'https://example.com/ambient-flow.mp3',
      'Creative': 'https://example.com/inspiring-melody.mp3',
      'Celebratory': 'https://example.com/party-vibes.mp3',
      'Romantic': 'https://example.com/smooth-jazz.mp3',
      'Family-friendly': 'https://example.com/happy-tunes.mp3',
      'Adventurous': 'https://example.com/world-beats.mp3'
    }
    return musicMap[mood] || musicMap['Relaxed']
  }

  // Initialize audio when text changes
  useEffect(() => {
    const initializeAudio = async () => {
      if (text) {
        const speechUrl = await generateSpeech(text, mood)
        if (speechUrl) {
          setAudioUrl(speechUrl)
        }
      }
    }

    initializeAudio()
  }, [text, mood])

  // Handle playback state changes
  useEffect(() => {
    if (!audioRef.current || !backgroundMusicRef.current) return

    if (isPlaying) {
      // Start narration
      setIsNarrating(true)
      
      // Play background music at lower volume
      backgroundMusicRef.current.volume = 0.3
      backgroundMusicRef.current.play()
      
      // Play narration
      audioRef.current.play()
    } else {
      // Pause both audio streams
      audioRef.current.pause()
      backgroundMusicRef.current.pause()
      setIsNarrating(false)
    }
  }, [isPlaying])

  // Handle narration completion
  const handleNarrationEnd = () => {
    setIsNarrating(false)
    if (onPlaybackComplete) {
      onPlaybackComplete()
    }
  }

  return (
    <div className="hidden"> {/* Hidden audio elements */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleNarrationEnd}
        />
      )}
      <audio
        ref={backgroundMusicRef}
        src={getBackgroundMusic(mood)}
        loop
      />
    </div>
  )
}

export default VoiceNarrator