import storeFeedsForFollowers from "./storeFeed";

export default async function msgHandler(msg:any) {
    try {
        // Convert the message content to a string
        const messageContent = msg.content.toString();

        // Parse the JSON string into an object
        const postMsg = JSON.parse(messageContent);
        console.log('Recieved Message '+ messageContent);
        await storeFeedsForFollowers(postMsg.user_id, postMsg.post_id)
        return {userId: postMsg.user_id, postId: postMsg.post_id};

    } catch (error) {
        console.error('Failed to parse message:', error);
    }
}
