import { GoogleGenAI } from "@google/genai";


export async function rewriteArticle(original, ref1, ref2) {
  const prompt = `
  Rewrite the article below to improve SEO, structure, and readability.
  Use insights from reference articles.
  Do NOT copy text.
  Add headings and bullet points.
  Match the formatting (H2, H3, lists) and depth of the references provided.
  
  Original:
    ${original}
    
    Reference 1:
    ${ref1 ? ref1.substring(0, 4000) : "N/A"}
    
    Reference 2:
    ${ref2 ? ref2.substring(0, 4000) : "N/A"}
    
    At the end, add a "References" section with both links.
    `;
    
    console.log("Generating optimized content with Gemini AI...");
    try{
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
    const res = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    console.log("Received response from Gemini AI." + res);
    const response = res.text;
    return response;
  } catch (error) {
    console.error("Error generating content with Gemini AI:", error);
    throw error;
  }

}
