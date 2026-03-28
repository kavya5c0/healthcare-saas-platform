import React from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';

interface TabNavigationProps {
  currentPage: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ currentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show the most important navigation option
  const mainTab = {
    name: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1H9a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  };

  const handleTabClick = (path: string) => {
    navigate({ to: path });
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          <button
            onClick={() => handleTabClick(mainTab.path)}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
              location.pathname === mainTab.path
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <span className="w-5 h-5">{mainTab.icon}</span>
            <span>{mainTab.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
