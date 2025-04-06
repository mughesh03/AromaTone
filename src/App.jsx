import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'

// Pages
import Home from './pages/Home'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import RecipeSetup from './pages/RecipeSetup'
import CookingSession from './pages/CookingSession'

function App() {
  return (
    <Router>
      <motion.div 
        className="min-h-screen bg-apple-gray text-apple-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setup" element={<RecipeSetup />} />
          <Route path="/cooking-session" element={<CookingSession />} />
        </Routes>
      </motion.div>
    </Router>
  )
}

export default App
