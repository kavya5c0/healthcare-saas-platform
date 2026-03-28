import { useEffect } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './lib/router';
import { useAuthStore } from './stores/authStore';
import { onAuthChange } from './lib/firebase';

function App() {
  const { setUser, setLoading, setInitialized } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setInitialized]);

  return <RouterProvider router={router} />;
}

export default App;
