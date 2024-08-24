from typing import List
import httpx
import asyncio

async def get_tweets(tweets_id: List[bytes], cookie: str) -> List[httpx.Response]:
    print(tweets_id)
    async with httpx.AsyncClient() as client:
        tasks = [client.get(f"http://tweets-service:3003/api/tweets/{tweet_id.decode('utf-8')}", cookies={"session":cookie}) for tweet_id in tweets_id]
        responses = await asyncio.gather(*tasks)
        
        tweets = []
        for response in responses:
            tweet_data = response.json()
            if tweet_data:
                tweets.append(tweet_data)
    
    return tweets
