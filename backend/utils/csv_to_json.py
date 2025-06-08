import csv
import json
import uuid

input_csv = 'backend/Scraped Data/ News and Trends/smart_cities_news.csv'
output_json = 'backend/Scraped Data/ News and Trends/smart_cities_news.json'

data = []
with open(input_csv, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        # Add a unique id to each row
        row['id'] = str(uuid.uuid4())
        data.append(row)

# Write to JSON file
with open(output_json, 'w', encoding='utf-8') as jsonfile:
    json.dump(data, jsonfile, indent=4)

print(f"Converted {len(data)} rows with UUIDs to {output_json}")
