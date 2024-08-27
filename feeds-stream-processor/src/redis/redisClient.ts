import { createClient, RedisClientType } from "redis";
import { DatabaseConnectionError, BadRequestError } from "@jaysuryaraj00/custom-middlewares";

class RedisClient {
    private _client?: RedisClientType;

    get client(): RedisClientType | undefined {
        if(this._client){
            return this._client;
        }
        throw new BadRequestError('Cannot get redis client before connection');
    }

    async connect(): Promise<RedisClientType> {
        if (this._client) return this._client;
        try {
            this._client = createClient({ url: process.env.REDIS_URI });
            await this._client.connect();
            console.log('Connected to RedisDB');
            return this._client;
        } 
        catch (err) {
            console.log(`Redis connection error: ${err}`);
            throw new DatabaseConnectionError();
        }
    }

    async close(){
        if(this._client){
            this._client.disconnect()
        }
    }


}

const redisClient = new RedisClient();
export default redisClient;
