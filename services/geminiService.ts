
import { GoogleGenAI } from "@google/genai";

// The API key must be obtained exclusively from the environment variable `process.env.API_KEY`.
// This variable is assumed to be pre-configured and accessible in the execution context.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function callGeminiAPI(prompt: string, systemInstruction: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
        },
    });

    return response.text;
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    let errorMessage = "Ocorreu um erro ao gerar a resposta da IA.";
    if (error instanceof Error) {
        errorMessage += ` Detalhes: ${error.message}`;
    }
    return errorMessage;
  }
}
