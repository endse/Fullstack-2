import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Course } from '../types';

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const initializeGemini = () => {
  if (genAI) return;
  
  // Initialize with the API key from environment
  // In a real production app, this would be handled securely via backend proxy or strictly controlled envs
  if (process.env.API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  } else {
    console.warn("Gemini API Key is missing.");
  }
};

export const startChatSession = (courses: Course[]) => {
  initializeGemini();
  if (!genAI) throw new Error("AI Service not initialized");

  const courseContext = courses.map(c => 
    `- ${c.title} (ID: ${c.id}): ${c.description}. Level: ${c.level}. Category: ${c.category}. Instructor: ${c.instructor}.`
  ).join('\n');

  const systemInstruction = `You are "CourseFlow AI", a friendly and helpful academic advisor for a student course management portal.
  
  Here is the list of available courses:
  ${courseContext}

  Your goal is to help students choose courses based on their interests, explain course details, or give general study advice. 
  Keep answers concise (under 100 words) unless asked for details. 
  If asked about courses not in the list, politely explain you only know about the current catalog.
  Be encouraging and professional.`;

  chatSession = genAI.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    throw new Error("Chat session not started.");
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get response from AI advisor.");
  }
};