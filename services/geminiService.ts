
import { GoogleGenAI } from "@google/genai";
import type { PlayerStats } from '../types';

// IMPORTANT: This assumes process.env.API_KEY is set in the build environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. AI Coach will not function.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getWorkoutTip = async (stats: PlayerStats): Promise<string> => {
  if (!API_KEY) {
    return "The AI Coach is currently offline. Please check the API key configuration.";
  }

  const muscleEntries = Object.entries(stats.muscleGroups);
  muscleEntries.sort(([, a], [, b]) => a - b);
  
  const strongestMuscle = muscleEntries[muscleEntries.length - 1];
  const weakestMuscle = muscleEntries[0];

  const prompt = `
    You are an encouraging and knowledgeable AI fitness coach for a gym simulation game.
    A user has the following muscle stats (out of 100):
    - Chest: ${stats.muscleGroups.chest}
    - Back: ${stats.muscleGroups.back}
    - Legs: ${stats.muscleGroups.legs}
    - Arms: ${stats.muscleGroups.arms}
    - Shoulders: ${stats.muscleGroups.shoulders}
    - Core: ${stats.muscleGroups.core}

    Their strongest muscle group is ${strongestMuscle[0]} (${strongestMuscle[1]}/100) and their weakest is ${weakestMuscle[0]} (${weakestMuscle[1]}/100).
    The user's current level is ${stats.level}.

    Based on this, provide a single, short, motivational, and actionable tip for their next workout.
    Address the user directly. Keep it under 50 words. Focus on either improving their weakest area or leveraging their strongest.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching workout tip from Gemini API:", error);
    return "I seem to be having trouble connecting. Let's focus on giving it our all today!";
  }
};
