import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function fileToGenerativePart(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        inlineData: {
          data: reader.result.split(',')[1],
          mimeType: file.type
        }
      });
    };
    reader.readAsDataURL(file);
  });
}

export const parseScreenshots = async (files) => {
  try {
    // Trying gemini-1.5-pro as 2.0-flash has a 0 quota limit on the free tier for this account
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); 
    
    // Convert all files to generative parts
    const imageParts = await Promise.all(files.map(fileToGenerativePart));

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
            "rating": (number, the rating shown next to the player's name, e.g., 14.2),
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
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing screenshots:", error);
    throw error;
  }
};
