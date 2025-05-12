// Types
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  relevanceScore: number;
  categories: string[];
}

export interface CompetitorActivity {
  id: string;
  competitor: string;
  activityType: 'project_win' | 'partnership' | 'expansion' | 'innovation' | 'other';
  description: string;
  date: string;
  region: string;
  sector: string;
  estimatedValue?: number;
  source: string;
  impact: 'high' | 'medium' | 'low';
}

export interface ProjectOpportunity {
  id: string;
  title: string;
  client: string;
  region: string;
  country: string;
  sector: string;
  estimatedValue: number;
  expectedRfpDate: string;
  confidenceScore: number;
  description: string;
  sourceType: 'news' | 'intelligence' | 'client_announcement' | 'regulatory';
  createdAt: string;
}

export interface TrendData {
  id: string;
  name: string;
  description: string;
  growth: number;
  relevance: number;
  sectors: string[];
  relatedKeywords: string[];
  sources: string[];
}

export interface RegionalMarketData {
  region: string;
  marketSize: number;
  growthRate: number;
  opportunities: number;
  competitiveIndex: number;
}

export interface SectorMarketData {
  sector: string;
  marketSize: number;
  growthRate: number;
  opportunities: number;
  sentiment: number;
}

export interface MarketData {
  regionalData: RegionalMarketData[];
  sectorData: SectorMarketData[];
  news: NewsItem[];
  competitorActivities: CompetitorActivity[];
  projectOpportunities: ProjectOpportunity[];
  trends: TrendData[];
}

