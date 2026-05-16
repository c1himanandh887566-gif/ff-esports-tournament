import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';

// Load env directly
const key = "AIzaSyCdnDMlLBgJmCMySI3W1xQ9n6TAf_ZsYNU";
const genAI = new GoogleGenerativeAI(key);

async function run() {
  try {
    const modelResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await modelResponse.json();
    console.log(data.models.map(m => m.name));
  } catch (err) {
    console.error("Gemini API Error:", err);
  }
}

run();
