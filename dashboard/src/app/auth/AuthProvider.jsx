import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        axios.get(`${config.baseURL}/auth/check`, { withCredentials: true })
            .then(response => {
                // console.log("Auth check response:", response.data);
                setAuthenticated(response.data.authenticated);
            })
            .catch(() => setAuthenticated(false));
    }, []);

    return (
        <AuthContext.Provider value={authenticated}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export const useSetAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useSetAuth must be used within an AuthProvider");
    }
    return context.setAuthenticated;
};
