import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { Search, Filter, ExternalLink, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const NewsMonitor: React.FC = () => {
  const { newsFeed, isLoading } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Extract all unique categories from news items
  const allCategories = Array.from(
    new Set(newsFeed.flatMap(item => item.categories))
  );

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter news based on search, sentiment, and categories
  const filteredNews = newsFeed.filter(item => {
    const matchesSearch = 
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSentiment = 
      selectedSentiment === 'all' || 
      item.sentiment === selectedSentiment;
    
    const matchesCategories = 
      selectedCategories.length === 0 ||
      selectedCategories.some(cat => item.categories.includes(cat));
    
    return matchesSearch && matchesSentiment && matchesCategories;
  });

  if (isLoading) {
    return (
      <Layout title="News Monitor">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="News Monitor">
      <div className="mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  placeholder="Search news by title or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select
                  className="px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  value={selectedSentiment}
                  onChange={(e) => setSelectedSentiment(e.target.value)}
                >
                  <option value="all">All Sentiment</option>
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </select>
                
                <div className="relative group">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    <span>Categories</span>
                    {selectedCategories.length > 0 && (
                      <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        {selectedCategories.length}
                      </span>
                    )}
                  </Button>
                  
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-30 border border-slate-200 dark:border-slate-700 hidden group-hover:block">
                    <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="font-medium text-sm">Filter by category</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto p-2">
                      {allCategories.map(category => (
                        <label key={category} className="flex items-center p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="mr-2"
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                    {selectedCategories.length > 0 && (
                      <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => setSelectedCategories([])}
                          className="text-primary text-sm hover:underline"
                        >
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        {filteredNews.length > 0 ? (
          filteredNews.map((newsItem, index) => (
            <motion.div
              key={newsItem.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        newsItem.sentiment === 'positive' ? 'bg-green-500' : 
                        newsItem.sentiment === 'negative' ? 'bg-red-500' : 'bg-amber-500'
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-medium mb-2">{newsItem.title}</h3>
                        <a 
                          href={newsItem.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1 flex-shrink-0 ml-4"
                        >
                          <span>Read full article</span>
                          <ExternalLink size={14} />
                        </a>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-4">{newsItem.summary}</p>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Source:</span>
                          <span>{newsItem.source}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Published:</span>
                          <span>{newsItem.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Relevance Score:</span>
                          <span>{newsItem.relevanceScore.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Sentiment:</span>
                          <span className={`
                            ${newsItem.sentiment === 'positive' ? 'text-green-500' : 
                              newsItem.sentiment === 'negative' ? 'text-red-500' : 'text-amber-500'}
                          `}>
                            {newsItem.sentiment.charAt(0).toUpperCase() + newsItem.sentiment.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {newsItem.categories.map(category => (
                          <span 
                            key={category} 
                            className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            onClick={() => {
                              if (!selectedCategories.includes(category)) {
                                setSelectedCategories([...selectedCategories, category]);
                              }
                            }}
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center text-center">
                <AlertCircle size={48} className="text-slate-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No news articles found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSentiment('all');
                    setSelectedCategories([]);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default NewsMonitor;