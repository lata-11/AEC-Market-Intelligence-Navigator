from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import csv
import time

def scrape_arup_news():
    options = Options()
    options.add_argument("--headless")  # run browser in headless mode
    options.add_argument("--disable-gpu")
    options.add_argument("start-maximized")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36")

    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 15)

    url = "https://www.arup.com/news/"
    driver.get(url)

    # Wait for news cards to load
    wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.insights-card__content")))

    # Scroll down to load all news if needed
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    news_cards = driver.find_elements(By.CSS_SELECTOR, "div.insights-card__content")

    results = []
    for card in news_cards:
        try:
            title = card.find_element(By.CSS_SELECTOR, "p.insights-card__title").text.strip()
            date = card.find_element(By.CSS_SELECTOR, "p.insights-card__date").text.strip()
            results.append({"title": title, "date": date})
        except Exception as e:
            print(f"Error parsing a card: {e}")
            continue

    driver.quit()
    return results

def save_to_csv(data, filename="arup_news.csv"):
    keys = ["title", "date"]
    with open(filename, mode='w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(data)
    print(f"Saved {len(data)} news items to {filename}")

if __name__ == "__main__":
    data = scrape_arup_news()
    save_to_csv(data)
