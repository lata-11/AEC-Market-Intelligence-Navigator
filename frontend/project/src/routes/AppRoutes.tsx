import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import NewsMonitor from '../pages/NewsMonitor';
import CompetitorTracking from '../pages/CompetitorTracking';
import OpportunityAlerts from '../pages/OpportunityAlerts';
import TrendAnalysis from '../pages/TrendAnalysis';
import AdvancedSearch from '../pages/AdvancedSearch';
import Settings from '../pages/Settings';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/news" element={<NewsMonitor />} />
      <Route path="/competitors" element={<CompetitorTracking />} />
      <Route path="/opportunities" element={<OpportunityAlerts />} />
      <Route path="/trends" element={<TrendAnalysis />} />
      <Route path="/search" element={<AdvancedSearch />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};