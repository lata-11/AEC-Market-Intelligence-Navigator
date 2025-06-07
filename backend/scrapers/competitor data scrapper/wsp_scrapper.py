from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def scrape_wsp_press_releases():
    url = "https://www.wsp.com/en-gl/news#f:Categories=[Press%20Releases]"

    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36")

    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 15)

    try:
        driver.get(url)

        # Accept cookies popup if it appears
        try:
            accept_btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button#onetrust-accept-btn-handler")))
            accept_btn.click()
            print("Accepted cookies popup.")
        except Exception:
            print("No cookies popup.")

        time.sleep(2)

        # Scroll down stepwise to load more press releases (simulate human scrolling)
        scroll_pause_time = 2
        last_height = driver.execute_script("return document.body.scrollHeight")

        for _ in range(10):  # Adjust the number of scrolls as needed
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(scroll_pause_time)

            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                print("Reached bottom of page.")
                break
            last_height = new_height

        # Wait for results container to load
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.coveo-result-row")))

        # Find all press release rows
        rows = driver.find_elements(By.CSS_SELECTOR, "div.coveo-result-row")
        print(f"Found {len(rows)} articles.")

        data = []

        for row in rows:
            try:
                link_element = row.find_element(By.CSS_SELECTOR, "a.CoveoResultLink")
                url = link_element.get_attribute("href")

                right_div = row.find_element(By.CSS_SELECTOR, "div.ml__right")

                # Date and category
                date_cat = right_div.find_element(By.CSS_SELECTOR, "div.coveo-suptitle").text.strip()

                # Title
                title = right_div.find_element(By.CSS_SELECTOR, "h2.typo__07").text.strip()

                # Summary
                summary = right_div.find_element(By.CSS_SELECTOR, "div.typo__09").text.strip()

                data.append({
                    "title": title,
                    "date_category": date_cat,
                    "summary": summary,
                    "url": url
                })
            except Exception as e:
                print(f"Error parsing row: {e}")
                continue

        # Print all extracted press releases
        for i, item in enumerate(data, 1):
            print(f"\nArticle {i}:")
            print(f"Title: {item['title']}")
            print(f"Date & Category: {item['date_category']}")
            print(f"Summary: {item['summary']}")
            print(f"URL: {item['url']}")

    finally:
        driver.quit()

if __name__ == "__main__":
    scrape_wsp_press_releases()
