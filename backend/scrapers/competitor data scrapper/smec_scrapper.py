from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import csv

def scrape_smec_projects():
    options = Options()
    options.add_argument("--headless")  # Run browser in headless mode
    options.add_argument("--disable-gpu")
    options.add_argument("start-maximized")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36")
    
    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 15)
    
    url = "https://www.smec.com/news/"
    driver.get(url)
    
    # Scroll down gradually to load all projects (if lazy loading)
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)  # Wait for loading
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height
    
    # Wait until project posts appear
    wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.project-post")))
    projects = driver.find_elements(By.CSS_SELECTOR, "div.project-post")
    
    data = []
    for project in projects:
        try:
            title = project.find_element(By.CSS_SELECTOR, "div.project-post__title").text.strip()
            link = project.find_element(By.CSS_SELECTOR, "a").get_attribute("href")
            image = project.find_element(By.CSS_SELECTOR, "img.project-post__img").get_attribute("src")
            date = project.find_element(By.CSS_SELECTOR, "span.news_date").text.strip()
            data.append({
                "title": title,
                "link": link,
                "image": image,
                "date": date
            })
        except Exception as e:
            print(f"Error extracting one project: {e}")
            continue

    driver.quit()
    return data

def save_to_csv(data, filename="smec_projects.csv"):
    keys = ["title", "link", "image", "date"]
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=keys)
        writer.writeheader()
        writer.writerows(data)
    print(f"Data saved to {filename}")

if __name__ == "__main__":
    projects = scrape_smec_projects()
    save_to_csv(projects)
