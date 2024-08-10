from fastapi import APIRouter, File, Form, UploadFile, Query, Cookie
from datetime import datetime, timezone
import base64
import json
import jwt
from jwt.exceptions import DecodeError, ExpiredSignatureError, InvalidTokenError
from app.schema.post import Post
from app.schema.user import User
from app.utils.s3_helper import upload_image
from app.errors.not_authorized_error import NotAuthorizedError
from typing import Annotated, Optional
from app.DB.connection import collection

router = APIRouter()


@router.post("/posts")
async def posts_handler(
    user_id: Annotated[str, Form()],
    body: Annotated[str, Query(max_length=255), Form()],
    file: UploadFile = File(None),
    session: Annotated[str | None, Cookie()] = None,
):
    try:
        jwt_token = json.loads(base64.b64decode(session).decode("utf-8"))["jwt"]
        user = User(**jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
    except (DecodeError, ExpiredSignatureError, InvalidTokenError, TypeError) as err:
        raise NotAuthorizedError()
    else:
        user_id = user.id
        media_file_url = await upload_image(file) if file else None
        post_instance = Post(
            user_id=str(user_id),
            body=body,
            media_file_url=media_file_url,
            created_at=datetime.now(timezone.utc),
        )
        post = post_instance.model_dump()
        result = collection.insert_one(post)
        return {
            "post": {
                **post,
                "_id": str(result.inserted_id),  # Convert ObjectId to string
            }
        }
