import client, { Connection, Channel, ConsumeMessage } from 'amqplib';

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
                console.log("Connection attempt failed to RabbitMQ. Retrying....");
                await new Promise((resolve, reject)=>{
                    setTimeout(resolve, 5000)
                })
            }
        }
        throw new Error("Failed to connect RabbitMQ after several reattempts");
    }

    async publish(queue: string, payload: Object) {
        if (!this._connection) {
            throw new Error("Cannot create channel before connecting");
        }
        try {
            const channel: Channel = await this._connection.createChannel();
            await channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)))
            console.log("User created event published");
        }
        catch (err) {
            throw new Error("Publishing event failed " + err);
        }
    }
}

const rabbitmqWrapper = new RabbitMQWrapper();
export default rabbitmqWrapper;