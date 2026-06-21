"use server";

import Groq from "groq-sdk";

// Initialize the SDK. It will throw if GROQ_API_KEY is missing, 
// so we only instantiate it if the key exists to prevent build errors.
const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

export async function generateSummary(title: string, snippet?: string): Promise<string> {
  if (!groq) {
    return "Error: GROQ_API_KEY is not configured in the environment.";
  }

  try {
    const prompt = `
You are a highly efficient news summarization AI for an Indian News Dashboard. 
Your task is to provide a very brief, 3-bullet-point summary of the following news article.
Focus only on the facts and key takeaways. 
Format the output strictly as 3 bullet points starting with "- " and nothing else. Do not include any introductory or concluding remarks.

Title: ${title}
Content: ${snippet || "No additional content available."}
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192", // Fast, accurate, and free tier friendly
      temperature: 0.3, // Keep it factual
      max_tokens: 150,
    });

    const summary = chatCompletion.choices[0]?.message?.content;
    
    if (!summary) {
      return "Failed to generate summary.";
    }

    return summary.trim();
  } catch (error) {
    console.error("Error generating summary with Groq:", error);
    return "An error occurred while generating the summary. Please try again later.";
  }
}
