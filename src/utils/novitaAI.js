import OpenAI from 'openai';

// Initialize Novita AI client with configuration
const novitaAI = new OpenAI({
  baseURL: "http://localhost:3000/api",
  apiKey: import.meta.env.VITE_NOVITA_API_KEY, // Access API key from environment variables
  dangerouslyAllowBrowser: true // Enable browser usage with appropriate security measures
});

// Text-to-speech configuration
const TTS_ENDPOINT = 'http://localhost:3000/api/txt2speech';

// Function to generate recipe suggestions using LLM
export async function generateRecipeSuggestions(preferences) {
  try {
    const completion = await novitaAI.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful cooking assistant that generates personalized recipe suggestions based on user preferences, mood, and available ingredients. You MUST respond with a valid JSON array containing exactly 3 recipe objects. Each recipe object MUST have the following properties: id (number), title (string), description (string), difficulty (string), prepTime (string), cookTime (string), servings (number), ingredients (array of strings), steps (array of strings)."
        },
        {
          role: "user",
          content: `Generate 3 recipe suggestions for a ${preferences.mood} cooking experience.
Desired dish type: ${preferences.desiredDish}
Available ingredients: ${preferences.availableIngredients.join(', ')}`
        }
      ],
      model: "meta-llama/llama-3.1-8b-instruct",
      stream: false
    });

    const content = completion.choices[0].message.content;
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error('Invalid JSON response from LLM:', error);
      throw new Error('Failed to parse recipe suggestions. Please try again.');
    }
  } catch (error) {
    console.error('Error generating recipe suggestions:', error);
    throw error;
  }
}

// Function to convert recipe instructions to speech
export async function textToSpeech(text, options = {}) {
  try {
    const requestData = {
      request: {
        voice_id: options.voice_id || 'James',
        language: options.language || 'en-US',
        texts: [text],
        volume: options.volume || 1.2,
        speed: options.speed || 1.2
      }
    };

    const response = await fetch(TTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_NOVITA_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`Text-to-speech request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in text-to-speech conversion:', error);
    throw error;
  }
}