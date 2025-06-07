from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import pandas as pd
import time
import csv  # Import the csv module

def scrape_jacobs_news_selenium():
    # Set up Chrome options for Selenium
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode (no browser window)
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")

    # Set up WebDriver (using Chrome)
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    url = 'https://www.jacobs.com/newsroom'
    driver.get(url)

    # Wait for the page to fully load (wait for the first news link to appear)
    try:
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME, 'content-card__title')))
    except Exception as e:
        print(f"Error waiting for elements: {e}")
        driver.quit()
        return

    # Get the page source after the page has been fully rendered
    page_source = driver.page_source

    # Parse the page source with BeautifulSoup
    soup = BeautifulSoup(page_source, 'html.parser')

    # Find all the news items
    news_items = soup.find_all('a', class_=' || focus-01')

    # Open a CSV file to write the data as we scrape
    with open('jacobs_news_selenium.csv', 'a', newline='', encoding='utf-8') as file:
        # Create a CSV writer object
        writer = csv.writer(file)
        # Write header row if the file is empty
        writer.writerow(['date', 'title', 'url', 'excerpt'])

        # Loop through each news item and scrape the data
        for item in news_items:
            try:
                # Extract the title, date, URL, and excerpt from each news item
                title_tag = item.find('h1', class_='heading__title content-card__title')
                date_tag = item.find('span', class_='date__text divider')
                link_tag = item.get('href')
                excerpt_tag = item.find('div', class_='rich-text font-type-10')

                # Get the text and the URL for the article
                title = title_tag.get_text(strip=True) if title_tag else 'No title'
                date = date_tag.get_text(strip=True) if date_tag else 'No date'
                link = 'https://www.jacobs.com' + link_tag if link_tag else 'No link'
                excerpt = excerpt_tag.get_text(strip=True) if excerpt_tag else 'No excerpt'

                # Write the data to the CSV file immediately
                writer.writerow([date, title, link, excerpt])

            except Exception as e:
                print(f"Error extracting data: {e}")
                continue

        print("Scraped and saved Jacobs press releases to jacobs_news_selenium.csv")

    # Close the WebDriver
    driver.quit()

# Run the Selenium scraping function
scrape_jacobs_news_selenium()
