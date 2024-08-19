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

router= APIRouter()

@router.post('/follow')
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
        follower_id= user.id
        followee_id= request.followee_id
        response= await neo4j.follow(followee_id, follower_id)
        print(response)
        return {"response": response}