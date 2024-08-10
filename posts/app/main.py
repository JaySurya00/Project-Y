from fastapi import FastAPI
from app.DB.connection import DB_Connection
from fastapi.exceptions import RequestValidationError
from app.middlewares.error_handler import error_handler
from app.errors.custom_error import CustomError
from app.routers.posts import router as postsRouter
from app.middlewares.request_validation_handler import request_validation_error

app = FastAPI()


def start():
    DB_Connection()


start()

app.add_exception_handler(RequestValidationError, request_validation_error)
app.add_exception_handler(CustomError, error_handler)
app.include_router(postsRouter, prefix="/api")
