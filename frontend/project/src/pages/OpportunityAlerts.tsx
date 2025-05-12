import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { Search, AlertCircle, Filter, Calendar, DollarSign, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const OpportunityAlerts: React.FC = () => {
  const { projectOpportunities, isLoading } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0);

  // Extract all unique sectors and regions
  const allSectors = Array.from(
    new Set(projectOpportunities.map(item => item.sector))
  );
  
  const allRegions = Array.from(
    new Set(projectOpportunities.map(item => item.region))
  );

  const toggleSector = (sector: string) => {
    if (selectedSectors.includes(sector)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sector));
    } else {
      setSelectedSectors([...selectedSectors, sector]);
    }
  };

  const toggleRegion = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter(r => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  // Filter opportunities
  const filteredOpportunities = projectOpportunities.filter(item => {
    const matchesSearch = 
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSectors = 
      selectedSectors.length === 0 ||
      selectedSectors.includes(item.sector);
    
    const matchesRegions = 
      selectedRegions.length === 0 ||
      selectedRegions.includes(item.region);
    
    const matchesConfidence = item.confidenceScore >= confidenceThreshold;
    
    return matchesSearch && matchesSectors && matchesRegions && matchesConfidence;
  });

  // Sort by expected RFP date (closest first)
  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => 
    new Date(a.expectedRfpDate).getTime() - new Date(b.expectedRfpDate).getTime()
  );

  if (isLoading) {
    return (
      <Layout title="Opportunity Alerts">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Opportunity Alerts">
      <div className="mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  placeholder="Search opportunities by title, client, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="relative group">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
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
                
                <div className="relative group">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    <span>Regions</span>
                    {selectedRegions.length > 0 && (
                      <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        {selectedRegions.length}
                      </span>
                    )}
                  </Button>
                  
                  <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-30 border border-slate-200 dark:border-slate-700 hidden group-hover:block">
                    <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="font-medium text-sm">Filter by region</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto p-2">
                      {allRegions.map(region => (
                        <label key={region} className="flex items-center p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                          <input
                            type="checkbox"
                            checked={selectedRegions.includes(region)}
                            onChange={() => toggleRegion(region)}
                            className="mr-2"
                          />
                          <span className="text-sm">{region}</span>
                        </label>
                      ))}
                    </div>
                    {selectedRegions.length > 0 && (
                      <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => setSelectedRegions([])}
                          className="text-primary text-sm hover:underline"
                        >
                          Clear regions
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm">Min. Confidence:</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-sm font-medium">{Math.round(confidenceThreshold * 100)}%</span>
                </div>
                
                {(selectedSectors.length > 0 || selectedRegions.length > 0 || confidenceThreshold > 0) && (
                  <Button 
                    variant="ghost" 
                    className="text-primary hover:bg-primary/10"
                    onClick={() => {
                      setSelectedSectors([]);
                      setSelectedRegions([]);
                      setConfidenceThreshold(0);
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedOpportunities.length > 0 ? (
          sortedOpportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium">{opportunity.title}</h3>
                      <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full text-xs">
                        {Math.round(opportunity.confidenceScore * 100)}% confidence
                      </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 mb-4">{opportunity.description}</p>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <DollarSign size={16} className="text-primary" />
                        <span>${(opportunity.estimatedValue / 1000000).toFixed(0)}M</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Calendar size={16} className="text-primary" />
                        <span>RFP: {opportunity.expectedRfpDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Clock size={16} className="text-amber-500" />
                        <span>{Math.round((new Date(opportunity.expectedRfpDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Client:</span>
                        <span>{opportunity.client}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Region:</span>
                        <span>{opportunity.region}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Country:</span>
                        <span>{opportunity.country}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Sector:</span>
                        <span>{opportunity.sector}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Source:</span>
                        <span>{opportunity.sourceType.replace('_', ' ')}</span>
                      </div>
                    </div>
                    
                    <Button className="self-end mt-auto">Track Opportunity</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full">
            <Card>
              <CardContent className="py-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <AlertCircle size={48} className="text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No opportunities found</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-4">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSectors([]);
                      setSelectedRegions([]);
                      setConfidenceThreshold(0);
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OpportunityAlerts;