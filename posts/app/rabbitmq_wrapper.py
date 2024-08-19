import asyncio
import aio_pika
import aio_pika.abc
import json
from typing import Annotated
from app.utils.message_handler import message_handler
from app.schema.post import Post

class RabbitMQWrapper:
    __connection: aio_pika.abc.AbstractConnection=None
    __channel: aio_pika.abc.AbstractChannel

    async def connect(self):
        if self.__connection is not None:
            return self.__connection
        for i in range(5):
            try:
                self.__connection = await aio_pika.connect_robust(
                    "amqp://jaysurya00:muskansinghvi@myrabbit:5672"
                )
                print("Connected to RabbitMQ")
                self.__channel= await self.__connection.channel()
                return self.__connection
            except Exception as err:
                print(f"Connection attempt to RabbitMQ failed. Retries{i}")
                await asyncio.sleep(15)
        raise Exception(
            "Connection attempt to RabbitMQ failed after several reattempts"
        )

    async def consume(self, queue_name: str):
        queue = await self.__channel.declare_queue(queue_name, durable=True)
        await queue.consume(message_handler)
        print(f"Started consuming from queue: {queue_name}")
        
        
    async def publish(self, queue_name: str, payload: dict):
        if self.__connection is None:
            raise Exception("Cannot publish before connection to Neo4J")
        try:
            # Ensure the queue exists
            await self.__channel.declare_queue(queue_name, durable=True)

            # Serialize the Post object to a JSON string
            message_body = json.dumps(payload)

            # Create the message to be published
            message = aio_pika.Message(
                body=message_body.encode('utf-8'),
                delivery_mode=aio_pika.DeliveryMode.PERSISTENT  # Ensure message is persistent
            )
            # Publish the message to the queue
            await self.__channel.default_exchange.publish(message, routing_key=queue_name)
            
            print(f"Published message to queue: {queue_name}")
        except Exception as ex:
            raise Exception(f"Error occured while publishing message to queue {queue_name}")
        
        
        
    async def close(self):
        if self.__connection:
            await self.__connection.close()
            print("RabbitMq connection closed")


rabbitmqWrapper = RabbitMQWrapper()
