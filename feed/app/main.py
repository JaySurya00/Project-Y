from fastapi import FastAPI
from app.middlewares.error_handler import error_handler
from app.errors.custom_error import CustomError
from app.middlewares.request_validation_handler import request_validation_error
from fastapi.exceptions import RequestValidationError
from app.redis.redis_client import redisClient

from app.routers.timeline import router as timelineRouter

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    redisClient.connect()
    

@app.on_event("shutdown")
async def shutdown():
    redisClient.close()


app.include_router(timelineRouter,prefix='/api')

app.add_exception_handler(RequestValidationError, request_validation_error)
app.add_exception_handler(CustomError, error_handler)