from redis import Redis, RedisError
from typing import Optional
import os

from app.errors.database_connection_error import DatabaseConnectionError
from app.errors.bad_request_error import BadRequestError


class RedisClient:
    __client: Optional[Redis] = None

    def connect(self):
        try:
            self.__client = Redis(host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"))
            self.__client.ping()  # Test the connection
            print("Connected to Redis")
        except RedisError as ex:
            raise DatabaseConnectionError(f"Failed to connect to Redis: {ex}")

    def get_client(self) -> Redis:
        if self.__client is None:
            self.connect()
        return self.__client

    def get_posts(self, user_id: str):
        if self.__client is None:
            raise BadRequestError("Cannot get posts before connection to Redis")
        posts = self.__client.lrange(user_id, 0, -1)
        return posts
    
    def close(self):
        if self.__client:
            try:
                self.__client.close()
                print('Redis connection closed')
            except RedisError as ex:
                print(f"Failed to close Redis connection: {ex}")
            finally:
                self.__client = None


redisClient = RedisClient()
