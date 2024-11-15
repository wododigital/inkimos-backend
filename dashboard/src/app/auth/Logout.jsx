import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        axios.post(`${config.baseURL}/logout`, {}, { withCredentials: true })
            .then(() => {
                navigate('/login'); 
            })
            .catch(error => {
                console.error('Logout failed:', error);
            });
    }, [navigate]);

    return <div>Logging out...</div>; // Optionally, add a loading message or spinner
};

export default Logout;
