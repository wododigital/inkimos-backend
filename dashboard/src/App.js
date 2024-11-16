import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContent from './AppContent';
import Login from './app/auth/Login';
import Logout from './app/auth/Logout';
import ProtectedRoute from './app/auth/ProtectedRoute'
import { AuthProvider } from './app/auth/AuthProvider';
function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/logout" element={<Logout/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<AuthProvider><ProtectedRoute><AppContent /></ProtectedRoute></AuthProvider>} />
        </Routes>
      </Router>
  );
}

export default App;
