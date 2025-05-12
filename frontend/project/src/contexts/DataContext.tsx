import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MarketData,
  NewsItem, 
  CompetitorActivity, 
  ProjectOpportunity, 
  TrendData, 
  mockMarketData 
} from '../data/mockData';

interface DataContextType {
  marketData: MarketData;
  newsFeed: NewsItem[];
  competitorActivities: CompetitorActivity[];
  projectOpportunities: ProjectOpportunity[];
  trendData: TrendData[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  filterNewsByKeyword: (keyword: string) => NewsItem[];
  filterOpportunitiesByRegion: (region: string) => ProjectOpportunity[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [marketData, setMarketData] = useState<MarketData>(mockMarketData);
  const [newsFeed, setNewsFeed] = useState<NewsItem[]>([]);
  const [competitorActivities, setCompetitorActivities] = useState<CompetitorActivity[]>([]);
  const [projectOpportunities, setProjectOpportunities] = useState<ProjectOpportunity[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setIsLoading(true);
      try {
        // In a real app, these would be API calls
        setNewsFeed(mockMarketData.news);
        setCompetitorActivities(mockMarketData.competitorActivities);
        setProjectOpportunities(mockMarketData.projectOpportunities);
        setTrendData(mockMarketData.trends);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load market data');
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    // Simulate refreshing data
    setTimeout(() => {
      setNewsFeed(mockMarketData.news);
      setCompetitorActivities(mockMarketData.competitorActivities);
      setProjectOpportunities(mockMarketData.projectOpportunities);
      setTrendData(mockMarketData.trends);
      setIsLoading(false);
    }, 1000);
  };

  const filterNewsByKeyword = (keyword: string): NewsItem[] => {
    if (!keyword.trim()) return newsFeed;
    return newsFeed.filter(
      (item) => 
        item.title.toLowerCase().includes(keyword.toLowerCase()) || 
        item.summary.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const filterOpportunitiesByRegion = (region: string): ProjectOpportunity[] => {
    if (!region || region === 'all') return projectOpportunities;
    return projectOpportunities.filter(
      (item) => item.region.toLowerCase() === region.toLowerCase()
    );
  };

  return (
    <DataContext.Provider
      value={{
        marketData,
        newsFeed,
        competitorActivities,
        projectOpportunities,
        trendData,
        isLoading,
        error,
        refreshData,
        filterNewsByKeyword,
        filterOpportunitiesByRegion,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};