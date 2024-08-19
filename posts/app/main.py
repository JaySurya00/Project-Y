from fastapi import FastAPI
import asyncio
from app.MongoDB.mongoDB_client import mongoDB_client
from fastapi.exceptions import RequestValidationError
from app.middlewares.error_handler import error_handler
from app.errors.custom_error import CustomError
from app.routers.posts import router as postsRouter
from app.middlewares.request_validation_handler import request_validation_error
from app.rabbitmq_wrapper import rabbitmqWrapper
from app.CDC.cdc_listener import cdc_listener
    
app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await mongoDB_client.connect()
    await rabbitmqWrapper.connect()
    asyncio.create_task(cdc_listener())
    

@app.on_event("shutdown")
async def shutdown():
    await rabbitmqWrapper.close()

app.add_exception_handler(RequestValidationError, request_validation_error)
app.add_exception_handler(CustomError, error_handler)
app.include_router(postsRouter, prefix="/api")
