import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HeartIcon,
  SparklesIcon,
  ChartBarIcon,
  PlayIcon
} from '@heroicons/react/24/outline'

const Dashboard = () => {
  const [healthGoals] = useState([
    { id: 1, title: 'Eat more vegetables', progress: 60 },
    { id: 2, title: 'Reduce sugar intake', progress: 40 },
    { id: 3, title: 'Cook at home more often', progress: 80 }
  ])

  const [moodOptions] = useState([
    { id: 'energetic', label: 'Energetic', emoji: '⚡' },
    { id: 'relaxed', label: 'Relaxed', emoji: '😌' },
    { id: 'focused', label: 'Focused', emoji: '🎯' },
    { id: 'creative', label: 'Creative', emoji: '🎨' }
  ])

  const [suggestedMeals] = useState([
    {
      id: 1,
      title: 'Mediterranean Quinoa Bowl',
      time: '30 mins',
      difficulty: 'Medium',
      mood: 'Energetic'
    },
    {
      id: 2,
      title: 'Comfort Pasta Primavera',
      time: '25 mins',
      difficulty: 'Easy',
      mood: 'Relaxed'
    },
    {
      id: 3,
      title: 'Brain-Boosting Salmon Bowl',
      time: '35 mins',
      difficulty: 'Medium',
      mood: 'Focused'
    }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Health Goals Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center mb-4">
              <HeartIcon className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold">Health Goals</h2>
            </div>
            <div className="space-y-4">
              {healthGoals.map(goal => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{goal.title}</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-apple-blue rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Feeling Check-in Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center mb-4">
              <SparklesIcon className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold">How are you feeling?</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {moodOptions.map(mood => (
                <button
                  key={mood.id}
                  className="p-4 border rounded-lg hover:border-apple-blue hover:bg-blue-50 transition-colors text-center"
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Prompt-based Meal Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center mb-4">
              <ChartBarIcon className="h-6 w-6 text-purple-500 mr-2" />
              <h2 className="text-xl font-semibold">Suggested Meals</h2>
            </div>
            <div className="space-y-4">
              {suggestedMeals.map(meal => (
                <div
                  key={meal.id}
                  className="p-4 border rounded-lg hover:border-apple-blue cursor-pointer transition-all"
                >
                  <h3 className="font-medium mb-2">{meal.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>⏱ {meal.time}</span>
                    <span>📊 {meal.difficulty}</span>
                    <span>🎯 {meal.mood}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Start Cooking Session Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link
            to="/cooking-session"
            className="inline-flex items-center px-6 py-3 bg-apple-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <PlayIcon className="h-5 w-5 mr-2" />
            Start Cooking Session
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard