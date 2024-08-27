import neo4j, {Record, Node} from "neo4j-driver"
import { BadRequestError } from "@jaysuryaraj00/custom-middlewares"

const NEO4J_URI = process.env.NEO4J_URI
const NEO4J_USERNAME = process.env.NEO4J_USERNAME
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD
const AURA_INSTANCEID = process.env.NEO4J_INSTANCEID
const AURA_INSTANCENAME = process.env.NEO4J_INSTANCENAME


class Neo4JClient {
    private _driver: any
    async connect() {
        this._driver = neo4j.driver(NEO4J_URI!, neo4j.auth.basic(NEO4J_USERNAME!, NEO4J_PASSWORD!));
        const serverInfo = await this._driver.getServerInfo()
        console.log('Connection established')
        console.log(serverInfo)
    } catch(err: any) {
        console.log(`Connection error\n${err}\nCause: ${err.cause}`)
    }

    async getFollowersID(userId: number) {
        if (!this._driver) {
            throw new BadRequestError("Please connect to Neo4J instance.");
        }
    
        const { records, summary, keys } = await this._driver.executeQuery(
            "MATCH (followers:Person)-[f:FOLLOW]->(user:Person {id: $userId}) RETURN followers",
            { userId: userId },
            { database: 'neo4j' }
        );
    
        // Ensure records is typed as Record[]
        const followerRecords: Array<Record> = records;
    
        // Extract and process the followers
        const followerList = followerRecords.map((record: Record) => {
            // Extract the follower node from each record
            const followerNode: Node = record.get('followers');
            return followerNode.properties;  // Access the properties of the follower node
        });
        const followersID= followerList.map((user)=>{
            return user.id['low'];
        })
        followersID.push(userId);
        return followersID;
    }
}

const neo4jClient= new Neo4JClient();
export default neo4jClient;