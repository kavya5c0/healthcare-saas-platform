import { useEffect, useState } from 'react';

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
}

export const useNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check if notifications are supported
    const supported = 'Notification' in window;
    setIsSupported(supported);
    
    if (supported) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async (): Promise<NotificationPermission> => {
    if (!isSupported) {
      console.warn('Notifications are not supported in this browser');
      return 'denied';
    }

    try {
      console.log('Requesting notification permission...');
      const result = await Notification.requestPermission();
      console.log('Permission result:', result);
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Error requesting permission:', error);
      return 'denied';
    }
  };

  const showNotification = (options: NotificationOptions) => {
    console.log('Attempting to show notification:', options);
    console.log('Is supported:', isSupported);
    console.log('Current permission:', permission);

    // Always show fallback for demo
    console.log('🔔 NOTIFICATION:', options.title);
    console.log('📝 MESSAGE:', options.body);

    if (!isSupported) {
      console.log('Using alert fallback (not supported)');
      alert(`${options.title}\n\n${options.body}`);
      return;
    }

    if (permission !== 'granted') {
      console.log('Permission not granted, requesting...');
      requestPermission().then(newPermission => {
        if (newPermission === 'granted') {
          console.log('Permission granted, showing notification');
          showNotification(options);
        } else {
          console.log('Permission denied, using alert fallback');
          alert(`${options.title}\n\n${options.body}`);
        }
      });
      return;
    }

    try {
      console.log('Creating browser notification...');
      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/favicon.svg',
        tag: options.tag,
      });

      notification.onclick = () => {
        console.log('Notification clicked');
        window.focus();
        notification.close();
      };

      setTimeout(() => {
        console.log('Closing notification after 5 seconds');
        notification.close();
      }, 5000);

      console.log('Notification created successfully');
    } catch (error) {
      console.error('Error creating notification:', error);
      alert(`${options.title}\n\n${options.body}`);
    }
  };

  const registerServiceWorker = async () => {
    console.log('Attempting to register service worker...');
    
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Worker is not supported');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration.scope);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      // Don't throw error, just log it for demo
    }
  };

  const sendTestNotification = () => {
    console.log('Sending test notification...');
    showNotification({
      title: '🏥 Healthcare SaaS Notification',
      body: 'New patient appointment scheduled: John Doe - Tomorrow at 10:00 AM',
      tag: 'test-appointment',
    });
  };

  return {
    isSupported,
    permission,
    requestPermission,
    showNotification,
    registerServiceWorker,
    sendTestNotification,
  };
};
