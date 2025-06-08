from azure.cosmos import CosmosClient, exceptions
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Azure CosmosDB configuration
COSMOS_URI = os.getenv("COSMOS_URI")
COSMOS_KEY = os.getenv("COSMOS_KEY")
DATABASE_NAME = os.getenv("COSMOS_DATABASE")
CONTAINER_NAME = os.getenv("COSMOS_CONTAINER")

# Initialize CosmosDB client
cosmos_client = CosmosClient(COSMOS_URI, credential=COSMOS_KEY)
database = cosmos_client.get_database_client(DATABASE_NAME)
container = database.get_container_client(CONTAINER_NAME)

# Query to check for missing description or impact fields
query = """
SELECT c.id, c.title, c.description, c.impact
FROM c
WHERE IS_DEFINED(c.description) = false OR IS_DEFINED(c.impact) = false
"""

def run_query():
    try:
        print("Running query to check for missing data...")
        items = list(container.query_items(
            query=query,
            enable_cross_partition_query=True
        ))
        if items:
            print(f"Found {len(items)} items with missing data:")
            for item in items:
                print(f"ID: {item['id']}, Title: {item['title']}, Description: {item.get('description')}, Impact: {item.get('impact')}")
        else:
            print("All items have description and impact fields filled.")
    except exceptions.CosmosHttpResponseError as e:
        print(f"Error running query: {e}")
        
# Query to fetch a few data points
query = """
SELECT TOP 5 c.id, c.title, c.description, c.impact
FROM c
"""

def run_query():
    try:
        print("Fetching a few data points from CosmosDB...")
        items = list(container.query_items(
            query=query,
            enable_cross_partition_query=True
        ))
        if items:
            print(f"Found {len(items)} items:")
            for item in items:
                print(f"ID: {item['id']}, Title: {item['title']}, Description: {item.get('description')}, Impact: {item.get('impact')}")
        else:
            print("No items found in the database.")
    except exceptions.CosmosHttpResponseError as e:
        print(f"Error running query: {e}")

if __name__ == "__main__":
    run_query()