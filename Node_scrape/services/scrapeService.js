import axios from "axios";
import https from 'https';
import * as cheerio from 'cheerio';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function scrapeArticle(url) {
  // console.log("in scrapeSrvice,  Scraping URL:", url);

  try{
    const res = await axios.get(url, {
      httpsAgent: agent, // Use the agent here
      timeout: 10000,    // 10 second timeout so one slow site doesn't hang the loop
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(res.data);

    const content =
      $("article").text() ||
      $("main").text() ||
      $(".content").text();
  
    // console.log("Scraped Content Length:", content.length);
  
    return content.trim();
  } catch (error) { 
    console.error("Error scraping article:", error);
    return null;
  }
}
