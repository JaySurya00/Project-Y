from neo4j import GraphDatabase
from app.schema.user import User


NEO4J_URI = "neo4j+s://4a289658.databases.neo4j.io"
NEO4J_USERNAME = "neo4j"
NEO4J_PASSWORD = "T3jg7pT-Gd0SYjzldToD_JVv9tPrv4pm-tME6l5y-JI"
AURA_INSTANCEID = "4a289658"
AURA_INSTANCENAME = "Instance01"


class Neo4jWrapper:
    __driver = None

    async def get_driver(self):
        if self.__driver is None:
            raise Exception("Cannot get Neo4j drive before connection")
        return self.__driver

    async def connect(self):
        try:
            self.__driver = GraphDatabase.driver(
                NEO4J_URI, auth=(NEO4J_USERNAME, NEO4J_PASSWORD)
            )
            self.__driver.verify_connectivity()
            print("Connected to Neo4j instance")
            return self.__driver
        except Exception as ex:
            raise ex

    async def node(self, user: User):
        if self.__driver is None:
            raise Exception("Cannot create node before connection to Neo4j")
        driver = self.__driver
        result, summary, key = driver.execute_query(
            "CREATE (user:Person {id: $id,first_name: $first_name, last_name: $last_name, username: $username, email: $email }) RETURN user",
            id=user.id,
            first_name=user.first_name,
            last_name=user.last_name,
            username=user.username,
            email=user.email,
            database_="neo4j",
        )
        created_person = result[0] if result else None
        return created_person

    async def follow(self, followee_id: int, follower_id: int):
        if self.__driver is None:
            raise Exception("Cannot create node before connection to Neo4j")
        driver = self.__driver
        query = """
        MATCH (follower:Person {id: $follower_id}), (followee:Person {id: $followee_id})
        CREATE (follower)-[:FOLLOW]->(followee)
        RETURN follower, followee
        """
        result, summary, key = driver.execute_query(
            query, follower_id=follower_id, followee_id=followee_id, database_="neo4j"
        )
        response = result[0] if result else None
        return response

    async def followers(self, user_id: int):
        if self.__driver is None:
            raise Exception("Cannot create node before connection to Neo4j")

        driver = self.__driver
        query = """
        MATCH (follower:Person)-[:FOLLOW]->(user:Person {id: $user_id})
        RETURN follower
        """
        result, summary, key = driver.execute_query(
            query, user_id=user_id, database_="neo4j"
        )
        followers = [record['follower'] for record in result] if result else []
        
        return followers
    
    async def followees(self, user_id: int):
        if self.__driver is None:
            raise Exception("Cannot create node before connection to Neo4j")

        driver = self.__driver
        query = """
        MATCH (user:Person {id: $user_id})-[:FOLLOW]->(followee:Person)
        RETURN followee
        """
        result, summary, key = driver.execute_query(
            query, user_id=user_id, database_="neo4j"
        )
        followees = [record['followee'] for record in result] if result else []
        
        return followees

    async def close(self):
        if self.__driver:
            self.__driver.close()


neo4j = Neo4jWrapper()
