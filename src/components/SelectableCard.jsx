import { motion } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/24/solid'

const SelectableCard = ({ 
  selected = false, 
  onClick, 
  icon, 
  label, 
  description,
  className = ''
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`flex items-center p-4 border rounded-lg transition-all ${selected ? 'border-apple-blue bg-blue-50' : 'border-gray-300 hover:border-gray-400'} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {icon && (
        <span className="mr-3 text-xl">{icon}</span>
      )}
      
      <div className="flex-1 text-left">
        <div className="font-medium">{label}</div>
        {description && (
          <div className="text-xs text-gray-500">{description}</div>
        )}
      </div>
      
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-2 flex-shrink-0 w-5 h-5 bg-apple-blue rounded-full flex items-center justify-center"
        >
          <CheckIcon className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.button>
  )
}

export default SelectableCard