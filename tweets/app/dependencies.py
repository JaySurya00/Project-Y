from fastapi import HTTPException, Request
from app.schema.user import User
from app.errors.not_authorized_error import NotAuthorizedError

def get_current_user(request: Request) -> User:
    user = request.state.user
    if not user:
        raise NotAuthorizedError()
    return user