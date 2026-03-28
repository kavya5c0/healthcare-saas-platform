import React from 'react';
import { Outlet, useLocation } from '@tanstack/react-router';
import Navigation from './Navigation';
import { useAuthStore } from '../stores/authStore';

const MainLayout: React.FC = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  const getCurrentPageFromPath = (pathname: string): string => {
    if (pathname === '/dashboard') return 'dashboard';
    if (pathname === '/analytics') return 'analytics';
    if (pathname === '/patients') return 'patients';
    if (pathname === '/settings') return 'settings';
    if (pathname === '/notifications') return 'notifications';
    return 'dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <Navigation currentPage={getCurrentPageFromPath(location.pathname)} />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
