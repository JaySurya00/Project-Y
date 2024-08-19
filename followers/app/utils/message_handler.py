import aio_pika
import json
from app.neo4j.neo4j_client import neo4j
from app.schema.user import User

async def message_handler(message: aio_pika.IncomingMessage):
    async with message.process():
        print(f"Received message: {message.body.decode()}")
        decoded_message = message.body.decode()
        user_data = json.loads(decoded_message)  # Convert JSON string to a dictionary
        user: User = User(**user_data)
        result= await neo4j.node(user)
        print(result)
