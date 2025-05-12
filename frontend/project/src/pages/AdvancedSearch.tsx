import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { Search, AlertCircle, Filter, Database } from 'lucide-react';
import { motion } from 'framer-motion';

type SearchOption = 'all' | 'news' | 'opportunities' | 'competitors' | 'trends';

interface SearchResult {
  id: string;
  type: SearchOption;
  title: string;
  description: string;
  date?: string;
  tags: string[];
  url?: string;
}

const AdvancedSearch: React.FC = () => {
  const { newsFeed, projectOpportunities, competitorActivities, trendData, isLoading } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState<SearchOption>('all');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Perform search across all data sources
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results: SearchResult[] = [];
      
      if (selectedOption === 'all' || selectedOption === 'news') {
        const newsResults = newsFeed
          .filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map(item => ({
            id: item.id,
            type: 'news' as const,
            title: item.title,
            description: item.summary,
            date: item.date,
            tags: item.categories,
            url: item.url
          }));
        
        results.push(...newsResults);
      }
      
      if (selectedOption === 'all' || selectedOption === 'opportunities') {
        const opportunityResults = projectOpportunities
          .filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sector.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(item => ({
            id: item.id,
            type: 'opportunities' as const,
            title: item.title,
            description: item.description,
            date: item.expectedRfpDate,
            tags: [item.sector, item.region, `$${(item.estimatedValue / 1000000).toFixed(0)}M`]
          }));
        
        results.push(...opportunityResults);
      }
      
      if (selectedOption === 'all' || selectedOption === 'competitors') {
        const competitorResults = competitorActivities
          .filter(item => 
            item.competitor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sector.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(item => ({
            id: item.id,
            type: 'competitors' as const,
            title: `${item.competitor} - ${item.activityType.replace('_', ' ')}`,
            description: item.description,
            date: item.date,
            tags: [item.sector, item.region, item.impact]
          }));
        
        results.push(...competitorResults);
      }
      
      if (selectedOption === 'all' || selectedOption === 'trends') {
        const trendResults = trendData
          .filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.relatedKeywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map(item => ({
            id: item.id,
            type: 'trends' as const,
            title: item.name,
            description: item.description,
            tags: [...item.sectors, `${item.growth}% growth`]
          }));
        
        results.push(...trendResults);
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const getTypeLabel = (type: SearchOption): string => {
    switch (type) {
      case 'news':
        return 'News Article';
      case 'opportunities':
        return 'Project Opportunity';
      case 'competitors':
        return 'Competitor Activity';
      case 'trends':
        return 'Market Trend';
      default:
        return 'Unknown';
    }
  };

  const getTypeIcon = (type: SearchOption) => {
    switch (type) {
      case 'news':
        return <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 p-1 rounded">📰</span>;
      case 'opportunities':
        return <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-1 rounded">🎯</span>;
      case 'competitors':
        return <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 p-1 rounded">👥</span>;
      case 'trends':
        return <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 p-1 rounded">📈</span>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Layout title="Advanced Search">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Advanced Search">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-medium">Search across all market intelligence</h2>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-lg"
                  placeholder="Enter keywords to search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex-1 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={selectedOption === 'all' ? 'default' : 'outline'}
                    className="flex items-center gap-2"
                    onClick={() => setSelectedOption('all')}
                  >
                    <Database size={16} />
                    <span>All Sources</span>
                  </Button>
                  <Button
                    type="button"
                    variant={selectedOption === 'news' ? 'default' : 'outline'}
                    className="flex items-center gap-2"
                    onClick={() => setSelectedOption('news')}
                  >
                    <span>News</span>
                  </Button>
                  <Button
                    type="button"
                    variant={selectedOption === 'opportunities' ? 'default' : 'outline'}
                    className="flex items-center gap-2"
                    onClick={() => setSelectedOption('opportunities')}
                  >
                    <span>Opportunities</span>
                  </Button>
                  <Button
                    type="button"
                    variant={selectedOption === 'competitors' ? 'default' : 'outline'}
                    className="flex items-center gap-2"
                    onClick={() => setSelectedOption('competitors')}
                  >
                    <span>Competitors</span>
                  </Button>
                  <Button
                    type="button"
                    variant={selectedOption === 'trends' ? 'default' : 'outline'}
                    className="flex items-center gap-2"
                    onClick={() => setSelectedOption('trends')}
                  >
                    <span>Trends</span>
                  </Button>
                </div>
                
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Search
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="mt-6">
        {isSearching ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : searchQuery && searchResults.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium px-2">
              {searchResults.length} results for "{searchQuery}"
            </h3>
            
            {searchResults.map((result, index) => (
              <motion.div
                key={`${result.type}-${result.id}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium mb-1">{result.title}</h3>
                          <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                            {getTypeLabel(result.type)}
                          </span>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-300 mb-3">{result.description}</p>
                        
                        {result.date && (
                          <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                            Date: {result.date}
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                          {result.tags.map((tag, i) => (
                            <span 
                              key={i} 
                              className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {result.url && (
                          <a 
                            href={result.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                          >
                            <span>View source</span>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="12" 
                              height="12" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : searchQuery ? (
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center text-center">
                <AlertCircle size={48} className="text-slate-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  We couldn't find any results for "{searchQuery}". Try adjusting your search terms or searching in a different category.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedOption('all');
                  }}
                >
                  Clear search
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </Layout>
  );
};

export default AdvancedSearch;