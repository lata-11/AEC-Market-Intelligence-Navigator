import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import pandas as pd

def scrape_aecom_press_releases():
    ua = UserAgent()
    headers = {'User-Agent': ua.random}
    url = 'https://aecom.com/press-releases/'

    # Send a GET request to the website
    response = requests.get(url, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all press release items on the page
        press_releases = soup.find_all('div', class_='press-release-item-wrapper')

        # Create a list to store the scraped data
        news_data = []

        for pr in press_releases:
            # Extract the date of the press release (it is within the <a> tag in the <p> tag under 'pr-date' class)
            date_tag = pr.find('div', class_='pr-date').find('a') if pr.find('div', class_='pr-date') else None
            date = date_tag.get_text(strip=True) if date_tag else 'Unknown'

            # Extract the title and URL of the press release
            title_tag = pr.find('h3').find('a') if pr.find('h3') else None
            title = title_tag.get_text(strip=True) if title_tag else 'No title'
            link = title_tag['href'] if title_tag else 'No link'

            # Extract the excerpt or summary
            excerpt_tag = pr.find('div', class_='pr-excerpt')
            excerpt = excerpt_tag.get_text(strip=True) if excerpt_tag else 'No excerpt'

            # Append the data to the news_data list
            news_data.append({
                'date': date,
                'title': title,
                'url': link,
                'excerpt': excerpt,
            })

        # Create a DataFrame and save it to a CSV file
        df = pd.DataFrame(news_data)
        df.to_csv('aecom_press_releases.csv', index=False)
        print("Scraped and saved AECOM press releases to aecom_press_releases.csv")
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")

# Run the scraping function
scrape_aecom_press_releases()
