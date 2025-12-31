import dotenv from "dotenv";
dotenv.config();

import { fetchArticles, updateArticle } from "./services/articleService.js";
import { googleSearch } from "./services/googleService.js";
import { scrapeArticle } from "./services/scrapeService.js";
import { rewriteArticle } from "./services/llmService.js";

async function run() {
  const articles = await fetchArticles();

  console.log("Article:", articles.title);
  for (const article of articles) {

    if (article.optimized_content || article.status === 'completed') continue;

    console.log("Processing Article:", article.title);

    try {
      const refs = await googleSearch(article.title);
      const refContents = [];
      // console.log("Found References:", refs.map(r => r.link));
      // Safely scrape references
      for (const ref of refs) {
        const content = await scrapeArticle(ref.link);
        if (content) refContents.push(content);
      }
      // console.log("Scraped Reference Contents:", refContents);
      // 3. Only proceed if we found enough reference data
      const optimized = await rewriteArticle(
        article.original_content,
        refContents[0] || "",
        refContents[1] || ""
      );

      if (!optimized) {
        console.error("No optimized content generated for:", article.title);
        continue;
      }

      // console.log("Optimized Content:", optimized.substring(0, 200));

      // 4. Send updated data back to Python API
      await updateArticle(article.id || article._id, {
        optimized_content: optimized,
        references: refs.map(r => r.link),
        status: "completed" 
      });

      console.log("Successfully Updated:", article.title);
    } catch (error) {
      console.error(`Failed to process ${article.title}:`, error.message);
    }
  }
}

run();
