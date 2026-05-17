import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf-8');
const apiKeyLine = envContent.split('\n').find(line => line.startsWith('VITE_GEMINI_API_KEY='));
const apiKey = apiKeyLine.split('=')[1].trim();

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    if (data.models) {
      console.log("Available models:");
      data.models.forEach(m => console.log(m.name));
    } else {
      console.log("Error:", data);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

listModels();
