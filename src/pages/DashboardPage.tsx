import React, { useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { useNavigate } from '@tanstack/react-router';

const DashboardPage: React.FC = () => {
  const { registerServiceWorker, sendTestNotification, isSupported, permission, requestPermission } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Dashboard: Initializing service worker...');
    registerServiceWorker();
  }, [registerServiceWorker]);

  const handleTestNotification = () => {
    console.log('Dashboard: Test notification button clicked');
    console.log('Dashboard: Current permission state:', permission);
    
    if (permission === 'default') {
      console.log('Dashboard: Requesting permission first...');
      requestPermission().then(newPermission => {
        console.log('Dashboard: Permission result:', newPermission);
        if (newPermission === 'granted') {
          sendTestNotification();
        }
      });
    } else {
      console.log('Dashboard: Sending test notification directly...');
      sendTestNotification();
    }
  };

  const handleRequestPermission = () => {
    console.log('Dashboard: Enable notifications button clicked');
    requestPermission().then(newPermission => {
      console.log('Dashboard: Permission request completed:', newPermission);
    });
  };

  return (
    <div>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">P</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Patients
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">1,234</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">A</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Today
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">89</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">R</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Reviews Pending
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">12</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">M</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Messages
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">45</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Patient Management</h3>
                <p className="text-gray-600 mb-4">View and manage patient records</p>
                <a href="/patients" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Go to Patients →
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-600 mb-4">View detailed analytics and reports</p>
                <a href="/analytics" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  View Analytics →
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
                <p className="text-gray-600 mb-4">Manage your account settings</p>
                <button 
                  onClick={() => navigate({ to: '/settings' })}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Configure →
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Notifications</h3>
                <p className="text-gray-600 mb-4">View all notifications and settings</p>
                <button 
                  onClick={() => navigate({ to: '/notifications' })}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Manage Notifications →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
