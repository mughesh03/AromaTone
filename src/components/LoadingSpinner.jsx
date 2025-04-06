import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 40, color = '#0071e3' }) => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="rounded-full"
        style={{ 
          width: size, 
          height: size, 
          borderWidth: size / 10,
          borderColor: `${color} transparent transparent transparent`,
          borderStyle: 'solid'
        }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1, 
          ease: "linear", 
          repeat: Infinity 
        }}
      />
    </div>
  )
}

export default LoadingSpinner