import React from 'react';
import Layout from '../components/layout/Layout';
import RegionalOpportunitiesMap from '../components/dashboard/RegionalOpportunitiesMap';
import SectorPerformanceChart from '../components/dashboard/SectorPerformanceChart';
import RecentNewsCard from '../components/dashboard/RecentNewsCard';
import TopTrendsCard from '../components/dashboard/TopTrendsCard';
import CompetitorActivityCard from '../components/dashboard/CompetitorActivityCard';
import OpportunityAlertCard from '../components/dashboard/OpportunityAlertCard';
import { useData } from '../contexts/DataContext';

const Dashboard: React.FC = () => {
  const { isLoading } = useData();

  if (isLoading) {
    return (
      <Layout title="Dashboard">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Market Intelligence Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RegionalOpportunitiesMap />
        </div>
        <div>
          <SectorPerformanceChart />
        </div>
        <div>
          <RecentNewsCard />
        </div>
        <div>
          <TopTrendsCard />
        </div>
        <div>
          <CompetitorActivityCard />
        </div>
        <div>
          <OpportunityAlertCard />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;