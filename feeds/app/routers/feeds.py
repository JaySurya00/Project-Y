from fastapi import APIRouter, Cookie
from typing import Annotated, Optional

from jwt.exceptions import DecodeError, ExpiredSignatureError, InvalidTokenError
import json
import jwt
import base64

from app.errors.not_authorized_error import NotAuthorizedError
from app.schema.user import User

from app.redis.redis_client import redisClient
from app.utils.make_tweets_request import get_tweets

router= APIRouter()

@router.get('/feeds')
async def getTimeline(session: Annotated[Optional[str], Cookie()] = None):
    try:
        if session is None:
            raise NotAuthorizedError()
        jwt_token = json.loads(base64.b64decode(session).decode("utf-8"))["jwt"]
        user = User(**jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
    except (DecodeError, ExpiredSignatureError, InvalidTokenError, TypeError) as err:
        raise NotAuthorizedError()
    else:
        user_id= user.id
        tweets_id= redisClient.get_posts(str(user_id))
        
        tweets= await get_tweets(tweets_id=tweets_id,cookie=session)
        return tweets
        