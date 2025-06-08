# 🧠 AEC Market Intelligence Navigator: SJ-MarketIntl
**AI-Driven Market Analysis for Strategic Positioning**  
**Built for Surbana Jurong in CWB Hackathon Challenge 2025**

---


## 📌 Problem Statement

The AEC industry is becoming increasingly complex and competitive. SJ currently faces challenges such as:

- Fragmented, siloed data across business units  
- Massive volumes of unstructured information from news, tenders, and reports  
- Delayed or manual insight gathering that affects responsiveness  
- Missed signals due to time-consuming monitoring

---

## 🎯 Purpose of the Solution

**SJ-MarketIntl** is designed to solve these issues by offering:

✅ **Geographical and sector-based visualization** of market opportunities  
✅ **Competitor activity tracking** (e.g., AECOM, Arup, Atkins, SMEC, WSP)  
✅ **Emerging trends monitoring** like digital twins and net-zero buildings  
✅ **Real-time sentiment and impact analysis** using AI  
✅ A centralized, AI-enhanced dashboard for strategic planning  

---

## 🖥️ Dashboard Walkthrough

The dashboard has been built for clarity, interactivity, and strategic use:

### 📍 Regional Opportunities  
- Bubble chart showing project distribution across APAC, North America, Europe, etc.  
- Bubble size represents volume and intensity of opportunity.

### 🏗️ Sector Performance  
- Highlights sectors like Infrastructure ($950B), Healthcare, Commercial, Residential  
- Displays potential market value and project news.

### 📰 Recent Industry News  
- News scraped in real-time, tagged with keywords (e.g., “infrastructure,” “ESG,” “smart cities”)  
- Summarized and categorized using Azure OpenAI.

### 📈 Emerging Trends  
- Tracks industry signals such as Net-Zero Buildings, Digital Twins, and Climate-Resilient Infrastructure.  
- Includes sentiment and trend direction.

### 🕵️‍♀️ Competitor Activities  
- Dedicated space to monitor competitor news and project wins.  
- Currently includes scraped data from AECOM, SMEC, WSP, etc.

> ✅ **User-Friendly Interface**  
> Designed with ReactJS for quick navigation, filtering, and decision support.

---

## 💻 Tech Stack

| Technology        | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **Azure OpenAI** | Used for summarization, sentiment analysis, and keyword extraction          |
| **Azure CosmosDB** | Stores scraped news articles, competitor reports, opportunity data         |
| **Azure AI Search** | Enables semantic, keyword, and tag-based exploration of indexed content   |
| **Python**        | Scripts for scraping, cleaning, and enriching raw data                      |
| **React
**     | Frontend framework used to build the interactive dashboard UI               |

---

## 🔎 Custom Dataset Collection

To ensure accuracy, freshness, and domain specificity, I **built custom Python scrapers** for:

- ✅ Competitor websites (AECOM, SMEC, Arup, Atkins, WSP)
- ✅ Industry trend portals (e.g., Construction Dive, Urban News, Smart City blogs)
- ✅ Regulatory boards and government portals
- ✅ Public announcements and press releases

Each script normalizes unstructured data, tags sector/region/sentiment, and stores it in CosmosDB using JSON.  

> 📌 Unlike generic APIs, this approach allowed full control over data structure, tags, freshness, and contextualization with AEC-specific terminology.

---

## 🧠 AI Intelligence Layer

**Powered by Azure OpenAI:**
- Cleans raw HTML, PDFs, and news  
- Extracts entities, identifies sentiment, and ranks opportunities  
- Normalizes content for uniform insights  
- Enables “Opportunity Alerts” and “Impact Index” across the UI

---

## 🔮 Future Scope

| Improvement                          | Description                                                                 |
|--------------------------------------|-----------------------------------------------------------------------------|
| ⏰ Cron Job Automation                | Use Azure Functions to automate scheduled data collection using Cron jobs in Azure Functions and build AI agents to make data collection more streamlined and relevant |
| 🌍 Expand Competitor and Trend Sources | Include more global competitors and localized development pipelines         |
| 📈 Predictive Opportunity Forecasting | Use ML to forecast likely success rates, RFP triggers, and budget volumes  |
| 📜 Regulatory Impact Forecast        | Map how urban planning policies will affect projects in different regions   |
| 🧠 Strategic Alignment Engine        | Match SJ capabilities with most lucrative and strategic opportunities       |

---

## 🚀 Impact for Surbana Jurong

With this system, SJ can:

✅ Make data-driven market expansion decisions  
✅ Detect emerging project leads well before official tenders are out  
✅ Understand evolving client needs and sentiments  
✅ Identify sector-wise opportunity gaps and regional focus areas  
✅ Monitor competitors' footprints and strategic shifts  

> 🎯 It transforms SJ’s market intelligence from **reactive** to **proactive.**

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/AEC-Market-Intelligence-Navigator.git
cd AEC-Market-Intelligence-Navigator

```

### 2. Backend
```bash
cd backend
python app.py 
```

### 3. Frontend
```bash
cd frontend/project
npm run dev ![news_monitor](https://github.com/user-attachments/assets/aaf93ea2-1a23-45db-a4da-681562532d32)


```

## 🔮 UI
![aec_dashboard](https://github.com/user-attachments/assets/c9459e5f-07e1-486f-9a82-6cf141f90928)

![trend_analysis](https://github.com/user-attachments/assets/0bf19ff4-630a-4eed-a778-0ba318342cc6)

![opportunity_alert](https://github.com/user-attachments/assets/5ec2d2e9-a066-4cd5-ac1b-1ea36663ecd5)

![advanced_search](https://github.com/user-attachments/assets/1f6c6631-6dfa-4881-a438-e12bd6c2e8c1)

![news_monitor](https://github.com/user-attachments/assets/19cc8756-6ee4-48ae-98b7-56bbac84c566)



