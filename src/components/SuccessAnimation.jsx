import { motion } from 'framer-motion'

const SuccessAnimation = () => {
  const circleVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <motion.div
        className="relative w-24 h-24"
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="absolute inset-0 bg-apple-blue rounded-full"
          variants={circleVariants}
        />
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="absolute inset-0 w-full h-full p-2"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            fill="transparent"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={checkVariants}
          />
        </motion.svg>
      </motion.div>
    </div>
  )
}

export default SuccessAnimation