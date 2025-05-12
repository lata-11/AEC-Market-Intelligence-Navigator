import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import pandas as pd

def get_smart_cities_news():
    ua = UserAgent()
    headers = {'User-Agent': ua.random}
    base_url = 'https://www.smartcitiesdive.com/topic/'
    topics = ['transportation', 'buildings-design', 'climate-resilience', 'energy-utilities', 'housing', 'tech-data', 'governance', 'equity']

    news_data = []

    for topic in topics:
        topic_url = base_url + topic
        print(f"Scraping {topic_url}...")

        response = requests.get(topic_url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')

        articles = soup.find_all('li', class_='row feed__item')

        for article in articles[:10]:  # Limit to top 10 articles
            title_tag = article.select_one('.feed__title a')
            title = title_tag.get_text(strip=True) if title_tag else 'No title'
            link = 'https://www.smartcitiesdive.com' + title_tag['href'] if title_tag else 'No link'
            image_tag = article.select_one('.feed__image-container img')
            image_url = image_tag['src'] if image_tag else 'No image'
            summary_tag = article.select_one('.feed__description')
            summary = summary_tag.get_text(strip=True) if summary_tag else 'No summary'
            date_tag = article.select_one('.secondary-label')
            pub_date = date_tag.get_text(strip=True) if date_tag else 'Unknown'

            news_data.append({
                'topic': topic,
                'title': title,
                'summary': summary,
                'url': link,
                'image_url': image_url,
                'date': pub_date,
            })

    df = pd.DataFrame(news_data)
    df.to_csv('smart_cities_news.csv', index=False)
    print("Scraped and saved news articles to smart_cities_news.csv")

get_smart_cities_news()
