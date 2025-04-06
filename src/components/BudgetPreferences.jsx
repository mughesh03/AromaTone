import { useState } from 'react'
import { motion } from 'framer-motion'

const BudgetPreferences = ({ onBudgetSet }) => {
  const [budgetType, setBudgetType] = useState('weekly') // weekly or monthly
  const [customAmount, setCustomAmount] = useState('')
  const [selectedRange, setSelectedRange] = useState(null)
  const [shoppingPreference, setShoppingPreference] = useState('balanced') // balanced, premium, budget

  const budgetRanges = {
    weekly: [
      { label: '$50-100', min: 50, max: 100 },
      { label: '$100-200', min: 100, max: 200 },
      { label: '$200-300', min: 200, max: 300 },
      { label: '$300+', min: 300, max: null }
    ],
    monthly: [
      { label: '$200-400', min: 200, max: 400 },
      { label: '$400-800', min: 400, max: 800 },
      { label: '$800-1200', min: 800, max: 1200 },
      { label: '$1200+', min: 1200, max: null }
    ]
  }

  const shoppingPreferences = [
    {
      id: 'budget',
      label: 'Budget-Friendly',
      description: 'Focus on cost-effective ingredients and basic staples',
      icon: '💰'
    },
    {
      id: 'balanced',
      label: 'Balanced',
      description: 'Mix of affordable and premium ingredients',
      icon: '⚖️'
    },
    {
      id: 'premium',
      label: 'Premium',
      description: 'High-quality, specialty ingredients',
      icon: '✨'
    }
  ]

  const handleRangeSelect = (range) => {
    setSelectedRange(range)
    setCustomAmount('')
    updateBudget(range)
  }

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setCustomAmount(value)
    setSelectedRange(null)
    if (value) {
      updateBudget({ min: parseInt(value), max: parseInt(value) })
    }
  }

  const updateBudget = (range) => {
    onBudgetSet({
      type: budgetType,
      range: range,
      shoppingPreference: shoppingPreference
    })
  }

  return (
    <div className="space-y-6">
      {/* Budget Period Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Budget Period</label>
        <div className="flex space-x-4">
          <button
            onClick={() => setBudgetType('weekly')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              budgetType === 'weekly' ? 'bg-apple-blue text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setBudgetType('monthly')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              budgetType === 'monthly' ? 'bg-apple-blue text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Budget Range Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Select Budget Range</label>
        <div className="grid grid-cols-2 gap-3">
          {budgetRanges[budgetType].map((range, index) => (
            <motion.button
              key={range.label}
              onClick={() => handleRangeSelect(range)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                selectedRange === range
                  ? 'bg-apple-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {range.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom Amount Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Or Enter Custom Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
          <input
            type="text"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Enter amount"
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue focus:border-transparent"
          />
        </div>
      </div>

      {/* Shopping Preferences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Shopping Preference</label>
        <div className="space-y-3">
          {shoppingPreferences.map(pref => (
            <motion.button
              key={pref.id}
              onClick={() => setShoppingPreference(pref.id)}
              className={`w-full p-4 rounded-lg text-left transition-colors ${
                shoppingPreference === pref.id
                  ? 'bg-blue-50 border-2 border-apple-blue'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{pref.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{pref.label}</h4>
                  <p className="text-sm text-gray-500">{pref.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BudgetPreferences