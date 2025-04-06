import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SelectableCard from './SelectableCard'
import Webcam from 'react-webcam'

const RecipeSetupFlow = ({ onComplete }) => {
  const [step, setStep] = useState(1)
  const [preferences, setPreferences] = useState({
    desiredDish: '',
    mood: '',
    availableIngredients: [],
    selectedRecipe: null
  })
  const [showCamera, setShowCamera] = useState(false)
  const webcamRef = useRef(null)
  const [generatedRecipes, setGeneratedRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  }

  // Predefined moods
  const moodOptions = [
    { label: 'Relaxed', icon: '😌' },
    { label: 'Energetic', icon: '⚡' },
    { label: 'Focused', icon: '🎯' },
    { label: 'Creative', icon: '🎨' },
    { label: 'Celebratory', icon: '🎉' },
    { label: 'Romantic', icon: '💝' },
    { label: 'Family-friendly', icon: '👨‍👩‍👧‍👦' },
    { label: 'Adventurous', icon: '🌟' }
  ]

  // Handle input changes
  const handleInputChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Generate recipes using Novita's LLM
  const generateRecipes = async () => {
    setIsLoading(true)
    try {
      // TODO: Integrate with Novita's LLM API
      // This is a mock response
      const mockRecipes = [
        {
          id: 1,
          title: 'Creamy Garlic Parmesan Pasta',
          description: 'A rich and creamy pasta dish perfect for a relaxing evening.',
          difficulty: 'Easy',
          prepTime: '10 mins',
          cookTime: '20 mins',
          servings: 4,
          ingredients: [
            '8 oz fettuccine pasta',
            '2 tbsp olive oil',
            '4 cloves garlic, minced',
            '1 cup heavy cream',
            '1 cup grated Parmesan cheese',
            'Salt and pepper to taste',
            'Fresh parsley for garnish'
          ],
          steps: [
            'Bring a large pot of salted water to a boil. Add pasta and cook according to package directions until al dente.',
            'While pasta is cooking, heat olive oil in a large skillet over medium heat. Add minced garlic and sauté until fragrant, about 1 minute.',
            'Pour in heavy cream and bring to a simmer. Cook for 3-4 minutes until slightly thickened.',
            'Reduce heat to low and gradually whisk in Parmesan cheese until melted and smooth.',
            'Season with salt and pepper to taste.',
            'Drain pasta and add directly to the sauce, tossing to coat evenly.',
            'Serve immediately, garnished with fresh parsley and additional Parmesan if desired.'
          ]
        },
        {
          id: 2,
          title: 'Spicy Thai Basil Stir-Fry',
          description: 'An energetic fusion of Thai flavors with fresh vegetables.',
          difficulty: 'Medium',
          prepTime: '15 mins',
          cookTime: '10 mins',
          servings: 4,
          ingredients: [
            '1 lb chicken breast, sliced',
            '3 cloves garlic, minced',
            '2 Thai chilies, chopped',
            '1 cup Thai basil leaves',
            '2 tbsp soy sauce',
            '1 tbsp fish sauce',
            '1 tbsp oyster sauce',
            'Vegetable oil for cooking'
          ],
          steps: [
            'Heat oil in a wok or large skillet over high heat.',
            'Add garlic and chilies, stir-fry for 30 seconds until fragrant.',
            'Add chicken and stir-fry until nearly cooked through.',
            'Add soy sauce, fish sauce, and oyster sauce.',
            'Toss in Thai basil leaves and cook until just wilted.',
            'Serve hot with steamed rice.'
          ]
        },
        {
          id: 3,
          title: 'Mediterranean Quinoa Bowl',
          description: 'A healthy and colorful bowl packed with Mediterranean flavors.',
          difficulty: 'Easy',
          prepTime: '10 mins',
          cookTime: '15 mins',
          servings: 4,
          ingredients: [
            '1 cup quinoa',
            '2 cups water',
            '1 cucumber, diced',
            '1 cup cherry tomatoes, halved',
            '1/2 red onion, finely chopped',
            '1/2 cup Kalamata olives',
            'Feta cheese for topping',
            'Olive oil and lemon juice for dressing'
          ],
          steps: [
            'Rinse quinoa and combine with water in a pot.',
            'Bring to a boil, reduce heat, and simmer for 15 minutes.',
            'Let quinoa cool to room temperature.',
            'Combine quinoa with cucumber, tomatoes, and onion.',
            'Add olives and drizzle with olive oil and lemon juice.',
            'Top with crumbled feta cheese and serve.'
          ]
        }
      ]
      setGeneratedRecipes(mockRecipes)
      setStep(4) // Move to recipe selection step
    } catch (error) {
      console.error('Failed to generate recipes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle recipe selection and complete setup
  const handleRecipeSelect = (recipe) => {
    setPreferences(prev => ({
      ...prev,
      selectedRecipe: recipe
    }))
    onComplete({
      ...preferences,
      selectedRecipe: recipe
    })
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="max-w-2xl mx-auto p-6"
      >
        {step === 1 && (
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold">What would you like to cook?</h2>
            <p className="text-gray-600">Tell us what type of dish you're in the mood for.</p>
            <input
              type="text"
              value={preferences.desiredDish}
              onChange={(e) => handleInputChange('desiredDish', e.target.value)}
              placeholder="E.g., pasta, stir-fry, salad..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue focus:border-transparent"
            />
            <button
              onClick={() => setStep(2)}
              disabled={!preferences.desiredDish}
              className="w-full px-6 py-3 bg-apple-blue text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold">How are you feeling today?</h2>
            <p className="text-gray-600">Select your current mood to match the perfect cooking ambiance.</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {moodOptions.map(mood => (
                <SelectableCard
                  key={mood.label}
                  label={`${mood.icon} ${mood.label}`}
                  selected={preferences.mood === mood.label}
                  onClick={() => handleInputChange('mood', mood.label)}
                  className="flex-col items-center justify-center p-4"
                />
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              disabled={!preferences.mood}
              className="w-full px-6 py-3 bg-apple-blue text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold">What ingredients do you have?</h2>
            <p className="text-gray-600">List the main ingredients you'd like to use.</p>
            <div className="space-y-4">
              {showCamera ? (
                <div className="relative">
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full rounded-lg"
                  />
                  <button
                    onClick={() => {
                      const imageSrc = webcamRef.current.getScreenshot();
                      // Here we would normally send this image to an AI service for ingredient recognition
                      // For demo, we'll just simulate recognizing a frozen pizza
                      handleInputChange('availableIngredients', ['Frozen Pizza']);
                      setShowCamera(false);
                    }}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-apple-blue text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Capture Ingredients
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <textarea
                    value={preferences.availableIngredients.join('\n')}
                    onChange={(e) => handleInputChange('availableIngredients', e.target.value.split('\n').filter(Boolean))}
                    placeholder="Enter each ingredient on a new line"
                    className="w-full h-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowCamera(true)}
                    className="w-full px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors mb-2 flex items-center justify-center"
                  >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Scan Ingredients with Camera
                  </button>
                  <button
                    onClick={generateRecipes}
                    disabled={preferences.availableIngredients.length === 0 || isLoading}
                    className="w-full px-6 py-3 bg-apple-blue text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Generating Recipes...' : 'Generate Recipes'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold">Choose Your Recipe</h2>
            <p className="text-gray-600">Select from these personalized recipe suggestions.</p>
            <div className="space-y-4">
              {generatedRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  onClick={() => handleRecipeSelect(recipe)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-apple-blue cursor-pointer transition-colors"
                >
                  <h3 className="font-semibold text-lg">{recipe.title}</h3>
                  <p className="text-gray-600 mt-1">{recipe.description}</p>
                  <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                    <span>Difficulty: {recipe.difficulty}</span>
                    <span>Time: {recipe.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default RecipeSetupFlow