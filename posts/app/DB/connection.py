# app/DB/connection.py

from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://jaysurya00:Jay%40surya2001@projectscluster.aykhspt.mongodb.net/ticketsDB?retryWrites=true&w=majority&appName=ProjectsCluster"
)


def DB_Connection():
    try:
        client.admin.command("ping")
        print("Connected successfully to MongoDB")
    except Exception as e:
        raise Exception(f"The following error occurred: {e}")


db = client["posts_db"]
collection = db["posts"]
