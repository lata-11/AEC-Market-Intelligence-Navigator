from azure.cosmos import CosmosClient, exceptions
from dotenv import load_dotenv
import os
from app import normalize_item

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

def backfill_data():
    print("[INFO] Starting backfill process...")
    try:
        items = list(container.read_all_items())
        print(f"[INFO] Fetched {len(items)} items from CosmosDB for backfilling")

        for item in items:
            normalize_item(item)  # Normalize and backfill each item

        print("[INFO] Backfill process completed successfully")
    except exceptions.CosmosHttpResponseError as e:
        print(f"[ERROR] Error during backfill process: {e}")

if __name__ == "__main__":
    backfill_data()