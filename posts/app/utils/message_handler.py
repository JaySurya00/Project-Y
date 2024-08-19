import aio_pika

async def message_handler(message: aio_pika.IncomingMessage):
    async with message.process():
        print(f"Received message: {message.body.decode()}")
        # Process the message here
        # Acknowledge the message by using `message.ack()` if not using `process()` context
