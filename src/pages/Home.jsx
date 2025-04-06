import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-10 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
              <rect width="64" height="64" rx="14" fill="#0071E3"/>
              <path d="M32 16C23.164 16 16 23.164 16 32C16 40.836 23.164 48 32 48C40.836 48 48 40.836 48 32C48 23.164 40.836 16 32 16ZM32 20C38.617 20 44 25.383 44 32C44 38.617 38.617 44 32 44C25.383 44 20 38.617 20 32C20 25.383 25.383 20 32 20Z" fill="white"/>
              <path d="M32 24C27.582 24 24 27.582 24 32C24 36.418 27.582 40 32 40C36.418 40 40 36.418 40 32C40 27.582 36.418 24 32 24ZM32 28C34.209 28 36 29.791 36 32C36 34.209 34.209 36 32 36C29.791 36 28 34.209 28 32C28 29.791 29.791 28 32 28Z" fill="white"/>
              <path d="M38 18L42 22M22 38L26 42M18 26L22 30M42 34L46 38" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.div>
          <h1 className="text-2xl font-semibold">AromaTone</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features" className="hover:text-apple-blue transition-colors">Features</a></li>
            <li><a href="#about" className="hover:text-apple-blue transition-colors">About</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-6 tracking-tight">
            <span className="text-gradient">Elevate</span> Your Cooking Experience
          </h1>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            AromaTone combines your love for cooking with personalized ambience, automatic recording, and smart recipe suggestions.
          </p>
          <Link 
            to="/setup" 
            className="apple-button text-lg px-8 py-3 rounded-xl inline-block"
          >
            Start Cooking
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">Personalized Cooking Experience</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="apple-card" 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-12 w-12 bg-apple-blue rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125C3.504 20.625 3 20.121 3 19.5v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1 .53 0L12.53 3.43l.53.32a.375.375 0 1 1 0 .53l-.53.32-.32.53a.375.375 0 1 1-.53 0L11.47 4.8l-.53-.32a.375.375 0 1 1 0-.53l.53-.32.32-.53Z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Themed Recipes</h3>
              <p className="text-gray-600">Choose cooking themes and get personalized recipe suggestions from your favorite stores.</p>
            </motion.div>
            
            <motion.div 
              className="apple-card" 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-12 w-12 bg-apple-blue rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Ambient Sound</h3>
              <p className="text-gray-600">Enjoy your favorite music, podcasts, or ambient sounds while you cook.</p>
            </motion.div>
            
            <motion.div 
              className="apple-card" 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-12 w-12 bg-apple-blue rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Smart Recording</h3>
              <p className="text-gray-600">Automatically record your cooking session and create beautiful reels to share.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">About AromaTone</h2>
          <p className="text-lg text-gray-600 mb-8">
            AromaTone is an AI-powered cooking companion that enhances your culinary experience. 
            We combine recipe guidance with personalized entertainment and automatic video creation 
            to make cooking more enjoyable and shareable.
          </p>
          <Link 
            to="/setup" 
            className="apple-button text-lg px-8 py-3 rounded-xl inline-block"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-apple-dark text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <rect width="64" height="64" rx="14" fill="#0071E3"/>
              <path d="M32 16C23.164 16 16 23.164 16 32C16 40.836 23.164 48 32 48C40.836 48 48 40.836 48 32C48 23.164 40.836 16 32 16ZM32 20C38.617 20 44 25.383 44 32C44 38.617 38.617 44 32 44C25.383 44 20 38.617 20 32C20 25.383 25.383 20 32 20Z" fill="white"/>
              <path d="M32 24C27.582 24 24 27.582 24 32C24 36.418 27.582 40 32 40C36.418 40 40 36.418 40 32C40 27.582 36.418 24 32 24ZM32 28C34.209 28 36 29.791 36 32C36 34.209 34.209 36 32 36C29.791 36 28 34.209 28 32C28 29.791 29.791 28 32 28Z" fill="white"/>
              <path d="M38 18L42 22M22 38L26 42M18 26L22 30M42 34L46 38" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>AromaTone © {new Date().getFullYear()}</span>
          </div>
          <div>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-apple-blue transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-apple-blue transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-apple-blue transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home