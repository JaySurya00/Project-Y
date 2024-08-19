import client, { Connection, Channel, ConsumeMessage, Message } from 'amqplib';
import msgHandler from './utils/handlerPostMsg';

class RabbitMQWrapper {
    private _connection?: Connection;

    getClient() {
        if (!this._connection) {
            throw new Error("Cannot access RabbitMQ client before connecting")
        }
        return this._connection;
    }

    async connect() {
        if(this._connection) return this._connection
        for (let i = 1; i < 6; i++) {
            try {
                this._connection = await client.connect('amqp://jaysurya00:muskansinghvi@myrabbit:5672');
                console.log("Connected to RabbitMQ")
                return this._connection;
            }
            catch (err) {
                console.log("Connection attempt failed to RabbitMQ. Retrying...");
                await new Promise((resolve, reject)=>{
                    setTimeout(resolve, 5000)
                })
            }
        }
        throw new Error("Failed to connect RabbitMQ after several reattempts");
    }

    async consume(queue: string) {
        if (!this._connection) {
            throw new Error("Cannot create channel before connecting");
        }
        try {
            const channel: Channel = await this._connection.createChannel();
            channel.assertQueue(queue);
            channel.consume(queue,async (msg)=>{
                if (msg !== null) {
                    msgHandler(msg);
                    channel.ack(msg);
                  } else {
                    console.log('Consumer cancelled by server');
                  }
            });
            console.log(`Started consuming from the queue ${queue}`);
        }
        catch (err) {
            throw new Error("Publishing event failed " + err);
        }
    }
}

const rabbitmqWrapper = new RabbitMQWrapper();
export default rabbitmqWrapper;