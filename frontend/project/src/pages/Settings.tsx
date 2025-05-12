import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Bell, Lock, Database, RefreshCw } from 'lucide-react';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Layout title="Settings">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Theme Mode</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Choose between light and dark mode for the application
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun size={18} />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={18} />
                      <span>Dark Mode</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Alerts</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receive important alerts via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receive notifications in your browser
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notification Frequency</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      How often you want to receive notifications
                    </p>
                  </div>
                  <select className="px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                    <option value="real-time">Real-time</option>
                    <option value="daily">Daily digest</option>
                    <option value="weekly">Weekly summary</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Data Refresh Interval</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      How often the system should update market data
                    </p>
                  </div>
                  <select className="px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                    <option value="1h">Every hour</option>
                    <option value="6h">Every 6 hours</option>
                    <option value="12h">Every 12 hours</option>
                    <option value="24h">Daily</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Data Source Priorities</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Adjust priority of different data sources
                    </p>
                  </div>
                  <Button>Configure Sources</Button>
                </div>
                
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                    >
                      <RefreshCw size={16} />
                      <span>Refresh All Data</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                    >
                      <Database size={16} />
                      <span>Manage Data Sources</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 text-red-500 hover:text-red-600"
                    >
                      <Lock size={16} />
                      <span>Clear Cached Data</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium">Company Profile</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Surbana Jurong Pte Ltd
                    </p>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium">Subscription Plan</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Enterprise Plan - Unlimited Access
                    </p>
                  </div>
                  <Button variant="outline">Manage Subscription</Button>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium">API Access</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Integration with your internal systems
                    </p>
                  </div>
                  <Button variant="outline">API Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;