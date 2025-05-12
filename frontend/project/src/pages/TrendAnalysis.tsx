import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { Search, AlertCircle, TrendingUp, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const TrendAnalysis: React.FC = () => {
  const { trendData, isLoading } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [growthThreshold, setGrowthThreshold] = useState<number>(0);

  // Extract all unique sectors
  const allSectors = Array.from(
    new Set(trendData.flatMap(item => item.sectors))
  );

  const toggleSector = (sector: string) => {
    if (selectedSectors.includes(sector)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sector));
    } else {
      setSelectedSectors([...selectedSectors, sector]);
    }
  };

  // Filter trends
  const filteredTrends = trendData.filter(item => {
    const matchesSearch = 
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.relatedKeywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSectors = 
      selectedSectors.length === 0 ||
      item.sectors.some(sector => selectedSectors.includes(sector));
    
    const matchesGrowth = item.growth >= growthThreshold;
    
    return matchesSearch && matchesSectors && matchesGrowth;
  });

  // Sort by growth rate (highest first)
  const sortedTrends = [...filteredTrends].sort((a, b) => b.growth - a.growth);

  if (isLoading) {
    return (
      <Layout title="Trend Analysis">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Trend Analysis">
      <div className="mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  placeholder="Search trends by name, description, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="relative group">
                  <Button variant="outline" className="flex items-center gap-2">
                    <TrendingUp size={16} />
                    <span>Sectors</span>
                    {selectedSectors.length > 0 && (
                      <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        {selectedSectors.length}
                      </span>
                    )}
                  </Button>
                  
                  <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-30 border border-slate-200 dark:border-slate-700 hidden group-hover:block">
                    <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="font-medium text-sm">Filter by sector</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto p-2">
                      {allSectors.map(sector => (
                        <label key={sector} className="flex items-center p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                          <input
                            type="checkbox"
                            checked={selectedSectors.includes(sector)}
                            onChange={() => toggleSector(sector)}
                            className="mr-2"
                          />
                          <span className="text-sm">{sector}</span>
                        </label>
                      ))}
                    </div>
                    {selectedSectors.length > 0 && (
                      <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => setSelectedSectors([])}
                          className="text-primary text-sm hover:underline"
                        >
                          Clear sectors
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm">Min. Growth Rate:</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    step="5"
                    value={growthThreshold}
                    onChange={(e) => setGrowthThreshold(parseFloat(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-sm font-medium">{growthThreshold}%</span>
                </div>
                
                {(selectedSectors.length > 0 || growthThreshold > 0) && (
                  <Button 
                    variant="ghost" 
                    className="text-primary hover:bg-primary/10"
                    onClick={() => {
                      setSelectedSectors([]);
                      setGrowthThreshold(0);
                    }}
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        {sortedTrends.length > 0 ? (
          sortedTrends.map((trend, index) => (
            <motion.div
              key={trend.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg w-full md:w-56 text-center">
                      <div className="text-4xl font-bold text-primary flex items-center">
                        {trend.growth}%
                        <ArrowUp className="ml-1" />
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Growth Rate</div>
                      <div className="mt-3 text-lg font-medium">Relevance Score</div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 my-2">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${trend.relevance * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {Math.round(trend.relevance * 100)}%
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-2 flex items-center">
                        {trend.name}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-4">{trend.description}</p>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Relevant Sectors</h4>
                        <div className="flex flex-wrap gap-2">
                          {trend.sectors.map(sector => (
                            <span 
                              key={sector} 
                              className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                              onClick={() => {
                                if (!selectedSectors.includes(sector)) {
                                  setSelectedSectors([...selectedSectors, sector]);
                                }
                              }}
                            >
                              {sector}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Related Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {trend.relatedKeywords.map(keyword => (
                            <span 
                              key={keyword} 
                              className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        <h4 className="font-medium mb-1">Data Sources</h4>
                        <ul className="list-disc pl-5">
                          {trend.sources.map((source, i) => (
                            <li key={i}>{source}</li>
                          ))}
                        </ul>
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
                <h3 className="text-lg font-medium mb-2">No trends found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSectors([]);
                    setGrowthThreshold(0);
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

export default TrendAnalysis;