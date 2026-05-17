import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { files } = req.body;
    
    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: 'No files provided' });
    }

    let apiKey = process.env.GEMINI_API_KEY;

    // Fallback: If Vercel CLI fails to load .env.local automatically, manually read it
    if (!apiKey) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
          const envContent = fs.readFileSync(envPath, 'utf8');
          const match = envContent.match(/^GEMINI_API_KEY=(.*)$/m);
          if (match && match[1]) {
            apiKey = match[1].trim();
          }
        }
      } catch (err) {
        console.warn('Fallback env read failed:', err);
      }
    }

    if (!apiKey) {
      return res.status(500).json({ error: 'Server configuration error: Gemini API Key missing.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

    const imageParts = files.map(file => ({
      inlineData: {
        data: file.data,
        mimeType: file.mimeType
      }
    }));

    const prompt = `
      I am providing ${files.length} screenshot(s) from a Free Fire Clash Squad match result.
      Typically, these include:
      1. A main scoreboard showing the final round scores (e.g., 8 to 6).
      2. Detailed stat screens for each team showing metrics like "HEADSHOT RATE", "HELP UP" (Revives), "ACTUAL DAMAGE", etc.
      
      Please extract the match score and all player statistics by analyzing and cross-referencing these images.
      
      Please return the data strictly as a JSON object with the following structure:
      {
        "leftTeamScore": (number, the round score of the left/winning team),
        "rightTeamScore": (number, the round score of the right/losing team),
        "players": [
          {
            "name": (string),
            "k": (number, Kills),
            "d": (number, Deaths),
            "a": (number, Assists),
            "dmg": (number, Damage),
            "revives": (number, Help Up / Revives),
            "hs": (string, Headshot Rate percentage like "25.00%"),
            "mvp": (boolean, true if the player has the MVP crest/badge next to their name or is the clear top performer on the winning team, otherwise false),
            "isLeftTeam": (boolean, true if this player belongs to the left team, false if they belong to the right team)
          }
        ]
      }

      Return ONLY the JSON object, no markdown formatting.
    `;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    let text = response.text();
    
    // Clean up potential markdown formatting from the response
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsedData = JSON.parse(text);
    return res.status(200).json(parsedData);
  } catch (error) {
    console.error("Error parsing screenshots:", error);
    return res.status(500).json({ error: error.message || 'Error parsing screenshots' });
  }
}
