import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useData } from '../../contexts/DataContext';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const OpportunityAlertCard: React.FC = () => {
  const { projectOpportunities } = useData();
  
  // Get the top opportunities based on confidence score
  const topOpportunities = [...projectOpportunities]
    .sort((a, b) => b.confidenceScore - a.confidenceScore)
    .slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Opportunity Alerts</span>
          <a href="/opportunities" className="text-primary text-sm hover:underline">View all</a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topOpportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-4 rounded-md border border-slate-200 dark:border-slate-700 hover:border-primary hover:dark:border-primary transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{opportunity.title}</h3>
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full text-xs">
                    {Math.round(opportunity.confidenceScore * 100)}% confidence
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 line-clamp-2">
                  {opportunity.description}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Client:</span>
                    <span>{opportunity.client}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Region:</span>
                    <span>{opportunity.region}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Value:</span>
                    <span>${(opportunity.estimatedValue / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Expected RFP:</span>
                    <span>{opportunity.expectedRfpDate}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-amber-500">
                  <AlertCircle size={14} />
                  <span className="text-xs">{Math.round((new Date(opportunity.expectedRfpDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days until expected RFP</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpportunityAlertCard;