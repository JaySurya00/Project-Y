import app from "./app";
import { DBConnection } from "./DB/users_db";
import rabbitmqWrapper from "./rabbitmqWrapper";

const start= async()=>{
    try{
        if(!process.env.JWT_KEY){
            throw new Error('JWT_KEY must be defined')
        }
        if(!process.env.RABBITMQ_URI){
            throw new Error('RABBITMQ_URI must be defined')
        }
        await DBConnection();
        await rabbitmqWrapper.connect();

        process.on("SIGTERM", async()=>{
            await rabbitmqWrapper.getClient().close();
            console.log("RabbitMQ connection closed");
            process.exit(0);
        })
        process.on("SIGINT", async()=>{
            await rabbitmqWrapper.getClient().close();
            console.log("RabbitMQ connection closed");
            process.exit(0);
        })
    }catch(err){
        console.log(err);
    }
}


app.listen(3001, async ()=>{
    await start();
    console.log('Listening on PORT 3001');
})