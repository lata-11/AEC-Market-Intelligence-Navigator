import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import pandas as pd

def get_global_construction_news():
    ua = UserAgent()
    headers = {'User-Agent': ua.random}
    base_url = 'https://www.globalconstructionreview.com/category/'
    topics = ['news', 'jobs', 'markets', 'perspectives', 'projects']

    news_data = []

    for topic in topics:
        topic_url = base_url + topic
        print(f"Scraping {topic_url}...")

        response = requests.get(topic_url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')

        articles = soup.find_all('article', class_='type-post')

        for article in articles[:10]:  # Limit to top 10 articles
            title_tag = article.select_one('.entry-title a')
            title = title_tag.get_text(strip=True) if title_tag else 'No title'
            link = title_tag['href'] if title_tag else 'No link'
            image_tag = article.select_one('.post-image img')
            image_url = image_tag['src'] if image_tag else 'No image'
            
            news_data.append({
                'topic': topic,
                'title': title,
                'url': link,
                'image_url': image_url,
            })

    df = pd.DataFrame(news_data)
    df.to_csv('global_construction_news.csv', index=False)
    print("Scraped and saved news articles to global_construction_news.csv")

get_global_construction_news()
