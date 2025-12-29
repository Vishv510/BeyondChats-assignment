from fastapi import FastAPI
# connect to MongoDB asynchronously
from motor.motor_asyncio import AsyncIOMotorClient
# function to scrape the oldest article date 
from scraper import get_oldest_articles  
import os 
from dotenv import load_dotenv


app = FastAPI()

load_dotenv()  
# MongoDB Connection
client = AsyncIOMotorClient(os.getenv['MONGODB_URI'])
db = client.beyondchats_db

@app.on_event("startup")
async def run_initial_scrape():
    # Check if we already have data
    count = await db.articles.count_documents({})
    if count == 0:
        data = get_oldest_articles()
        await db.articles.insert_many(data)

@app.get("/articles")
async def list_articles():
    articles = await db.articles.find().to_list(1000)
    for a in articles:
        a["_id"] = str(a["_id"]) # Convert ObjectId to string for JSON
    return articles
