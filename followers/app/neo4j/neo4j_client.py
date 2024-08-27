from neo4j import GraphDatabase
from app.schema.user import User
import os



class Neo4jWrapper:
    __driver = None

    async def get_driver(self):
        if self.__driver is None:
            raise Exception("Cannot get Neo4j drive before connection")
        return self.__driver

    async def connect(self):
        try:
            self.__driver = GraphDatabase.driver(
                os.getenv("NEO4J_URI"), auth=(os.getenv("NEO4J_USERNAME"), os.getenv("NEO4J_PASSWORD"))
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

    async def follow(self, followee_username: str, follower_id: int):
        if self.__driver is None:
            raise Exception("Cannot create node before connection to Neo4j")
        driver = self.__driver

        query = """
        MATCH (follower:Person {id: $follower_id}), (followee:Person {username: $followee_username})
        MERGE (follower)-[r:FOLLOW]->(followee)
        RETURN follower, followee, r
        """

        result, summary, key = driver.execute_query(
            query,
            follower_id=follower_id,
            followee_username=followee_username,
            database_="neo4j",
        )

        response = result[0][1] if result else None
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
        followers = [record["follower"] for record in result] if result else []

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
        followees = [record["followee"] for record in result] if result else []

        return followees

    async def youMayKnow(self, user_id: int):
        if self.__driver is None:
            raise Exception("Cannot get suggestions before connection to Neo4j")

        driver = self.__driver
        query = """
        MATCH (user:Person {id: $user_id})-[:FOLLOW]->(followee:Person)
        OPTIONAL MATCH (followee)-[:FOLLOW]->(suggested:Person)
        WHERE NOT (user)-[:FOLLOW]->(suggested) AND suggested.id <> $user_id
        
        OPTIONAL MATCH (follower:Person)-[:FOLLOW]->(followee)
        WHERE NOT (user)-[:FOLLOW]->(follower) AND follower.id <> $user_id
        
        RETURN DISTINCT suggested, follower
        """
        result, summary, key = driver.execute_query(
            query, user_id=user_id, database_="neo4j"
        )

        suggestions = []

        if result:
            for record in result:
                if record["suggested"]:
                    suggestions.append(record["suggested"])
                if record["follower"]:
                    suggestions.append(record["follower"])

        return suggestions

    async def unfollow(self, followee_username: str, follower_username: str):
        if self.__driver is None:
            raise Exception("Cannot unfollow before connection to Neo4j")
        driver = self.__driver
        query = """
        MATCH (follower:Person {username: $follower_username})-[r:FOLLOW]->(followee:Person {username: $followee_username})
        DELETE r
        RETURN follower, followee
        """
        result, summary, key = driver.execute_query(
            query,
            follower_username=follower_username,
            followee_username=followee_username,
            database_="neo4j",
        )
        response = result[0] if result else None
        return response

    async def close(self):
        if self.__driver:
            self.__driver.close()


neo4j = Neo4jWrapper()
