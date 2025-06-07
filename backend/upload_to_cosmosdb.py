from azure.cosmos import CosmosClient
import json

# Initialize Cosmos client
endpoint = "https://lata.documents.azure.com:443/"
key = "TIrTgr4xr1P8iCL9A19q7Xz1YVYqLf7lugGb7RIHbAmmvU9ZHXFTKCdEWtoM5lqnh5GEZf8P67SLACDb8I8XCg=="
client = CosmosClient(endpoint, key)

database_name = "MarketIntelDB"
container_name = "CompetitorNews"

database = client.get_database_client(database_name)
container = database.get_container_client(container_name)

# Load your JSON file
with open('backend/Scraped Data/competitor data/aecom_press_releases.json', 'r') as f:
    items = json.load(f)

for item in items:
    container.upsert_item(item)
