import neo4jClient from "../neo4j/neo4jClient";
import redisClient from "../redis/redisClient";

export default async function storeFeedsForFollowers(userId: number, postId: string) {
    const client = redisClient.client;
    const followers= await neo4jClient.getFollowersID(userId);
    for (const follower of followers) {
        const key = `${follower}`;  // Key format: user:2:posts, user:3:posts, etc.
        await client!.lPush(key, postId);         // Push the post_id to the list
    }

    console.log(`Stored post_id ${postId} for followers ${followers}`);
}


