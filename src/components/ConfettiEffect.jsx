import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ConfettiEffect = ({ active = false }) => {
  const [confetti, setConfetti] = useState([])
  
  useEffect(() => {
    if (!active) return
    
    // Create confetti pieces
    const pieces = []
    const colors = ['#0071e3', '#ff9500', '#5ac8fa', '#ff2d55', '#34c759']
    
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100, // random x position (0-100%)
        delay: Math.random() * 2, // random delay
        size: Math.random() * 8 + 4, // random size
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    
    setConfetti(pieces)
    
    // Clean up after animation
    const timer = setTimeout(() => {
      setConfetti([])
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [active])
  
  if (!active || confetti.length === 0) return null
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map(piece => (
        <motion.div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: '110vh',
            rotate: 360,
            opacity: [1, 1, 0.5, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: piece.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

export default ConfettiEffect