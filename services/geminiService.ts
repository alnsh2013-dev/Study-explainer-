
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { FileData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder for environments where the API key is not set.
  // In a real application, you'd want to handle this more gracefully.
  console.warn("Gemini API key not found. Using a placeholder. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
const model = 'gemini-2.5-flash';

const fileToGenerativePart = (file: FileData) => {
  return {
    inlineData: {
      data: file.base64,
      mimeType: file.mimeType,
    },
  };
};

export const generateContent = async (prompt: string, files: FileData[] = [], useGoogleSearch: boolean = false) => {
  try {
    const parts = [
        { text: prompt },
        ...files.map(fileToGenerativePart),
    ];
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: { parts: parts },
        config: useGoogleSearch ? { tools: [{googleSearch: {}}] } : undefined
    });

    const text = response.text;
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    let sources: { uri: string; title: string }[] = [];
    
    if (groundingMetadata?.groundingChunks) {
        sources = groundingMetadata.groundingChunks
            .filter(chunk => chunk.web)
            .map(chunk => ({
                uri: chunk.web!.uri,
                title: chunk.web!.title,
            }))
            .filter(source => source.uri && source.title);
    }

    return { text, sources };
  } catch (error) {
    console.error("Error generating content:", error);
    return { text: "Sorry, I encountered an error. Please try again.", sources: [] };
  }
};