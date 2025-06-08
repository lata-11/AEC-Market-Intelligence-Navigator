import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Users, Briefcase, Handshake, Lightbulb, Package } from 'lucide-react';
import { motion } from 'framer-motion';

interface Activity {
  id: string;
  title: string;
  date: string;
  url?: string;
  excerpt?: string;
  image?: string;
  tags?: string;
  activityType?: string;
  competitor?: string;
  description?: string;
  region?: string;
  sector?: string;
  estimatedValue?: number;
  impact?: 'high' | 'medium' | 'low';
}

const getActivityIcon = (type?: string) => {
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

const CompetitorActivityCard: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/news') 
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data); // Log fetched data for debugging
        setActivities(data); // Use fetched data
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch competitor activities:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Competitor Activities</CardTitle>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  if (!loading && activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Competitor Activities</CardTitle>
        </CardHeader>
        <CardContent>No activities found.</CardContent>
      </Card>
    );
  }

  // Show top 3 recent activities (assuming data is already sorted by date desc)
  const recentActivities = activities.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Competitor Activities</span>
          <a href="/competitors" className="text-primary text-sm hover:underline">
            View all
          </a>
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
                  {activity.competitor || activity.title || 'Unknown Competitor'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {activity.description || activity.excerpt || 'No description available'}
                </p>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{activity.date}</span>
                  {activity.region && (
                    <>
                      <span>•</span>
                      <span>{activity.region}</span>
                    </>
                  )}
                  {activity.sector && (
                    <>
                      <span>•</span>
                      <span>{activity.sector}</span>
                    </>
                  )}
                  {activity.estimatedValue && (
                    <>
                      <span>•</span>
                      <span>${(activity.estimatedValue / 1_000_000_000).toFixed(1)}B</span>
                    </>
                  )}
                </div>
                <div className="mt-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      activity.impact === 'high'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        : activity.impact === 'medium'
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    }`}
                  >
                    {activity.impact ? `${activity.impact} impact` : 'No impact data'}
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