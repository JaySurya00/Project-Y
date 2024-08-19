from fastapi import APIRouter, File, Form, UploadFile, Query, Cookie, HTTPException
from typing import Annotated, Optional

from bson import ObjectId
import base64
import json
import jwt
from jwt.exceptions import DecodeError, ExpiredSignatureError, InvalidTokenError

from app.schema.post import Post
from app.schema.user import User
from app.utils.s3_helper import upload_image
from app.errors.not_authorized_error import NotAuthorizedError
from app.MongoDB.mongoDB_client import mongoDB_client

router = APIRouter()


@router.post("/posts")
async def posts_handler(
    body: Annotated[str, Query(max_length=255), Form()],
    file: UploadFile = File(None),
    session: Annotated[Optional[str], Cookie()] = None,
):
    try:
        if session is None:
            raise NotAuthorizedError()
        jwt_token = json.loads(base64.b64decode(session).decode("utf-8"))["jwt"]
        user = User(**jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
    except (DecodeError, ExpiredSignatureError, InvalidTokenError, TypeError) as err:
        raise NotAuthorizedError()
    else:
        media_file_url = await upload_image(file) if file else None
        post_instance = Post(
            user_id= user.id,
            body=body,
            media_file_url=media_file_url,
        )
        post = post_instance.model_dump()
        post_created_id = await mongoDB_client.insert(post)
        return {
            "post": {
                **post,
                "_id": str(post_created_id),  # Convert ObjectId to string
            }
        }

