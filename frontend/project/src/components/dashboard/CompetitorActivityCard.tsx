import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useData } from '../../contexts/DataContext';
import { Users, Briefcase, Handshake, Lightbulb, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const CompetitorActivityCard: React.FC = () => {
  const { competitorActivities } = useData();
  
  // Get the most recent competitor activities (top 3)
  const recentActivities = competitorActivities.slice(0, 3);

  // Icon mapping based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project_win':
        return <Briefcase size={18} />;
      case 'partnership':
        return <Handshake size={18} />;
      case 'innovation':
        return <Lightbulb size={18} />;
      case 'expansion':
        return <Package size={18} />;
      default:
        return <Users size={18} />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Competitor Activities</span>
          <a href="/competitors" className="text-primary text-sm hover:underline">View all</a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className={`p-2 rounded-md bg-primary/10 text-primary flex items-center justify-center`}>
                {getActivityIcon(activity.activityType)}
              </div>
              <div>
                <h3 className="font-medium">
                  {activity.competitor}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {activity.description}
                </p>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{activity.date}</span>
                  <span>•</span>
                  <span>{activity.region}</span>
                  <span>•</span>
                  <span>{activity.sector}</span>
                  {activity.estimatedValue && (
                    <>
                      <span>•</span>
                      <span>${(activity.estimatedValue / 1000000000).toFixed(1)}B</span>
                    </>
                  )}
                </div>
                <div className="mt-2">
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
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorActivityCard;