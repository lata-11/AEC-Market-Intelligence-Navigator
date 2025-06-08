# 🧠 AEC Market Intelligence Navigator  
**AI-Driven Market Analysis for Strategic Positioning**  
**Built for Surbana Jurong Hackathon Challenge**

---

## 🎤 Introduction

Hello!  
I’m **Lata**, a student from India, and I’m excited to present my project **“AEC Market Intelligence Navigator.”**  
This solution was developed for Surbana Jurong’s challenge to revolutionize how market intelligence is gathered, interpreted, and used for **strategic decision-making** in the Architecture, Engineering, and Construction (AEC) industry.

---

## 📌 Problem Statement

The AEC industry is becoming increasingly complex and competitive. SJ currently faces challenges such as:

- Fragmented, siloed data across business units  
- Massive volumes of unstructured information from news, tenders, and reports  
- Delayed or manual insight gathering that affects responsiveness  
- Missed signals due to time-consuming monitoring

---

## 🎯 Purpose of the Solution

**AEC Market Intelligence Navigator** is designed to solve these issues by offering:

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
> Designed with Streamlit for quick navigation, filtering, and decision support.

---

## 💻 Tech Stack

| Technology        | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **Azure OpenAI** | Used for summarization, sentiment analysis, and keyword extraction          |
| **Azure CosmosDB** | Stores scraped news articles, competitor reports, opportunity data         |
| **Azure AI Search** | Enables semantic, keyword, and tag-based exploration of indexed content   |
| **Python**        | Scripts for scraping, cleaning, and enriching raw data                      |
| **Streamlit**     | Frontend framework used to build the interactive dashboard UI               |

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
| ⏰ Cron Job Automation                | Use Azure Functions to schedule real-time scraping and updates             |
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
npm run dev 

```

## 🔮 Future Scope

⏱️ Automate scheduled data collection using Cron jobs in Azure Functions

🔍 Expand data sources to include more global and niche competitors

🧠 Integrate predictive models for revenue potential and project success likelihood

📢 Client sentiment analysis based on social media and interviews

📜 Regulatory foresight: Predict market impact of upcoming policy changes


