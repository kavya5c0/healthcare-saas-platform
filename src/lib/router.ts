import React from 'react';
import { createRouter, createRootRoute, createRoute, useNavigate, Outlet } from '@tanstack/react-router';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import PatientDetailsPage from '../pages/PatientDetailsPage';
import SettingsPage from '../pages/SettingsPage';
import NotificationsPage from '../pages/NotificationsPage';
import MainLayout from '../components/MainLayout';
import { useAuthStore } from '../stores/authStore';

// Auth guard component
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, isInitialized } = useAuthStore();
  const navigate = useNavigate();

  if (!isInitialized) {
    return React.createElement('div', { className: 'min-h-screen flex items-center justify-center' }, 'Initializing...');
  }

  if (isLoading) {
    return React.createElement('div', { className: 'min-h-screen flex items-center justify-center' }, 'Loading...');
  }

  if (!user) {
    navigate({ to: '/login' });
    return null;
  }

  return React.createElement(React.Fragment, null, children);
};

const rootRoute = createRootRoute({
  component: () => {
    return React.createElement(Outlet);
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    React.useEffect(() => {
      if (!user) {
        navigate({ to: '/login' });
      } else {
        navigate({ to: '/dashboard' });
      }
    }, [user, navigate]);

    return React.createElement('div', { className: 'min-h-screen flex items-center justify-center' }, 'Redirecting...');
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => {
    const { user, isLoading, isInitialized } = useAuthStore();
    const navigate = useNavigate();

    React.useEffect(() => {
      if (isInitialized && !isLoading && user) {
        navigate({ to: '/dashboard' });
      }
    }, [user, isLoading, isInitialized, navigate]);

    // Only show login page if not authenticated or still loading
    if (!isInitialized || isLoading) {
      return React.createElement('div', { className: 'min-h-screen flex items-center justify-center' }, 
        !isInitialized ? 'Initializing...' : 'Loading...');
    }

    if (user) {
      return null; // Will redirect via useEffect
    }

    return React.createElement(LoginPage);
  },
});

const authenticatedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated',
  component: () => React.createElement(AuthGuard, null, React.createElement(MainLayout)),
});

const dashboardRoute = createRoute({
  getParentRoute: () => authenticatedLayout,
  path: '/dashboard',
  component: () => React.createElement(DashboardPage),
});

const analyticsRoute = createRoute({
  getParentRoute: () => authenticatedLayout,
  path: '/analytics',
  component: () => React.createElement(AnalyticsPage),
});

const patientsRoute = createRoute({
  getParentRoute: () => authenticatedLayout,
  path: '/patients',
  component: () => React.createElement(PatientDetailsPage),
});

const settingsRoute = createRoute({
  getParentRoute: () => authenticatedLayout,
  path: '/settings',
  component: () => React.createElement(SettingsPage),
});

const notificationsRoute = createRoute({
  getParentRoute: () => authenticatedLayout,
  path: '/notifications',
  component: () => React.createElement(NotificationsPage),
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    indexRoute,
    loginRoute,
    authenticatedLayout.addChildren([
      dashboardRoute,
      analyticsRoute,
      patientsRoute,
      settingsRoute,
      notificationsRoute,
    ]),
  ]),
  base: '/',
});
