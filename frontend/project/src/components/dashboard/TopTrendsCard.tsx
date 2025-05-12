import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useData } from '../../contexts/DataContext';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const TopTrendsCard: React.FC = () => {
  const { trendData } = useData();
  
  // Get top 3 trends by growth
  const topTrends = [...trendData]
    .sort((a, b) => b.growth - a.growth)
    .slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Emerging Trends</span>
          <a href="/trends" className="text-primary text-sm hover:underline">View all</a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topTrends.map((trend, index) => (
            <motion.div
              key={trend.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className={`p-2 rounded-md bg-primary/10 text-primary flex items-center justify-center`}>
                <TrendingUp size={18} />
              </div>
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  {trend.name}
                  <span className="text-green-500 text-sm">+{trend.growth}%</span>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                  {trend.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {trend.sectors.slice(0, 2).map((sector) => (
                    <span 
                      key={sector} 
                      className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-xs"
                    >
                      {sector}
                    </span>
                  ))}
                  {trend.sectors.length > 2 && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-xs">
                      +{trend.sectors.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopTrendsCard;