import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import PageLoader from '../../components/pageLoader/PageLoader';
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuth();

    if (isAuthenticated === null) {
        return  <PageLoader/>; 
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
