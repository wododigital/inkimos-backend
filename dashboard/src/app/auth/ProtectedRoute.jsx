import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { RiseLoader } from 'react-spinners'
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuth();

    if (isAuthenticated === null) {
        return  <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}><RiseLoader color="#df4646d4" loading='true' size={36} /></div>; 
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
