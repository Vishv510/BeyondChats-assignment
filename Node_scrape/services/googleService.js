import axios from "axios";

export async function googleSearch(query) {
  if (!process.env.SERP_API_KEY) throw new Error("Missing SERP_API_KEY");
  
  console.log("Searching Google for:", query);
  const res = await axios.get("https://serpapi.com/search", {
    params: {
      q: query,
      engine: "google",
      api_key: process.env.SERP_API_KEY
    }
  });

  // console.log("Google Search Response Status:", res.status);
  
  // console.log("Google Search Results:", res.data.organic_results);
  if (!res.data.organic_results) return [];

  const results = res.data.organic_results
  return results
    .filter(r => {
      const url = r.link.toLowerCase();
      // Block common non-blog/junk sites
      return (
        !url.includes("facebook.com") &&
        !url.includes("amazon.com") &&
        !url.includes("youtube.com") &&
        !url.includes("instagram.com") 
      );
    })
    .slice(0, 2);
}
