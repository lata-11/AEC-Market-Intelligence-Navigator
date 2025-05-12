import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Newspaper, 
  Users, 
  AlertCircle, 
  TrendingUp, 
  Search, 
  Settings, 
  Menu, 
  X,
  Sun,
  Moon,
  Building2
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../contexts/ThemeContext';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'News Monitor', href: '/news', icon: Newspaper },
  { name: 'Competitor Tracking', href: '/competitors', icon: Users },
  { name: 'Opportunity Alerts', href: '/opportunities', icon: AlertCircle },
  { name: 'Trend Analysis', href: '/trends', icon: TrendingUp },
  { name: 'Advanced Search', href: '/search', icon: Search },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '64px' },
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsMobileOpen(true)}
          className="bg-white dark:bg-slate-800 shadow-md"
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="expanded"
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 bottom-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 shadow-lg z-50 flex flex-col ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform`}
      >
        {/* Header */}
        <div className="flex items-center h-16 px-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Building2 size={24} className="text-primary" />
              <h1 className="text-lg font-bold tracking-tight truncate">AEC Navigator</h1>
            </div>
          )}
          
          <div className="flex items-center ml-auto gap-1">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => toggleTheme()}
              className="hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <Menu size={18} /> : <X size={18} />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-white dark:text-white font-medium'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                    } ${isCollapsed ? 'justify-center' : ''}`
                  }
                >
                  <item.icon size={20} />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-white dark:text-white font-medium'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
              } ${isCollapsed ? 'justify-center' : ''}`
            }
          >
            <Settings size={20} />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                Settings
              </motion.span>
            )}
          </NavLink>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;