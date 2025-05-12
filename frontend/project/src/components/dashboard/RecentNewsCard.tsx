import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useData } from '../../contexts/DataContext';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const RecentNewsCard: React.FC = () => {
  const { newsFeed } = useData();
  
  // Get the most recent news items (top 3)
  const recentNews = newsFeed.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Recent Industry News</span>
          <a href="/news" className="text-primary text-sm hover:underline">View all</a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentNews.map((newsItem, index) => (
            <motion.div
              key={newsItem.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative p-4 rounded-md border border-slate-200 dark:border-slate-700 hover:border-primary hover:dark:border-primary transition-colors">
                <div className={`absolute top-0 right-0 w-2 h-2 rounded-full transform translate-x-1/2 -translate-y-1/2 
                  ${newsItem.sentiment === 'positive' ? 'bg-green-500' : 
                    newsItem.sentiment === 'negative' ? 'bg-red-500' : 'bg-amber-500'}`}
                />
                <h3 className="font-medium mb-1">{newsItem.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 line-clamp-2">{newsItem.summary}</p>
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span>{newsItem.source}</span>
                    <span>•</span>
                    <span>{newsItem.date}</span>
                  </div>
                  <a 
                    href={newsItem.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {newsItem.categories.map(category => (
                    <span 
                      key={category} 
                      className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-xs"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentNewsCard;