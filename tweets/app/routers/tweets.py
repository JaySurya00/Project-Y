from fastapi import APIRouter, File, Form, UploadFile, Query, HTTPException, Depends
from typing import Annotated, Optional
from bson import ObjectId
from app.schema.tweet import Tweet
from app.schema.user import User
from app.utils.s3_helper import upload_image
from app.MongoDB.mongoDB_client import mongoDB_client
from app.dependencies import get_current_user
from app.errors.database_connection_error import DatabaseConnectionError
import logging

router = APIRouter()


@router.post("/tweets")
async def post_tweets(
    body: Annotated[str, Query(max_length=255), Form()],
    image: UploadFile = File(None),
    user: User = Depends(get_current_user),
):
    media_file_url = await upload_image(image) if image else None
    tweet_instance = Tweet(
        user_id=user.id,
        username=user.username,
        body=body,
        media_file_url=media_file_url,
    )
    tweet = tweet_instance.dict()
    tweet_created_id = await mongoDB_client.insert(tweet)
    return {
        "tweet": {
            **tweet,
            "_id": str(tweet_created_id),  # Convert ObjectId to string
        }
    }


@router.get("/tweets/{tweet_id}")
async def get_tweet(tweet_id: str):
    try:
        if not ObjectId.is_valid(tweet_id):
            raise HTTPException(status_code=400, detail="Invalid tweet ID format")

        tweet = await mongoDB_client.find_by_id(tweet_id=tweet_id)
        
        if not tweet:
            return None
        
        tweet["_id"] = str(tweet["_id"])
        return {"tweet": tweet}
    except HTTPException as ex:
        # This will catch the raised HTTPException and return its response.
        raise ex
    except Exception as ex:
        # Log any unexpected exceptions and raise a 500 Internal Server Error.
        logging.error(f"Unexpected error in get_tweet: {ex}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
