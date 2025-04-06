import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const RecipeSetup = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    theme: '',
    customTheme: '',
    recipeType: '',
    location: '',
    store: '',
    ambienceType: 'music',
    musicGenre: '',
    podcastType: '',
    soundType: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, we would save this data to state management or context
    console.log('Form submitted:', formData)
    navigate('/cooking')
  }

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  }

  return (
    <div className="min-h-screen bg-apple-gray">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-10 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <rect width="64" height="64" rx="14" fill="#0071E3"/>
              <path d="M32 16C23.164 16 16 23.164 16 32C16 40.836 23.164 48 32 48C40.836 48 48 40.836 48 32C48 23.164 40.836 16 32 16ZM32 20C38.617 20 44 25.383 44 32C44 38.617 38.617 44 32 44C25.383 44 20 38.617 20 32C20 25.383 25.383 20 32 20Z" fill="white"/>
              <path d="M32 24C27.582 24 24 27.582 24 32C24 36.418 27.582 40 32 40C36.418 40 40 36.418 40 32C40 27.582 36.418 24 32 24ZM32 28C34.209 28 36 29.791 36 32C36 34.209 34.209 36 32 36C29.791 36 28 34.209 28 32C28 29.791 29.791 28 32 28Z" fill="white"/>
              <path d="M38 18L42 22M22 38L26 42M18 26L22 30M42 34L46 38" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h1 className="text-xl font-semibold">AromaTone</h1>
          </Link>
        </div>
        <div className="text-sm font-medium">
          Step {currentStep} of 3
        </div>
      </header>

      <div className="max-w-2xl mx-auto py-12 px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Set Up Your Cooking Experience</h1>
          <p className="text-gray-600">Customize your preferences to enhance your cooking session</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-10">
          <div 
            className="bg-apple-blue h-2 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Theme and Recipe */}
          {currentStep === 1 && (
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="theme">
                  Cooking Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                  className="apple-input w-full"
                  required
                >
                  <option value="">Select a theme</option>
                  <option value="italian">Italian Night</option>
                  <option value="asian">Asian Fusion</option>
                  <option value="mediterranean">Mediterranean</option>
                  <option value="comfort">Comfort Food</option>
                  <option value="healthy">Healthy & Light</option>
                  <option value="custom">Custom Theme</option>
                </select>
              </div>

              {formData.theme === 'custom' && (
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="customTheme">
                    Your Custom Theme
                  </label>
                  <input
                    type="text"
                    id="customTheme"
                    name="customTheme"
                    value={formData.customTheme}
                    onChange={handleInputChange}
                    className="apple-input w-full"
                    placeholder="E.g., Spicy Mexican Fiesta"
                    required={formData.theme === 'custom'}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="recipeType">
                  Recipe Type
                </label>
                <select
                  id="recipeType"
                  name="recipeType"
                  value={formData.recipeType}
                  onChange={handleInputChange}
                  className="apple-input w-full"
                  required
                >
                  <option value="">Select recipe type</option>
                  <option value="main">Main Course</option>
                  <option value="appetizer">Appetizer</option>
                  <option value="dessert">Dessert</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="apple-button"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Location and Store */}
          {currentStep === 2 && (
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="location">
                  Your Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="apple-input w-full"
                  placeholder="City, State or Zip Code"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="store">
                  Preferred Grocery Store
                </label>
                <select
                  id="store"
                  name="store"
                  value={formData.store}
                  onChange={handleInputChange}
                  className="apple-input w-full"
                  required
                >
                  <option value="">Select a store</option>
                  <option value="wholefoods">Whole Foods</option>
                  <option value="traderjoes">Trader Joe's</option>
                  <option value="safeway">Safeway</option>
                  <option value="kroger">Kroger</option>
                  <option value="target">Target</option>
                  <option value="walmart">Walmart</option>
                  <option value="local">Local Market</option>
                </select>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="apple-button"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Ambience Preferences */}
          {currentStep === 3 && (
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ambience Type
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`p-4 border rounded-xl flex flex-col items-center cursor-pointer transition-all ${formData.ambienceType === 'music' ? 'border-apple-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setFormData({...formData, ambienceType: 'music'})}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 mb-2 ${formData.ambienceType === 'music' ? 'text-apple-blue' : 'text-gray-500'}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                    </svg>
                    <span className={`text-sm ${formData.ambienceType === 'music' ? 'font-medium text-apple-blue' : ''}`}>Music</span>
                  </div>
                  
                  <div 
                    className={`p-4 border rounded-xl flex flex-col items-center cursor-pointer transition-all ${formData.ambienceType === 'podcast' ? 'border-apple-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setFormData({...formData, ambienceType: 'podcast'})}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 mb-2 ${formData.ambienceType === 'podcast' ? 'text-apple-blue' : 'text-gray-500'}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                    </svg>
                    <span className={`text-sm ${formData.ambienceType === 'podcast' ? 'font-medium text-apple-blue' : ''}`}>Podcast</span>
                  </div>
                  
                  <div 
                    className={`p-4 border rounded-xl flex flex-col items-center cursor-pointer transition-all ${formData.ambienceType === 'ambient' ? 'border-apple-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setFormData({...formData, ambienceType: 'ambient'})}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 mb-2 ${formData.ambienceType === 'ambient' ? 'text-apple-blue' : 'text-gray-500'}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                    </svg>
                    <span className={`text-sm ${formData.ambienceType === 'ambient' ? 'font-medium text-apple-blue' : ''}`}>Ambient</span>
                  </div>
                </div>
              </div>

              {/* Conditional fields based on ambience type */}
              {formData.ambienceType === 'music' && (
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="musicGenre">
                    Music Genre
                  </label>
                  <select
                    id="musicGenre"
                    name="musicGenre"
                    value={formData.musicGenre}
                    onChange={handleInputChange}
                    className="apple-input w-full"
                    required={formData.ambienceType === 'music'}
                  >
                    <option value="">Select a genre</option>
                    <option value="jazz">Jazz</option>
                    <option value="classical">Classical</option>
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="electronic">Electronic</option>
                    <option value="hiphop">Hip Hop</option>
                    <option value="country">Country</option>
                    <option value="rnb">R&B</option>
                  </select>
                </div>
              )}

              {formData.ambienceType === 'podcast' && (
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="podcastType">
                    Podcast Type
                  </label>
                  <select
                    id="podcastType"
                    name="podcastType"
                    value={formData.podcastType}
                    onChange={handleInputChange}
                    className="apple-input w-full"
                    required={formData.ambienceType === 'podcast'}
                  >
                    <option value="">Select a podcast type</option>
                    <option value="cooking">Cooking</option>
                    <option value="comedy">Comedy</option>
                    <option value="news">News</option>
                    <option value="storytelling">Storytelling</option>
                    <option value="educational">Educational</option>
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                  </select>
                </div>
              )}

              {formData.ambienceType === 'ambient' && (
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="soundType">
                    Ambient Sound
                  </label>
                  <select
                    id="soundType"
                    name="soundType"
                    value={formData.soundType}
                    onChange={handleInputChange}
                    className="apple-input w-full"
                    required={formData.ambienceType === 'ambient'}
                  >
                    <option value="">Select ambient sound</option>
                    <option value="rainforest">Rainforest</option>
                    <option value="ocean">Ocean Waves</option>
                    <option value="fireplace">Crackling Fireplace</option>
                    <option value="cafe">Café Ambience</option>
                    <option value="rain">Rainfall</option>
                    <option value="whitenoise">White Noise</option>
                    <option value="cityscape">City Sounds</option>
                  </select>
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="apple-button"
                >
                  Start Cooking
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  )
}

export default RecipeSetup