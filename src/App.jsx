import { useApp } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SubscriptionPage from './pages/SubscriptionPage';
import PaymentPage from './pages/PaymentPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const { page } = useApp();

  return (
    <div className="min-h-screen">
      {page === 'login' && <LoginPage />}
      {page === 'home' && <HomePage />}
      {page === 'subscription' && <SubscriptionPage />}
      {page === 'payment' && <PaymentPage />}
      {page === 'dashboard' && <DashboardPage />}
    </div>
  );
}
