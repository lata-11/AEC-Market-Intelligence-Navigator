import os
import time
import re
from flask import Flask, jsonify
from flask_cors import CORS
from azure.cosmos import CosmosClient, exceptions
from dateutil import parser
from dotenv import load_dotenv
from openai import AzureOpenAI

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Azure CosmosDB configuration
COSMOS_URI = os.getenv("COSMOS_URI")
COSMOS_KEY = os.getenv("COSMOS_KEY")
DATABASE_NAME = os.getenv("COSMOS_DATABASE")
CONTAINER_NAME = os.getenv("COSMOS_CONTAINER")

# Azure OpenAI configuration
OPENAI_ENDPOINT = os.getenv("OPENAI_ENDPOINT")
OPENAI_DEPLOYMENT_NAME = os.getenv("OPENAI_DEPLOYMENT_NAME")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_API_VERSION = os.getenv("OPENAI_API_VERSION")

# Initialize CosmosDB client
cosmos_client = CosmosClient(COSMOS_URI, credential=COSMOS_KEY)
database = cosmos_client.get_database_client(DATABASE_NAME)
container = database.get_container_client(CONTAINER_NAME)

# Initialize Azure OpenAI client
openai_client = AzureOpenAI(
    api_version=OPENAI_API_VERSION,
    azure_endpoint=OPENAI_ENDPOINT,
    api_key=OPENAI_API_KEY,
)

# Function to generate missing data using Azure OpenAI
def generate_description_and_impact(title, url):
    print(f"[INFO] Generating description and impact for title: {title}, URL: {url}")
    prompt = f"Generate a description highly relevant and impact level (high, medium, low) for the following:\nTitle: {title}\nURL: {url}\n"
    try:
        start_time = time.time()
        response = openai_client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=100,
            temperature=0.7,
            top_p=1.0,
            model=OPENAI_DEPLOYMENT_NAME,
        )
        elapsed_time = time.time() - start_time
        print(f"[INFO] OpenAI API call completed in {elapsed_time:.2f} seconds")

        generated_text = response.choices[0].message.content.strip()
        print(f"[INFO] Generated text: {generated_text}")

        # Split the response into description and impact
        lines = generated_text.split("\n")
        if len(lines) >= 2:
            description = lines[0].strip()
            impact = lines[1].strip().lower()
        else:
            # Handle cases where the response does not have two lines
            description = generated_text
            impact = "low"

        print(f"[INFO] Description: {description}, Impact: {impact}")
        return description, impact
    except Exception as e:
        print(f"[ERROR] Error generating data: {e}")
        return "No description available", "low"

# Function to extract competitor name from URL
def extract_competitor_from_url(url):
    """Extract competitor name from the URL."""
    if not url:
        return "Unknown Competitor"
    # Extract the domain name (e.g., "smec" from "https://www.smec.com")
    match = re.search(r"https?://(?:www\.)?([a-zA-Z0-9-]+)\.", url)
    if match:
        return match.group(1).capitalize()  # Capitalize the competitor name
    return "Unknown Competitor"

# Function to normalize and fill missing data
def normalize_item(item):
    print(f"[INFO] Normalizing item with ID: {item.get('id')}")
    raw_date = item.get("date", "")
    try:
        parsed_date = parser.parse(raw_date)
        date = parsed_date.strftime("%Y-%m-%d")
    except Exception:
        date = raw_date

    url = item.get("url") or item.get("link") or None
    title = item.get("title", "No Title")
    description = item.get("description", "").strip()
    impact = item.get("impact", "").strip().lower()

    # Normalize impact to "high," "medium," or "low"
    if "high" in impact:
        impact = "high"
    elif "medium" in impact:
        impact = "medium"
    elif "low" in impact:
        impact = "low"
    else:
        # Generate impact using LLM if not defined
        print(f"[INFO] Generating impact for item ID: {item.get('id')}")
        description, impact = generate_description_and_impact(title, url)

    # Fill description if it's empty
    if not description or description == "**Description:**":
        description = f"The article \"{title}\" highlights key developments. Visit {url} for more details."

    # Extract competitor name from URL if missing
    competitor = item.get("competitor", "Unknown Competitor")
    if competitor == "Unknown Competitor":
        competitor = extract_competitor_from_url(url)

    # Fill other fields with defaults if missing
    activity_type = item.get("activityType", "General Activity")
    region = item.get("region", "N/A")
    sector = item.get("sector", "N/A")
    estimated_value = item.get("estimatedValue", "Not Available")
    excerpt = item.get("excerpt", "No excerpt available.")
    image = item.get("image", "https://via.placeholder.com/150")
    tags = item.get("tags", [])

    # Update the item in CosmosDB with the filled data
    item["description"] = description
    item["impact"] = impact
    item["activityType"] = activity_type
    item["competitor"] = competitor
    item["region"] = region
    item["sector"] = sector
    item["estimatedValue"] = estimated_value
    item["excerpt"] = excerpt
    item["image"] = image
    item["tags"] = tags

    try:
        container.upsert_item(item)
        print(f"[INFO] Backfilled item with ID: {item.get('id')} in CosmosDB")
    except Exception as e:
        print(f"[ERROR] Error updating item in CosmosDB: {e}")

    return {
        "id": item.get("id"),
        "title": title,
        "date": date,
        "url": url,
        "excerpt": excerpt,
        "image": image,
        "tags": tags,
        "activityType": activity_type,
        "competitor": competitor,
        "description": description,
        "region": region,
        "sector": sector,
        "estimatedValue": estimated_value,
        "impact": impact,
    }

# API endpoint to fetch news data
@app.route('/api/news', methods=['GET'])
def get_news():
    print("[INFO] Fetching news data...")
    try:
        start_time = time.time()
        # Fetch all items from CosmosDB
        items = list(container.read_all_items())
        fetch_time = time.time() - start_time
        print(f"[INFO] Fetched {len(items)} items from CosmosDB in {fetch_time:.2f} seconds")

        # Return the fetched items directly without normalization
        sorted_items = sorted(items, key=lambda x: x.get('date', ""), reverse=True)
        sort_time = time.time() - fetch_time - start_time
        print(f"[INFO] Sorted items in {sort_time:.2f} seconds")

        return jsonify(sorted_items)
    except exceptions.CosmosHttpResponseError as e:
        print(f"[ERROR] Error fetching data from CosmosDB: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask app...")
    app.run(debug=True)