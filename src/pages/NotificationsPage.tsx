import React, { useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import { useNotifications } from '../hooks/useNotifications';

const NotificationsPage: React.FC = () => {
  const { 
    isSupported, 
    permission, 
    requestPermission, 
    sendTestNotification,
    showNotification 
  } = useNotifications();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Patient Appointment',
      body: 'John Doe has scheduled an appointment for tomorrow at 10:00 AM',
      time: '2 hours ago',
      read: false,
      type: 'appointment'
    },
    {
      id: 2,
      title: 'Lab Results Available',
      body: 'Lab results for Jane Smith are now available for review',
      time: '5 hours ago',
      read: true,
      type: 'lab'
    },
    {
      id: 3,
      title: 'System Maintenance',
      body: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM',
      time: '1 day ago',
      read: true,
      type: 'system'
    }
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<any>(null);

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleDeleteNotification = (notification: any) => {
    setNotificationToDelete(notification);
    setShowDeleteModal(true);
  };

  const confirmDeleteNotification = () => {
    if (notificationToDelete) {
      setNotifications(prev => prev.filter(notif => notif.id !== notificationToDelete.id));
    }
  };

  const handleSendCustomNotification = () => {
    showNotification({
      title: 'Custom Test Notification',
      body: 'This is a custom notification sent from the Notifications page',
      tag: 'custom-test'
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return '📅';
      case 'lab':
        return '🔬';
      case 'system':
        return '⚙️';
      default:
        return '📢';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-2">
              View and manage your recent notifications
            </p>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Recent Notifications
                  {unreadCount > 0 && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {unreadCount} unread
                    </span>
                  )}
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Mark all as read
                  </button>
                  <div className="text-sm text-gray-500">
                    {unreadCount} unread • {notifications.length} total
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {notifications.length === 0 ? (
                  <div className="p-12 text-center text-gray-500">
                    <div className="text-6xl mb-4">🔔</div>
                    <p className="text-lg">No notifications yet</p>
                    <p className="text-sm mt-2">You'll see your notifications here when they arrive</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-6 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`text-sm font-medium ${
                              !notification.read ? 'text-indigo-900' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className={`mt-1 text-sm ${
                            !notification.read ? 'text-indigo-700' : 'text-gray-600'
                          }`}>
                            {notification.body}
                          </p>
                          <div className="mt-3 flex space-x-2">
                            {!notification.read && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="text-xs text-indigo-600 hover:text-indigo-800 p-2 hover:bg-indigo-50 rounded-full transition-colors"
                                title="Mark as read"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteNotification(notification)}
                              className="text-xs text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition-colors"
                              title="Delete notification"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
  );
};

export default NotificationsPage;
