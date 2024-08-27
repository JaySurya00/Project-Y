from fastapi import FastAPI
from app.middlewares.error_handler import error_handler
from app.errors.custom_error import CustomError
from app.middlewares.request_validation_handler import request_validation_error
from fastapi.exceptions import RequestValidationError
from app.redis.redis_client import redisClient
import os
from app.routers.feeds import router as feedsRouter

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    if not os.getenv("REDIS_HOST") or not os.getenv("REDIS_PORT"):
        raise Exception("Redis env not defined")
    redisClient.connect()
    

@app.on_event("shutdown")
async def shutdown():
    redisClient.close()


app.include_router(feedsRouter,prefix='/api')

app.add_exception_handler(RequestValidationError, request_validation_error)
app.add_exception_handler(CustomError, error_handler)