from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCollection
from app.schema.tweet import Tweet
from bson import ObjectId
from typing import List, Optional
import logging


class MongoDB:
    __client: Optional[AsyncIOMotorClient] = None
    collection: Optional[AsyncIOMotorCollection] = None

    async def connect(self):
        if self.__client is not None:
            return self.__client
        try:
            self.__client = AsyncIOMotorClient(
                "mongodb+srv://jaysurya00:Jay%40surya2001@projectscluster.aykhspt.mongodb.net/?retryWrites=true&w=majority&appName=ProjectsCluster"
            )
            server_info = await self.__client.server_info()
            self.collection = (self.__client["tweets_db"])["tweets"]
            print(f"Connected to MongoDB: {server_info}")
        except Exception as ex:
            raise Exception(f"Cannot connect to MongoDB: {ex}")

    async def insert(self, tweet: dict) -> str:
        if self.collection is None:
            raise Exception("Cannot insert document before connection to MongoDB")
        result = await self.collection.insert_one(tweet)
        return str(result.inserted_id)

    async def find_by_id(self, tweet_id: str) -> Optional[dict]:
        if self.collection is None:
            raise Exception("Cannot find document before connection to MongoDB")
        try:
            tweet = await self.collection.find_one({"_id": ObjectId(tweet_id)})
            if tweet is None:
                print(f"Tweet not found for ID: {tweet_id}")
            else:
                print(f"Found tweet: {tweet}")
            return tweet
        except Exception as e:
            print(f"Error retrieving tweet with ID {tweet_id}: {e}")
            return None

    async def find_by_user_id(self, user_id: int) -> List[dict]:
        if self.collection is None:
            raise Exception("Cannot find document before connection to MongoDB")
        cursor = self.collection.find({"user_id": user_id})
        tweets = await cursor.to_list(length=100)  # Adjust length based on your needs
        return tweets


mongoDB_client = MongoDB()
