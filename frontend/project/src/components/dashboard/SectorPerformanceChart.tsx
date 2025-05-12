import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useData } from '../../contexts/DataContext';
import { motion } from 'framer-motion';

// In a real app, we would use a proper charting library like Chart.js
const SectorPerformanceChart: React.FC = () => {
  const { marketData } = useData();
  const [metric, setMetric] = useState<'marketSize' | 'growthRate' | 'opportunities'>('marketSize');
  
  const maxValue = Math.max(...marketData.sectorData.map(data => data[metric]));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Sector Performance</span>
          <select 
            className="text-sm font-normal bg-slate-100 dark:bg-slate-700 border-0 rounded p-1"
            onChange={(e) => setMetric(e.target.value as 'marketSize' | 'growthRate' | 'opportunities')}
            value={metric}
          >
            <option value="marketSize">Market Size</option>
            <option value="growthRate">Growth Rate</option>
            <option value="opportunities">Opportunities</option>
          </select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {marketData.sectorData.map((sector, index) => (
            <motion.div 
              key={sector.sector}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="space-y-1"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm">{sector.sector}</span>
                <span className="text-sm font-medium">
                  {metric === 'marketSize' ? `$${sector.marketSize}B` : 
                   metric === 'growthRate' ? `${sector.growthRate}%` : 
                   sector.opportunities}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(sector[metric] / maxValue) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          {metric === 'marketSize' && 'Market size in billions USD'}
          {metric === 'growthRate' && 'Annual growth rate percentage'}
          {metric === 'opportunities' && 'Number of identified opportunities'}
        </div>
      </CardContent>
    </Card>
  );
};

export default SectorPerformanceChart;