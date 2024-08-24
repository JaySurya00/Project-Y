from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from app.errors.not_authorized_error import NotAuthorizedError
import base64
import json
import logging
import jwt
from jwt.exceptions import DecodeError, ExpiredSignatureError, InvalidTokenError
from app.schema.user import User

async def authenticate(request: Request, call_next):
    session_cookie = request.cookies.get("session")  # Assuming the cookie is named 'session'
    try:
        if not session_cookie:
            raise NotAuthorizedError()
        
        decoded_session = json.loads(base64.b64decode(session_cookie).decode("utf-8"))
        jwt_token = decoded_session.get("jwt")
        
        if not jwt_token:
            raise NotAuthorizedError()

        user = User(**jwt.decode(jwt_token, "muskansinghvi", algorithms=["HS256"]))
        request.state.user = user
        
        response = await call_next(request)
        return response
    except (DecodeError, ExpiredSignatureError, InvalidTokenError, TypeError, KeyError, NotAuthorizedError) as err:
        return JSONResponse(
            status_code=401,
            content={"errors": [{"message": "Not Authorized"}]},
        )
    except Exception as ex:
        logging.error(f"Error retrieving tweet: {ex}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
