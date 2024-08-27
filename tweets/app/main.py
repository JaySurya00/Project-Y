from fastapi import FastAPI, Request
import asyncio
from app.MongoDB.mongoDB_client import mongoDB_client
from fastapi.exceptions import RequestValidationError
from app.middlewares.error_handler import error_handler
from app.errors.custom_error import CustomError
from app.routers.tweets import router as tweets_router
from app.middlewares.request_validation_handler import request_validation_error
from app.rabbitmq_wrapper import rabbitmqWrapper
from app.CDC.cdc_listener import cdc_listener
from app.middlewares.authentication import authenticate
import os

    
app = FastAPI()

@app.on_event("startup")
async def startup_event():
    if not os.getenv("MONGO_URI"):
        raise Exception("MONGO_URI not defined")
    if not os.getenv("AWS_ACCESS_KEY_ID") or not os.getenv("AWS_SECRET_ACCESS_KEY"):
        raise Exception("AWS credentials not defined")
    if not os.getenv("JWT_KEY"):
        raise Exception("JWT_KEY not defined")
    await mongoDB_client.connect()
    await rabbitmqWrapper.connect()
    asyncio.create_task(cdc_listener())
    

@app.on_event("shutdown")
async def shutdown():
    await rabbitmqWrapper.close()
    
    
app.middleware("http")(authenticate)

app.add_exception_handler(RequestValidationError, request_validation_error)
app.add_exception_handler(Exception, error_handler)
app.include_router(tweets_router, prefix="/api")