// Mock data
export const mockMarketData: MarketData = {
  regionalData: [
    { region: 'Asia Pacific', marketSize: 1240, growthRate: 4.5, opportunities: 87, competitiveIndex: 7.2 },
    { region: 'North America', marketSize: 980, growthRate: 2.8, opportunities: 64, competitiveIndex: 8.1 },
    { region: 'Europe', marketSize: 850, growthRate: 1.9, opportunities: 53, competitiveIndex: 7.8 },
    { region: 'Middle East', marketSize: 420, growthRate: 6.2, opportunities: 45, competitiveIndex: 6.5 },
    { region: 'Africa', marketSize: 180, growthRate: 5.8, opportunities: 38, competitiveIndex: 5.2 },
    { region: 'South America', marketSize: 290, growthRate: 3.1, opportunities: 29, competitiveIndex: 6.0 },
  ],
  sectorData: [
    { sector: 'Infrastructure', marketSize: 950, growthRate: 3.8, opportunities: 72, sentiment: 7.5 },
    { sector: 'Commercial', marketSize: 720, growthRate: 2.5, opportunities: 58, sentiment: 6.9 },
    { sector: 'Residential', marketSize: 680, growthRate: 2.2, opportunities: 49, sentiment: 6.7 },
    { sector: 'Industrial', marketSize: 540, growthRate: 3.1, opportunities: 43, sentiment: 7.2 },
    { sector: 'Healthcare', marketSize: 380, growthRate: 4.2, opportunities: 37, sentiment: 7.8 },
    { sector: 'Education', marketSize: 270, growthRate: 2.9, opportunities: 31, sentiment: 7.4 },
  ],
  news: [
    {
      id: '1',
      title: 'Singapore Announces $5B Infrastructure Investment Plan',
      source: 'Construction Weekly',
      date: '2024-05-15',
      summary: 'Singapore government reveals ambitious 5-year infrastructure development plan focused on sustainable transport and smart city initiatives.',
      url: 'https://example.com/singapore-plan',
      sentiment: 'positive',
      relevanceScore: 0.92,
      categories: ['infrastructure', 'government', 'sustainability']
    },
    {
      id: '2',
      title: 'New Green Building Standards Implemented in EU',
      source: 'European Construction Journal',
      date: '2024-05-10',
      summary: 'European Union introduces stricter green building standards requiring 40% carbon reduction in new construction by 2027.',
      url: 'https://example.com/eu-standards',
      sentiment: 'neutral',
      relevanceScore: 0.87,
      categories: ['regulations', 'sustainability', 'europe']
    },
    {
      id: '3',
      title: 'AI Adoption in Construction Sector Grows 40% YoY',
      source: 'AEC Tech Review',
      date: '2024-05-08',
      summary: 'Study shows AI implementation in AEC firms increased 40% compared to previous year, with BIM integration and predictive maintenance leading applications.',
      url: 'https://example.com/ai-growth',
      sentiment: 'positive',
      relevanceScore: 0.85,
      categories: ['technology', 'ai', 'digital transformation']
    },
    {
      id: '4',
      title: 'Major Labor Shortage Impacts Projects in Australia',
      source: 'Australian Builder',
      date: '2024-05-05',
      summary: 'Construction projects across Australia face delays due to critical shortage of skilled labor, affecting timelines and budgets.',
      url: 'https://example.com/labor-shortage',
      sentiment: 'negative',
      relevanceScore: 0.79,
      categories: ['workforce', 'australia', 'market challenges']
    },
    {
      id: '5',
      title: 'Dubai Announces World\'s Largest 3D-Printed Building Project',
      source: 'Middle East Construction News',
      date: '2024-05-01',
      summary: 'Dubai unveils plans for record-breaking 3D-printed commercial complex, aiming to reduce construction time by 70% and costs by 30%.',
      url: 'https://example.com/dubai-3d',
      sentiment: 'positive',
      relevanceScore: 0.91,
      categories: ['technology', 'innovation', 'middle east']
    },
  ],
  competitorActivities: [
    {
      id: '1',
      competitor: 'AECOM',
      activityType: 'project_win',
      description: 'Won $2.1B contract for Sydney Metro extension',
      date: '2024-05-12',
      region: 'Asia Pacific',
      sector: 'Infrastructure',
      estimatedValue: 2100000000,
      source: 'Company Announcement',
      impact: 'high'
    },
    {
      id: '2',
      competitor: 'WSP',
      activityType: 'partnership',
      description: 'Strategic partnership with Microsoft for digital twin solutions',
      date: '2024-05-10',
      region: 'Global',
      sector: 'Technology',
      source: 'Press Release',
      impact: 'medium'
    },
    {
      id: '3',
      competitor: 'Jacobs',
      activityType: 'expansion',
      description: 'Opening new office in Singapore with 200 staff',
      date: '2024-05-08',
      region: 'Asia Pacific',
      sector: 'Multiple',
      source: 'LinkedIn Announcement',
      impact: 'medium'
    },
    {
      id: '4',
      competitor: 'Bechtel',
      activityType: 'project_win',
      description: 'Selected for $4.5B Saudi Arabia airport project',
      date: '2024-05-05',
      region: 'Middle East',
      sector: 'Infrastructure',
      estimatedValue: 4500000000,
      source: 'Industry News',
      impact: 'high'
    },
    {
      id: '5',
      competitor: 'Arup',
      activityType: 'innovation',
      description: 'Launched new sustainable design service with carbon calculation tools',
      date: '2024-05-01',
      region: 'Global',
      sector: 'Sustainability',
      source: 'Company Blog',
      impact: 'medium'
    },
  ],
  projectOpportunities: [
    {
      id: '1',
      title: 'Bangkok Smart City Infrastructure Program',
      client: 'Thailand Ministry of Digital Economy',
      region: 'Asia Pacific',
      country: 'Thailand',
      sector: 'Infrastructure',
      estimatedValue: 850000000,
      expectedRfpDate: '2024-08-15',
      confidenceScore: 0.78,
      description: 'Comprehensive smart city implementation including IoT infrastructure, transport systems, and public services integration.',
      sourceType: 'client_announcement',
      createdAt: '2024-05-10'
    },
    {
      id: '2',
      title: 'New York Hospital Complex Redevelopment',
      client: 'NYC Health Authority',
      region: 'North America',
      country: 'United States',
      sector: 'Healthcare',
      estimatedValue: 1200000000,
      expectedRfpDate: '2024-09-20',
      confidenceScore: 0.85,
      description: 'Complete redevelopment of aging hospital complex with focus on sustainability and pandemic resilience.',
      sourceType: 'intelligence',
      createdAt: '2024-05-08'
    },
    {
      id: '3',
      title: 'Dubai Sustainable Commercial District',
      client: 'Dubai Holdings',
      region: 'Middle East',
      country: 'UAE',
      sector: 'Commercial',
      estimatedValue: 1750000000,
      expectedRfpDate: '2024-10-05',
      confidenceScore: 0.72,
      description: 'Net-zero commercial district development with office space, retail, and public amenities.',
      sourceType: 'news',
      createdAt: '2024-05-05'
    },
    {
      id: '4',
      title: 'Singapore-Malaysia High Speed Rail (Revived)',
      client: 'Joint Development Authority',
      region: 'Asia Pacific',
      country: 'Multiple',
      sector: 'Infrastructure',
      estimatedValue: 15000000000,
      expectedRfpDate: '2025-01-15',
      confidenceScore: 0.65,
      description: 'Revived high-speed rail project connecting Singapore and Kuala Lumpur with potential extensions.',
      sourceType: 'regulatory',
      createdAt: '2024-05-01'
    },
    {
      id: '5',
      title: 'London Affordable Housing Initiative',
      client: 'Greater London Authority',
      region: 'Europe',
      country: 'United Kingdom',
      sector: 'Residential',
      estimatedValue: 680000000,
      expectedRfpDate: '2024-07-30',
      confidenceScore: 0.81,
      description: 'Large-scale affordable housing development across multiple London boroughs.',
      sourceType: 'client_announcement',
      createdAt: '2024-04-28'
    },
  ],
  trends: [
    {
      id: '1',
      name: 'Digital Twins',
      description: 'Creation of digital replicas of physical assets for monitoring, simulation and optimization',
      growth: 35.8,
      relevance: 0.89,
      sectors: ['Infrastructure', 'Commercial', 'Industrial'],
      relatedKeywords: ['IoT', 'BIM', 'simulation', 'asset management'],
      sources: ['research', 'market reports', 'case studies']
    },
    {
      id: '2',
      name: 'Modular Construction',
      description: 'Prefabrication of building components off-site for rapid assembly',
      growth: 28.4,
      relevance: 0.86,
      sectors: ['Residential', 'Healthcare', 'Education'],
      relatedKeywords: ['prefab', 'offsite construction', 'standardization'],
      sources: ['industry news', 'project data', 'supplier announcements']
    },
    {
      id: '3',
      name: 'Net-Zero Buildings',
      description: 'Buildings designed to produce zero carbon emissions through efficiency and renewables',
      growth: 42.1,
      relevance: 0.93,
      sectors: ['Commercial', 'Residential', 'Education'],
      relatedKeywords: ['carbon neutral', 'sustainability', 'green building', 'LEED'],
      sources: ['regulatory changes', 'client demands', 'market reports']
    },
    {
      id: '4',
      name: 'Construction Robotics',
      description: 'Automation and robotics for construction tasks like bricklaying and concrete work',
      growth: 23.7,
      relevance: 0.77,
      sectors: ['Commercial', 'Industrial', 'Infrastructure'],
      relatedKeywords: ['automation', 'labor shortage', 'efficiency', 'safety'],
      sources: ['startup funding', 'technology pilots', 'research papers']
    },
    {
      id: '5',
      name: 'Climate Resilient Infrastructure',
      description: 'Infrastructure designed to withstand climate change impacts',
      growth: 31.9,
      relevance: 0.90,
      sectors: ['Infrastructure', 'Residential', 'Commercial'],
      relatedKeywords: ['adaptation', 'flood protection', 'extreme weather', 'resilience'],
      sources: ['government policies', 'insurance data', 'climate science']
    },
  ]
};