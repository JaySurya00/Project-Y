from fastapi import APIRouter, Request, Cookie
from typing import Annotated
import jwt
from jwt.exceptions import DecodeError, ExpiredSignatureError, InvalidTokenError
import base64
import json
from app.errors.not_authorized_error import NotAuthorizedError
from app.schema.user import User
from app.schema.follow_request import FollowRequest
from app.neo4j.neo4j_client import neo4j
import os

router= APIRouter()

@router.post('/follows')
async def follower_handler(request: FollowRequest, session: Annotated[str, Cookie()]=None):
    try:
        if session is None:
            raise NotAuthorizedError()
        jwt_token = json.loads(base64.b64decode(session).decode("utf-8"))["jwt"]
        user = User(**jwt.decode(jwt_token, os.getenv('JWT_KEY'), algorithms=["HS256"]))
    except (DecodeError, ExpiredSignatureError, InvalidTokenError, TypeError) as err:
        raise NotAuthorizedError()
    else:
        follower_id= user.id
        followee_username= request.username
        response= await neo4j.follow(followee_username=followee_username, follower_id=follower_id)
        return {"user": response}
    
@router.get('/follows/followers')
async def follower_handler(session: Annotated[str, Cookie()]=None):
    try:
        if session is None:
            raise NotAuthorizedError()
        jwt_token = json.loads(base64.b64decode(session).decode("utf-8"))["jwt"]
        print(jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
        user = User(**jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
    except (DecodeError, ExpiredSignatureError, InvalidTokenError, TypeError) as err:
        raise NotAuthorizedError()
    else:
        response= await neo4j.followers(user_id=user.id)
        return {"followers": response}
    
@router.get('/follows/followees')
async def follower_handler(session: Annotated[str, Cookie()]=None):
    try:
        if session is None:
            raise NotAuthorizedError()
        jwt_token = json.loads(base64.b64decode(session).decode("utf-8"))["jwt"]
        print(jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
        user = User(**jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
    except (DecodeError, ExpiredSignatureError, InvalidTokenError, TypeError) as err:
        raise NotAuthorizedError()
    else:
        response= await neo4j.followees(user_id=user.id)
        return {"followees": response}
    

@router.get('/follows/youmayknow')
async def follower_handler(session: Annotated[str, Cookie()]=None):
    try:
        if session is None:
            raise NotAuthorizedError()
        jwt_token = json.loads(base64.b64decode(session).decode("utf-8"))["jwt"]
        print(jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
        user = User(**jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
    except (DecodeError, ExpiredSignatureError, InvalidTokenError, TypeError) as err:
        raise NotAuthorizedError()
    else:
        response= await neo4j.youMayKnow(user_id= user.id)
        return {"youMayKnow": response}
    

@router.post('/follows/unfollow')
async def follower_handler(request: FollowRequest, session: Annotated[str, Cookie()]=None):
    try:
        if session is None:
            raise NotAuthorizedError()
        jwt_token = json.loads(base64.b64decode(session).decode("utf-8"))["jwt"]
        print(jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
        user = User(**jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
    except (DecodeError, ExpiredSignatureError, InvalidTokenError, TypeError) as err:
        raise NotAuthorizedError()
    else:
        follower_username= user.username
        followee_username= request.username
        response= await neo4j.unfollow(followee_username, follower_username)
        return {"response": response}
    
@router.post('/follows/remove')
async def follower_handler(request: FollowRequest, session: Annotated[str, Cookie()]=None):
    try:
        if session is None:
            raise NotAuthorizedError()
        jwt_token = json.loads(base64.b64decode(session).decode("utf-8"))["jwt"]
        print(jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
        user = User(**jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
    except (DecodeError, ExpiredSignatureError, InvalidTokenError, TypeError) as err:
        raise NotAuthorizedError()
    else:
        followee_username= user.username
        follower_username= request.username
        response= await neo4j.unfollow(followee_username, follower_username)
        return {"response": response}
    