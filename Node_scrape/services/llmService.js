import { GoogleGenAI } from "@google/genai";

export async function rewriteArticle(original, ref1, ref2) {
  const prompt = `
    You are an expert SEO content writer. Rewrite the following article to be more engaging, SEO-optimized, and well-structured.

    REQUIREMENTS:
    1. Start with a brief summary (2-3 sentences) without any labels
    2. Use proper markdown formatting:
      - Use ## for main section headings
      - Use ### for subsections
      - Use **bold** for key terms
      - Use bullet points (-) for lists
    3. Keep the same meaning as the original
    4. Make it more readable and engaging
    5. DO NOT copy text directly from references
    6. DO NOT include meta-instructions in output
    7. Write in a professional tone

    ORIGINAL ARTICLE:
    ${original}

    REFERENCE MATERIAL (for context only, don't copy):
    Reference 1: ${ref1 ? ref1.substring(0, 3000) : 'Not available'}
    Reference 2: ${ref2 ? ref2.substring(0, 3000) : 'Not available'}

    OUTPUT FORMAT:
    - Start with 2-3 sentence summary (no label)
    - Write the full article with proper headings
    - Do NOT include a "References" section (it will be added automatically)

    Write the rewritten article now:
    `;
    
    // console.log("IN llmSerice file , Generating optimized content with Gemini AI...");
    
    try{
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
    const res = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
    // console.log("complated genAI method , Response received");

    const text = res.text;
    const cleaned = text
      .replace(/^(TL;DR|Summary|TLDR)(\s*Summary)?:\s*/i, '')
      .replace(/###?\s*References.*$/s, '')
      .trim();
    // console.log("last at llmService , Received response from Gemini AI." + cleaned.length);

    return cleaned;
  } catch (error) {
    console.error("Error generating content with Gemini AI:", error.message);
    console.error("Full error:", error);
    // console.error("Error generating content with Gemini AI:", error);
    throw error;
  }

}
