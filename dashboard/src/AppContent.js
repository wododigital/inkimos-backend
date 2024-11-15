import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './AppRoutes';

function AppContent() {
  const location = useLocation();

  // Check if the current path is "/login"
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex">
      {/* Render Header only if not on login page */}
      {!isLoginPage && <Header />}
      <div className="flex-1 p-4">
        <AppRoutes />
      </div>
    </div>
  );
}

export default AppContent;
