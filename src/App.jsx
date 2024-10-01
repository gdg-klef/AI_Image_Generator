import React, { useState } from 'react';

function App() {
  const [userPrompt, setUserPrompt] = useState('');
  const [memeUrl, setMemeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function generateMeme() {
    setLoading(true);
    try {
      const engineId = 'stable-diffusion-xl-beta-v2-2-2';
      const apiHost = 'https://api.stability.ai';
      const apiKey = import.meta.env.VITE_MY_API_KEY; // Replace with your actual API key

      const response = await fetch(
        `${apiHost}/v1/generation/${engineId}/text-to-image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            text_prompts: [
              {
                text: `Meme style image: ${userPrompt}`,
              },
            ],
            cfg_scale: 7,
            clip_guidance_preset: 'FAST_BLUE',
            height: 512,
            width: 512,
            samples: 1,
            steps: 30,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`);
      }

      const responseJSON = await response.json();
      const generatedImageBase64 = responseJSON.artifacts[0].base64;
      setMemeUrl(`data:image/png;base64,${generatedImageBase64}`);
    } catch (error) {
      console.error('Error generating meme:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-darkBlue-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-darkBlue-400">AI Meme Image Generator</h1>
      <textarea
        className="w-full max-w-lg p-3 bg-darkBlue-800 text-white rounded-md border border-darkBlue-600 focus:outline-none focus:ring-2 focus:ring-darkBlue-400"
        placeholder="Describe your meme idea..."
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        rows={4}
        cols={50}
      />
      <button
        className={`mt-4 px-6 py-2 rounded-md bg-darkBlue-500 text-gray-900 font-semibold 
          hover:bg-darkBlue-600 focus:outline-none focus:ring-2 focus:ring-darkBlue-400
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={generateMeme}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Meme"}
      </button>
  
      {memeUrl && (
        <img
          src={memeUrl}
          alt="Generated Meme"
          className="mt-6 max-w-full max-h-80 rounded-lg border border-darkBlue-700 shadow-lg"
        />
      )}
    </div>
  );
  
}

export default App;