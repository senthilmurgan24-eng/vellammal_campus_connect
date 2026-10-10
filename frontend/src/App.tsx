import { lazy, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useNetworkStatus from './hooks/useNetworkStatus';
import Toast from './components/ui/Toast';

const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PracticeTest = lazy(() => import('./pages/PracticeTest'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Store = lazy(() => import('./pages/Store'));

function App() {
  const isOnline = useNetworkStatus();

  const offlineBanner = useMemo(
    () =>
      !isOnline ? (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white text-center py-2 text-sm">
          You are offline. Some features may be limited.
        </div>
      ) : null,
    [isOnline]
  );

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#0d141b] dark:text-white">
      {offlineBanner}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/practice-tests" element={<PracticeTest />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/store" element={<Store />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast />
      {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </div>
  );
}

export default App;
