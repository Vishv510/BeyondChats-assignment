from fastapi import FastAPI
# connect to MongoDB asynchronously
from motor.motor_asyncio import AsyncIOMotorClient
# function to scrape the oldest article date 
from scraper import get_oldest_articles  

app = FastAPI()

# MongoDB Connection
client = AsyncIOMotorClient("mongodb+srv://v87078523:3uIhaWOoKBhNRY3m@projectnew.tnlv3.mongodb.net/?appName=projectnew")
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
