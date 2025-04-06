import { motion } from 'framer-motion'

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep
        
        return (
          <div key={stepNumber} className="flex items-center">
            {/* Step dot */}
            <motion.div
              className={`flex items-center justify-center rounded-full ${isActive ? 'bg-apple-blue' : isCompleted ? 'bg-apple-blue' : 'bg-gray-300'}`}
              style={{ width: '24px', height: '24px' }}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: isActive ? 1 : 0.8,
                backgroundColor: isActive || isCompleted ? '#0071e3' : '#d1d5db'
              }}
              transition={{ duration: 0.3 }}
            >
              {isCompleted ? (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <span className="text-xs text-white font-medium">{stepNumber}</span>
              )}
            </motion.div>
            
            {/* Connector line */}
            {stepNumber < totalSteps && (
              <motion.div 
                className="w-8 h-1 mx-1 rounded-full bg-gray-300"
                animate={{ 
                  backgroundColor: isCompleted ? '#0071e3' : '#d1d5db'
                }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default StepIndicator