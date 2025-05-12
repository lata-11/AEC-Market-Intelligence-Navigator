import React, { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';

const Header: React.FC<{ title: string }> = ({ title }) => {
  const { refreshData } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New opportunity alert: Singapore Metro Extension' },
    { id: 2, message: 'Competitor AECOM won major project in Malaysia' },
    { id: 3, message: 'Trending topic: Sustainable construction methods' }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  const handleRefresh = () => {
    refreshData();
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-800 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search..."
                className="rounded-md border border-slate-200 bg-white dark:bg-slate-700 dark:border-slate-600 px-9 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 border border-slate-200 dark:border-slate-700">
                <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 border-b border-slate-200 dark:border-slate-700 last:border-0"
                    >
                      <p className="text-sm">{notification.message}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700">
                  <button className="text-primary text-sm hover:underline w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.5 9.5 0 0 0-6.5 2.5L3 8"></path>
              <path d="M3 4v4h4"></path>
              <path d="M3 12a9 9 0 0 0 9 9 9.5 9.5 0 0 0 6.5-2.5L21 16"></path>
              <path d="M21 20v-4h-4"></path>
            </svg>
          </Button>
          
          <Button variant="ghost" size="icon">
            <User size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;