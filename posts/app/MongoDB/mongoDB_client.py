from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient
from app.schema.post import Post


class MongoDB:
    __client = None
    collection = None

    async def connect(self):
        if self.__client is not None:
            return self.__client
        try:
            self.__client = AsyncIOMotorClient(
                "mongodb+srv://jaysurya00:Jay%40surya2001@projectscluster.aykhspt.mongodb.net/?retryWrites=true&w=majority&appName=ProjectsCluster"
            )
            server_info = await self.__client.server_info()
            self.collection = (self.__client["posts_db"])["posts"]
            print(f"Connected to MongoDB: {server_info}")
        except Exception as ex:
            raise Exception(f"Cannot connect to MongoDB \n{ex}")

    async def insert(self, posts: Post):
        if self.collection is None:
            raise Exception("Cannot insert document before connection to MongoDB")
        result = await self.collection.insert_one(posts)
        return result.inserted_id

    async def find_by_userId(self, user_id: int):
        if self.collection is None:
            raise Exception("Cannot find document before connection to MongoDB")
        result = await self.collection.find({"user_id": user_id})
        return result


mongoDB_client = MongoDB()
