import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { logout } from '../lib/firebase';

interface NavigationProps {
  currentPage: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  const { user } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', current: currentPage === 'dashboard' },
    { name: 'Analytics', href: '/analytics', current: currentPage === 'analytics' },
    { name: 'Patients', href: '/patients', current: currentPage === 'patients' },
    { name: 'Settings', href: '/settings', current: currentPage === 'settings' },
    { name: 'Notifications', href: '/notifications', current: currentPage === 'notifications' },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Healthcare SaaS</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              Welcome, {user?.email || 'Guest'}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
