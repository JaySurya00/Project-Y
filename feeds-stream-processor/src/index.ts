import app from './app';
import rabbitmqWrapper from './rabbitmqWrapper';
import redisClient from './redis/redisClient';
import neo4jClient from './neo4j/neo4jClient';

async function start(){
    if(!process.env.NEO4J_URI || !process.env.NEO4J_USERNAME || !process.env.NEO4J_PASSWORD){
        throw new Error('NEO4J env not defined')
    }
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY not defined')
    }
    if(!process.env.RABBITMQ_URI){
        throw new Error('RABBITMQ_URI not defined')
    }
    await rabbitmqWrapper.connect();
    await rabbitmqWrapper.consume('posts');
    await neo4jClient.connect();
    await redisClient.connect();
    process.on("SIGTERM", async()=>{
        await rabbitmqWrapper.getClient().close();
        console.log("RabbitMQ connection closed");
        await redisClient.close();
        console.log('Redis connection closed');
        process.exit(0);
    })
    process.on("SIGINT", async()=>{
        await rabbitmqWrapper.getClient().close();
        console.log("RabbitMQ connection closed");
        await redisClient.close();
        console.log('Redis connection closed');
        process.exit(0);
    })
    
}



app.listen(3002, async()=>{
    await start();
    console.log("Listening on port 3002");
})