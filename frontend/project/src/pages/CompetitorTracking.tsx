import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { Search, Filter, AlertCircle, Users, Briefcase, Handshake, Lightbulb, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const CompetitorTracking: React.FC = () => {
  const { competitorActivities, isLoading } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImpact, setSelectedImpact] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  // Extract all unique regions
  const allRegions = Array.from(
    new Set(competitorActivities.map(item => item.region))
  );

  const toggleRegion = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter(r => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  // Filter activities
  const filteredActivities = competitorActivities.filter(item => {
    const matchesSearch = 
      searchQuery === '' ||
      item.competitor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesImpact = 
      selectedImpact === 'all' || 
      item.impact === selectedImpact;
    
    const matchesType = 
      selectedType === 'all' || 
      item.activityType === selectedType;
    
    const matchesRegions = 
      selectedRegions.length === 0 ||
      selectedRegions.includes(item.region);
    
    return matchesSearch && matchesImpact && matchesType && matchesRegions;
  });

  // Icon mapping based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project_win':
        return <Briefcase size={20} />;
      case 'partnership':
        return <Handshake size={20} />;
      case 'innovation':
        return <Lightbulb size={20} />;
      case 'expansion':
        return <Package size={20} />;
      default:
        return <Users size={20} />;
    }
  };

  if (isLoading) {
    return (
      <Layout title="Competitor Tracking">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Competitor Tracking">
      <div className="mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  placeholder="Search competitors or activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select
                  className="px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  value={selectedImpact}
                  onChange={(e) => setSelectedImpact(e.target.value)}
                >
                  <option value="all">All Impact</option>
                  <option value="high">High Impact</option>
                  <option value="medium">Medium Impact</option>
                  <option value="low">Low Impact</option>
                </select>
                
                <select
                  className="px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="project_win">Project Win</option>
                  <option value="partnership">Partnership</option>
                  <option value="expansion">Expansion</option>
                  <option value="innovation">Innovation</option>
                  <option value="other">Other</option>
                </select>
                
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
                  
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-30 border border-slate-200 dark:border-slate-700 hidden group-hover:block">
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
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full bg-primary/10 text-primary flex items-center justify-center`}>
                      {getActivityIcon(activity.activityType)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-medium mb-1">{activity.competitor}</h3>
                        <span 
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            activity.impact === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                            activity.impact === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                            'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          }`}
                        >
                          {activity.impact} impact
                        </span>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-3">{activity.description}</p>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Activity Type:</span>
                          <span>{activity.activityType.replace('_', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Date:</span>
                          <span>{activity.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Region:</span>
                          <span>{activity.region}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Sector:</span>
                          <span>{activity.sector}</span>
                        </div>
                        {activity.estimatedValue && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium">Value:</span>
                            <span>${(activity.estimatedValue / 1000000000).toFixed(1)}B</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Source:</span>
                          <span>{activity.source}</span>
                        </div>
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
                <h3 className="text-lg font-medium mb-2">No competitor activities found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedImpact('all');
                    setSelectedType('all');
                    setSelectedRegions([]);
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

export default CompetitorTracking;