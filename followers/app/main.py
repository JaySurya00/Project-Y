from fastapi import FastAPI
from app.routers.follow_router import router as follow_router
from app.errors.custom_error import CustomError
from app.middlewares.error_handler import error_handler
from app.rabbitmq_wrapper import rabbitmqWrapper
from app.neo4j.neo4j_client import neo4j
app= FastAPI()

@app.on_event("startup")
async def startup_event():
    await rabbitmqWrapper.connect()
    await rabbitmqWrapper.consume("users")
    await neo4j.connect()
    
@app.on_event("shutdown")
async def shutdown():
    await rabbitmqWrapper.close()
    print("RabbitMQ connection closed")
    await neo4j.close()
    print("Neo4j connection closed.")
    

app.include_router(follow_router, prefix='/api')

app.add_exception_handler(CustomError, error_handler)