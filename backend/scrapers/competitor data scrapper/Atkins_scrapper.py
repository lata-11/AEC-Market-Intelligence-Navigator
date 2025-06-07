from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import csv
import time

def scrape_atkinsrealis_press_releases():
    options = Options()
    options.add_argument("--headless")  # comment this out if you want to see the browser
    options.add_argument("--disable-gpu")
    options.add_argument("start-maximized")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36")

    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 15)

    url = "https://www.atkinsrealis.com/en/media/press-releases#all/all/all/all/2025"
    driver.get(url)

    # Wait for news items to load
    wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.news-item.js-filter-item")))

    # Optionally, scroll down if there is lazy loading or pagination
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    news_items = driver.find_elements(By.CSS_SELECTOR, "div.news-item.js-filter-item")

    results = []
    for item in news_items:
        try:
            title_elem = item.find_element(By.CSS_SELECTOR, "a.local-link > p.h4")
            title = title_elem.text.strip()

            link_elem = item.find_element(By.CSS_SELECTOR, "a.local-link")
            link = "https://www.atkinsrealis.com" + link_elem.get_attribute("href")

            date = item.find_element(By.CSS_SELECTOR, "div.date.body-small").text.strip()

            # Get all tags
            tags_elements = item.find_elements(By.CSS_SELECTOR, "div.news-tags > a.tag")
            tags = [tag.text.strip() for tag in tags_elements]

            results.append({
                "title": title,
                "link": link,
                "date": date,
                "tags": ", ".join(tags)
            })
        except Exception as e:
            print(f"Error processing an item: {e}")
            continue

    driver.quit()
    return results

def save_to_csv(data, filename="atkinsrealis_press_releases.csv"):
    keys = ["title", "link", "date", "tags"]
    with open(filename, mode='w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(data)
    print(f"Saved {len(data)} press releases to {filename}")

if __name__ == "__main__":
    data = scrape_atkinsrealis_press_releases()
    save_to_csv(data)
