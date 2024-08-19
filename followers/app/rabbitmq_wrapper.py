import asyncio
import aio_pika
import aio_pika.abc
from typing import Annotated
from app.utils.message_handler import message_handler


class RabbitMQWrapper:
    __connection: aio_pika.abc.AbstractConnection = None
    __channel: aio_pika.abc.AbstractChannel
    
    def get_client(self):
        if(self.__connection is None):
            raise Exception("Cannot get client before connection")
        else:
            return self.__connection

    async def connect(self):
        if self.__connection is not None:
            return self.__connection
        for i in range(5):
            try:
                self.__connection = await aio_pika.connect_robust("amqp://jaysurya00:muskansinghvi@myrabbit:5672")
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
        
    async def close(self):
        if self.__connection:
            await self.__connection.close()


rabbitmqWrapper = RabbitMQWrapper()
