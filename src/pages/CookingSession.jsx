import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Webcam from 'react-webcam'

const CookingSession = () => {
  const navigate = useNavigate()
  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Mock recipe data - in a real app, this would come from context/state
  const recipe = {
    title: "Creamy Garlic Parmesan Pasta",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    prepTime: "10 mins",
    cookTime: "20 mins",
    servings: 4,
    ingredients: [
      "8 oz fettuccine pasta",
      "2 tbsp olive oil",
      "4 cloves garlic, minced",
      "1 cup heavy cream",
      "1 cup grated Parmesan cheese",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    steps: [
      "Bring a large pot of salted water to a boil. Add pasta and cook according to package directions until al dente.",
      "While pasta is cooking, heat olive oil in a large skillet over medium heat. Add minced garlic and sauté until fragrant, about 1 minute.",
      "Pour in heavy cream and bring to a simmer. Cook for 3-4 minutes until slightly thickened.",
      "Reduce heat to low and gradually whisk in Parmesan cheese until melted and smooth.",
      "Season with salt and pepper to taste.",
      "Drain pasta and add directly to the sauce, tossing to coat evenly.",
      "Serve immediately, garnished with fresh parsley and additional Parmesan if desired."
    ]
  }

  // Mock ambience data - in a real app, this would come from context/state
  const ambience = {
    type: "music",
    source: "Jazz Cooking Playlist",
    audioUrl: "https://example.com/jazz-cooking-playlist.mp3" // This would be a real URL in production
  }

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(seconds => seconds + 1);
      }, 1000);
    } else if (!isRecording && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, timer]);

  // Format timer to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Handle recording start/stop
  const handleStartRecording = () => {
    setRecordedChunks([]);
    setIsRecording(true);
    
    // In a real app, we would start the media recorder here
    // This is a simplified version for demonstration
    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    
    // In a real app, we would stop the media recorder here
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  // Handle downloading the recorded video
  const handleDownload = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = `aromatone-cooking-${Date.now()}.webm`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  // Handle playing/pausing ambience
  const toggleAmbience = () => {
    setIsPlaying(!isPlaying);
    // In a real app, we would play/pause the audio here
  };

  // Handle moving to next/previous recipe step
  const goToNextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-apple-gray flex flex-col">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-10 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <rect width="64" height="64" rx="14" fill="#0071E3"/>
              <path d="M32 16C23.164 16 16 23.164 16 32C16 40.836 23.164 48 32 48C40.836 48 48 40.836 48 32C48 23.164 40.836 16 32 16ZM32 20C38.617 20 44 25.383 44 32C44 38.617 38.617 44 32 44C25.383 44 20 38.617 20 32C20 25.383 25.383 20 32 20Z" fill="white"/>
              <path d="M32 24C27.582 24 24 27.582 24 32C24 36.418 27.582 40 32 40C36.418 40 40 36.418 40 32C40 27.582 36.418 24 32 24ZM32 28C34.209 28 36 29.791 36 32C36 34.209 34.209 36 32 36C29.791 36 28 34.209 28 32C28 29.791 29.791 28 32 28Z" fill="white"/>
              <path d="M38 18L42 22M22 38L26 42M18 26L22 30M42 34L46 38" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h1 className="text-xl font-semibold">AromaTone</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleAmbience}
            className={`p-2 rounded-full ${isPlaying ? 'bg-apple-blue text-white' : 'bg-white text-apple-dark'}`}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            )}
          </button>
          <div className="text-sm font-medium">
            {isPlaying ? `Playing: ${ambience.source}` : 'Ambience Paused'}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Recipe */}
        <div className="w-1/3 bg-white p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
            <div className="flex space-x-4 text-sm text-gray-500">
              <div>Prep: {recipe.prepTime}</div>
              <div>Cook: {recipe.cookTime}</div>
              <div>Serves: {recipe.servings}</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-apple-blue flex-shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Instructions</h3>
            <div className="space-y-4">
              {recipe.steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${currentStep === index ? 'border-apple-blue bg-blue-50' : 'border-gray-200'}`}
                >
                  <div className="flex">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${currentStep === index ? 'bg-apple-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {index + 1}
                    </div>
                    <p>{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Camera and Controls */}
        <div className="w-2/3 p-6 flex flex-col">
          {/* Camera View */}
          <div className="relative bg-black rounded-xl overflow-hidden flex-1 mb-6">
            <Webcam
              audio={true}
              ref={webcamRef}
              className="w-full h-full object-cover"
            />
            
            {/* Recording indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span>{formatTime(timer)}</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                onClick={goToPrevStep}
                disabled={currentStep === 0}
                className={`p-3 rounded-full ${currentStep === 0 ? 'bg-gray-200 text-gray-400' : 'bg-white text-apple-dark hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              
              <button 
                onClick={goToNextStep}
                disabled={currentStep === recipe.steps.length - 1}
                className={`p-3 rounded-full ${currentStep === recipe.steps.length - 1 ? 'bg-gray-200 text-gray-400' : 'bg-white text-apple-dark hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            <div className="flex space-x-4">
              {!isRecording ? (
                <button 
                  onClick={handleStartRecording}
                  className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </button>
              ) : (
                <button 
                  onClick={handleStopRecording}
                  className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                  </svg>
                </button>
              )}
              
              {recordedChunks.length > 0 && (
                <button 
                  onClick={handleDownload}
                  className="bg-apple-blue hover:bg-opacity-90 text-white p-3 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookingSession