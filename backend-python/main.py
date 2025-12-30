from fastapi import FastAPI, Body
# connect to MongoDB asynchronously
from motor.motor_asyncio import AsyncIOMotorClient
# function to scrape the oldest article date 
from scraper import get_oldest_articles  
from bson import ObjectId
import os 
from dotenv import load_dotenv


app = FastAPI()

load_dotenv()  
# MongoDB Connection
client = AsyncIOMotorClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/artical'))
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
    articles = await db.articles.find().to_list(length=10000)
    for a in articles:
        print(a)
        a["_id"] = str(a["_id"]) # Convert ObjectId to string for JSON
    return articles

@app.put("/articles/{id}")
async def update_article(id: str, payload: dict = Body(...)):
    # This endpoint is specifically for your Phase 2 Node.js script
    await db.articles.update_one(
        {"_id": ObjectId(id)},
        {"$set": payload}
    )
    return {"status": "success"}