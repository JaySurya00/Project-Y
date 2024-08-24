from fastapi import Request
from fastapi.responses import JSONResponse
from app.errors.custom_error import CustomError

async def error_handler(request: Request, exc: Exception):
    if isinstance(exc, CustomError):
        return JSONResponse(
            status_code=exc.status_code,
            content={"errors": exc.serialize_errors()}
        )
    else:
        # Generic error response
        return JSONResponse(
            status_code=500,
            content={"errors": [{"message": "Something went wrong"}]}
        )
