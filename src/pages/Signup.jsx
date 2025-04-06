import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/24/solid'
import './Signup.css'

// Components
import LoadingSpinner from '../components/LoadingSpinner'
import SuccessAnimation from '../components/SuccessAnimation'
import StepIndicator from '../components/StepIndicator'
import PlatformConnector from '../components/PlatformConnector'
import SelectableCard from '../components/SelectableCard'
import ConfettiEffect from '../components/ConfettiEffect'

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 }
};

// Step 1: Personal Details
const PersonalDetailsStep = ({ formData, handleChange }) => {
  return (
    <motion.div variants={itemVariants} className="flex-1 flex flex-col">
      <h2 className="text-3xl font-bold mb-6">Welcome to AromaTone</h2>
      <p className="text-gray-600 mb-8">Let's start with some basic information about you.</p>
      
      <div className="space-y-6 flex-1">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue focus:border-transparent"
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue focus:border-transparent"
            placeholder="john@example.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>
      </div>
    </motion.div>
  )
}

// Step 2: Music Preferences
const MusicPreferencesStep = ({ formData, handleChange, handleCheckboxChange }) => {
  const [platformConnected, setPlatformConnected] = useState(false)
  
  const musicGenres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Jazz', 'Classical', 'Electronic', 'Country', 'Folk', 'Indie'
  ]
  
  const handlePlatformConnect = (platform) => {
    handleChange({ target: { name: 'musicPlatform', value: platform } })
    setPlatformConnected(true)
  }
  
  return (
    <motion.div variants={itemVariants} className="flex-1 flex flex-col">
      <h2 className="text-3xl font-bold mb-6">Music Preferences</h2>
      <p className="text-gray-600 mb-8">Tell us about your music taste to enhance your cooking experience.</p>
      
      <div className="space-y-6 flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Music Platform</label>
          <div className="grid grid-cols-1 gap-4">
            <PlatformConnector 
              platform="spotify" 
              onConnect={handlePlatformConnect} 
              isConnected={formData.musicPlatform === 'spotify'} 
            />
            
            <PlatformConnector 
              platform="youtube" 
              onConnect={handlePlatformConnect} 
              isConnected={formData.musicPlatform === 'youtube'} 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Favorite Music Genres</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {musicGenres.map(genre => (
              <SelectableCard
                key={genre}
                label={genre}
                selected={formData.musicGenres.includes(genre)}
                onClick={() => handleCheckboxChange('musicGenres', genre)}
                className="px-3 py-2 text-sm justify-center"
              />
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="playlist" className="block text-sm font-medium text-gray-700 mb-1">Favorite Playlist URL (Optional)</label>
          <input
            type="text"
            id="playlist"
            name="playlist"
            value={formData.playlist}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue focus:border-transparent"
            placeholder="https://open.spotify.com/playlist/..."
          />
        </div>
      </div>
    </motion.div>
  )
}

// Step 3: Recipe Preferences
const RecipePreferencesStep = ({ formData, handleChange, handleCheckboxChange }) => {
  const cuisineTypes = [
    'Italian', 'Mexican', 'Asian', 'Mediterranean', 'American', 'Indian', 'French', 'Middle Eastern', 'Vegetarian', 'Desserts'
  ]
  
  const dietaryRestrictions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Low-Carb', 'Keto', 'Paleo'
  ]
  
  return (
    <motion.div variants={itemVariants} className="flex-1 flex flex-col">
      <h2 className="text-3xl font-bold mb-6">Recipe Preferences</h2>
      <p className="text-gray-600 mb-8">Tell us what kind of recipes you enjoy cooking.</p>
      
      <div className="space-y-6 flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Favorite Cuisine Types</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {cuisineTypes.map(type => (
              <SelectableCard
                key={type}
                label={type}
                selected={formData.recipeTypes.includes(type)}
                onClick={() => handleCheckboxChange('recipeTypes', type)}
                className="px-3 py-2 text-sm justify-center"
              />
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Dietary Restrictions</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {dietaryRestrictions.map(restriction => (
              <SelectableCard
                key={restriction}
                label={restriction}
                selected={formData.dietaryRestrictions.includes(restriction)}
                onClick={() => handleCheckboxChange('dietaryRestrictions', restriction)}
                className="px-3 py-2 text-sm justify-center"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Step 4: Budget Preferences
const BudgetPreferencesStep = ({ formData, handleChange }) => {
  return (
    <motion.div variants={itemVariants} className="flex-1 flex flex-col">
      <h2 className="text-3xl font-bold mb-6">Budget Preferences</h2>
      <p className="text-gray-600 mb-8">Let us know your budget range for cooking ingredients.</p>
      
      <div className="space-y-6 flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Budget Range</label>
          <div className="grid grid-cols-3 gap-4">
            <SelectableCard
              icon="💰"
              label="Budget"
              description="Affordable ingredients"
              selected={formData.budget === 'low'}
              onClick={() => handleChange({ target: { name: 'budget', value: 'low' } })}
              className="flex-col items-center justify-center p-4"
            />
            
            <SelectableCard
              icon="💰💰"
              label="Moderate"
              description="Mid-range ingredients"
              selected={formData.budget === 'medium'}
              onClick={() => handleChange({ target: { name: 'budget', value: 'medium' } })}
              className="flex-col items-center justify-center p-4"
            />
            
            <SelectableCard
              icon="💰💰💰"
              label="Premium"
              description="High-quality ingredients"
              selected={formData.budget === 'high'}
              onClick={() => handleChange({ target: { name: 'budget', value: 'high' } })}
              className="flex-col items-center justify-center p-4"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Step 5: Emotional Preferences
const EmotionalPreferencesStep = ({ formData, handleChange, handleCheckboxChange }) => {
  const moods = [
    'Relaxed', 'Energetic', 'Focused', 'Creative', 'Celebratory', 'Romantic', 'Family-friendly', 'Adventurous'
  ]
  
  return (
    <motion.div variants={itemVariants} className="flex-1 flex flex-col">
      <h2 className="text-3xl font-bold mb-6">Cooking Mood</h2>
      <p className="text-gray-600 mb-8">What kind of cooking atmosphere do you enjoy?</p>
      
      <div className="space-y-6 flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Cooking Moods</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {moods.map(mood => (
              <SelectableCard
                key={mood}
                label={mood}
                selected={formData.cookingMood.includes(mood)}
                onClick={() => handleCheckboxChange('cookingMood', mood)}
                className="flex-col items-center justify-center p-4"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Step 6: Location
const LocationStep = ({ formData, handleChange }) => {
  return (
    <motion.div variants={itemVariants} className="flex-1 flex flex-col">
      <h2 className="text-3xl font-bold mb-6">Your Location</h2>
      <p className="text-gray-600 mb-8">This helps us suggest seasonal ingredients available in your area.</p>
      
      <div className="space-y-6 flex-1">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">City or Region</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue focus:border-transparent"
            placeholder="New York, Paris, Tokyo, etc."
          />
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-medium text-apple-blue mb-2">Almost there!</h3>
          <p className="text-sm text-gray-600">
            You're about to complete your AromaTone profile. Once finished, you'll be able to enjoy personalized cooking experiences with the perfect ambiance.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

const Signup = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [formData, setFormData] = useState({
    // Personal details
    name: '',
    email: '',
    password: '',
    // Music preferences
    musicPlatform: '',
    musicGenres: [],
    playlist: '',
    // Recipe preferences
    recipeTypes: [],
    dietaryRestrictions: [],
    // Budget preferences
    budget: 'medium',
    // Emotional preferences
    cookingMood: [],
    // Location
    location: ''
  })

  // Total number of steps in the signup process
  const totalSteps = 6

  // Update progress bar based on current step
  const updateProgress = (step) => {
    setProgress(((step - 1) / (totalSteps - 1)) * 100)
  }

  // Handle next step
  const handleNextStep = () => {
    const nextStep = currentStep + 1
    if (nextStep <= totalSteps) {
      setCurrentStep(nextStep)
      updateProgress(nextStep)
    } else {
      // Complete signup process
      handleSignupComplete()
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    const prevStep = currentStep - 1
    if (prevStep >= 1) {
      setCurrentStep(prevStep)
      updateProgress(prevStep)
    }
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Handle checkbox changes
  const handleCheckboxChange = (category, value) => {
    setFormData(prev => {
      const current = [...prev[category]]
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(item => item !== value) }
      } else {
        return { ...prev, [category]: [...current, value] }
      }
    })
  }

  // Handle signup completion
  const handleSignupComplete = () => {
    // Show loading state
    setIsSubmitting(true)
    
    // Here you would typically send the data to your backend
    console.log('Signup data:', formData)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setShowConfetti(true)
      
      // Navigate to dashboard page after showing success
      setTimeout(() => {
        navigate('/dashboard')
      }, 2500)
    }, 1500)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { when: "afterChildren" }
    }
  }

  // Animation variants for form items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} progress={progress} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8"
          >
            {currentStep === 1 && <PersonalDetailsStep formData={formData} handleChange={handleChange} />}
            {currentStep === 2 && <MusicPreferencesStep formData={formData} handleChange={handleChange} handleCheckboxChange={handleCheckboxChange} />}
            {currentStep === 3 && <RecipePreferencesStep formData={formData} handleChange={handleChange} handleCheckboxChange={handleCheckboxChange} />}
            {currentStep === 4 && <BudgetPreferencesStep formData={formData} handleChange={handleChange} />}
            {currentStep === 5 && <EmotionalPreferencesStep formData={formData} handleChange={handleChange} handleCheckboxChange={handleCheckboxChange} />}
            {currentStep === 6 && <LocationStep formData={formData} handleChange={handleChange} />}
            
            <div className="mt-8 flex justify-between items-center">
              {currentStep > 1 ? (
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Back
                </button>
              ) : (
                <Link
                  to="/"
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </Link>
              )}
              
              <button
                onClick={handleNextStep}
                className="px-6 py-2 bg-apple-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                disabled={isSubmitting}
              >
                {currentStep === totalSteps ? (
                  isSubmitting ? (
                    <LoadingSpinner />
                  ) : (
                    'Complete Setup'
                  )
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {showSuccess && <SuccessAnimation />}
        {showConfetti && <ConfettiEffect active={showConfetti} />}
      </div>
    </div>
  )
}

export default Signup