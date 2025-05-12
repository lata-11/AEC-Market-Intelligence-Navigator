import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from './components/ui/Toaster';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <AppRoutes />
            <Toaster />
          </div>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;