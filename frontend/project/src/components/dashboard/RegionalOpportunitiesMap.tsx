import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';

// This is a simplified map visualization component
// In a real application, you would use a library like react-leaflet or d3-geo
const RegionalOpportunitiesMap: React.FC = () => {
  const { marketData } = useData();
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  
  // Get sorted data with highest market opportunity first
  const sortedRegions = [...marketData.regionalData].sort((a, b) => b.opportunities - a.opportunities);
  
  // In a real app, this would be a proper map visualization
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Regional Opportunities</span>
          <select 
            className="text-sm font-normal bg-slate-100 dark:bg-slate-700 border-0 rounded p-1"
            onChange={(e) => setActiveRegion(e.target.value)}
            value={activeRegion || ''}
          >
            <option value="">All Regions</option>
            {marketData.regionalData.map(region => (
              <option key={region.region} value={region.region}>{region.region}</option>
            ))}
          </select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] relative bg-slate-100 dark:bg-slate-700 rounded-md overflow-hidden">
          {/* World map placeholder */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 800 400" 
            className="stroke-slate-300 dark:stroke-slate-600 fill-none stroke-[0.5]"
          >
            <path d="M148,210 C171,180 194,150 217,150 C240,150 240,210 263,210 C286,210 320,150 343,150 C366,150 400,210 423,210 C446,210 480,150 503,150 C526,150 549,180 572,210" />
            <path d="M148,240 C171,270 194,300 217,300 C240,300 240,240 263,240 C286,240 320,300 343,300 C366,300 400,240 423,240 C446,240 480,300 503,300 C526,300 549,270 572,240" />
            <path d="M200,180 C240,120 300,90 350,180 C400,270 450,300 500,240 C550,180 600,180 650,180" />
          </svg>
          
          {/* Region indicators */}
          <div className="absolute inset-0 flex flex-wrap justify-around items-center p-4">
            {sortedRegions.map((region, index) => (
              <motion.div
                key={region.region}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative cursor-pointer transform transition-transform hover:scale-110 ${
                  activeRegion === region.region ? 'z-10' : ''
                }`}
                onClick={() => setActiveRegion(region.region === activeRegion ? null : region.region)}
              >
                <div 
                  className={`h-${12 + Math.round(region.opportunities / 10)} w-${12 + Math.round(region.opportunities / 10)} rounded-full flex items-center justify-center 
                    ${activeRegion === region.region ? 'bg-primary' : 'bg-primary/70'}`}
                  style={{ 
                    width: `${40 + region.opportunities}px`, 
                    height: `${40 + region.opportunities}px`,
                  }}
                >
                  <span className="text-white text-xs font-bold">{region.opportunities}</span>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  {region.region}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            <p className="mb-2">Bubble size represents number of opportunities</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {activeRegion ? (
                <div className="w-full">
                  {sortedRegions.find(r => r.region === activeRegion)?.region}:
                  <ul className="list-disc pl-5 mt-1">
                    <li>Market Size: ${sortedRegions.find(r => r.region === activeRegion)?.marketSize}B</li>
                    <li>Growth Rate: {sortedRegions.find(r => r.region === activeRegion)?.growthRate}%</li>
                    <li>Opportunities: {sortedRegions.find(r => r.region === activeRegion)?.opportunities}</li>
                    <li>Competitive Index: {sortedRegions.find(r => r.region === activeRegion)?.competitiveIndex}/10</li>
                  </ul>
                </div>
              ) : (
                <div className="w-full">
                  Click on a region bubble to see detailed information
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalOpportunitiesMap;