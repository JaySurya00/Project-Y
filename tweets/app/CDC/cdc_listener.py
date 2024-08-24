import asyncio
from pymongo.errors import OperationFailure
from app.MongoDB.mongoDB_client import mongoDB_client
from app.rabbitmq_wrapper import rabbitmqWrapper

async def cdc_listener():
    try:
        async with mongoDB_client.collection.watch() as stream:
            async for change in stream:
                print("Change detected:", change)
                if change['operationType'] == 'insert':
                    # Extract data from the change document
                    full_document = change.get('fullDocument', {})
                    
                    # Extract relevant fields
                    user_id = full_document.get('user_id')
                    post_id = str(full_document.get('_id'))  # Convert ObjectId to string
                    
                    # Publish to RabbitMQ
                    await rabbitmqWrapper.publish(
                        "posts",
                        {"user_id": user_id, "post_id": post_id}
                    )
    except Exception as e:
        print(f"Error occurred while watching collection: {e}")


